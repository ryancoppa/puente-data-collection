//import { Component, ViewChild, ElementRef } from '@angular/core';
import { Component } from '@angular/core';
import { NavController, Refresher } from 'ionic-angular';

//Providers
import { ParseProvider } from '../../providers/parse/parse';
import { AuthProvider } from '../../providers/auth/auth';
import { Geolocation, GeolocationOptions } from '@ionic-native/geolocation';

//import leaflet from 'leaflet';

declare var google;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  map: any;
  options: GeolocationOptions;
  newAssets =
  {
    physicalName: null,
    humanName: null,

    physicalAsset: null,
    humanAsset: null,
    
    latitude: null,
    longitude: null,
    surveyingUser: this.auth.currentUser().name,
    surveyingOrganization: this.auth.currentUser().organization
  };

  assetPoints = []

  constructor(private parseProvider: ParseProvider, 
    public navCtrl: NavController,
    private auth: AuthProvider, 
    public geolocation: Geolocation) {
  }

  ionViewWillEnter() {
  }
  ionViewDidLoad() {
    this.initializeMap(); 
  }
  ionViewDidEnter() {
  }
  ionViewDidLeave() {
  }

 
  public initializeMap() {
    //This function gets the static coordinates of the user
    let locationOptions = { 
      timeout: 10000, 
      enableHighAccuracy: true
    };

    this.geolocation.getCurrentPosition(locationOptions).then((position) => {

        let options = {
          center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
          zoom: 16,
          fullscreenControl: false,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        /* Show our lcoation */
        this.map = new google.maps.Map(document.getElementById("map_canvas"), options);

        /* We can show our location only if map was previously initialized */
        this.addMarker();

    }).catch((error) => {
        console.log('Error getting location', error);
      });
  }
  
  addMarker(){
    /*
    * This function will create and show a marker representing your location
    */
    let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: this.map.getCenter()
    });

    let markerInfo = "<h4>You are here!</h4>";         

    let infoModal = new google.maps.InfoWindow({
        content: markerInfo
    });

    google.maps.event.addListener(marker, 'click', () => {
        infoModal.open(this.map, marker);
    });
  }
  
  public getUserPosition() {
    //Retrieves coordinates of the user
    this.options = {
      enableHighAccuracy : true
    };
    
    this.geolocation.getCurrentPosition(this.options).then((resp) => {
      let latitude = resp.coords.latitude;
      let longitude = resp.coords.longitude;
      
      this.newAssets.latitude = latitude;
      this.newAssets.longitude = longitude;

      //this.map.setCenter(new google.maps.LatLng(latitude, longitude));
      this.centerMap(latitude,longitude);
      console.log(latitude,longitude)
    }).catch((error) => {
      console.log('Error getting location hence getting user position',error);
    });
  }
  

  public centerMap(latitude, longitude){ 
    this.map.setCenter(new google.maps.LatLng(latitude, longitude));
  }

  public postAssetsConfirm() {
    //Adds Results of Assets Forms to Parse Object
    //Pushes those results to the survey (via addAssetsResults)
    //Clears Survey
    //Because I'm lazy
    this.newAssets.surveyingOrganization = this.auth.currentUser().name;
    this.newAssets.surveyingUser = this.auth.currentUser().organization;

    this.getUserPosition();

    this.parseProvider.addAssetsResults(this.newAssets).then((assetPoint) => {
      this.assetPoints.push(assetPoint);
      for (var key in this.newAssets){
        this.newAssets[key] = null;
      }
    }, (error) => {
      console.log(error);
      alert('Error Confirming.');
    });
  }

}