import { Component } from '@angular/core';

/**
 * Generated class for the CircleDecorationComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'circle-decoration',
  templateUrl: 'circle-decoration.html'
})
export class CircleDecorationComponent {

  text: string;

  constructor() {
    console.log('Hello CircleDecorationComponent Component');
    this.text = 'Hello World';
  }

}
