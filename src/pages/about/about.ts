import { Component } from '@angular/core';
import { App, ViewController } from 'ionic-angular';

// Providers
import { AuthProvider } from '../../providers/auth/auth';

// Pages
import { SigninPage } from '../signin/signin';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public viewCtrl: ViewController, private auth: AuthProvider, private app: App) { }

  ionViewCanEnter(): boolean {
    return this.auth.authenticated();
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }
  //Legacy
  public signout() {
    this.auth.signout().subscribe(() => {
      this.app.getRootNav().setRoot(SigninPage);
    });
  }

}
