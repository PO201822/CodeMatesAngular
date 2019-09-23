import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from '../services/error-handler.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-courier-own-orders',
  templateUrl: './courier-own-orders.component.html'
})
export class CourierOwnOrdersComponent implements OnInit {

  private jobs = null;
  private closeResult : any;

  constructor(
    private messageService : MessageService,
    private http: HttpClient,
    private errorHandlerService : ErrorHandlerService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    Promise.resolve(null).then(() => this.messageService.hideMessage());
    this.getMyCurrentJobs();
  }

  getMyCurrentJobs() {
    let url = environment.apiUrl + '/courier/getMyCurrentJobs';
    this.http.get(url).subscribe(res => this.setJobsList(res),
      error => this.errorHandlerService.handleError(error)); { };
  }

  setJobsList(res){
    this.jobs = res;

    console.log(this.jobs);
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

  onJobCompleteClicked(orderId){
    let url = environment.apiUrl + '/courier/completeOrder';
    this.http.put<any>(url, {
      orderId : orderId
    }).subscribe(res => this.messageService.showMessage("Profile updated successfuly.", "success"),
      error => this.errorHandlerService.handleError(error)); {
    };

  }

}
