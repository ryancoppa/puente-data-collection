import { Component, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/debounceTime';

/**
 * Generated class for the SearchbarObjectIdComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'searchbar-object-id',
  templateUrl: 'searchbar-object-id.html'
})
export class SearchbarObjectIdComponent {
  @Output() emitObjectIDfromComponent = new EventEmitter();

  searchTerm: string = '';
  allItems: any;
  filteredItems:any;
  selectedItem:any;

  constructor(public navCtrl: NavController) {
    //Compile list of objects
    this.allItems = [
      {title: 'one'},
      {title: 'two'},
      {title: 'three'},
      {title: 'four'},
      {title: 'five'},
      {title: 'six'}
    ]
  }

  ionViewDidLoad() {
  }

  ionViewDidEnter(){
    this.filteredItems = this.allItems;
  }

  setItem(item){
    /*
    Sets item selected from list to selectedItem to be emitted.
    For List of Buttons
    */
    this.selectedItem = item;

    //Emits selectedItem to the parent class
    this.emitObjectIDfromComponent.emit(this.selectedItem);
    console.log(this.selectedItem.title);
  }

  filterItems(){
    /*
    For Searchbar
    */

    this.filteredItems = this.allItems.filter((location) => {
      return location.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    });

  }

}
