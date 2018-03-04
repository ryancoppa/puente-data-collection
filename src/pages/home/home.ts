import { Component } from '@angular/core';
import { App, NavController } from 'ionic-angular';

// Providers
import { ParseProvider } from '../../providers/parse/parse';
import { AuthProvider } from '../../providers/auth/auth';

// Pages
import { SigninPage } from '../signin/signin';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

// Declare Variables
export class HomePage {
  newSurvey =
  {
    fname: null,
    lname: null,
    age: null,
    sex: null,
    marriageStatus: null,
    occupation: null,
    phoneNumber: null,
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
    hourConvenience:null
  };
  surveyPoints = []

  constructor(private parseProvider: ParseProvider, private auth: AuthProvider, private navCtrl: NavController, private app: App) {
    this.listPoints();
  }

  ionViewCanEnter(): boolean {
    return this.auth.authenticated();
  }

  //List
  // This Function is for the Buttom Part of the Survey
  public listPoints(): Promise<any> {
    let offset = this.surveyPoints.length;
    let limit = 10;
    return this.parseProvider.getSurveyPoints(offset, limit).then((result) => {
      for (let i = 0; i < result.length; i++) {
        let object = result[i];
        this.surveyPoints.push(object);
      }
    }, (error) => {
      console.log(error);
    });
  }

  //Adds Element to parseServe
  //Then adds element to arrary
  //Then clears the Form Items
  public postSurveyConfirm() {
    this.parseProvider.addSurveyResults(this.newSurvey).then((surveyPoint) => {
      this.surveyPoints.push(surveyPoint);
      this.newSurvey.fname = null;
      this.newSurvey.lname = null;
    }, (error) => {
      console.log(error);
      alert('Error Confirming.');
    });
  }

  public signout() {
    this.auth.signout().subscribe(() => {
      this.app.getRootNav().setRoot(SigninPage);
    });
  }

}
