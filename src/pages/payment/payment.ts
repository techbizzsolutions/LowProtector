import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,AlertController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DatePicker } from '@ionic-native/date-picker';
import { SmsServiceProvider } from '../../providers/sms-service/sms-service';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { SocialSharing } from '@ionic-native/social-sharing';

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {
  private payment : FormGroup;
  chqdate:any = "Cheque date";
  title:any;
  data:any;
  showORG:boolean = false;
  paymentMode = [
    {
      title: 'By Cash',
      selected: false
    },
    {
      title: 'By Cheque',
      selected: false
    }]
    constructor(public navCtrl: NavController,public socialSharing: SocialSharing, private openNativeSettings: OpenNativeSettings,public toastCtrl: ToastController,public smsServiceProvider: SmsServiceProvider,public alertCtrl: AlertController, private datePicker: DatePicker, public navParams: NavParams,public formBuilder: FormBuilder) {
      this.payment = this.formBuilder.group({
      contractAmount: ['', Validators.required],
      gstAmount: ['', Validators.required],
      totalAmount: ['', Validators.required],
      receviedAmount: ['', Validators.required],
      balanceAmount: ['', Validators.required],
      gstnumber: ['', Validators.required],
      chequenumber: [''],
      chequeamount:[''],
      bankname: ['']
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');  
    this.title = this.navParams.data.name;
    if(this.title == "Balance Payment")
    {
       this.showORG = true;
       this.payment = this.formBuilder.group({
        contractAmount: ['', Validators.required],
        gstAmount: ['', Validators.required],
        totalAmount: ['', Validators.required],
        receviedAmount: ['', Validators.required],
        balanceAmount: ['', Validators.required],
        gstnumber: ['', Validators.required],
        Organization : ['',Validators.required],        
        chequenumber: [''],
        chequeamount:[''],
        bankname: ['']
        });
    }
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
        this.chqdate = date.getDate()+"/"+ mnth +"/"+ date.getFullYear();
      },
      err => 
      {
        console.log('Error occurred while getting date: ', err);
        var date = new Date();
        let mnth = date.getMonth() + 1;
        this.chqdate = date.getDate()+"/"+ mnth +"/"+ date.getFullYear();
      })
      .catch(err=>{
        var date = new Date();
        let mnth = date.getMonth() + 1;
        this.chqdate = date.getDate()+"/"+ mnth +"/"+ date.getFullYear();
      });
  }

  logForm()
  {
    var check = false;
    var arry = [];
    this.paymentMode.forEach(element => {
        if(element.selected)
        {
          check = true;
          arry.push(element.title);
        }

    });
    if(!check)
    {
      let toast = this.toastCtrl.create({
        message: 'Please select payment mode',
        position: 'top',
        duration: 3000
      });
      toast.present();
      return;
    }
    this.payment.value.paymentMode = arry;
    this.payment.value.chqdate = this.chqdate;

    var rowdata = ["****** " + this.title + " ******"];
    var index = 0;

    let user = JSON.parse(localStorage.getItem('user'));
      for(var userprop in user) {
        rowdata.push(userprop + ": " + user[userprop]);
      }

  
      if(localStorage.getItem('part1'))
      {
        var part1 = JSON.parse(localStorage.getItem('part1'));
        for(var part1prop in part1) {
          rowdata.push(index +'. ' + part1prop + ": " + part1[part1prop]);
          index ++;
        }
      }

    if(localStorage.getItem('part2'))
    {
      var part2 = JSON.parse(localStorage.getItem('part2'));
      for(var part2prop in part2) {
        rowdata.push(index +'. ' + part2prop + ": " + part2[part2prop]);
        index ++;
      }
    }
   
    for(var prop in this.payment.value) {
      rowdata.push(index +'. ' + prop + ": " + this.payment.value[prop]);
      index ++;
    }

    this.data = rowdata.join('\r\n');
    //this.senddata( this.data);
    this.share();
  }

  share()
  {
     // Check if sharing via email is supported
      this.socialSharing.share(this.data, null, null, null).then(() => {
        this.navCtrl.push('ContactPage');
      }).catch(() => {
        // Sharing via email is not possible
      });
  }

  confirmShare()
  {
    let alert = this.alertCtrl.create({
      subTitle: "Do you want share data to other app ?",
      buttons: [{
        text: 'Yes',
        handler: () => {
          this.share();
        }
      },
      {
        text: 'No',
        handler: () => {
          this.navCtrl.setRoot('ContactPage');
        }
      }]
    });
    // now present the alert on top of all other content
    alert.present();
  }
  senddata(message)
  {
    console.log("data: " + message);
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
              this.confirmShare();
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
