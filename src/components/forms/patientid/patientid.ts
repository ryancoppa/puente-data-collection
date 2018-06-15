import { Component } from '@angular/core';

import { App, ViewController } from 'ionic-angular';
//import { ToastController } from 'ionic-angular';


// Providers
import { ParseProvider } from '../../../providers/parse/parse';
//import { QueryServiceProvider } from '../../../providers/query-service/query-service'; //TO RECONSIDER
import { AuthProvider } from '../../../providers/auth/auth';
import { Geolocation, GeolocationOptions } from '@ionic-native/geolocation';

@Component({
  selector: 'patientid',
  templateUrl: 'patientid.html'
})
export class PatientIDForm {

  patientID = {
    fname: null,
    lname: null,
    nickname: null,
    dob: null,
    sex: null,
    telephoneNumber:null,
    marriageStatus: null,
    familyRelationships: null,
    occupation:null,
    educationLevel:null,
    communityname:null,
    city:null,
    province: null,
    insuranceNumber: null,
    insuranceProvider: null,
    cedulaNumber: null,
    latitude: null,
    longitude: null,
    surveyingUser: this.auth.currentUser().name,
    surveyingOrganization: this.auth.currentUser().organization
    //photoIdentificaiton

  }
  
  constructor(private parseProvider: ParseProvider,
    //private querySrvc: QueryServiceProvider, //TO RECONSIDER
    private auth: AuthProvider,  
    private app: App, 
    private geolocation:Geolocation,
    public viewCtrl:ViewController) {

    console.log('Hello PatientIDForm ');
    this.auth.authenticated();
  }

 /*
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
} */

  public post_n_clear() {
    //Posts an object to parse server and clears the local form array

    //Adds array to parseServer (newSurvey)
    //Then adds element to local array (surveyPoint)
    //Then clears the Form/array (surveyPoint)

    //TODO, change how this is posted to reflect new database design
    this.parseProvider.postObjectsToClass(this.patientID,'SurveyData').then((/*surveyPoint*/) => {
      //This is for the list of results
    //this.submittedList.push(surveyPoint);
      for (var key in this.patientID){
        this.patientID[key] = null;
      }
    }, (error) => {
      console.log(error);
      alert('Error Confirming.');
    });

    //Update User Position?
    //this.getUserPosition();
  }

  //Navigation
  close() {
    this.viewCtrl.dismiss();
  }



}
