import { Component, HostListener, Input, AfterViewInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';


import { AuthService } from '../../factories/auth.service';
import { ClassData } from '../../core/constants';
import * as from '../../core/constants';

@Component({
    selector: 'beam-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.scss'],
    animations: [
        trigger('rotatedRight', [
            state('closed', style({ transform: 'rotate(0)' })),
            state('open', style({ transform: 'rotate(-45deg) translate(-5px, 5px)' })),
            transition('open => closed', animate('200ms ease-out')),
            transition('closed => open', animate('200ms ease-in'))
        ]),
        trigger('rotatedLeft', [
            state('closed', style({ transform: 'rotate(0)' })),
            state('open', style({ transform: 'rotate(45deg) translate(-5px, -5px)' })),
            transition('open => closed', animate('200ms ease-out')),
            transition('closed => open', animate('200ms ease-in'))
        ]),
        trigger('rotatedMiddle', [
            state('closed', style({ transform: 'rotate(0)', opacity: 1 })),
            state('open', style({ transform: 'rotate(45deg)', opacity: 0 })),
            transition('open => closed', animate('200ms ease-out')),
            transition('closed => open', animate('200ms ease-in'))
        ]),
        trigger('showMenu', [
            state('closed', style({ visibility: 'hidden', height: 0, transform: 'translateY(-2em)', opacity: 0 })),
            state('open', style({ visibility: 'visible', height: 'auto', transform: 'translateY(0)', opacity: .92 })),
            transition('open => closed', animate('200ms ease-out')),
            transition('closed => open', animate('200ms ease-in'))
        ])
    ]
})
export class HeaderComponent {

    public menuState = 'closed';
    public loggedIn: boolean;
    private classes = ClassData;
    private classesNumberList = Object.keys(ClassData);

    @Input() type = 'base';

    constructor(
        private authService: AuthService,
        private router: Router
    ) {
        this.loggedIn = this.authService.isLoggedIn();
    }

    @HostListener('window:scroll', [])
    onWindowScroll() {

        if (this.type === 'static') {
            return ;
        }
        const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (number > 200) {
            this.type = 'scrolled';
        } else {
            this.type = 'base';
        }

    }

    public toggleMenu() {
        this.menuState = (this.menuState === 'closed' ? 'open' : 'closed');
        this.loggedIn = this.authService.isLoggedIn();
    }

    public logout() {
        this.toggleMenu();
        this.authService.logout();
        this.loggedIn = false;
        this.router.navigate(['']);
    }
}
