import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { StuffsService } from '../stuffs.service';
import { data } from 'src/app/api_data/api_data';

import { DetailsService } from './details.service';
import { Chart } from "chart.js"

Chart.defaults.backgroundColor = 'red';
Chart.defaults.responsive = true;

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit
{
  constructor(
    private router: ActivatedRoute,
    private service: StuffsService,
    public detailsService: DetailsService
  ){}

  @Input() lineChartData: any[];

  stuff;
  stuffHistory;

  history;

  lineChartLabels: Array<any> = [];
  lineChartOptions: any = {
    responsive: true
  };
  
  lineChartLegend = true;
  lineChartType: any = 'line';

  inlinePlugin: any;
  textPlugin: any;

  action(action: string)
  {
    this.lineChartData = this.detailsService.actionMonth(action, this.lineChartType);
    this.lineChartLabels = this.detailsService.lineChartLabels;
  }

  async getHistory()
  {
    await fetch(data.url+"stuff/history/"+this.stuff.name)
    .then((e) => {

      e.json()
      .then((result) => {

        this.stuffHistory = result.filter((e: any) => (e.name == this.stuff.name && e.store == this.stuff.store))[0];
        this.detailsService.setChart(this.stuff, this.stuffHistory);

        this.detailsService.setStoresLabel(result);

        this.lineChartData = this.detailsService.lineChartData;
        this.lineChartLabels = this.detailsService.lineChartLabels;
      })
    });
  }

  changePeriod(data: any)
  {
    this.lineChartType = "line";

    switch(data.target.value)
    {
      case "year":
        this.lineChartData = this.detailsService.getChart("Year");
      break;
      case "month":
        this.lineChartData = this.detailsService.getChart("Month");
      break;
    }

    this.lineChartLabels = this.detailsService.lineChartLabels;
  }

  comparePriceWithAnotherStores(period: string)
  {
    this.lineChartData = this.detailsService.compareStoresPrice(period);
    this.lineChartLabels = this.detailsService.lineChartLabels;

    this.lineChartType = "bar";
    Chart.defaults.datasets.bar.maxBarThickness = 100;
  }

  async ngOnInit(): Promise<void>
  {
    const id = this.router.snapshot.paramMap.get("id");

    this.service.originStuffs.length > 0?
    [this.stuff = this.service.originStuffs.filter((e: any) => e._id == id)[0], this.getHistory()]:
    await fetch(data.url+"stuff/"+id)
    .then((e) => {
      e.json()
      .then((result) => {

        this.stuff = result.stuff;

        const name = this.stuff.name;
        const store = this.stuff.store;

        this.stuffHistory = result.history.filter((e) => (e.name == name && e.store == store) )[0];
        this.history = result.history;

        this.detailsService.setStoresLabel(result.history);
        this.detailsService.setChart(this.stuff, this.stuffHistory);

        this.lineChartData = this.detailsService.lineChartData;
        this.lineChartLabels = this.detailsService.lineChartLabels;
      })
    });

  }

}