import { Injectable, Directive, ElementRef, HostListener, Input } from '@angular/core';

import { LogglyLoggerService } from './error';

declare let ga: Function;
@Injectable()
export class AnalyticsService {

    public emitEvent(eventCategory: string,
                     eventAction: string,
                     eventLabel: string = null,
                     eventValue: number = null) {
        ga('send', 'event', {
            eventCategory: eventCategory,
            eventLabel: eventLabel,
            eventAction: eventAction,
            eventValue: eventValue
        });
    }

    public emitPageView(url) {
        ga('set', 'page', url);
        ga('send', 'pageview');
    }
}


@Directive({
    selector: '[beamAnalytics]'
})
export class AnalyticsDirective {
    constructor(
        private analyticsService: AnalyticsService,
        private logglyService: LogglyLoggerService
    ) {}

    @Input() beamAnalytics: string;

    @HostListener('click', ['$event']) onclick(e) {
        const data = this.beamAnalytics.split('|');
        if (data.length < 2) {
            this.logglyService.log(new Error('Missing analytics data - ' + this.beamAnalytics));
            return ;
        }
        for (let i = data.length; i < 4; i++) {
            data.push(null);
        }
        this.analyticsService.emitEvent(data[0], data[1], data[2], Number(data[3]));
    }
}
