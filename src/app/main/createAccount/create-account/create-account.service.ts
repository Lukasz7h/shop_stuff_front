import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { data } from 'src/app/api_data/api_data';

@Injectable({
  providedIn: 'root'
})
export class CreateAccountService
{
  constructor(private httpClient: HttpClient){}

  inpLogin: HTMLElement;
  inpPassword: HTMLElement;
  inpEmail: HTMLElement;

  showErrors(registerForm: FormGroup): void
  {

    // wyświetlanie informacji o błędzie
    function addError(text: string): void
    {
      const newParagraph = document.createElement("p");

      newParagraph.textContent = text;
      document.getElementsByTagName("form").item(0).insertAdjacentElement("afterend", newParagraph);
    };

    // która z wartości jest niepoprawna
    if(registerForm.controls['login'].validator(registerForm.get("login")) != null) addError("Login powinien mieć od 5 do 18 znaków.");
    if(registerForm.controls['password'].validator(registerForm.get("password")) != null) addError("Hasło powinien mieć od 7 do 24 znaków.");
    if(registerForm.controls['email'].validator(registerForm.get("email")) != null) addError("Podano niepoprawny email.");
  }

  //  <--- wysyłanie formularza z rejestracją ---->
  sendRegisterForm(registerForm: FormGroup)
  {
    const login = registerForm.get("login").value;
    const password = registerForm.get("password").value;
    const email = registerForm.get("email").value;

    this.httpClient.post(data.url+"account/register", JSON.stringify({login, password, email}), {headers: {"Content-Type": "application/json"}})
    .subscribe((data: {register: boolean} | any) => {
      if(data.register){
         document.querySelector('.password-section').classList.add("fold-up");

         setTimeout(() => {
          document.querySelector(".success")['style']['marginTop'] = "0px";
         }, 250);
         
        }
        else{
          alert(data.errors[0]);
        }
    });
  }
}