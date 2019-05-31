import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,AlertController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SmsServiceProvider } from '../../providers/sms-service/sms-service';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';

@IonicPage()
@Component({
  selector: 'page-other',
  templateUrl: 'other.html',
})
export class OtherPage {
  applicant : FormGroup;
  work  = [
    {
      title: 'Patent',
      selected: false
    },
    {
      title: 'Design',
      selected: false
    },
    {
      title: 'Other',
      selected: false
    }
  ];
  constructor(public navCtrl: NavController,
    private openNativeSettings: OpenNativeSettings,
    public toastCtrl: ToastController,public smsServiceProvider: SmsServiceProvider,
    public alertCtrl: AlertController, public navParams: NavParams,public formBuilder: FormBuilder) {
    
    this.applicant = this.formBuilder.group({
      Name: ['', Validators.required],
      addOrganization: ['',Validators.required],
      Address : ['',Validators.required],
      Detail : ['',Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApplicantFirstPage');
  }

  back()
  {
    this.navCtrl.pop();
  }

  
  applicantForm()
  {
     var check = false;
     var arry = [];
    this.work.forEach(element => {
        if(element.selected)
        {
          check = true;
          arry.push(element.title);
        }

    });
    if(!check)
    {
      let toast = this.toastCtrl.create({
        message: 'Please select type of Work',
        position: 'top',
        duration: 3000
      });
      toast.present();
      return;
    }
    this.applicant.value.work = arry;
    localStorage.setItem('part1', JSON.stringify(this.applicant.value));
    localStorage.setItem('part2', "");
    this.navCtrl.push('PaymentPage',{name:'Other'});

    //this.senddata( "Other: " +JSON.stringify(this.applicant.value));
    
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

