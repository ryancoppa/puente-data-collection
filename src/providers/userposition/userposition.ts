import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Geolocation, GeolocationOptions } from '@ionic-native/geolocation';

@Injectable()
export class UserpositionProvider {

  //Enables Options from Geolocation Import
  options: GeolocationOptions;

  coordinates = {
    latitude : null,
    longitude: null
  }

  constructor(private geolocation:Geolocation) {
    console.log('Hello UserpositionProvider');
  }

  public getUserPosition() {
    //Retrieves coordinates of the user
    this.options = {
      enableHighAccuracy : true
    };
    
    return this.geolocation.getCurrentPosition(this.options)
  }
 

}
