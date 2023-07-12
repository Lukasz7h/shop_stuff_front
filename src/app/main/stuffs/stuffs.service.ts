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

    const arr = Object.keys({
      protein: 0,
      carb: 0,
  
      fat: 0,
      fiber: 0,

      kcal: 0
    });

    this.stuffs = this.originStuffs.filter((e: any) => {
      
      let flag: boolean = true;

      if(!this.filterObj.name || (this.filterObj.name && e.name.includes(`${this.filterObj.name}`)))
      {
        if(this.filterObj.store && (!e.store.includes(`${this.filterObj.store}`))) flag = false;

        if(!this.filterObj.price || (this.filterObj.price && e.price < this.filterObj.price))
        {
          for(let i=0; i<arr.length; i++)
          {
            console.log(this.filterObj);
            console.log(arr[i]);

            console.log(this.filterObj[arr[i]]);
            console.log(e);
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