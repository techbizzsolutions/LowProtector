import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-services',
  templateUrl: 'services.html',
})
export class ServicesPage {
  service:any;
  constructor(public navCtrl: NavController,public toastCtrl: ToastController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicesPage');
  }

  next()
  {
    console.log(this.service);
    if(this.service)
    {
      switch(this.service)
      {
        case "TM":
           this.navCtrl.push('SelectFormPage');
           break;
        case "CR":
           this.navCtrl.push('CorporatePage');
           break;   
        case "Other":
           this.navCtrl.push('OtherPage');
           break;   
        case "Balance Payment":
        localStorage.setItem('part1', "");
        localStorage.setItem('part2', "");
        this.navCtrl.push('PaymentPage',{name:'Balance Payment'});
           break;
           
        default:
             
      }
    }
    else{
      let toast = this.toastCtrl.create({
        message: 'Please select Service',
        position: 'top',
        duration: 3000
      });
      toast.present();
      return;
    }
  }
}

