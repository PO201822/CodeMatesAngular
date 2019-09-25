import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ErrorHandlerService } from '../services/error-handler.service';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  orders = null;
  closeResult: string;

  constructor(
    private messageService : MessageService,
    private http: HttpClient,
    private modalService: NgbModal,
    private errorHandlerService : ErrorHandlerService
  ) { }

  ngOnInit() {
    Promise.resolve(null).then(() => this.messageService.hideMessage());
    this.getMyOrders();
  }

  getMyOrders() {
    let url = environment.apiUrl + '/getOrders';
    this.http.get(url).subscribe(res => this.setOrders(res),
      error => this.errorHandlerService.handleError(error)); { };
  }

  setOrders(orders){
    console.log(orders);
    this.orders = orders;
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
