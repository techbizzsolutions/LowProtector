import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CorporatePage } from './corporate';

@NgModule({
  declarations: [
    CorporatePage,
  ],
  imports: [
    IonicPageModule.forChild(CorporatePage),
  ],
})
export class CorporatePageModule {}
