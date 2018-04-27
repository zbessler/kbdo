import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { AbstractControl, FormGroup } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';

import { AuthService, UserModel } from '../../factories/auth.service';
import { environment } from '../../environments/environment';
import { LogglyLoggerService } from '../../core/error';


@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

    public signupForm: FormGroup;
    public submitError = null;
    public confirmPass: string;
    private captchaResponse: string;


    constructor(
        private router: Router,
        private authService: AuthService,
        private userModel: UserModel,
        private fb: FormBuilder,
        private logger: LogglyLoggerService
    ) {
        this.signupForm = fb.group({
            firstName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
            lastName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
            email: [null, [Validators.required, Validators.email, Validators.maxLength(50)]],
            password: [null, [Validators.required, Validators.minLength(12), Validators.maxLength(50)]],
            confirmPass: [null, Validators.required],
            address: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(60)]],
            captcha: [null, Validators.required]
        }, {
            validator: PasswordValidation.MatchPassword
        });
    }


    public resolved(captchaResponse: string): void {
        this.signupForm.get('captcha').setValue(true);
        this.captchaResponse = captchaResponse;
    }

    public signup(): Promise<UserModel | void> {
        grecaptcha.reset();
        let formErrors = false;
        (<any>Object).values(this.signupForm.controls).forEach(c => {
            c.markAsTouched();
            if (c.errors) {
                formErrors = true;
            }
        });

        if (formErrors) {
            return ;
        }

        const userData = {
            email: this.signupForm.get('email').value,
            address: this.signupForm.get('address').value,
            firstName: this.signupForm.get('firstName').value,
            lastName: this.signupForm.get('lastName').value,
            password: this.signupForm.get('password').value
        };
        return this.authService.signup(userData, this.captchaResponse)
            .then((_user: UserModel) => {
                this.submitError = null;
                this.router.navigate(['addwallet']);
                return _user;
            })
            .catch(err => {
                if (err || err.error || err.error.error) {
                    this.submitError = err.error.error;
                } else {
                    this.submitError = 'Unknown Error';
                }
                this.logger.log(err);
            });
    }
}

export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
       const password = AC.get('password').value;
       const confirmPass = AC.get('confirmPass').value;
        if (password !== confirmPass) {
            AC.get('confirmPass').setErrors( { MatchPassword: true } );
        } else {
            return null;
        }
    }
}
