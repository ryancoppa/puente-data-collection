import { Component } from '@angular/core';
import { Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Initial page
import { SigninPage } from '../pages/signin/signin';
//import { HomePage } from '../pages/home/home';
import { Splash } from '../pages/splash/splash';
//import { AboutPage } from '../pages/about/about';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {
  rootPage: any = SigninPage;
  //rootPage: any = HomePage;
  //rootPage: any = AboutPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, modalCtrl: ModalController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();

      //Below hides splashScreen
      //splashScreen.hide();

      let splash = modalCtrl.create(Splash);
      splash.present();
    });
  }

}
