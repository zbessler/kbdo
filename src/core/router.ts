import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';

import { AppComponent } from '../app/app/app.component';
import { HomeComponent } from '../app/home/home.component';
import { ClassComponent, ClassResolver } from '../app/class/class.component';
import { HomeworkComponent } from '../app/homework/homework.component';
import { LoginComponent } from '../app/login/login.component';
import { SignupComponent } from '../app/signup/signup.component';
import { AdminComponent } from '../app/admin/admin.component';
import { ErrorComponent } from '../app/error/error.component';
import { HelpComponent } from '../app/help/help.component';
import { AuthGuard, AdminGuard } from '../guards/auth.guard';


@Injectable()
export class RouterService {

    public static getRoutes(): Routes {
        return [
            { path: '', component: HomeComponent, pathMatch: 'full' },
            {
                path: 'class/:classNumber',
                component: ClassComponent,
                resolve: {
                    classData: ClassResolver
                }
            },
            {
                path: 'homework/:classNumber/:homeworkid',
                component: HomeworkComponent,
                resolve: {
                    classData: ClassResolver
                }
            },
            {
                path: 'admin',
                component: AdminComponent,
                // , canActivate: [AuthGuard, AdminGuard]
                resolve: {
                    classData: ClassResolver
                }
            },
            { path: 'signup', component: SignupComponent },
            { path: 'login', component: LoginComponent },
            { path: 'error', component: ErrorComponent },
            { path: 'help', component: HelpComponent },
            { path: '**', component: ErrorComponent } // @Todo change to 404 page
        ];
    }

}
