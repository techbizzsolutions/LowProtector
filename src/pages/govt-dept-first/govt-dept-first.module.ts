import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GovtDeptFirstPage } from './govt-dept-first';

@NgModule({
  declarations: [
    GovtDeptFirstPage,
  ],
  imports: [
    IonicPageModule.forChild(GovtDeptFirstPage),
  ],
})
export class GovtDeptFirstPageModule {}
