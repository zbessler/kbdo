import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { RouterModule, Routes, Router, NavigationEnd } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { NgxLogglyModule } from 'ngx-loggly-logger';
import { NgxCarouselModule } from 'ngx-carousel';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import 'hammerjs';

import { AppComponent } from './app.component';
import { HomeComponent } from '../home/home.component';
import { ClassComponent, ClassResolver } from '../class/class.component';
import { HomeworkComponent } from '../homework/homework.component';
import { SignupComponent } from '../signup/signup.component';
import { LoginComponent } from '../login/login.component';
import { AdminComponent } from '../admin/admin.component';
import { ErrorComponent } from '../error/error.component';
import { HelpComponent } from '../help/help.component';


import { CarouselComponent } from '../../components/carousel/carousel.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { BeamInputComponent, BeamInputNoFormComponent } from '../../components/input/input.component';

import { AuthService, UserModel } from '../../factories/auth.service';
import { StorageService } from '../../factories/storage.service';
import { GlobalErrorHandler, LogglyLoggerService } from '../../core/error';
import { RouterService } from '../../core/router';
import { ScrollService } from '../../components/inViewport/scroll.service';

import { AnalyticsService, AnalyticsDirective } from '../../core/analytics';
import { AnimateOnScrollDirective } from '../../components/inViewport/animate-on-scroll.directive';
import { AuthGuard, AdminGuard } from '../../guards/auth.guard';
import { environment } from '../../environments/environment';

declare let ga: Function;
@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ClassComponent,
        HomeworkComponent,
        ErrorComponent,
        AdminComponent,
        SignupComponent,
        LoginComponent,
        HelpComponent,

        CarouselComponent,
        HeaderComponent,
        FooterComponent,
        BeamInputComponent,
        BeamInputNoFormComponent,
        AnalyticsDirective,
        AnimateOnScrollDirective
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(
          RouterService.getRoutes(),
          { errorHandler: null }
          // { enableTracing: true } // <-- debugging purposes only
        ),
        NgxCarouselModule,
        NgxLogglyModule.forRoot(),
        RecaptchaModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFireAuthModule
    ],
    providers: [
        RouterService,
        UserModel,

        AuthService,
        StorageService,
        ScrollService,

        AuthGuard,
        AdminGuard,
        ClassResolver,
        LogglyLoggerService,
        AnalyticsService,
        {
            provide: RECAPTCHA_SETTINGS,
            useValue: { siteKey: environment.recaptchaSiteKey, size: 'normal' } as RecaptchaSettings,
        },
        {
            provide: ErrorHandler,
            useClass: GlobalErrorHandler
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(
        private router: Router,
        private analyticsService: AnalyticsService,
        private authService: AuthService
    ) {
        ga('create', environment.analyticsId, 'auto');

        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                // this.authService.getUser().then( user => {
                //     if (user) {
                //         ga('set', 'userId', user._id);
                //     }
                    ga('set', 'page', event.urlAfterRedirects);
                    ga('send', 'pageview');
                // });
            }
        });
    }
}
