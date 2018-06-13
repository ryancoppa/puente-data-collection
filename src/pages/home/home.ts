import { Component } from '@angular/core';
import { App } from 'ionic-angular';
import { ToastController } from 'ionic-angular';


// Providers
import { ParseProvider } from '../../providers/parse/parse'; //TO REMOVE
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

export class HomePage {
  //Enables Options from Geolocation Import
  options: GeolocationOptions;
  
  //Variables in Survey
  //TO REMOVE
  newSurvey =
  {
    
    fname: null,
    lname: null,
    dob: null,
    sex: null,
    telephoneNumber: null,
    marriageStatus: null,
    numberofIndividualsLivingintheHouse: null,
    numberofChildrenLivinginHouseUndertheAgeof5: null,
    occupation: null,
    educationLevel: null,
    communityname: null,
    yearsLivedinthecommunity: null,
    yearsLivedinThisHouse: null,
    memberofthefollowingorganizations: null,

    latitude: null,
    longitude: null,
    location: null,

    waterAccess: null,
    typeofWaterdoyoudrink: null,
    latrineAccess: null,
    typeofHealthinsuranceDoyouHave: null,
    clinicAccess: null,
    medicalproblemswheredoyougo: null,
    lastimeyouwenttodoctor: null,
    dentalproblemswheredoyougo: null,
    lastimeyouwenttodentist: null,

    hadSurgery: null,
    surgeryWhatKind: null,

    medicalIllnesses: null,
    whenDiagnosed: null,
    whatDoctorDoyousee: null,
    didDoctorRecommend: null,
    treatment: null,
    problemswithIllness: null,

    medicalIllnesses1: null,
    whenDiagnosed1: null,
    whatDoctorDoyousee1: null,
    didDoctorRecommend1: null,
    treatment1: null,
    problemswithIllness1: null,

    medicalIllnesses2: null,
    whenDiagnosed2: null,
    whatDoctorDoyousee2: null,
    didDoctorRecommend2: null,
    treatment2: null,
    problemswithIllness2: null,

    pregnantCurrently: null,
    takesprenatal: null,
    reasonfornottakingprenatal: null,
    locationtodeliverbaby: null,
    reasonforlocationtodeliverbaby: null,
    haveyoueverbeenpregnant: null,
    accesstoPrenatalVitamins: null,
    reasonfornoaccesstoprenatal: null,
    wheredidyoudeliver: null,
    salthaveiodine: null,
    hadHPVVaccine: null,
    tellmeimportanceofiodine: null,

    doyouhavemedicalconcerns: null,
    bloodPressure: null,
    bloodSuger: null,
    hemoglobinLevel: null,
    height: null,
    physicalFindings: null,
    AssessmentandEvaluation: null,
    planOfAction: null,
    notes: null,

    haveToothbrush: null,
    howoftenbrushteeth: null,
    howmanysugarydrinks: null,
    doyouhavecavities: null,
    haveyouhadcavities: null,
    toothPulledout: null,
    haveMouthPain: null,
    dentalFindings: null,
    //DentalAssessmentandEvaluation: null,
    AssessmentandEvaluationDental: null,
    planOfActionDental: null,
    notesDental: null,

    cedulaNumber:null,
    /*
    waterAccess: null,
    typeofWaterdoyoudrink: null,
    latrineAccess: null,
    typeofHealthinsuranceDoyouHave: null,
    clinicAccess: null,
    medicalproblemswheredoyougo: null,
    lastimeyouwenttodoctor: null,
    dentalproblemswheredoyougo: null,
    lastimeyouwenttodentist: null,

    conditionoFloorinyourhouse: null,
    conditionoRoofinyourhouse: null,
    availableTrashManagementandDisposalServices: null,
    trashDisposalLocation: null,
    */
    
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
    //private parseProvider: ParseProvider, //TO REMOVE
    private auth: AuthProvider,  
    private app: App, 
    private geolocation:Geolocation) {
    
    this.auth.authenticated();

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
  


  public getUserPosition() {
    //Retrieves coordinates of the user
    this.options = {
      enableHighAccuracy : true
    };
    
    this.geolocation.getCurrentPosition(this.options).then((resp) => {
      let latitude = resp.coords.latitude;
      let longitude = resp.coords.longitude;
      
      this.newSurvey.latitude = latitude;
      this.newSurvey.longitude = longitude;

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
  
  openProfileModal() {
    //Opens Profile Modal Page
    let myModal = this.modalCtrl.create(ProfileModalPage);

    //.present() shows modal
    myModal.present();
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
