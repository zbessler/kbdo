import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { helpData } from '../../core/constants';



@Component({
    templateUrl: './help.component.html',
    styleUrls: ['./help.component.scss'],
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
        ])
    ]
})
export class HelpComponent implements AfterViewInit, OnInit {

    public state = {};
    private fragment: string;
    public helpData = helpData;


    constructor(
        private _location: Location,
        private route: ActivatedRoute
    ) {
        for (let i = 0; i < this.helpData.length; i++) {
            this.state[this.helpData[i].url] = 'closed';
        }
    }

    public ngOnInit(): void {
        this.route.fragment.subscribe(fragment => {
            this.fragment = fragment;
            this.openAccordion(fragment);
        });
    }
    public ngAfterViewInit(): void {
        try {
            document.querySelector('#' + this.fragment).scrollIntoView();
        } catch (e) { }
    }

    public openAccordion(index) {
        this.state[index] = (this.state[index] === 'closed' ? 'open' : 'closed');
    }


    public back(): void {
        this._location.back();
    }
}
