import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor(){
    this.thatYear = Number(new Date().getFullYear())
    this.thatMonth = new Date().getMonth() + 1;
  }

  thatYear: number;
  thatMonth: number;

  lineStatic: any = {
    
    label: null,
    fill: false,
    lineTension: 0.1,

    backgroundColor: 'rgba(75, 192, 192, 0.7)',
    borderColor: 'rgba(75, 192, 192, 1)',
    borderCapStyle: 'butt',

    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: 'miter',

    pointBorderColor: 'rgba(75,192,192,1)',
    pointBackgroundColor: '#fff',
    pointBorderWidth: 1,

    pointHoverRadius: 5,
    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
    pointHoverBorderColor: 'rgba(220,220,220,1)',

    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,

    options: {
      plugins: {
        backgroundColorRange: {
          color: 'red',
        }
      }
    },
  };

  lineChartData: any;
  lineChartLabels: Array<any> = [];

  year: string[] = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
  years: {} = {};

  setYear(price: {price: string, date: string})
  {
    const month = Number(price.date.split("-")[1]);
    const year = Number(price.date.split("-")[2]);

    if(!this.years[year]) this.years[year] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    if(Number(price.date.split("-")[2]) == this.thatYear ) this.years[year][month-1] += Number(price.price);
  }

  months: {} = {
    1: {days: [], values: []},
    2: {days: [], values: []},
    3: {days: [], values: []},
    4: {days: [], values: []},
    5: {days: [], values: []},
    6: {days: [], values: []},
    7: {days: [], values: []},
    8: {days: [], values: []},
    9: {days: [], values: []},
    10: {days: [], values: []},
    11: {days: [], values: []},
    12: {days: [], values: []}
  };

  label: string;
  labelPeriod: string;

  setChart(stuff, stuffHistory): void
  {
    const name: string = stuff.name || stuff.name;
    const store: string = stuff.store || stuff.store;

    this.label = "Historia ceny: "+name+", w sklepie: "+store+". ";
    this.labelPeriod = "Miesiąc: " + this.year[this.thatMonth - 1].toLowerCase();

    this.lineStatic.label = this.label + this.labelPeriod;

    this.months = {
      1: {days: [], values: []},
      2: {days: [], values: []},
      3: {days: [], values: []},
      4: {days: [], values: []},
      5: {days: [], values: []},
      6: {days: [], values: []},
      7: {days: [], values: []},
      8: {days: [], values: []},
      9: {days: [], values: []},
      10: {days: [], values: []},
      11: {days: [], values: []},
      12: {days: [], values: []}
    };

    for(let key in this.months)
    {
      const days = new Date(this.thatYear, Number(key), 0).getDate();

      for(let i=0; i<days; i++)
      {
        this.months[`${key}`].days.push(i+1);
        this.months[`${key}`].values.push(0);
      };
    };

    stuffHistory.price
    .every((e: {price: string, date: string}) => {
      const day = Number(e.date.split("-")[0]);
      const month = Number(e.date.split("-")[1]);
      const thatYear = Number(e.date.split("-")[2]);

      const daysInMonth = new Date(thatYear, month, 0).getDate();
      for(let i=1; i<=daysInMonth; i++)
      {
        if(thatYear != thatYear) continue;
        this.months[month].values[day-1] = Number(e.price);
      };

      this.setYear(e);
    });

    this.lineStatic.data = this.months[this.thatMonth].values;

    this.lineChartLabels = this.months[this.thatMonth].days;
    this.lineChartData = [this.lineStatic];
  }

  private currentPeriod: string;
  getChart(period: string): any
  {
    this.currentPeriod = period;
    period == "Month"? this.lineStatic.label = this.label + this.labelPeriod: this.lineStatic.label = this.label + "Rok: " + this.thatYear;

    let that;
    
    period == "Month"? [that = this.months[this.thatMonth].values, this.lineChartLabels = this.months[this.thatMonth].days, this.labelPeriod = "Miesiąc: " + this.year[this.thatMonth - 1].toLowerCase()]:
    [that = this.years[this.thatYear], this.lineChartLabels = this.year];

    this.lineStatic.data = that;
    this.lineStatic.label = this.label + this.labelPeriod;

    return [this.lineStatic];
  }

  public storyLabel = [];
  public storesHistoryYear = {};
  public storesHistoryMonth = {};

  setStoresLabel(history: []): void
  {
    const that = this;
    
    this.storesHistoryMonth = {};
    this.storesHistoryYear = {};

    function countPrice(price: [], key: number): void
    {
      let count: number = 1;
      console.log(price);

      price
      .forEach((e: {price: string, date: string}) => {
        const year = Number(e.date.split("-")[2]);
        const month = Number(e.date.split("-")[1]);

        if( !that.storesHistoryYear[year] ) that.storesHistoryYear[year] = [0];
        if( !that.storesHistoryMonth[month] ) that.storesHistoryMonth[month] = [0];

        if( !that.storesHistoryYear[year][key]) that.storesHistoryYear[year][key] = 0;
        if( !that.storesHistoryMonth[month][key] ) that.storesHistoryMonth[month][key] = 0;

        console.log(e.price);
        console.log( that.storesHistoryMonth[month][key])
        
        that.storesHistoryYear[year][key] += Number(e.price);
        that.storesHistoryMonth[month][key] += Number(e.price);

        that.storesHistoryYear[year][key] = that.storesHistoryYear[year][key] / count;
        that.storesHistoryMonth[month][key] = that.storesHistoryMonth[month][key] / count;

        that.storesHistoryYear[year][key] = Math.round(that.storesHistoryYear[year][key] * 100) / 100;
        that.storesHistoryMonth[month][key] = Math.round(that.storesHistoryMonth[month][key] * 100) / 100;

        console.log( that.storesHistoryMonth[month][key]);

        count++;
      });
    }

    this.storyLabel = [];

    history
    .forEach((e: any, key: number) => {
      this.storyLabel.push(e.store);
      countPrice(e.price, key)
    });

  }

  compareStoresPrice(period: string): any
  {
    this.currentPeriod = period;
    let that;

    period == 'Month'?
    this.thatMonth = Number(Object.keys(this.storesHistoryMonth)[Object.keys(this.storesHistoryMonth).length - 1]):
    this.thatYear = Number(Object.keys(this.storesHistoryYear)[Object.keys(this.storesHistoryYear).length - 1]);

    console.log(this.year);
    console.log(this.storesHistoryMonth);

    period == 'Month'?
    [that = "Miesiąc:", this.lineStatic.data = this.storesHistoryMonth[this.thatMonth], this.lineStatic.label = "Średnia cena produktu w sklepach. "+ that+ ` ${this.year[this.thatMonth - 1]}`]:
    [that = "roku", this.lineStatic.data = this.storesHistoryYear[this.thatYear], this.lineStatic.label = "Średnia cena produktu w sklepach. W "+ that+ ` ${this.thatYear}` ];

    this.lineChartLabels = this.storyLabel;
    return [this.lineStatic];
  }

  actionMonth(sentence: string, type: string): any
  {
    let data;
    let back;

    this.currentPeriod == "Year"?
    (() => {
      back = this.thatYear;
      this.thatYear = sentence == 'back'? this.thatYear - 1: this.thatYear + 1;

      type == "bar"?
      data = this[`storesHistory${this.currentPeriod}`][this.thatYear]: [this.lineChartLabels = this.year, data = this.years[this.thatYear]];
    })():
    (() => {
      back = this.thatMonth;
      this.thatMonth = sentence == 'back'? this.thatMonth - 1: this.thatMonth + 1;

      try
      {
        type == "bar"?
        data = this[`storesHistory${this.currentPeriod}`][this.thatMonth]: [this.lineChartLabels = this.months[this.thatMonth].days, data = this.months[this.thatMonth].values];
      }
      catch(err)
      {
        this.currentPeriod == "Year"? this.thatYear = back: this.thatMonth = back;
      }
    })();

    if(!data)
    {
      this.currentPeriod == "Year"? this.thatYear = back: this.thatMonth = back;
      return [this.lineStatic];
    };

    this.lineStatic.data = data;

    this.currentPeriod == "Year"? this.labelPeriod = "Rok: " + this.year[this.thatYear]: this.labelPeriod = "Miesiąc: " + this.year[this.thatMonth - 1].toLowerCase();
    this.lineStatic.label = this.label + this.labelPeriod;

    return [this.lineStatic];
  }
}
