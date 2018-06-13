import { Component } from '@angular/core';

import { App } from 'ionic-angular';
//import { ToastController } from 'ionic-angular';

// Providers
import { ParseProvider } from '../../../providers/parse/parse';
//import { QueryServiceProvider } from '../../../providers/query-service/query-service'; //TO RECONSIDER
import { AuthProvider } from '../../../providers/auth/auth';
import { Geolocation, GeolocationOptions } from '@ionic-native/geolocation';


@Component({
  selector: 'medicalhistory',
  templateUrl: 'medicalhistory.html'
})
export class MedicalHistoryForm {

  medicalHistory = {};

  constructor(private parseProvider: ParseProvider,
    //private querySrvc: QueryServiceProvider, //TO RECONSIDER
    private auth: AuthProvider,  
    private app: App, 
    private geolocation:Geolocation) {

    console.log('Hello MedicalHistoryForm ');
    this.auth.authenticated();
  }

  public post_n_clear() {
    //Posts an object to parse server and clears the local form array

    //Adds array to parseServer (newSurvey)
    //Then adds element to local array (surveyPoint)
    //Then clears the Form/array (surveyPoint)

    //TODO, change how this is posted to reflect new database design
    this.parseProvider.postObjectsToClass(this.medicalHistory,'SurveyData').then((/*surveyPoint*/) => {
      //This is for the list of results
    //this.submittedList.push(surveyPoint);
      for (var key in this.medicalHistory){
        this.medicalHistory[key] = null;
      }
    }, (error) => {
      console.log(error);
      alert('Error Confirming.');
    });

    //Update User Position?
    //this.getUserPosition();
  }



}
