import { Component, HostListener, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { fill as lofill } from 'lodash/fill';

import { AuthService } from '../../factories/auth.service';
import * as Constants from '../../core/constants';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    animations: [
        trigger('rotatedState', [
            state('closed', style({ transform: 'rotate(0)' })),
            state('open', style({ transform: 'rotate(90deg)' })),
            transition('closed => open', animate('200ms linear')),
            transition('open => closed', animate('200ms linear'))
        ]),
        trigger('openState', [
            state('closed', style({ height: '0px', padding: '0px 20px' })),
            state('open', style({ height: 'fit-content', padding: '20px' })),
            transition('closed => open', animate('200ms ease-out')),
            transition('open => closed', animate('200ms ease-in'))
        ]),
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

    public fundingYear = 2005;
    public fundingAmount = 730;

    public hexCountNorm: string[] = Array(8).fill('down');
    public hexCountOffset: string[] = Array(8).fill('down');
    private scollNum = 0;

    public bgPosY = '0px';

    public fundingFontSize = '60px';

    public sendBtnText = 'Submit';
    public happySelected = false;
    public sadSelected = false;

    private newsData = Constants.newsData;


    constructor() {}

    public clickEarth(val) {
        if (val) {
            this.happySelected = true;
            this.sadSelected = false;
        } else {
            this.sadSelected = true;
            this.happySelected = false;
        }

    }

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
