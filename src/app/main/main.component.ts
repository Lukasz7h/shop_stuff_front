import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ActivatedRoute } from '@angular/router';
import { data } from '../api_data/api_data';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  template: ``
})
export class MainComponent implements OnInit
{
  constructor(
    private httpClient: HttpClient,
    private router: ActivatedRoute
  ){}

  ngOnInit(): void {
    const token = new URLSearchParams(window.location.search).get("token");
    if(token) this.httpClient.get(data.url+"veryfi/"+token).subscribe()
  }

}
