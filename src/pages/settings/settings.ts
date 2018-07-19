import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { availableLanguages, sysOptions } from './settings.constant';
import { TranslateService } from 'ng2-translate';

/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  languages = availableLanguages;
	selectedLanguage = sysOptions.systemLanguage;

	param = { value: 'world' };

	private translate: TranslateService;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    translate: TranslateService) {
      this.translate = translate;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  applyLanguage() {
		this.translate.use(this.selectedLanguage);
	}

  close() {
    this.viewCtrl.dismiss();
  }

}
