import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';

import { AuthService, UserModel } from '../../factories/auth.service';


@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    public loginForm: FormGroup;
    public loginInvalid = false;

    constructor(
        private router: Router,
        private authService: AuthService,
        private userModel: UserModel,
        private fb: FormBuilder,
    ) {
        this.loginForm = fb.group({
            email: [null, [Validators.required, Validators.email, Validators.maxLength(50)]],
            password: [null, [Validators.required, Validators.minLength(12), Validators.maxLength(50)]]
        });
    }


    public login() {

        let formErrors = false;
        (<any>Object).values(this.loginForm.controls).forEach(c => {
            c.markAsTouched();
            if (c.errors) {
                formErrors = true;
            }
        });

        if (formErrors) {
            return ;
        }


        this.authService.login(this.loginForm.get('email').value, this.loginForm.get('password').value)
            .then((_user: UserModel) => {
                this.router.navigate(['dashboard']);
            })
            .catch(err => {
                if (err.status === 401) {
                    this.loginInvalid = true;
                    return ;
                }
                this.router.navigate(['error']);
                console.log(err);
            });
    }
}
