//import { Component, ViewChild, ElementRef } from '@angular/core';
import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';

//Providers
import { ParseProvider } from '../../providers/parse/parse';
import { AuthProvider } from '../../providers/auth/auth';
import { Geolocation, GeolocationOptions } from '@ionic-native/geolocation';

declare var google;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  map: any;
  options: GeolocationOptions;
  newAssets = {
    physicalName: null,
    humanName: null,

    physicalAsset: null,
    humanAsset: null,
    
    latitude: null,
    longitude: null,
    surveyingUser: this.auth.currentUser().name,
    surveyingOrganization: this.auth.currentUser().organization
  };

  pageUserLocation = {
    latitude: null,
    longitude: null
  };

  assetPoints = [];
  markerArray = [];

  userimage = 'assets/icon/user.png';
  queryimage = 'assets/icon/users-group.png';

  constructor(private parseProvider: ParseProvider, 
    public navCtrl: NavController,
    private auth: AuthProvider, 
    public geolocation: Geolocation,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController) {
  }

  ionViewWillEnter() {
  }
  ionViewDidLoad() {
    this.initializeMap().then(() => {
      this.addMultipleMarkers().then(() => {
        this.setMarkersMapOnAll(this.map);
      });
    });
     
  }
  ionViewDidEnter() {
    //this.addMultipleMarkers();
      
  }
  ionViewDidLeave() {
  }

  /*
    Map Creation
  */
  public initializeMap() {
    //This function gets the static coordinates of the user
    let locationOptions = { 
      timeout: 10000, 
      enableHighAccuracy: true
    };

    //Loading Controller
    let loading = this.loadingCtrl.create({
      content: 'Initializing Map...'
    });

    loading.present();

    return this.geolocation.getCurrentPosition(locationOptions).then((position) => {

        let options = {
          center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
          zoom: 16,
          fullscreenControl: false,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.pageUserLocation.latitude = position.coords.latitude;
        this.pageUserLocation.longitude = position.coords.longitude;
        loading.dismiss();
        
        /* Create Map */
        this.map = new google.maps.Map(document.getElementById("map_canvas"), options);

        /* We can show our location only if map was previously initialized */
        this.addMarker(position.coords.latitude, position.coords.longitude,'User Location', this.userimage);

    }).catch((error) => {
        console.log('Error getting location', error);
      });
  }
  
  addMarker(latitude: number, longitude: number, markerInformation:string,image){
    /*
    * Adds a marker to the map and push to the array.
    */
    let marker = new google.maps.Marker({
        map: this.map,
        icon: image,
        animation: google.maps.Animation.DROP,
        position: {
          lat: latitude,
          lng: longitude
        },
    });

    //let markerInfo = "<h4>You are here!</h4>";
    let markerInfo = markerInformation;         

    let infoModal = new google.maps.InfoWindow({
        content: markerInfo
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoModal.open(this.map, marker);
    });

    //Google's Solution
    //Pushes marker into Array
    this.markerArray.push(marker);
  }
  
  addMultipleMarkers(){
    //this.getUserPosition();
        
    //Acts as Users Location
    let latitude = this.pageUserLocation.latitude;
    let longitude = this.pageUserLocation.longitude;

    /*
      Parse
    */

    //Limits the length of the searched results
    let limit = 500;
    let parseClass = 'SurveyData';

    //return this.parseProvider.geoQuery(latitude,longitude,limit, parseClass).then((result) => {
    return this.parseProvider.geoQuery(latitude,longitude,limit, parseClass).then((result) => {
      for (let i = 0; i < result.length; i++) {
        let object = result[i];
        //this.addMarker([object.get('latitude'),object.get('longitude')],"Local Survey Queries");
        
        //Loops and pushes each marker into markerArray
        if (object.get('latitude') != null || object.get('longitude') != null) {
          this.addMarker(object.get('latitude'),object.get('longitude'),object.get('fname'),this.queryimage);
        }
      }
    }, (error) => {
      console.log(error);
    });
  }

  setMarkersMapOnAll(map) {
    // Sets the map on all markers in the array.
    for (var i = 0; i < this.markerArray.length; i++) {
      this.markerArray[i].setMap(map);
    }
  }

  // Shows any markers currently in the array.
  showMarkers() {
    this.setMarkersMapOnAll(this.map);
  }
  // Removes the markers from the map, but keeps them in the array.
  clearMarkers() {
    this.setMarkersMapOnAll(null);
  }

  // Deletes all markers in the array by removing references to them.
  deleteMarkers() {
    this.clearMarkers();
    this.markerArray = [];
    this.addMarker(this.pageUserLocation.latitude,this.pageUserLocation.longitude,'User Location',this.userimage);
  }

  // Reinitiate Everything
  restartMarkers(){
    this.addMultipleMarkers().then(() => {
      this.setMarkersMapOnAll(this.map);
    });
  }
  
  /*
    Geolocation
  */
  public getUserPosition() {
    //Retrieves coordinates of the user
    this.options = {
      enableHighAccuracy : true
    };

    //Loading Controller
    let loading = this.loadingCtrl.create({
      content: 'Retrieving Location...'
    });

    loading.present();
    
    return this.geolocation.getCurrentPosition(this.options).then((resp) => {
      let latitude = resp.coords.latitude;
      let longitude = resp.coords.longitude;
      
      this.newAssets.latitude = latitude;
      this.newAssets.longitude = longitude;

      this.pageUserLocation.latitude = latitude;
      this.pageUserLocation.longitude = longitude;

      loading.dismiss();
      this.presentToast(String([latitude,longitude]),1500);
      console.log(latitude,longitude)
    }).catch((error) => {
      console.log('Error getting location hence getting user position',error);
    });
  }
  
  public centerMap(){ 
    this.map.setCenter(new google.maps.LatLng(this.newAssets.latitude, this.newAssets.longitude));
  }

  /*
    Survey
  */
  public postAssetsConfirm() {
    //Adds Results of Assets Forms to Parse Object
    //Pushes those results to the survey (via addAssetsResults)
    //Clears Survey
    //Because I'm lazy
    this.newAssets.surveyingOrganization = this.auth.currentUser().name;
    this.newAssets.surveyingUser = this.auth.currentUser().organization;

    this.getUserPosition().then(() => {

      this.parseProvider.addAssetsResults(this.newAssets).then((assetPoint) => {
        this.assetPoints.push(assetPoint);
        for (var key in this.newAssets){
          this.newAssets[key] = null;
        }
        this.presentToast('Submitted | Entregado',1000);
      }, (error) => {
        console.log(error);
        alert('Error Confirming.');
      });
    });
  }

  /*
    Controllers
  */
  presentToast(message:string, duration:number) {
    /*
    A Toast is a subtle notification commonly used in modern applications. 
    It can be used to provide feedback about an operation or to display a system message.
    The toast appears on top of the app's content, and can be dismissed 
    by the app to resume user interaction with the app.
    */
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

}