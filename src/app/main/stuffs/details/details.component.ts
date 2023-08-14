import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
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

    public detailsService: DetailsService,
    private changeDetRef: ChangeDetectorRef
  ){}

  @Input() lineChartData: any[];

  protected stuff;
  private stuffHistory;

  private history;

  protected lineChartLabels: Array<any> = [];
  protected lineChartOptions: any = {
    responsive: true
  };
  
  protected lineChartLegend = true;
  protected lineChartType: any = 'line';

  private inlinePlugin: any;
  private textPlugin: any;

  async ngOnInit(): Promise<void>
  {
    const id = this.router.snapshot.paramMap.get("id");

    await fetch(data.url+"stuff/"+id)
    .then((e) => {
      e.json()
      .then((result) => {

        this.stuff = result;
        this.getHistory()
      })
    });

  }

  //  <--- użytkownik zmienił okres wyświelany na wykresie ---->
  action(action: string): void
  {
    this.lineChartData = this.detailsService.actionPeriod(action, this.lineChartType);
    this.lineChartLabels = this.detailsService.lineChartLabels;
  }

  //  <--- żądanie które odbiera historie ceny danego produktu ---->
  async getHistory(): Promise<void>
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

  //  <--- zmiana okresu dla produktu (miesiąc, rok) ---->
  changePeriod(data: any): void
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

  comparePriceWithAnotherStores(period: string): void
  {
    this.lineChartData = this.detailsService.compareStoresPrice(period);
    this.lineChartLabels = this.detailsService.lineChartLabels;

    this.lineChartType = "bar";
    Chart.defaults.datasets.bar.maxBarThickness = 100;
  }

}