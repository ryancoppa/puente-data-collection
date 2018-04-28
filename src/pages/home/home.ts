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
  newSurveyOld =
  {
    fname: null,
    lname: null,
    dob: null,
    sex: null,
    marriageStatus: null,
    occupation: null,
    publicPrivateInsurance: null,
    memberProgresando: null,
    memberOfAssociation: null,
    nameOfAssociation: null,
    familyHistoryDiabetes: null,
    familyHIstoryCardiacDisease: null,
    familyHistoryofAlcoholism: null,
    familyHistoryofBreastCancer: null,
    familyHistoryofProstateCancer: null,
    familyHistoryofMentalDisease: null,
    diabetesDiagnosis: null,
    respiratoryproblems: null,
    cardiacproblems: null,
    numberofAlchoholDrinks: null,
    sexualHealth_Diseasesaproblem: null,
    sexualHealth_Teenagepregnancyaproblem: null,
    waterAccess: null,
    waterQuality: null,
    waterAccessfrequency: null,
    clinicAccess: null,
    latrineAccess: null,
    trashDisposalLocation: null,
    numberofpeoplelivingintheHouse: null,
    childrenUnder5LivinginHouse: null,
    conditionofHouse_Roof: null,
    conditionofHouse_Floor: null,
    conditionofHouse_Walls: null,
    biggestProblemintheCommunity: null,
    biggestProblemintheRegion: null,
    howCanWeFixIt: null,
    dayConvenience: null,
    hourConvenience:null,
    latitude: null,
    longitude: null
  };
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
    longitude: null
  }
  //Array used to Display Results from Query
  surveyPoints = []

  constructor(private toastCtrl: ToastController, public modalCtrl: ModalController, private parseProvider: ParseProvider, private auth: AuthProvider,  private app: App, private geolocation:Geolocation) {
    this.listPoints();
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
  //Retrieves list of surveys from server
  public listPoints(): Promise<any> {
    //Creates a natural "skip" of certain results based on surveyPoints length
    let offset = this.surveyPoints.length;

    //Limits the length of the searched results
    let limit = 10;

    //Returns the query then displays those "result" by pushing into surveyPoints object
    return this.parseProvider.getSurveyPoints(offset, limit).then((result) => {
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
      enableHighAccuracy : false
    };
    
    this.geolocation.getCurrentPosition(this.options).then((resp) => {
      let latitude = resp.coords.latitude;
      let longitude = resp.coords.longitude;
      
      this.newSurvey.latitude = latitude;
      this.newSurvey.longitude = longitude;
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

  //Other Pages
  //Opens Profile Modal Page
  openModal() {
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

}
