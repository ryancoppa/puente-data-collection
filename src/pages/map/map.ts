import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';

//Providers
import { ParseProvider } from '../../providers/parse/parse'; //To Remove
import { AuthProvider } from '../../providers/auth/auth';
import { MapControlsProvider } from '../../providers/map-controls/map-controls';
import { UiUxProvider } from '../../providers/ui-ux/ui-ux';
import { UserpositionProvider } from '../../providers/userposition/userposition';

declare var google;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  map: any;
  options: any;

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
    public loadingCtrl: LoadingController,
    private mapCtrl: MapControlsProvider,
    private themeCtrl:UiUxProvider,
    private userPst:UserpositionProvider) {
      this.options = this.userPst.options;
      this.newAssets.surveyingOrganization;
  }

  ionViewWillEnter() {
  }
  ionViewDidLoad() {
    this.themeCtrl.customLoading();
    this.initializeMap().then(() => {
      this.mapCtrl.addMultipleMarkers(
        this.map,
        this.pageUserLocation.latitude,
        this.pageUserLocation.longitude,
        this.newAssets.surveyingOrganization,
        this.queryimage,this.markerArray)
        .then(() => { 
          this.setMarkersMapOnAll(this.map);
      });
    }); 
  }
  ionViewDidEnter() {      
  }
  ionViewDidLeave() {
  }

  /*
    Map Creation
  */
  public initializeMap() {
    return this.userPst.getUserPosition().then((position) => {

        let mapOptions = {
          center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
          zoom: 16,
          fullscreenControl: false,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.pageUserLocation.latitude = position.coords.latitude;
        this.pageUserLocation.longitude = position.coords.longitude;

        //loading.dismiss();
        
        /* Create Map */
        this.map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

        /* We can show our location only if map was previously initialized */
        //this.addMarker(position.coords.latitude, position.coords.longitude,'User Location', this.userimage);
        this.mapCtrl.addMarker(this.map,position.coords.latitude,position.coords.longitude,'User Location', this.userimage,this.markerArray);

    }).catch((error) => {
        console.log('Error getting location', error);
      });
  }

  setMarkersMapOnAll(map) {
    // Sets the map on all markers in the array.
    for (var i = 0; i < this.markerArray.length; i++) {
      this.markerArray[i].setMap(map);
    }
  }
  
  showMarkers() {
    /*
    Shows any markers currently in the array.
    */
    this.setMarkersMapOnAll(this.map);
  }

  
  clearMarkers() {
    /*
      Removes the markers from the map, but keeps them in the array.
    */
    this.setMarkersMapOnAll(null);
  }

  
  deleteMarkers() {
    /*
    Deletes all markers in the array by removing references to them.
    */
    this.clearMarkers();
    this.markerArray = [];
    this.mapCtrl.addMarker(this.map,this.pageUserLocation.latitude,this.pageUserLocation.longitude,'User Location',this.userimage,this.markerArray);
  }


  restartMarkers(){
    /*
      Reinitiate Everything
    */
    this.mapCtrl.addMultipleMarkers(this.map,this.pageUserLocation.latitude,this.pageUserLocation.longitude,this.newAssets.surveyingOrganization,this.queryimage,this.markerArray).then(() => {
      this.setMarkersMapOnAll(this.map);
    });
  }
  
  /*
    Geolocation
  */
  public getUserPosition() {

    //Loading Controller
    let loading = this.loadingCtrl.create({
      content: 'Retrieving Location...'
    });

    loading.present();
    
    return this.userPst.getUserPosition().then((resp) => {
      let latitude = resp.coords.latitude;
      let longitude = resp.coords.longitude;
      
      this.newAssets.latitude = latitude;
      this.newAssets.longitude = longitude;

      this.pageUserLocation.latitude = latitude;
      this.pageUserLocation.longitude = longitude;

      loading.dismiss();

      this.themeCtrl.toasting(String([latitude,longitude]), 'top')

      console.log(latitude,longitude)

    }).catch((error) => {
      console.log('Error getting location ',error);
    });
  }
  
  public centerMap(){
    //this.userPst.getUserPosition().then((resp) => {
      this.map.setCenter(new google.maps.LatLng(this.pageUserLocation.latitude, this.pageUserLocation.longitude));
    //}) 
    
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
        //this.presentToast('Submitted | Entregado',1000);
        this.themeCtrl.toasting('Submitted | Entregado', 'bottom');
      }, (error) => {
        console.log(error);
        alert('Error Confirming.');
      });
    });
  }

}