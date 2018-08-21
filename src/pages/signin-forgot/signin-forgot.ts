import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//Providers
import { AuthProvider} from '../../providers/auth/auth';
import { UiUxProvider } from '../../providers/ui-ux/ui-ux';


@Component({
  selector: 'page-signin-forgot',
  templateUrl: 'signin-forgot.html',
})
export class SigninForgotPage {

  email: string = '';

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public auth: AuthProvider,
    public themeCtrl:UiUxProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninForgotPage');
  }

  public doForgotpassword(){
    this.auth.forgotPassword(this.email).then(()=>{
      this.themeCtrl.toasting("Email sent", "bottom");
      this.navCtrl.pop();
    })
  }

}
