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

  //  <--- wysyłanie formularza z nowym produktem ---->
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
      if(e.add) alert("Dodano produkt.");
    });
  }
}
