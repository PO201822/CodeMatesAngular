import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-courier-jobs',
  templateUrl: './courier-jobs.component.html'
})
export class CourierJobsComponent implements OnInit {

  jobs : any = null;

  constructor(
    private messageService : MessageService,
    private http: HttpClient
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
    console.log(res)
    this.jobs = res;
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
  }


}
