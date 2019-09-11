import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-courier-own-orders',
  templateUrl: './courier-own-orders.component.html'
})
export class CourierOwnOrdersComponent implements OnInit {

  private jobs = null;

  constructor(
    private messageService : MessageService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    Promise.resolve(null).then(() => this.messageService.hideMessage());
    this.getMyCurrentJobs();

  }

  getMyCurrentJobs() {
    let url = environment.apiUrl + '/courier/getMyCurrentJobs';
    this.http.get(url).subscribe(res => this.setJobsList(res),
      error => this.handleError(error)); { };
  }


  handleError(error: any): void {
    console.log(error);
  }

  setJobsList(res){
    console.log(res)
    this.jobs = res;
  }

}
