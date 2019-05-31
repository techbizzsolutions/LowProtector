import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,AlertController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DatePicker } from '@ionic-native/date-picker';
import { SmsServiceProvider } from '../../providers/sms-service/sms-service';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';

@IonicPage()
@Component({
  selector: 'page-corporate-second',
  templateUrl: 'corporate-second.html',
})
export class CorporateSecondPage {
  dobdate:any;
  right  = [
    {
      title: 'Publisher',
      selected: false
    },
    {
      title: 'Applicant',
      selected: false
    }
  ];
  form  = [
    {
      title: 'Computer Disc (CD)',
      selected: false
    },
    {
      title: 'Print out',
      selected: false
    }
  ];
  applicant : FormGroup;  
  publishdate: any;
  datetoday:any;
  constructor(public navCtrl: NavController,private openNativeSettings: OpenNativeSettings,public toastCtrl: ToastController,public smsServiceProvider: SmsServiceProvider,public alertCtrl: AlertController, private datePicker: DatePicker, public navParams: NavParams,public formBuilder: FormBuilder) {
    
        this.applicant = this.formBuilder.group({
          Detail:['',Validators.required],
          Countries : ['',Validators.required],
          Language:['',Validators.required],
          Copies:['yes',Validators.required],
          Place:['',Validators.required],
          Age:['',Validators.required]
        });
        }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CorporateSecondPage');
  }
  opencal(type)
  {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then(
      date => {
        console.log('Got date: ', date)
        switch(type)
        {
          case 'publish':
          this.publishdate = date.getDate()+"/"+ date.getMonth()+"/"+ date.getFullYear();
          break;          
          case 'date':
          this.datetoday = date.getDate()+"/"+ date.getMonth()+"/"+ date.getFullYear();
          break;
          case 'dob':
          this.dobdate =  date.getDate()+"/"+ date.getMonth()+"/"+ date.getFullYear();          
          break;
          default:

        }
     
      },
      err => console.log('Error occurred while getting date: ', err)
      );
  }

  showtoast(message)
  {
      let toast = this.toastCtrl.create({
        message: message,
        position: 'top',
        duration: 3000
      });
      toast.present();
  }

  isValidDate(date) {
    var temp = date.split('-');
    var d = new Date(temp[2] + '/' + temp[1] + '/' + temp[0]);
    return (d && (d.getMonth() + 1) == temp[1] && d.getDate() == Number(temp[0]) && d.getFullYear() == Number(temp[2]));
   }

  applicantForm()
  {
     var checkright = false;
     var right = [];
    this.right.forEach(element => {
        if(element.selected)
        {
          checkright = true;
          right.push(element.title);
        }

    });
    if(!checkright)
    {
      this.showtoast('Please select rights');
      return;
    }
    this.applicant.value.right = right;        
    var formcheck = false;
    var form = [];
    this.form.forEach(element => {
        if(element.selected)
        {
          formcheck = true;
          form.push(element.title);
        }

    });
    if(!formcheck)
    {
      this.showtoast('Please select form');
      return;
    }
    this.applicant.value.form = form;   

    if(!this.publishdate)
    {
      this.showtoast('Please select Date of publication');
      return;
    }

    this.applicant.value.publishdate = this.publishdate;        
    
    if(!this.datetoday)
    {
      this.showtoast('Please select Date');
      return;
    }

    this.applicant.value.date = this.datetoday;       
    localStorage.setItem('part2', JSON.stringify(this.applicant.value));
    this.navCtrl.push('PaymentPage',{name:'CR'}); 
    // var part1 = JSON.parse(localStorage.getItem('part1'));
    // console.log("Part1: " + JSON.stringify(part1) + "Part2: " +JSON.stringify(this.applicant.value));
    //  this.senddata("CR Part1: " + JSON.stringify(part1) + " CR Part2: " +JSON.stringify(this.applicant.value));
    
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

