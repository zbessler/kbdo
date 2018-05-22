import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

    public classData;

    constructor(
        private route: ActivatedRoute
    ) {
        // this.questionForm = fb.group({
        //     name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
        //     topic: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
        //     email: [null, [Validators.required, Validators.email, Validators.maxLength(50)]],
        //     question: [null, [Validators.required, Validators.minLength(12), Validators.maxLength(50)]],
        // });
    }

    ngOnInit() {
        this.classData = this.route.snapshot.data.classData;

        console.log('topics', this.classData[0].syllabus[0].topics);
    }

}
