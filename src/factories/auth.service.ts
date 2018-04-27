import { Injectable, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { StorageService } from './storage.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';

const API_URL = environment.apiUrl;

@Injectable()
export class AuthService {

    private static user: UserModel = null;

    constructor(private http: HttpClient,
                private storageService: StorageService) {

        if (this.storageService.getToken()) {
            this.getUser()
                .then(user => AuthService.user = user);
        }
    }

    public login(email, password): Promise<UserModel> {

        const body = {
            email,
            password
        };

        return this.http
            .post(API_URL + '/auth/login', body).toPromise()
            .then(data => this.storageService.setToken(data['token']))
            .then(token => this.getUser())
            .then(user => AuthService.user = user)
            .catch(err => {
                throw err;
            });
    }

    public signup(userData, captcha): Promise<UserModel> {
        userData.captcha = captcha;
        return this.http
            .post(API_URL + '/auth/register', userData).toPromise()
            .then(data => this.storageService.setToken(data['token']))
            .then(token => this.getUser())
            .then(user => AuthService.user = user)
            .catch(err => {
                throw err;
            });
    }

    public refreshLogin(): void {
        if (this.storageService.getToken()) {
            this.getUser()
                .then(user => AuthService.user = user);
        }
    }

    public isLoggedIn(): boolean {
        return !!(AuthService.user);
    }

    public getUser(): Promise<UserModel> | any {
        // if (AuthService.user) {
        //     return Promise.resolve(AuthService.user);
        // } else {
        //     return this.http
        //         .get<UserModel>(API_URL + '/user/me', this.authHeader())
        //         .map(res => {
        //             const retval: UserModel = this.mapUser(res);
        //             return retval;
        //         })
        //         .toPromise()
        //         .then(data => data)
        //         .catch(err => {
        //             throw err;
        //         });
        // }
    }

    public logout(): void {
        this.storageService.logout();
        AuthService.user = null;
    }


    private authHeader(): object {
        let headers = new HttpHeaders();
        headers = headers.append('authentication', 'JWT ' + this.storageService.getToken());
        return {headers: headers};
    }

    private mapUser(obj): UserModel {
        const retval: UserModel = new UserModel();
        retval._id = obj['_id'];
        retval.email = obj['email'];
        retval.address = obj['address'];
        retval.firstName = obj['firstName'];
        retval.lastName = obj['lastName'];
        retval.password = obj['password'];
        retval.phoneVerified = obj['phoneVerified'];
        retval.emailVerified = obj['emailVerified'];
        retval.addressVerified = obj['addressVerified'];
        retval.type = obj['type'];
        return retval;
    }
}

export class UserModel {
    _id: string;
    email: string;
    address: string;
    firstName: string;
    lastName: string;
    password: string;
    phoneVerified?: boolean;
    emailVerified?: boolean;
    addressVerified?: boolean;
    type?: string;
}

