import { Component, Input, ViewChild, ElementRef, Renderer } from '@angular/core';

/**
 * Generated class for the AccordionComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'accordion',
  templateUrl: 'accordion.html'
})
export class AccordionComponent {

  @ViewChild('expandWrapper', {read: ElementRef}) expandWrapper;
  @Input('expanded') expanded;
  //@Input('expandHeight') expandHeight;

  constructor(public renderer: Renderer) {
    console.log('Hello AccordionComponent Component');
  }

  ngAfterViewInit(){
    //this.renderer.setElementStyle(this.expandWrapper.nativeElement, 'height', this.expandHeight + 'px');
    this.renderer.setElementStyle(this.expandWrapper.nativeElement, 'height', 'auto');   
}

}
