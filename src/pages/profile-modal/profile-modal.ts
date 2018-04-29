import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

//Pages
import { AboutPage } from '../about/about';
import { HelpPage } from '../help/help';


/**
 * Generated class for the ProfileModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-profile-modal',
  templateUrl: 'profile-modal.html',
})
export class ProfileModalPage {

  constructor(public modalCtrl:ModalController, public viewCtrl:ViewController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileModalPage');
  }

  //Navigation
  closeModal() {
    this.viewCtrl.dismiss();
  }

  openAboutUs() {
    let myModal = this.modalCtrl.create(AboutPage);

    //.present() shows modal
    myModal.present();
  }

  openHelp() {
    let myModal = this.modalCtrl.create(HelpPage);

    //.present() shows modal
    myModal.present();
  }

}
