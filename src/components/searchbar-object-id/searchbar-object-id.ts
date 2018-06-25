import { Component } from '@angular/core';
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

  searchTerm: string = '';
  allItems: any;
  filteredItems:any;

  constructor(public navCtrl: NavController) {
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

  filterItems(){
    /*
    return this.items.filter((item) => {
      return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });    */

    this.filteredItems = this.allItems.filter((location) => {
      return location.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    });

  }

}
