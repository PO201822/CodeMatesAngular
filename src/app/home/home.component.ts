import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from '../services/error-handler.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  private role;

  constructor(
    private messageService: MessageService,
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
    ) { }

  ngOnInit() {
    Promise.resolve(null).then(() => this.messageService.hideMessage());
    this.getUserRole();
  }

  getUserRole(){
    let url = environment.apiUrl + '/getRole';
    this.http.get(url).subscribe(res => this.setRole(res),
      error => this.errorHandlerService.handleError(error)); { };
  }

  setRole(res) {
    this.role = res.role;
  }
}
