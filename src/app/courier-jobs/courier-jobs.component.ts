import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { JobserviceService } from '../services/jobservice.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-courier-jobs',
  templateUrl: './courier-jobs.component.html'
})
export class CourierJobsComponent implements OnInit {

  jobs : any = null;

  constructor(
    private messageService : MessageService,
    private http: HttpClient,
    private jobservice : JobserviceService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    Promise.resolve(null).then(() => this.messageService.hideMessage());
    this.getAllJobs();

  }

  getAllJobs() {
    let url = environment.apiUrl + '/courier/getAllJobs';
    this.http.get(url).subscribe(res => this.setAllJobs(res),
      error => this.handleError(error)); { };
  }


  handleError(error: any): void {
    console.log(error);
  }

  setAllJobs(res){
    this.jobs = res;
    this.jobservice.setJobs(res);
    if(this.jobs == null){
      this.messageService.showMessage("No costumer orders at the moment, come back later!", "info") ;
    }
  
  }

  onPickUpCartClicked(cartId){
    let url = environment.apiUrl + '/courier/pickUpJob';
    this.http.post<any>(url, {
      cartId : cartId
    }).subscribe(res => this.onPickedUpCartClickedResponse(res),
      error => this.handleError(error)); {
    };

  }
  onPickedUpCartClickedResponse(res){
    console.log("jo");
    this.getAllJobs();
  }

  closeResult: string;


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
