import { Component } from '@angular/core';
import { App } from 'ionic-angular';
import { ToastController } from 'ionic-angular';


// Providers
import { ParseProvider } from '../../providers/parse/parse';
import { AuthProvider } from '../../providers/auth/auth';
import { Geolocation, GeolocationOptions } from '@ionic-native/geolocation';

// Pages
import { SigninPage } from '../signin/signin';
import { ModalController } from 'ionic-angular';
import { ProfileModalPage } from '../profile-modal/profile-modal';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

// Declare Variables
export class HomePage {
  //Enables Options from Geolocation Import
  options: GeolocationOptions;
  
  //Variables in Survey
  newSurvey =
  {
    fname: null,
    lname: null,
    dob: null,
    sex: null,
    marriageStatus: null,
    numberofIndividualsLivingintheHouse: null,
    numberofChildrenLivingintheHouse: null,
    numberofChildrenLivinginHouseUndertheAgeof5: null,
    occupation: null,
    educationLevel: null,
    telephoneNumber: null,
    communityname: null,
    yearsLivedinthecommunity: null,
    memberofthefollowingorganizations: null,
    typeofHealthinsuranceDoyouHave: null,
    frequencyofYourMedicalVisits: null,
    familyhistory: null,
    diagnosisfromadoctor: null,
    sexuallytransmitteddiseasesinyourcommunity: null,
    teenagePregnancyprevalentinyourcommunity: null,
    waterAccess: null,
    typeofWaterdoyoudrink: null,
    clinicAccess: null,
    qualityClinicService: null,
    latrineAccess: null,
    conditionoFloorinyourhouse: null,
    conditionoRoofinyourhouse: null,
    availableTrashManagementandDisposalServices: null,
    trashDisposalLocation: null,
    immediateCare: null,
    biggestProblemintheimmediatecommunity: null,
    biggestProblemintheregion: null,
    howCanweaddressandimprovethesituation: null,
    otherOrganizationsYouKnow: null,
    dayMostConvenient: null,
    hourMostConvenient: null,

    latitude: null,
    longitude: null,
    location: null,
    
    surveyingUser: this.auth.currentUser().name,
    surveyingOrganization: this.auth.currentUser().organization
  }
  //Array used to Display Results from Query
  surveyPoints = []

  constructor(private toastCtrl: ToastController, 
    public modalCtrl: ModalController, 
    private parseProvider: ParseProvider, 
    private auth: AuthProvider,  
    private app: App, 
    private geolocation:Geolocation) {
    this.listPoints();
    this.auth.authenticated();
  }

  ionViewCanEnter(): boolean {
    return this.auth.authenticated();
  }
  ionViewDidEnter() {
    //Gets User Position once user has entered homepage
    this.getUserPosition();
    //this.listPoints();
  
  }
  /*
    Functions
  */
  //Retrieves list of surveys from server
  public listPoints(): Promise<any> {
    //Creates a natural "skip" of certain results based on surveyPoints length
    let offset = this.surveyPoints.length;

    //Limits the length of the searched results
    let limit = 10;

    //Returns the query then displays those "result" by pushing into surveyPoints object
    //Based on Parse surveyingOrganization Column and name of organization for the User
    return this.parseProvider.basicQuery(offset, limit, 'SurveyData', 'surveyingOrganization', this.auth.currentUser().organization).then((result) => {
      for (let i = 0; i < result.length; i++) {
        let object = result[i];
        this.surveyPoints.push(object);
      }
    }, (error) => {
      console.log(error);
    });
  }

  //Retrieves coordinates of the user
  public getUserPosition() {
    this.options = {
      enableHighAccuracy : true
    };
    
    this.geolocation.getCurrentPosition(this.options).then((resp) => {
      let latitude = resp.coords.latitude;
      let longitude = resp.coords.longitude;
      
      this.newSurvey.latitude = latitude;
      this.newSurvey.longitude = longitude;

      //Because I'm lazy
      this.newSurvey.surveyingOrganization = this.auth.currentUser().name;
      this.newSurvey.surveyingUser = this.auth.currentUser().organization;
      console.log(latitude,longitude)
    }).catch((error) => {
      console.log('Error getting location',error);
    });
  }
 

  //Adds Element to parseServer (newSurvey)
  //Then adds element to local array (surveyPoint)
  //Then clears the Form/array (surveyPoint)
  public postSurveyConfirm() {
    this.parseProvider.addSurveyResults(this.newSurvey).then((surveyPoint) => {
      this.surveyPoints.push(surveyPoint);
      for (var key in this.newSurvey){
        this.newSurvey[key] = null;
      }
    }, (error) => {
      console.log(error);
      alert('Error Confirming.');
    });
    //Update User Position?
    this.getUserPosition();
  }

  //Navigation
  //Opens Profile Modal Page
  openProfileModal() {
    let myModal = this.modalCtrl.create(ProfileModalPage);

    //.present() shows modal
    myModal.present();
  }
  

  //Authentication
  public signout() {
    this.auth.signout().subscribe(() => {
      this.app.getRootNav().setRoot(SigninPage);
    });
  }

  ///Alerts
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

    setTimeout(() => {
      console.log('Async operation for refresher has ended');
      this.listPoints();
      refresher.complete();
    }, 2000);
  }

}
