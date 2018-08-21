import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ConsumerEnviroEvalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-consumer-enviro-eval',
  templateUrl: 'consumer-enviro-eval.html',
})
export class ConsumerEnviroEvalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConsumerEnviroEvalPage');
  }

  popView(){
    this.navCtrl.pop();
  }

}
