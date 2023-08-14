import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { data } from 'src/app/api_data/api_data';
import { StuffsService } from './stuffs.service';

import { ClipboardService } from 'ngx-clipboard';

import { Subject } from 'rxjs';
import { Socket } from 'ngx-socket-io';

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
  lastNumber: number = 1;

  isset: boolean = false;
  stuffSocketList: any[] = [];

  logos = {
    Abc: 'assets/images/abc.png',
    Aldi: 'assets/images/aldi.svg.png',
    Auchan: 'assets/images/auchan.png',
    Biedronka: 'assets/images/biedronka.jpg',
    Carrefour: 'assets/images/Carrefour_logo.svg.png',
    Delikatesy: 'assets/images/delikatesy-centrum.svg',
    Dino: 'assets/images/dino.png',
    'E.leclerc': 'assets/images/E.Leclerc.svg.png',
    Groszek: 'assets/images/dino.png',
    Intermarche: 'assets/images/intermarche.svg.png',
    Kaufland: 'assets/images/kaufland.png',
    Lewiatan: 'assets/images/lewiatan.svg',
    Lidl: 'assets/images/lidl.png',
    Netto: 'assets/images/netto.png',
    'Piotr i Paweł': 'assets/images/Piotr_i_Paweł.png',
    Stokrotka: 'assets/images/stokrotka.png',
    Tesco: 'assets/images/tesco.jpg',
    'Żabka': 'assets/images/żabka.svg.png'
  };

  constructor(
    private httpClient: HttpClient,
    public stuffService: StuffsService,

    private clipboardService: ClipboardService,
    private socket: Socket
  ){}

  

  ngOnInit(): void
  {
    this.socket.emit("message", {number: this.lastNumber});
    this.socket.on("stream", this.handleStuff.bind(this));

    if(this.stuffService.stuffs) this.isset = true;

    const basket = localStorage.getItem("basketLinks");
    if(basket) this.basketLinks = JSON.parse(basket);
  }

  //  <--- metoda do której przychodzą produkty z websocketa ---->
  handleStuff(e: any)
  {
    console.log(e);
    this.setList(e);
  }

  //  <--- pobrane prdukty są dodawane do listy która jest wyświetlana ---->
  setList(e: any): void
  {
    this.isset = true;
    if( !!!this.storeList.find((x => x == e.store)) ) this.storeList.push(e.store);

    this.stuffService.originStuffs.push(e);
    this.stuffService.stuffs.push(e);
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