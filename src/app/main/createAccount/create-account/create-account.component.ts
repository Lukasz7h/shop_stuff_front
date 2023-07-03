import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CreateAccountService } from './create-account.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss', '../../../../assets/animations/bubble.scss', '../../../../assets/form.scss']
})
export class CreateAccountComponent implements AfterViewInit
{
  formAccountRegister: FormGroup;

  constructor(private formBuilder: FormBuilder, private createAccountService: CreateAccountService){

    this.formAccountRegister = formBuilder.group({
      login: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(18) ]],
      password: ["", [Validators.required, Validators.minLength(7), Validators.maxLength(24) ]],
      email: ["", [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]]
    });
  }

  canSendForm()
  {

    if(!this.formAccountRegister.valid){
      this.createAccountService.showErrors(this.formAccountRegister);
      return;
    };

    this.createAccountService.sendRegisterForm(this.formAccountRegister);
  }


  ngAfterViewInit(): void {
    //  <--- email ---->

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    document.querySelector(".email").addEventListener("keyup", function () {
      
      if (this.value.match(emailRegex))
      {
        document.querySelector(".icon-paper-plane").classList.add("next");
      } else {
        document.querySelector(".icon-paper-plane").classList.remove("next");
      }
    });
    
    document.querySelector(".next-button.email").addEventListener("click", function () {

      document.querySelector(".email-section").classList.add("fold-up");
      document.querySelector(".login-section").classList.remove("folded");
    });

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
}
