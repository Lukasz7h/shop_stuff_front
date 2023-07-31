import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StuffsService {

  constructor() { }

  originStuffs: {
    name: string,
    price: number,

    carb: number,
    fat: number,

    protein: number,
    fiber: number,

    kcal: number,
    unit: string
  }[] = [];

  stuffs: any[];

  filterObj: {
    name: string,
    price: number,

    protein: number,
    carb: number,

    fat: number,
    fiber: number
  } | any = {}

  filter(e: Event)
  {
    const value = isNaN(e.target['value'])? e.target['value']: Number(e.target['value']);
    this.filterObj[`${e.target['name']}`] = value;

    if(!value && e.target['parentElement'].classList.contains("active"))
    {
      e.target['parentElement'].classList.remove("active");
      e.target['value'] = "";
      return;
    };

    const arr = Object.keys({
      protein: 0,
      carb: 0,
  
      fat: 0,
      fiber: 0,

      kcal: 0
    });

    if(!e.target['parentElement'].classList.contains("active")) e.target['parentElement'].classList.add("active");
    this.stuffs = this.originStuffs.filter((e: any) => {
      
      let flag: boolean = true;
      

      if(!this.filterObj.name || (this.filterObj.name && e.name.toLowerCase().includes(`${this.filterObj.name.toLowerCase()}`)))
      {
        if(this.filterObj.store && (!e.store.includes(`${this.filterObj.store}`))) flag = false;

        if(!this.filterObj.price || (this.filterObj.price && e.price < this.filterObj.price))
        {
          for(let i=0; i<arr.length; i++)
          {
            if(this.filterObj[arr[i]] && e.values[`${arr[i]}`].value < this.filterObj[arr[i]]) flag = false;
          }
        }
        else if(this.filterObj.price && e.price > this.filterObj.price)
        {
          flag = false;
        }
        
      }
      else
      {
        flag = false;
      };

      if(flag) return e;
    });


  }

}