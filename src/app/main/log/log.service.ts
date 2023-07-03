import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { data } from 'src/app/api_data/api_data';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  
  constructor(private httpClient: HttpClient, private router: Router){}

  validation(loginForm: NgForm): boolean | any
  {
    const errors = {login: "", password: ""};

    const valid = {
      login: {
        fun: (sentence: string) => {
          if( !(sentence.length >= 5 && sentence.length <= 18) ) errors.login = "Login powinien mieć od 5 do 18 znaków.";
        }
      },
      password: {
        fun: (sentence: string) => {
          if( !(sentence.length >= 7 && sentence.length <= 24)) errors.password = "Hasło powinien mieć od 7 do 24 znaków.";
        }
      }
    };

    valid.login.fun(loginForm.value['login']);
    valid.password.fun(loginForm.value['password']);

    return errors.login.length > 0 || errors.password.length? errors: true;
  }

  showErrors(element: {login: HTMLElement, password: HTMLElement}, errors: any)
  {
    if(errors.login && !(element.login.nextSibling instanceof HTMLParagraphElement) ) element.login.insertAdjacentHTML("afterend", `<p>${errors.login}</p>`);
    if(errors.password && !(element.password.nextSibling instanceof HTMLParagraphElement)) element.password.insertAdjacentHTML("afterend", `<p>${errors.password}</p>`);
  }

  sendLogForm(formValues: {login: string, password: string})
  {
    this.httpClient.post(data.url+"log/",
      JSON.stringify(formValues),
      {
        withCredentials: true, headers: {"Content-Type": "application/json"}
      }
    )
    .subscribe((e: {log: boolean} | any) => {
      if(e.log){
        document.querySelector('.password-section').classList.add("fold-up");

        setTimeout(() => {
         document.querySelector(".success")['style']['marginTop'] = "0px";

         setTimeout(() => {
          this.router.navigate(['']);
         }, 1350);
        }, 250);
        
       }
       else{
        alert("Podano błędne dane.")
       }
    });
  }
}