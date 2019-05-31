import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SMS } from '@ionic-native/sms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { SocialSharing } from '@ionic-native/social-sharing';
import { DatePicker } from '@ionic-native/date-picker';
import { SmsServiceProvider } from '../providers/sms-service/sms-service';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SocialSharing,
    DatePicker,
    SMS,
    OpenNativeSettings,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SmsServiceProvider
  ]
})
export class AppModule {}
