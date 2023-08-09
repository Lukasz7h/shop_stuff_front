import { Injectable } from '@angular/core';

interface StuffType{
    _id: string;
    store: string;
    
    values: any;

    name: string,
    price: number,

    carb: number,
    fat: number,

    protein: number,
    fiber: number,

    kcal?: number,
    unit?: string
};

@Injectable({
  providedIn: 'root'
})
export class StuffsService {

  constructor(){}

  originStuffs: StuffType[] = [];

  stuffs: StuffType[];
  filterObj: StuffType | any = {}

  //  <--- filtrowanie tablicy produktów na podstawie wprowadzonych danych ---->
  filter(e: Event)
  {
    const value = isNaN(e.target['value'])? e.target['value']: Number(e.target['value']);
    this.filterObj[`${e.target['name']}`] = value;

    if(!value && e.target['parentElement'].classList.contains("active"))
    {
      e.target['parentElement'].classList.remove("active");
      e.target['value'] = "";

      this.stuffs = this.originStuffs;
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
    this.stuffs = this.originStuffs.filter(checkPropertiesOfStuff);

    // filtrujemy nasze produkty
    function checkPropertiesOfStuff(e: any)
    {
      let flag: boolean = true;

      const stuffProperties = {
              //Filter nie posiadaja nazwy || (posiada nazwe && aktualnie sprawdzany obj posiada tą samą nazwe)
        isName: !this.filterObj.name || (this.filterObj.name && e.name.toLowerCase().includes(`${this.filterObj.name.toLowerCase()}`)),

               //Filter posiada nazwe sklepu && wartość aktalnie sprawdzanego obj się z tą nazwą nie zgadza
        isStore: this.filterObj.store && (!e.store.includes(`${this.filterObj.store}`)),

               //Filter nie posiada ustalonej ceny || (posiada cene && cena aktualnego obj jest mniejsza niż ta ustalona)
        isPrice: !this.filterObj.price || (this.filterObj.price && e.price < this.filterObj.price),

               //Filter posiada aktualnie sprawdzaną właściwość && wartość aktualnie sprawdzanego obj jest mniejsza niż ta z filtra
        isValue: (i: number) => this.filterObj[arr[i]] && e.values[`${arr[i]}`].value < this.filterObj[arr[i]]
      };


      if(stuffProperties.isName)
      {
        if(stuffProperties.isStore) flag = false;

        if(stuffProperties.isPrice && flag)
        {
          for(let i=0; i<arr.length; i++)
          {
            if(stuffProperties.isValue(i)) flag = false;
          };
        }
        else
        {
          flag = false;
        };

        if(flag) return e;
      };

    }
  }

}