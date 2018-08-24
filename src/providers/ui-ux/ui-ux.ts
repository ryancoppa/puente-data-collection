import { Injectable } from '@angular/core';
import { ToastController, LoadingController, ModalController } from 'ionic-angular';
import { AnimatedCirclesComponent } from '../../components/animated-circles/animated-circles';
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
    private loadCtrl: LoadingController,
    private modalCtrl: ModalController) {
    console.log('Hello UiUxProvider Provider');
  }
  duration : number = 2000;

  coolLoadz = this.modalCtrl.create(AnimatedCirclesComponent);
  //position : string = 'bottom';

  /*
    A Toast is a subtle notification commonly used in modern applications. 
    It can be used to provide feedback about an operation or to display a system message.
    The toast appears on top of the app's content, and can be dismissed 
    by the app to resume user interaction with the app.
  */
  toasting(message : string, position: string, duration : number = this.duration) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  loading(content : string = "...", spinner : string = "dots") {
    let loader = this.loadCtrl.create({
        content : content,
        spinner : spinner
    });
    loader.present();
    return loader;
  }

  customLoading(){
    let loadz = this.modalCtrl.create(AnimatedCirclesComponent);
    loadz.present();
  }


}
