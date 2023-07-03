import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { LogService } from './log.service';
import { HttpClient } from '@angular/common/http';
import { data } from 'src/app/api_data/api_data';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss', '../../../assets/animations/bubble.scss', '../../../assets/form.scss']
})
export class LogComponent implements AfterViewInit
{

  constructor(private logService: LogService, private httpClient: HttpClient){}

  canSend(loginForm: NgForm)
  {
    const result = this.logService.validation(loginForm);
    this.logService.sendLogForm(loginForm.value);
  }

  ngAfterViewInit(): void {

    //  <--- login ---->
    document.querySelector(".login").addEventListener("keyup", function () {
      if (this.value.length >= 5 && this.value.length <= 18) {
        document.querySelector(".icon-repeat-lock").classList.add("next");
      } else {
        document.querySelector(".icon-repeat-lock").classList.remove("next");
      }
    });

    document.querySelector(".next-button.login").addEventListener("click", function () {
      document.querySelector(".login-section").classList.add("fold-up");
      document.querySelector(".password-section").classList.remove("folded");
    });
    
    //  <--- password ---->
    document.querySelector(".password").addEventListener("keyup", function () {
      if (this.value.length >= 7 && this.value.length <= 24) {
        document.querySelector(".icon-lock").classList.add("next");
      } else {
        document.querySelector(".icon-lock").classList.remove("next");
      }
    });
  }

  @ViewChild("send")
  send: ElementRef | undefined;

  show()
  {
    this.send.nativeElement.classList.toggle("show");
  }

  @ViewChild("email")
  email: ElementRef | undefined;

  resetPass()
  {
    this.httpClient.post(data.url+"account/reset_password", JSON.stringify({email: this.email.nativeElement.value}), { headers: {"Content-Type": "application/json"}})
    .subscribe((e) => {

    });
  }
}