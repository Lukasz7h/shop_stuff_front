import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { data } from 'src/app/api_data/api_data';
import { StuffsService } from './stuffs.service';

import { ClipboardService } from 'ngx-clipboard';
import { logos } from './images_path';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-stuffs',
  templateUrl: './stuffs.component.html',
  styleUrls: ['./stuffs.component.scss']
})
export class StuffsComponent implements OnInit
{
  purchase: boolean = false;
  storeList: string[] = [""];

  addThat: any;
  basketLinks: string[] = [];

  nameInput = new Subject();
  lastNumber: number;

  getLogo(name: string, id: number): string
  {
    console.log(name);

    this.lastNumber = id;
    return logos[`${name}`];
  }

  constructor(
    private httpClient: HttpClient,
    public stuffService: StuffsService,

    private clipboardService: ClipboardService
  ){}

  isset: boolean = false;

  ngOnInit(): void
  {
    if(this.stuffService.stuffs) this.isset = true;

    this.httpClient.get(data.url+"stuff/")
    .subscribe(this.setList.bind(this))

    const basket = localStorage.getItem("basketLinks");
    if(basket) this.basketLinks = JSON.parse(basket);
  }

  //  <--- pobrane prdukty są dodawane do listy która jest wyświetlana ---->
  setList(e: []): void
  {
    this.isset = true;
      
    e.forEach((element: any) => {
      if( !!!this.storeList.find((x => x == element.store)) ) this.storeList.push(element.store);
    });

    this.stuffService.originStuffs = e;
    this.stuffService.stuffs = e;
  }

  //  <--- filtry zostają wyczyszczone ---->
  clean(filterElement: HTMLElement): void
  {
    Array.from(filterElement.getElementsByTagName("input"))
    .forEach((e: HTMLInputElement) => {
      if(!e.parentElement.classList.contains("active")) e.parentElement.classList.remove("active");
      e.value = "";
    });
    
    this.stuffService.filterObj = {};
    this.stuffService.stuffs = this.stuffService.originStuffs;
  }

  actionStore(event: Event)
  {
    this.stuffService.filter(event);
  }

  //  <--- sortujemy produkty po cenie malejąco lub rosnąco ---->
  sort(action: string)
  {
    this.stuffService.stuffs = action == "ascending"?
    this.stuffService.stuffs.sort((a, b) => {
      return a.price - b.price;
    }):
    this.stuffService.stuffs.sort((a, b) => {
      return a.price - b.price;
    }).reverse();
  }

   //  <--- dodajemy nowy produkt do koszyka ---->
  addStuff(data): void
  {
    this.addThat = data;
    
    setTimeout(() => {
      this.addThat = undefined;
    }, 0);
  }

  //  <--- tworzymy nowy link do utworzonego koszyka ---->
  newBasket(data: {url: string}): void
  {
    this.basketLinks.push(data.url);
    localStorage.setItem("basketLinks", JSON.stringify(this.basketLinks));
  }

  //  <--- usuwamy link do wybranego koszyka ---->
  deleteLink(e: string): void
  {
    this.basketLinks.splice( this.basketLinks.indexOf(e), 1);
    localStorage.setItem("basketLinks", JSON.stringify(this.basketLinks));
  }

  purchaseMode(): void
  {
    this.purchase = !this.purchase;
  }

  copy(text: string): void
  {
    this.clipboardService.copy(text);
  }

  filter(e: any): void
  {
    this.stuffService.filter(e);
  }
}