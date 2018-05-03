import { Component, HostListener, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { AuthService } from '../../factories/auth.service';
import * as Constants from '../../core/constants';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    animations: [
        trigger('raiseHex', [
            state('up', style({ top: '-6px', 'box-shadow': '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)' })),
            state('down', style({ top: '0px', 'box-shadow': 'none' })),
            transition('* => *', animate('500ms ease-out'))
        ]),
        trigger('raiseHexOffset', [
            state('up', style({ top: '94px', 'box-shadow': '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)' })),
            state('down', style({ top: '100px', 'box-shadow': 'none' })),
            transition('* => *', animate('500ms ease-out'))
        ])
    ]
})


export class HomeComponent {

    public hexCountNorm: string[] = Array(8).fill('down');
    public hexCountOffset: string[] = Array(8).fill('down');
    private scollNum = 0;

    public bgPosY = '0px';

    private newsData = Constants.newsData;
    private classes = Constants.classes;


    constructor() {}


    @HostListener('window:scroll', [])
    onWindowScroll() {

        const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        const check = Math.floor(number / 250);
        if (check !== this.scollNum) {
            this.scollNum = check;
            this.hexCountNorm = Array(8).fill('down');
            this.hexCountOffset = Array(8).fill('down');
            const randNorm = Math.floor(Math.random() * 8);
            const randOff = Math.floor(Math.random() * 8);
            this.hexCountNorm[randNorm] = 'up';
            this.hexCountOffset[randOff] = 'up';
        }

        this.bgPosY = -(number / 3) + 'px';

    }
}
