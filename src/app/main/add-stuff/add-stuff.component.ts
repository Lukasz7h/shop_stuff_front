import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AddStuffService } from './add-stuff.service';

@Component({
  selector: 'app-add-stuff',
  templateUrl: './add-stuff.component.html',
  styleUrls: ['./add-stuff.component.scss']
})
export class AddStuffComponent
{
  constructor(
    private addStuffService: AddStuffService
  ){}

  fileComposition: File;
  fileStuff: File;

  fileIngredients: File;

  @ViewChild("notice")
  private noticeElement: ElementRef | undefined;

  protected filesStuff: File[] = [];
  protected filesOfNutrition: File[] = [];

  protected filesOfIngredients: File[] = [];

  protected stores: string[] = ["Biedronka", "Lidl", "Carrefour", "Dino", "Kaufland", "Auchan", "Stokrotka", "Żabka", "Netto", "Aldi", "Lewiatan", "Intermarche", "Groszek", "ABC", "Delikatesy Centrum", "E.Leclerc"]

  send(stuffForm: NgForm)
  {
    this.fileComposition = this.filesOfNutrition[0];
    this.fileStuff = this.filesStuff[0];

    this.fileIngredients = this.filesOfIngredients[0];

    const result = {
      name: this.addStuffService.nameValid(stuffForm.value['name']),
      price: this.addStuffService.priceValid(stuffForm.value['price']),

      fileComposition: this.addStuffService.hasFile(this.fileComposition),
      fileStuff: this.addStuffService.hasFile(this.fileStuff),

      fileIngredients: this.addStuffService.hasFile(this.fileIngredients),
      store: this.addStuffService.nameValid(stuffForm.value['store'])
    };

    this.addStuffService.store = stuffForm.value['store'];
    this.addStuffService.fileStuff = this.fileStuff;

    if(result.name && result.price && result.fileComposition && this.fileStuff && result.store) this.addStuffService
    .sendForm(
      {
        name: stuffForm.value['name'],
        price: stuffForm.value['price'],
        file: this.fileComposition,
        image: this.fileStuff,
        fileIngredients: this.fileIngredients,
        store: stuffForm.value['store']
      }
    );
  }

  onSelect(event, arr): void
  {
    arr.splice(arr.indexOf(event), 1, ...event.addedFiles);
  }

  onRemove(event, arr): void
  {
    arr.splice(arr.indexOf(event), 1);
  }

}