import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

// Providers
import { AuthProvider } from '../../providers/auth/auth';

// Pages
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  password: string = '';
  firstname: string = '';
  lastname: string = '';
  username: string = '';
  confirm: string = '';
  email: string = '';
  organization: string = '';

  constructor(public navCtrl: NavController, 
    private authPvdr: AuthProvider, 
    private loadCtrl: LoadingController) { 
  }

  ionViewDidLoad() {
    console.log('Initiate Signup');
  }
  
  /*
  Loading Controller
  
  An overlay that can be used to indicate activity while blocking user interaction. 
  The loading indicator appears on top of the app's content, 
  and can be dismissed by the app to resume user interaction with the app.
  */
  public doRegister() {
    let loader = this.loadCtrl.create({
      content: 'Signing up...'
    });
    
    loader.present();

    this.authPvdr.signup(this.username, this.password, this.email, this.organization).subscribe((success) => {
      this.navCtrl.setRoot(TabsPage);
      loader.dismissAll();
    }, (error) => {
      loader.dismissAll();
    });
  }

}
