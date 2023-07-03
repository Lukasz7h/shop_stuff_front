import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { data } from 'src/app/api_data/api_data';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss', '../../../assets/animations/bubble.scss',]
})
export class ResetComponent {

  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private httpClient: HttpClient
  ){}

  password: string;

  resetPass()
  {
    const id: string = this.router.snapshot.paramMap.get("id");

    this.httpClient.post(data.url+"account/reset/new/"+id, JSON.stringify({password: this.password}), {headers: {"Content-Type": "application/json"}})
    .subscribe((e: {reset?: boolean, error?: string} ) => {

      if(e.reset){
        alert("Hasło zostało zresetowane.");
        this.route.navigate(['']);

        return;
      };

      alert(e.error);
    });
  }

}