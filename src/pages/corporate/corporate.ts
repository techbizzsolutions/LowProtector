import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-corporate',
  templateUrl: 'corporate.html',
})
export class CorporatePage {
  applicant : FormGroup;
  mark  = [
    {
      title: 'Artistic',
      selected: false
    },
    {
      title: 'Literary',
      selected: false
    },
    {
      title: 'Cinematography film',
      selected: false
    },
    {
      title: 'Musical Work',
      selected: false
    },
    {
      title: 'Computer Software',
      selected: false
    },
    {
      title: 'Web sites',
      selected: false
    }
  ];
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public toastCtrl: ToastController,
     public formBuilder: FormBuilder)
      {
    this.applicant = this.formBuilder.group({
      Title:['', Validators.required],
      NameOrganization: ['', Validators.required],
      Propritor:['', Validators.required],
      Address : ['',Validators.required],
      AddressOrg: ['',Validators.required],
      Nationality: ['',Validators.required],
      formName:['Applicant',Validators.required],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApplicantFirstPage');
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
        message: 'Please select Nature of Work',
        position: 'top',
        duration: 3000
      });
      toast.present();
      return;
    }
    
    this.applicant.value.work = arry;
    console.log(this.applicant.value);
    localStorage.setItem('part1', JSON.stringify(this.applicant.value));
    this.navCtrl.push('CorporateSecondPage');
  }
}
