//import { Component, ViewChild, ElementRef } from '@angular/core';
import { Component } from '@angular/core';
import { NavController, Refresher } from 'ionic-angular';

//Providers
import { ParseProvider } from '../../providers/parse/parse';
import { AuthProvider } from '../../providers/auth/auth';
import { Geolocation } from '@ionic-native/geolocation';

import leaflet from 'leaflet';

declare var google;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  //@ViewChild('map') mapContainer: ElementRef;
  //options: GeolocationOptions;

  map: any;
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
    //this.loadmap();
    //this.getUserPosition();
  }
  ionViewDidLoad() {
    this.initializeMap();
    
  }
  ionViewDidEnter() {
    //this.getUserPosition();
    //this.getActiveUserPosition();
  }
  ionViewDidLeave() {
    //this.removeMap();
  }

 //This function gets the static coordinates of the user
 initializeMap() {
  let locationOptions = {timeout: 10000, enableHighAccuracy: true};

  this.geolocation.getCurrentPosition(locationOptions).then((position) => {

      let options = {
        center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      /* Show our lcoation */
      this.map = new google.maps.Map(document.getElementById("map_canvas"), options);

      /* We can show our location only if map was previously initialized */
      this.showMyLocation();

  }).catch((error) => {
      console.log('Error getting location', error);
    });
}
  /*
   * This function will create and show a marker representing your location
  */
  showMyLocation(){

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
  //Adds Results of Assets Forms to Parse Object
  //Pushes those results to the survey (via addAssetsResults)
  //Clears Survey
  public postAssetsConfirm() {
    this.parseProvider.addAssetsResults(this.newAssets).then((assetPoint) => {
      this.assetPoints.push(assetPoint);
      for (var key in this.newAssets){
        this.newAssets[key] = null;
      }
    }, (error) => {
      console.log(error);
      alert('Error Confirming.');
    });
    //this.getUserPosition();
  }

  public loadmap() {
  //async loadmap() {
    //create map
    this.map = leaflet.map("map").fitWorld();
    //create tilelayer
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
    }).addTo(this.map);

    //
    this.map.locate({
      setView: true,
      maxZoom: 10
    }).on('locationfound', (e) => {
      let markerGroup = leaflet.featureGroup();
      //creates actions when marker is clicked
      let marker: any = leaflet.marker([e.latitude, e.longitude]).on('click', () => {
        //alert('Marker clicked');
        //allows form input data
      /*}).bindPopup(
      '<form role="form" id="form" onsubmit="return addMarker();">'+
          '<div class="form-group">'+
            '<label class="control-label col-sm-10"><strong>Asset Thats Being Mapped </strong></label>'+ "<br>" +
            '<select class="form-control" id="toc" name="toc">'+
              '<option value="Pothole">Pothole</option>'+
              '<option value="Construction">Construction</option>'+
              '<option value="Road Closed">Road Closed</option>'+
              '<option value="Other">Other...</option>'+
            '</select>'+ 
          '</div>'+

          '<div class="form-group2">'+
              '<label class="control-label col-sm-10"><strong>Description of Complaint </strong></label>'+ "<br>" +
              '<input type="text" placeholder="Extra Information" id="doc" name="extra" class="form-control"/>'+ 
          '</div>'+

          '<div class="form-group">'+
              '<div style="text-align:center;" class="col-xs-11"><button style="text-align:center;" id="submit" value="submit" class="btn btn-primary trigger-submit">Submit</button></div>'+
          '</div>'+ "<br>" +
      '</form>'); */
      }).bindPopup()
      markerGroup.addLayer(marker);
      this.map.addLayer(markerGroup);
      }).on('locationerror', (err) => {
        alert(err.message);
    })

    
  }
  public removeMap(){
    this.map.remove();
  }

  doRefresh(refresher : Refresher) {
    setTimeout(() => {
      refresher.complete();
    }, 500);
  }

}