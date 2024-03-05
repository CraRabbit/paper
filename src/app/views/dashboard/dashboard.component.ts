import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

import { BullySubjectService } from '../../services/bully-subject.service';
@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private bully: BullySubjectService) {}

  ngOnInit(): void {
    this.bully.getBSubject().subscribe((res:any)=>{
      console.log('this is a null.');
    })
  }
}
