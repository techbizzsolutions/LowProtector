import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,AlertController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DatePicker } from '@ionic-native/date-picker';
import { SmsServiceProvider } from '../../providers/sms-service/sms-service';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';

@IonicPage()
@Component({
  selector: 'page-llp-second',
  templateUrl: 'llp-second.html',
})
export class LlpSecondPage {
  applicant : FormGroup;
  dobdate:any ;
  Trade  = [
    {
      title: 'Manufactures',
      selected: false
    },
    {
      title: 'Dealers',
      selected: false
    },
    {
      title: 'Traders',
      selected: false
    },
    {
      title: 'Service Providers',
      selected: false
    }
  ];
  constructor(public navCtrl: NavController, private datePicker: DatePicker,private openNativeSettings: OpenNativeSettings,public toastCtrl: ToastController,public smsServiceProvider: SmsServiceProvider,public alertCtrl: AlertController, public navParams: NavParams,public formBuilder: FormBuilder) {
    this.applicant = this.formBuilder.group({
      TM: ['', Validators.required],
      Services: ['',Validators.required],
         proposed : ['',Validators.required],
      Information : ['',Validators.required],
      Place : ['',Validators.required]
    });
  }

  opencal()
  {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then(
      date => {
        console.log('Got date: ', date)
        let mnth = date.getMonth() + 1;
        this.dobdate = date.getDate()+"/"+ mnth +"/"+ date.getFullYear();
      },
      err => 
      {
        console.log('Error occurred while getting date: ', err);
        var date = new Date();
        let mnth = date.getMonth() + 1;
        this.dobdate = date.getDate()+"/"+ mnth +"/"+ date.getFullYear();
      })
      .catch(err=>{
        var date = new Date();
        let mnth = date.getMonth() + 1;
        this.dobdate = date.getDate()+"/"+ mnth +"/"+ date.getFullYear();
      });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LlpSecondPage');
  }

  applicantForm()
  {

     var check = false;
     var arry = [];
    this.Trade.forEach(element => {
        if(element.selected)
        {
          check = true;
          arry.push(element.title);
        }

    });
    if(!check)
    {
      let toast = this.toastCtrl.create({
        message: 'Please select Trade Description',
        position: 'top',
        duration: 3000
      });
      toast.present();
      return;
    }
    if(!this.dobdate)
    {
      let toast = this.toastCtrl.create({
        message: 'Please select Date',
        position: 'top',
        duration: 3000
      });
      toast.present();
      return;
    }
    this.applicant.value.date = this.dobdate;
    this.applicant.value.trade = arry;
    localStorage.setItem('part2', JSON.stringify(this.applicant.value));
    this.navCtrl.push('PaymentPage',{name:'L.L.P.'});
    // var part1 = JSON.parse(localStorage.getItem('part1'));
    // console.log("Part1: " + JSON.stringify(part1) + "Part2: " +JSON.stringify(this.applicant.value));
    // this.senddata("L.L.P. Part1: " + JSON.stringify(part1) + "<br>L.L.P. Part2: " +JSON.stringify(this.applicant.value));
    
  }

  senddata(message)
  {
    this.smsServiceProvider.sendMessageTouser(message).then(res=>{
      if(res)
      {
       this.showAlert("Data has been sent successfully", 1); 
      }
      else{
       this.showAlert("Please enable sms permission,Goto applications->Choose Law Protectors app ->Permissions-> enable sms", 2);    
      }
                    
     }).catch(res=>{
       console.log("smsServiceProvider catch" +res);
       this.showAlert("Messgae has been failed, please check your message service", 3); 
     })
  }
  showAlert(message,bol)
  {
    let alert = this.alertCtrl.create({
      subTitle: message,
      buttons: [{
        text: 'Ok',
        handler: () => {
          switch (bol)
          {
            case 1:
            {
              this.navCtrl.setRoot('ContactPage');
            }
            break;
            case 2:
            {
              this.openNativeSettings.open("application").then(res=>{
              })
              .catch(err=>{})
            }
            break;
            default :

          }
        }
      },
      {
        text: 'Cancle',
        handler: () => {
          // close the sliding item
        }
      }]
    });
    // now present the alert on top of all other content
    alert.present();
  }
}
