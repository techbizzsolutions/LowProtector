import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-select-form',
  templateUrl: 'select-form.html',
})
export class SelectFormPage {

  formName:any;
  constructor(public navCtrl: NavController,public toastCtrl: ToastController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectFormPage');
  }

  next()
  {
    console.log(this.formName);
    if(this.formName)
    {
      switch(this.formName)
      {
        case "Applicant":
           this.navCtrl.push('ApplicantFirstPage');
           break;
        case "GovtDept":
           this.navCtrl.push('GovtDeptFirstPage');
           break;   
        case "HUF":
           this.navCtrl.push('HufFirstPage');
           break;   
        case "LLP":
           this.navCtrl.push('LlpFirstPage');
           break;
        case "Proprietorship":
           this.navCtrl.push('PropritorshipFirstPage');
           break;  
        case "Registered":
           this.navCtrl.push('RegisteredFirstPage',{name:"Registered Company"});
           break;   
        case "RegisteredPartnership":
           this.navCtrl.push('RegisterPartnershipFirstPage',{name:"Registered Partnership"});
           break;    
        case "Society":
           this.navCtrl.push('SoceityFirstPage',{name:"Society"});
           break;      
        case "Trust":
           this.navCtrl.push('SoceityFirstPage',{name:"Trust"});
           break;  
        case "Unregistered":
           this.navCtrl.push('RegisteredFirstPage',{name:"Unregistered Company"});
           break; 
        case "UnregisteredPartnership":
           this.navCtrl.push('RegisterPartnershipFirstPage',{name:"Unregistered Partnership"});
           break;    
        default:
             
      }
    }
    else{
      let toast = this.toastCtrl.create({
        message: 'Please select form',
        position: 'top',
        duration: 3000
      });
      toast.present();
      return;
    }
  }
}
