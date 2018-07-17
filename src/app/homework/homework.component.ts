import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as _findIndex from 'lodash/findIndex';

@Component({
  templateUrl: './homework.component.html',
  styleUrls: ['./homework.component.scss']
})
export class HomeworkComponent implements OnInit {

    public submitError = null;
    public homeworkId: number;
    public classIdName: number;
    public homeworkData;
    public classData;


    constructor(
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.homeworkId = this.route.snapshot.params.homeworkid;
        this.classIdName = this.route.snapshot.params.classIdName;

        this.classData = this.route.snapshot.data.classData[0];
        this.homeworkData = this.classData.homeworks[this.homeworkId];
    }
}
