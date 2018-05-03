import { Component } from '@angular/core';
import { AlertController, NavController, LoadingController } from 'ionic-angular';

// Providers
import { AuthProvider } from '../../providers/auth/auth';

// Pages
import { SignupPage } from '../signup/signup';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SigninPage {
  registerPage = SignupPage;
  password: string = '';
  username: string = '';

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, private loadCtrl: LoadingController, private authPvdr: AuthProvider) { }

  ionViewDidLoad() {
    console.log('Initiated Signin');
  }

  public doSignin() {
    let loader = this.loadCtrl.create({

      content: 'Signing in...'
    });

    let ion_alert = this.alertCtrl.create({
      title: 'Login Timeout',
      subTitle: 'Invalid username and/or password',
      buttons: ['Try Again']
    });
    
    loader.present();
    
    setTimeout(() => {
      loader.dismiss();
      //ion_alert.present();
    }, 3000); 

    this.authPvdr.signin(this.username, this.password).subscribe((success) => {
      ion_alert.dismiss();
      this.navCtrl.setRoot(TabsPage);
      loader.dismissAll();
    }, (error) => {
      //ion_alert.present();
      loader.dismissAll();
    });
  }

}
