import { Component, Injectable, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/';
import 'rxjs/add/operator/publish';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/first';

import * as _findIndex from 'lodash/findIndex';

import { PhysiatrySyllabus, classes, ClassHomework } from '../../core/constants';

@Component({
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent implements OnInit {

    public questionForm: FormGroup;
    public submitError = null;
    public idName: string;
    public syllabusData;
    public classData;
    private homeworkData = [];


    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute
    ) {
        this.questionForm = fb.group({
            name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
            topic: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
            email: [null, [Validators.required, Validators.email, Validators.maxLength(50)]],
            question: [null, [Validators.required, Validators.minLength(12), Validators.maxLength(50)]],
        });
    }

    ngOnInit() {
        this.idName = this.route.snapshot.params.classIdName;
        this.classData = this.route.snapshot.data.classData[0];
        this.homeworkData = this.classData.homeworks;
        this.syllabusData = this.classData.syllabus;

        this.route.data.subscribe(
            params => {
                const classData = params['classData'][0];
                this.classData = classData;
                this.idName = classData.idName;
                this.syllabusData = classData.syllabus;
            };
        )
    }

}



@Injectable()
export class ClassResolver implements Resolve<any> {

    constructor(
        private db: AngularFireDatabase
    ) {}

    resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
        if (route.params.classIdName) {
            return this.db
                .list('/', ref => ref.orderByChild('idName').equalTo(route.params.classIdName))
                .valueChanges()
                .first();
        } else {
            return this.db.list('/').valueChanges().first();
        }
    }
}
//
