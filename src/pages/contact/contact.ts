import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SocialSharing } from '@ionic-native/social-sharing';

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {
  ispune:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public socialSharing: SocialSharing) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
    let user = JSON.parse(localStorage.getItem('user')) ;
    console.log('ionViewDidLoad ContactPage',user);  
    if(user.region =="Pune")
    {
        this.ispune = true;
    } 
    else{
      this.ispune = false;
    } 
    //localStorage.clear();
  }

  logout()
  {
     this.navCtrl.setRoot(HomePage);
  }

  share()
  {
     // Check if sharing via email is supported
      this.socialSharing.share("Law Protectors App is mainly for Their Customers who wants to register their Trademark, Copyright Application. Through this app They can easily fill up the form details and submit to the Company Authorized Representative.", null, null, 'https://play.google.com/store/apps/details?id=com.technotwit.lowprotector').then(() => {
        // Sharing via email is possible
      }).catch(() => {
        // Sharing via email is not possible
      });
  }
}
