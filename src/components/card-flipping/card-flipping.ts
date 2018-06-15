import { Component } from '@angular/core';

/**
 * Generated class for the CardFlippingComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'card-flipping',
  templateUrl: 'card-flipping.html'
})
export class CardFlippingComponent {

  //Card Animation
  flipped: boolean = false;

  text: string;

  constructor() {
    console.log('Hello CardFlippingComponent ');
  }

  flip(){
    //Card Animation
    this.flipped = !this.flipped;
  }

  /*
  Maybe a Modal?
  goToCertainPage(session: any) {
    this.navCtrl.push(SessionDetailPage, { sessionId: session.id });
  }
  goToCertainPage(speaker: any) {
    this.navCtrl.push(SpeakerDetailPage, { speakerId: speaker.id });
  }
  */
 
}
