import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { data } from 'src/app/api_data/api_data';

@Injectable({
  providedIn: 'root'
})
export class AddStuffService {

  constructor(
    private httpClient: HttpClient
  ){}

  store: string;
  fileStuff;

  nameValid(name: string)
  {
    return name.length > 3 && name.length < 45;
  }

  priceValid(price: number)
  {
    if(isNaN(price)) return false;
    price = Number(price);

    return price > 0 && price < 4500;
  }

  hasFile(file: any)
  {
    return file instanceof File;
  }

  showErr(noticeElement: HTMLElement)
  {

  }

  setValue(noticeElement: HTMLElement, value: any, name: string, price: number): any
  {
    const newValue = {
      nutritional: {},
      other: {}
    };

    Array.from(noticeElement.getElementsByClassName("stuff"))
    .every((e: HTMLElement) => {

      const thatValue = Number(e.getElementsByTagName("span").item(0).textContent);
      const name = e.getAttribute("name");

      if(isNaN(thatValue)){
        this.showErr(noticeElement);
        return false;
      };

      value.nutritional[`${name}`]? [
        Object.defineProperty(newValue.nutritional, `${name}`, {value: {task: value.nutritional[`${name}`].task}, enumerable: true}),
        newValue.nutritional[`${name}`].value = thatValue
      ]:
      [
        Object.defineProperty(newValue.other, `${name}`, {value: {task: value.other[`${name}`].task}, enumerable: true}),
        newValue.other[`${name}`].value = thatValue
      ];

      return true;
    });

    Object.defineProperty(newValue.other, "store", {value: this.store, enumerable: true});
    Object.defineProperty(newValue.other, "name", {value: {value: name}, enumerable: true});
    Object.defineProperty(newValue.other, "price", {value: {value: price}, enumerable: true});

    let valueString = "{";

    for(let key in newValue)
    {
      const currentObj = newValue[`${key}`];
      const arr = Object.keys(currentObj);

      valueString += `"${key}": {`

      arr.forEach((e, key) => {
        valueString += `"${e}": `+JSON.stringify(currentObj[`${e}`]);
        if(key !== arr.length - 1) valueString += ", "
      });

      valueString += "}";
      if(key == "nutritional") valueString += ", ";
    };

    valueString += "}";
    return valueString;
  }

  sendForm({name, price, file, image, store})
  {
    const form = new FormData();
    form.append("name", name);

    form.append("price", price);
    form.append("file", file, file.name);

    form.append("image", image, image.name);
    form.append("store", store);

    this.httpClient.post(data.url+"stuff/add",
      form,
      {withCredentials: true}
    )
    .subscribe((e: any) => {
      console.log(e);
    });
  }
}
