import { Component,ViewChild } from '@angular/core';
import { Nav,AlertController, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  @ViewChild(Nav) nav: Nav;
  constructor(platform: Platform, statusBar: StatusBar,public alertCtrl: AlertController, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      statusBar.backgroundColorByHexString("#d66104");
      splashScreen.hide();
      platform.registerBackButtonAction(() => {
        if (this.nav.canGoBack()) {
          this.nav.pop();
        }
        else {
          console.log("else");
          let alert = this.alertCtrl.create({
            subTitle: 'Do you want to exit from the app ?',
            cssClass: 'alertDanger',
            buttons: [{
              text: 'Yes',
              handler: () => {
                // close the sliding item
                platform.exitApp();
              }
            },
            {
              text: 'No',
              handler: () => {
                // close the sliding item
              }
            }]
          });
          // now present the alert on top of all other content
          alert.present();
        }
      });
    });
  }
}

