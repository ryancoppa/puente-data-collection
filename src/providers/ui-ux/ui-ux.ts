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

  loader;

  constructor(private toastCtrl:ToastController,
    private loadCtrl: LoadingController,
    private modalCtrl: ModalController) {
    console.log('Hello UiUxProvider Provider');
  }

  coolLoadz = this.modalCtrl.create(AnimatedCirclesComponent);

  
  toasting(message : string, position: string = 'bottom', duration : number = 2000) {
    /*
    A Toast is a subtle notification commonly used in modern applications. 
    It can be used to provide feedback about an operation or to display a system message.
    The toast appears on top of the app's content, and can be dismissed 
    by the app to resume user interaction with the app.
    */

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

  presentCustomLoading(){
    //Not like a normal loader, not asynchronous 
    if(!this.loader){
      this.loader = this.coolLoadz;
      this.loader.present();
    }
  }

  dismissCustomLoading(){
    if(this.loader){
      this.loader.dismiss();
      this.loader = null;
    }
  }



}
