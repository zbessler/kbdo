import { Component, Injectable, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/';
import 'rxjs/add/operator/publish';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/first';

import * as _findIndex from 'lodash/findIndex';
import * as _filter from 'lodash/filter';
import * as moment from 'moment';

import { ClassData, ClassSyllabus, ClassHomeworks, ClassResources, ClassFaculty } from '../../core/constants';

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
    public faculty = {};

    public navOpen = false;
    public basicFilter = true;
    public assignFilter = true;
    public refFilter = true;
    public rulesFilter = true;


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
        this.classNumber = this.route.snapshot.params.classNumber;
        this.classData = this.route.snapshot.data.classData[0];
        this.homeworkData = this.classData.homeworks;
        this.syllabusData = this.classData.syllabus;

        this.faculty.chair = _filter(this.classData.faculty, { 'type': 'CHAIR' })[0];
        this.faculty.faculty = _filter(this.classData.faculty, { 'type': 'FACULTY' });
        this.faculty.scholar = _filter(this.classData.faculty, { 'type': 'SCHOLAR' });
        this.faculty.director = _filter(this.classData.faculty, { 'type': 'DIRECTOR' });

        this.route.data.subscribe(
            params => {
                const classData = params['classData'][0];
                this.classData = classData;
                this.idName = classData.idName;
                this.syllabusData = classData.syllabus;
            }
        );
    }

    public toggleNav() {
        this.navOpen = !this.navOpen;
    }
    public toggleBasicFilter() {
        this.basicFilter = !this.basicFilter;
    }
    public toggleAssignFilter() {
        this.assignFilter = !this.assignFilter;
    }
    public toggleRefFilter() {
        this.refFilter = !this.refFilter;
    }
    public toggleRulesFilter() {
        this.rulesFilter = !this.rulesFilter;
    }


}



@Injectable()
export class ClassResolver implements Resolve<any> {

    constructor(
        private db: AngularFireDatabase
    ) {}

    resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
        let retval = ClassData[route.params.classNumber];
        retval.syllabus = ClassSyllabus[route.params.classNumber];
        retval.homeworks = ClassHomeworks[route.params.classNumber];
        retval.resources = ClassResources[route.params.classNumber];
        retval.faculty = ClassFaculty[route.params.classNumber];

        return [retval];

        // TODO: Revert to this code for PROD

        // if (route.params.classNumber) {
        //     return this.db
        //         .list('/', ref => ref.orderByChild('classNumber').equalTo(route.params.classNumber))
        //         .valueChanges()
        //         .first();
        // } else {
        //     return this.db.list('/').valueChanges().first();
        // }
    }
}
//
