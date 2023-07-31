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

  @ViewChild("notice")
  noticeElement: ElementRef | undefined;

  filesStuff: File[] = [];
  filesOfNutrition: File[] = [];

  stores: string[] = ["Biedronka", "Lidl", "Carrefour", "Dino", "Kaufland", "Auchan", "Stokrotka", "Żabka", "Netto", "Aldi", "Lewiatan", "Intermarche", "Groszek", "ABC", "Delikatesy Centrum", "E.Leclerc"]

  send(stuffForm: NgForm)
  {
    this.fileComposition = this.filesOfNutrition[0];
    this.fileStuff = this.filesStuff[0];

    const result = {
      name: this.addStuffService.nameValid(stuffForm.value['name']),
      price: this.addStuffService.priceValid(stuffForm.value['price']),

      fileComposition: this.addStuffService.hasFile(this.fileComposition),
      fileStuff: this.addStuffService.hasFile(this.fileStuff),

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
        store: stuffForm.value['store']
      }
    );
  }

  onSelect(event, id: number): void
  {
    id == 1?
    this.filesStuff.splice(this.filesStuff.indexOf(event), 1, ...event.addedFiles):
    this.filesOfNutrition.splice(this.filesOfNutrition.indexOf(event), 1, ...event.addedFiles);
  }

  onRemove(event, id: number): void
  {
    id == 1?
    this.filesStuff.splice(this.filesStuff.indexOf(event), 1):
    this.filesOfNutrition.splice(this.filesOfNutrition.indexOf(event), 1);
  }

}