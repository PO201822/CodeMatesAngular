import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { JobserviceService } from '../services/jobservice.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ErrorHandlerService } from '../services/error-handler.service';

@Component({
  selector: 'app-completed-jobs',
  templateUrl: './completed-jobs.component.html',
})
export class CompletedJobsComponent implements OnInit {

  jobs : any = null;
  closeResult: string;

  constructor(
    private messageService : MessageService,
    private http: HttpClient,
    private jobservice : JobserviceService,
    private modalService: NgbModal,
    private errorHandlerService : ErrorHandlerService
  ) { }

  ngOnInit() {
    Promise.resolve(null).then(() => this.messageService.hideMessage());
    this.getCompletedJobs();
  }

  getCompletedJobs() {
    let url = environment.apiUrl + '/courier/getCompleted';
    this.http.get(url).subscribe(res => this.setCompletedJobs(res),
      error => this.errorHandlerService.handleError(error)); { };
  }

  setCompletedJobs(res){
    this.jobs = res;
    this.jobservice.setJobs(res);
    console.log(this.jobs);
    if(this.jobs == null){
      this.messageService.showMessage("No completed jobs, take and oreder first and deliver it!", "info") ;
    }
  }

  
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'xl', scrollable: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
