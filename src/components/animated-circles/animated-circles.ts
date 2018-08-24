import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the AnimatedCirclesComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'animated-circles',
  templateUrl: 'animated-circles.html'
})
export class AnimatedCirclesComponent {

  text: string;

  constructor(private viewCtrl:ViewController) {
    console.log('Hello AnimatedCirclesComponent Component');
  }

  ionViewDidEnter() {
    /*
    setTimeout(() => {
      this.viewCtrl.dismiss();
    }, 3500); */

  }

}
