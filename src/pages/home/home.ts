import { Component } from '@angular/core';
import { App } from 'ionic-angular';
import { ToastController, ModalController, NavController } from 'ionic-angular';


// Providers
//import { ParseProvider } from '../../providers/parse/parse'; //TO REMOVE
import { AuthProvider } from '../../providers/auth/auth';
import { Geolocation, GeolocationOptions } from '@ionic-native/geolocation';

// Pages
import { SigninPage } from '../signin/signin';
import { VisualChartsPage } from '../visual-charts/visual-charts';
import { ProfileModalPage } from '../profile-modal/profile-modal';
import { MapPage } from '../map/map';
import { FindRecordsPage } from '../find-records/find-records';

// Form Components
import { PatientIDForm } from '../../components/forms/patientid/patientid';
import { EnvironmentalHistoryForm } from '../../components/forms/environmentalhistory/environmentalhistory';
import { MedicalHistoryForm } from '../../components/forms/medicalhistory/medicalhistory';
import { VitalsForm } from '../../components/forms/vitals/vitals';
import { EvaluationMedicalForm } from '../../components/forms/evaluation-medical/evaluation-medical';
import { EvaluationSurgicalForm } from '../../components/forms/evaluation-surgical/evaluation-surgical';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  /*
    Template NG-MODELS
  */
  //Set Default NG-model
  viewMode = 'datacollection';

  //Enables Options from Geolocation Import
  options: GeolocationOptions;
  
  //Variables in Survey
  //TO REMOVE
  newSurvey =
  {
   
    latitude: null,
    longitude: null,
    location: null,
    
    surveyingUser: this.auth.currentUser().name,
    surveyingOrganization: this.auth.currentUser().organization
  }

  //SAVE THIS SOLUTION
  accordionItems: any = [];
  
  //TO REMOVE
  //Array used to Display Results from Pushed from Server Query
  surveyPoints = []

  constructor(private toastCtrl: ToastController, 
    public modalCtrl: ModalController, 
    private navCtrl: NavController,
    //private parseProvider: ParseProvider, //TO REMOVE
    private auth: AuthProvider,  
    private app: App, 
    private geolocation:Geolocation) {
    
    this.auth.authenticated();
    this.viewMode 

    //SAVE SOLUTION
    this.accordionItems = [
      {expanded: false},
      {expanded: false},
      {expanded: false},
      {expanded: false},
      {expanded: false}
    ];
  }

  ionViewCanEnter(): boolean {
    return this.auth.authenticated();
  }
  ionViewDidEnter() {
    //Gets User Position once user has entered homepage
    this.getUserPosition();  
  }
  
  /*
    Functions
  */
  

  //TO REMOVE
  //turn into geopostion provider
  public getUserPosition() {
    //Retrieves coordinates of the user
    this.options = {
      enableHighAccuracy : true
    };
    
    this.geolocation.getCurrentPosition(this.options).then((resp) => {
      let latitude = resp.coords.latitude;
      let longitude = resp.coords.longitude;
      
      //this.newSurvey.latitude = latitude;
      //this.newSurvey.longitude = longitude;

      //Because I'm lazy
      this.newSurvey.surveyingOrganization = this.auth.currentUser().organization;
      this.newSurvey.surveyingUser = this.auth.currentUser().name;
      console.log(latitude,longitude)
    }).catch((error) => {
      console.log('Error getting location',error);
    });
  }
 
  /*
    Navigation
  */
  //Forms
  openProfileModal() {
    //Opens Profile Modal Page
    let myModal = this.modalCtrl.create(ProfileModalPage);

    //.present() shows modal
    myModal.present();
  }

  openPatientID() {
    //this.navCtrl.push(PatientIDForm);
    let myModal = this.modalCtrl.create(PatientIDForm);

    //.present() shows modal
    myModal.present();
  }

  openEnvironmentalHistory() {
    let myModal = this.modalCtrl.create(EnvironmentalHistoryForm);

    myModal.present();
  }

  openMedicalHistory() {
    let myModal = this.modalCtrl.create(MedicalHistoryForm);

    myModal.present();
  }

  openVitals() {
    let myModal = this.modalCtrl.create(VitalsForm);

    myModal.present();
  }

  openMedicalEvaluation() {
    let myModal = this.modalCtrl.create(EvaluationMedicalForm);

    myModal.present();
  }

  openSurgicalEvaluation() {
    let myModal = this.modalCtrl.create(EvaluationSurgicalForm);

    myModal.present();
  }
  //Pages
  openCharts() {
    this.navCtrl.push(VisualChartsPage);
  }

  openMapPage() {
    this.navCtrl.push(MapPage);
  }

  openFindRecords() {
    this.navCtrl.push(FindRecordsPage);
  }

  /*
    Authentication
  */
  public signout() {
    this.auth.signout().subscribe(() => {
      this.app.getRootNav().setRoot(SigninPage);
    });
  }

  /*
    Controllers
  */
  presentToast() {
    /*
    A Toast is a subtle notification commonly used in modern applications. 
    It can be used to provide feedback about an operation or to display a system message.
    The toast appears on top of the app's content, and can be dismissed 
    by the app to resume user interaction with the app.
    */
    let toast = this.toastCtrl.create({
      message: 'Submitted | Entregado',
      duration: 2500,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  doRefresh(refresher){
    console.log('Begin async operation for refresher', refresher);
    //this.listPoints();
    setTimeout(() => {
      console.log('Async operation for refresher has ended');
      //this.listPoints();
      refresher.complete();
    }, 2000);
  }

  //SAVE SOLUTION
  //TODO, put back into accordion component
  expandItem(item){
 
    this.accordionItems.map((listItem) => {

        if(item == listItem){
            listItem.expanded = !listItem.expanded;
        } else {
            listItem.expanded = false;
        }

        return listItem;

    });

  }

}
