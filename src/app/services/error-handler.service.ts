import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private messageService: MessageService,
    private router: Router,
    private spinner : NgxSpinnerService
  ) {}

  handleError(error) {
    this.spinner.hide();
    this.messageService.hideMessage();
    if (error.status == 403) {
      this.router.navigate(["/unauthorized"]);
    }
    else {
      this.messageService.showMessage(error.error.message, "danger");
    }
  }

}
