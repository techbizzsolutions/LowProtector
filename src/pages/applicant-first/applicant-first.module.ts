import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApplicantFirstPage } from './applicant-first';

@NgModule({
  declarations: [
    ApplicantFirstPage,
  ],
  imports: [
    IonicPageModule.forChild(ApplicantFirstPage),
  ],
})
export class ApplicantFirstPageModule {}
