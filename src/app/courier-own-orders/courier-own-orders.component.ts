import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from '../services/error-handler.service';

@Component({
  selector: 'app-courier-own-orders',
  templateUrl: './courier-own-orders.component.html'
})
export class CourierOwnOrdersComponent implements OnInit {

  private jobs = null;

  constructor(
    private messageService : MessageService,
    private http: HttpClient,
    private errorHandlerService : ErrorHandlerService
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
  }

}
