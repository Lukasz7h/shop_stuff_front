import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { data } from 'src/app/api_data/api_data';
import { StuffsService } from './stuffs.service';

import { ClipboardService } from 'ngx-clipboard';
import { logos } from './images_path';

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

  lastNumber: number;
  getLogo(name: string, id: number): string
  {
    if(this.lastNumber && this.lastNumber > id ) this.changeDetRef.detach();

    this.lastNumber = id;
    return logos[`${name}`];
  }

  constructor(
    private httpClient: HttpClient,
    public stuffService: StuffsService,

    private changeDetRef: ChangeDetectorRef,
    private clipboardService: ClipboardService
  ){}

  ngOnInit(): void
  {

    this.httpClient.get(data.url+"stuff/")
    .subscribe((e: []) => {
      
      e.forEach((element: any) => {
        if( !!!this.storeList.find((x => x == element.store)) ) this.storeList.push(element.store);
      });

      this.stuffService.originStuffs = e;
      this.stuffService.stuffs = e;
    })

    const basket = localStorage.getItem("basketLinks");
    if(basket) this.basketLinks = JSON.parse(basket);
  }

  clean(filterElement: HTMLElement)
  {
    Array.from(filterElement.getElementsByTagName("input"))
    .forEach((e: HTMLInputElement) => {
      if(!e.parentElement.classList.contains("active")) e.parentElement.classList.remove("active");
      e.value = "";
    });
    
    this.stuffService.filterObj = {};
  }

  actionStore(event: Event)
  {
    this.stuffService.filter(event);
    this.changeDetRef.detectChanges();
  }

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

  addStuff(data)
  {
    this.addThat = data;
    this.changeDetRef.detectChanges();
    
    setTimeout(() => {
      this.addThat = undefined;
      this.changeDetRef.detectChanges();
    }, 0);
  }

  newBasket(data: {url: string})
  {
    this.basketLinks.push(data.url);
    localStorage.setItem("basketLinks", JSON.stringify(this.basketLinks));

    this.changeDetRef.detectChanges();
  }

  deleteLink(e: string)
  {
    this.basketLinks.splice( this.basketLinks.indexOf(e), 1);
    localStorage.setItem("basketLinks", JSON.stringify(this.basketLinks));

    this.changeDetRef.detectChanges();
  }

  purchaseMode()
  {
    this.purchase = !this.purchase;
    this.changeDetRef.detectChanges();
  }

  copy(text: string)
  {
    this.clipboardService.copy(text);
  }

  filter(e: Event)
  {
    this.stuffService.filter(e);
    this.changeDetRef.detectChanges();
  }
}