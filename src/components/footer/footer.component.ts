import { Component } from '@angular/core';

@Component({
    selector: 'beam-footer',
    templateUrl: 'footer.component.html',
    styleUrls: ['footer.component.scss']
})
export class FooterComponent {

  constructor() {}

    public signupEmail: string;
    public fieldHeader = 'Get notified about sale details';
    public btn = {
        text: 'Stay Connected',
        disabled: false
    };


    public addToSaleList() {
        this.btn.text = 'Sending...';
        this.btn.disabled = true;
        this.fieldHeader = 'Signup Received!';
        this.btn.text = 'Stay Tuned!';
        this.btn.disabled = false;
        // this.userService.addToSaleList(this.signupEmail)
        // .then(data => {
        //     this.fieldHeader = 'Signup Received!';
        //     this.btn.text = 'Stay Tuned!';
        // })
        // .catch(err => {
        //     if (err.error.error === 'Member Exists') {
        //         this.fieldHeader = 'We already had your email!';
        //         this.btn.text = 'Stay Tuned!';
        //         this.btn.disabled = false;
        //     } else {
        //         this.fieldHeader = 'Something went wrong, try again';
        //         this.btn.text = 'Try again';
        //         this.btn.disabled = false;
        //     }
        // });
    }
}
