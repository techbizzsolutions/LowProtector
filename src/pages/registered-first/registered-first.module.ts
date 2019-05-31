import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisteredFirstPage } from './registered-first';

@NgModule({
  declarations: [
    RegisteredFirstPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisteredFirstPage),
  ],
})
export class RegisteredFirstPageModule {}
