import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { data } from 'src/app/api_data/api_data';

import { setNav, setMap } from "../../../../../../src/map.js";

@Component({
  selector: 'app-basket-details',
  templateUrl: './basket-details.component.html',
  styleUrls: ['./basket-details.component.scss']
})
export class BasketDetailsComponent implements OnInit, AfterViewInit
{
  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute
  ){}

  basket: any[];
  totalPrice: number = 0;

  shop: string;
  sameShop: boolean = true;

  setCanvas()
  {
    var canvas: any = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    //canvas dimensions
    var W = window.innerWidth;
    var H = window.innerHeight;

    canvas.width = W;
    canvas.height = H;

    //snowflake particles
    var mp = 100; //max particles
    var particles = [];
    for (var i = 0; i < mp; i++) {
        particles.push({
            x: Math.random() * W, //x-coordinate
            y: Math.random() * H, //y-coordinate
            r: Math.random() * 15 + 1, //radius
            d: Math.random() * mp, //density
            color: "#4387ec",
            tilt: Math.floor(Math.random() * 5) - 5
        });
    }

    //Lets draw the flakes
    function draw() {
        ctx.clearRect(0, 0, W, H);

        for (var i = 0; i < mp; i++) {
            var p = particles[i];
            ctx.beginPath();

            ctx.lineWidth = p.r;
            ctx.strokeStyle = p.color;

            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x + p.tilt + p.r / 3, p.y + p.tilt);
            ctx.stroke();
        }

        update();
    }

    var angle = 0;

    function update() {
        angle += 0.001;
        for (var i = 0; i < mp; i++) {
            var p = particles[i];

            p.y += Math.cos(angle + p.d) + 1 + p.r / 20;
            p.x += Math.sin(angle) * 2;

            if (p.x > W + 5 || p.x < -5 || p.y > H) {
                if (i % 3 > 0)
                {
                    particles[i] = {
                        x: Math.random() * W,
                        y: -1,
                        r: p.r,
                        d: p.d,
                        color: p.color,
                        tilt: p.tilt
                    };
                } else {
                    if (Math.sin(angle) > 0) {
                        particles[i] = {
                            x: -5,
                            y: Math.random() * H,
                            r: p.r,
                            d: p.d,
                            color: p.color,
                            tilt: p.tilt
                        };
                    }
                    else {
                        particles[i] = {
                            x: W + 5,
                            y: Math.random() * H,
                            r: p.r,
                            d: p.d,
                            color: p.color,
                            tilt: p.tilt
                        };
                    }
                }
            }
        }
    }

    setInterval(draw, 30);
  }

  ngOnInit(): void
  {
    const id: string = this.route.snapshot.paramMap.get("id");

    this.httpClient.get(data.url+"stuff/basket/"+id)
    .subscribe((e: any) => {

      if(e.error) return;
      this.basket = e;

      this.basket.forEach((element) => {
        if(this.shop && this.shop !== element.stuff.store) this.sameShop = false;
        if(!this.shop) this.shop = element.stuff.store;
        this.totalPrice += element.stuff.price;
      });

      setMap();
      this.sameShop? setNav(this.shop): setNav(false);
    });
  }

  ngAfterViewInit(): void
  {
    this.setCanvas();
  }
}