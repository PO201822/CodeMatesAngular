import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private messageService: MessageService,
    private router: Router) { }

  handleError(error) {
    this.messageService.hideMessage();
    if (error.status == 403) {
      this.router.navigate(["/unauthorized"]);
    }
    else {
      this.messageService.showMessage(error.message, "danger");
    }
  }
  
}
