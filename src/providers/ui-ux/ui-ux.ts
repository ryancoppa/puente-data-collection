import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from 'ionic-angular';
//import { Http } from '@angular/http';
//import 'rxjs/add/operator/map';

/*
  Generated class for the UiUxProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UiUxProvider {

  constructor(private toastCtrl:ToastController,
    private loadCtrl: LoadingController) {
    console.log('Hello UiUxProvider Provider');
  }
  duration : number = 2000;
  position : string = 'bottom';

  toasting(message : string, duration : number = this.duration) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: this.position
    });
    toast.present();
  }

  /**
   * default theme loader
   */
  loading(content : string = "...", spinner : string = "dots") {
    let loader = this.loadCtrl.create({
        content : content,
        spinner : spinner
    });
    loader.present();
    return loader;
  }

}
