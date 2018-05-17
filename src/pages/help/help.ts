import { Component } from '@angular/core';
import { NavController, NavParams, Platform, ViewController } from 'ionic-angular';

/**
 * Generated class for the HelpPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-help',
  templateUrl: 'help.html',
})
export class HelpPage {

  constructor(public plt: Platform, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpPage');
  }

  //Navigation
  closeModal() {
    this.viewCtrl.dismiss();
  }
  close(url: string) {
    window.open(url, '_blank');
    this.viewCtrl.dismiss();
  }

  mailto(email) {
    this.plt.ready().then(() => {
        window.open('mailto:'+email);
    });
  }

}
