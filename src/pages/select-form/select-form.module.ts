import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectFormPage } from './select-form';

@NgModule({
  declarations: [
    SelectFormPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectFormPage),
  ],
})
export class SelectFormPageModule {}
