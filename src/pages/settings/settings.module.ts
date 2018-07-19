import { NgModule } from '@angular/core';
import { IonicPageModule, Platform } from 'ionic-angular';
import { SettingsPage } from './settings';
import { TranslateModule } from 'ng2-translate/ng2-translate';
import { TranslateService } from 'ng2-translate';
import { Globalization } from 'ionic-native';
import { defaultLanguage, availableLanguages, sysOptions } from './settings.constant';

@NgModule({
	imports: [IonicPageModule, TranslateModule],
	declarations: [SettingsPage],
	entryComponents: [SettingsPage]
})
export class SettingsPageModule {
	constructor(platform: Platform, translate: TranslateService) {
		platform.ready().then(() => {
				// this language will be used as a fallback when a translation isn't found in the current language
				translate.setDefaultLang(defaultLanguage);

				if ((<any>window).cordova) {
					Globalization.getPreferredLanguage().then(result => {
						var language = this.getSuitableLanguage(result.value);
						translate.use(language);
						sysOptions.systemLanguage = language;
					});
				} else {
					let browserLanguage = translate.getBrowserLang() || defaultLanguage;
					var language = this.getSuitableLanguage(browserLanguage);
					translate.use(language);
					sysOptions.systemLanguage = language;
				}
			}
		);
	}


	getSuitableLanguage(language) {
		language = language.substring(0, 2).toLowerCase();
		return availableLanguages.some(x => x.code == language) ? language : defaultLanguage;
	}
}
