import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { data } from 'src/app/api_data/api_data';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class BasketComponent implements OnInit, OnDestroy
{
  protected stuff = [];
  protected numberOfStuff = 0;

  protected price: number = 0;
  protected showList: boolean = false;

  protected links: string[] = [];

  constructor(
    private httpClient: HttpClient,
    private changeDetRef: ChangeDetectorRef
  ){
  }

  @Input() set newStuff(value: any)
  {
    if(!value) return;
    if(this.stuff.find(
      (e) => {

        if(e.stuff._id == value._id)
        {
          this.price += value.price;
          this.price = Math.round(this.price * 100) / 100;
          
          const newPrice = e.stuff.price + e.stuff.price / e.amount;
          e.stuff.price = Math.round(newPrice * 100) / 100;

          e.amount++;
          return true;
        };
        return false;
      })
    ) return;

    const copy = JSON.parse(JSON.stringify(value));

    this.stuff.push({stuff: copy, amount: 1});
    this.numberOfStuff++;

    this.price += Math.round(value.price * 100) / 100;
    this.changeDetRef.detectChanges();
  }

  @Output() emiter: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void
  {
    const that = this;
    window.onbeforeunload = function()
    {
      localStorage.setItem("stuff", JSON.stringify({stuff: that.stuff, price: that.price, amount: that.numberOfStuff}));
    };

    let stuff = localStorage.getItem("stuff");
    if(!stuff) return;

    const json = JSON.parse(stuff);

    this.stuff = json.stuff;
    this.price = json.price;

    this.numberOfStuff = json.amount;
  }

  ngOnDestroy(): void
  {
    localStorage.setItem("stuff", JSON.stringify({stuff: this.stuff, price: this.price, amount: this.numberOfStuff}));
  }

  basketAction(action: string, id: string)
  {
    function removeFromStuff(key: number)
    {
      setTimeout(() => {
        this.stuff.splice(key, 1);
        this.numberOfStuff--;
        this.changeDetRef.detectChanges();
      }, 0);
    }

    action == "add"? this.stuff.find((e) => {
      if(e.stuff._id == id) {
        
        let newPrice = e.stuff.price + e.stuff.price / e.amount;
        e.stuff.price = Math.round(newPrice * 100) / 100;

        newPrice = e.stuff.price / (e.amount + 1);  
        newPrice = Math.round((this.price + newPrice) * 100) / 100;

        this.price = newPrice;
        e.amount++;
      }
    }):
    this.stuff.every((e, key) => {
      
      if(e.stuff._id == id)
      {

        let newPrice = this.price - e.stuff.price / e.amount;
        this.price = Math.round(newPrice * 100) / 100;

        newPrice = e.stuff.price - e.stuff.price / e.amount;
        e.stuff.price = Math.round(newPrice * 100) / 100;

        e.amount--;

        if(e.amount == 0){
          removeFromStuff.call(this, key);
          return false;
        };
      }

      return true;
    });

    this.changeDetRef.detectChanges();
  }

  shareBasket()
  {
    this.httpClient.post(data.url+"stuff/basket", this.stuff, {withCredentials: true, headers: {'Content-Type':'application/json'}})
    .subscribe((e: any) => {
      if(!e.error) this.emiter.emit(e);
    });
  }

  clearBasket()
  {
    this.stuff = [];
    this.numberOfStuff = 0;

    this.price = 0;
    this.changeDetRef.detectChanges();
  }

  toggleAction(arrow: any): void
  {
    this.showList = !this.showList;
    this.changeDetRef.detectChanges();

    this.showList? document.getElementById("arrow").classList.add("move"): document.getElementById("arrow").classList.remove("move");
  }
}