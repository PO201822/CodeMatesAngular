import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(private messageService: MessageService, private client: HttpClient) { }

  ngOnInit() {
    Promise.resolve(null).then(() => this.messageService.hideMessage());
  }

  doTest() {
    this.client.get("http://localhost:8080/auth/me").subscribe(console.log);
  }
}
