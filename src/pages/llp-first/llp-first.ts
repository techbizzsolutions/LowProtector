import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DatePicker } from '@ionic-native/date-picker';

@IonicPage()
@Component({
  selector: 'page-llp-first',
  templateUrl: 'llp-first.html',
})
export class LlpFirstPage {
  applicant : FormGroup;
  dobdate:any ;
  mark  = [
    {
      title: 'Word Mark',
      selected: false
    },
    {
      title: 'Device',
      selected: false
    },
    {
      title: 'Color',
      selected: false
    },
    {
      title: 'Sound',
      selected: false
    },
    {
      title: 'Three Dimensional mark',
      selected: false
    }
  ];
  constructor(public navCtrl: NavController, private datePicker: DatePicker, public toastCtrl: ToastController, public navParams: NavParams,public formBuilder: FormBuilder) {
    this.applicant = this.formBuilder.group({
      Name: ['', Validators.required],
      Address : ['',Validators.required],
      Brand : ['',Validators.required],
      Significance : ['',Validators.required],
      Age: ['',Validators.required],
      Organization : ['',Validators.required],      
      FirmAddress:['',Validators.required],
      Nationality: ['',Validators.required],
      Association : ['',Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LlpFirstPage');
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
  isValidDate(date) {
    var temp = date.split('-');
    var d = new Date(temp[2] + '/' + temp[1] + '/' + temp[0]);
    return (d && (d.getMonth() + 1) == temp[1] && d.getDate() == Number(temp[0]) && d.getFullYear() == Number(temp[2]));
   }
  applicantForm()
  {

     var check = false;
     var arry = [];
    this.mark.forEach(element => {
        if(element.selected)
        {
          check = true;
          arry.push(element.title);
        }

    });
    if(!check)
    {
      let toast = this.toastCtrl.create({
        message: 'Please select Category of mark',
        position: 'top',
        duration: 3000
      });
      toast.present();
      return;
    }
    
   // this.applicant.value.dob = this.dobdate;
    this.applicant.value.mark = arry;
    console.log(this.applicant.value);
    localStorage.setItem('part1', JSON.stringify(this.applicant.value));    this.navCtrl.push('LlpSecondPage');
  }

}
