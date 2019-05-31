import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisteredSecondPage } from './registered-second';

@NgModule({
  declarations: [
    RegisteredSecondPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisteredSecondPage),
  ],
})
export class RegisteredSecondPageModule {}
