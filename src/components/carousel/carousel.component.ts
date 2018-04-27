import { Component, OnInit } from '@angular/core';
import { NgxCarousel, NgxCarouselStore } from 'ngx-carousel';

import { AnalyticsService } from '../../core/analytics';


@Component({
    selector: 'beam-carousel',
    templateUrl: 'carousel.component.html',
    styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

    public carouselBanner: NgxCarousel;
    public carouselTileItems;

    constructor(private analyticsService: AnalyticsService) {}

    ngOnInit() {

        this.carouselTileItems = [
            {
                title: 'Tree Energy Project',
                body: `Revitalize this land by planting hardy non-GMO Pongamia trees, whic
                       are native to Polynesia, can withstand harsh conditions other plants
                       can't, such as soil salinity and low water levels, and produce seeds
                       that yield nearly 10 times more oil per acre than soybeans`,
                src: '../assets/projects/tree-energy.jpg'
            },
            {
                title: 'Solar roadways',
                body: `Imagine driving on roads constructed not of tar but solar panels able
                       to withstand the weight of the heaviest of vehicles. Not only could a
                       nationwide system of solar roadways collect enough energy to power the
                       entire country, people could charge electric vehicles on driveways and`,
                src: '../assets/projects/solar.jpg'
            },
            {
                title: 'Solar bee farms',
                body: `A handful of bee farms in Red Bluff, Calif., are not only providing
                       habitat for bees that pollinate local crops, they're also home to
                       thousands of solar panels impervious to the flying creatures. Pacific
                       Gas and Electric is buying the solar energy through a 20-year agreement`,
                src: '../assets/projects/bees.jpg'
            }
        ];


        this.carouselBanner = {
            grid: {xs: 1, sm: 1, md: 1, lg: 1, all: 0},
            slide: 1,
            speed: 400,
            interval: 6000000,
            point: {
                visible: true,
                pointStyles: `
                    .ngxcarouselPoint {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }
                    @media only screen and (min-width: 700px) {
                        .ngxcarouselPoint {
                            padding-bottom: 0px;
                            padding-right: 20.5%;
                            text-align: right;
                            position: relative;
                            top: -35px;
                            margin-bottom: -50px;
                        }
                     }
                    @media only screen and (min-width: 790px) {
                        .ngxcarouselPoint {
                            top: -60px;
                        }
                    }
                    .ngxcarouselPoint li {
                        display: inline-block;
                        background: #6ec496;
                        border-radius: 999px;
                        padding: 5px;
                        margin: 0 3px;
                        transition: .4s ease all;
                    }
                    .ngxcarouselPoint li.active {
                        border: 2px solid white;
                        top: 2px;
                        position: relative;
                        margin: 0 1px;
                    }
                    @media only screen and (min-width: 1000px) {
                        .ngxcarouselPoint {
                            padding-right: 25.5%;
                        }
                    }
                `
            },
            load: 2,
            loop: true,
            touch: true
        };
    }

    /* This will be triggered after carousel viewed */
    afterCarouselViewedFn(data) {
        // console.log(data);
    }

    /* It will be triggered on every slide */
    onmoveFn(data: NgxCarouselStore) {
        this.analyticsService.emitEvent('Home', 'Move', 'Carousel Slide', data.currentSlide);
    }

}
