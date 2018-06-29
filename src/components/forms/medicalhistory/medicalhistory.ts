import { Component } from '@angular/core';

import { App, ViewController } from 'ionic-angular';

// Providers
import { ParseProvider } from '../../../providers/parse/parse';
import { AuthProvider } from '../../../providers/auth/auth';

@Component({
  selector: 'medicalhistory',
  templateUrl: 'medicalhistory.html'
})
export class MedicalHistoryForm {
  clientFname: any;
  clientLname: any;

  medicalHistory = {
    objectId: null,
    majorEvents: null,
    surgeryWhatKind: null,
    medicalIllnesses:null,
    whenDiagnosed: null,
    whatDoctorDoyousee: null,
    treatment: null,
    familyhistory: null,
    preventativeCare: null,
    //socialHistory: null,
    //nutritionHistory: null
  };
  //Design Element: Content Drawer
  drawerOptions: any;
  
  constructor(private parseProvider: ParseProvider,
    private auth: AuthProvider,  
    private viewCtrl: ViewController) {

    console.log('Hello MedicalHistoryForm ');
    this.auth.authenticated();

    this.drawerOptions = {
      handleHeight: 50,
      thresholdFromBottom: 200,
      thresholdFromTop: 200,
      bounceBack: true
    };
  }

  post_n_clear() {
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
      this.clientFname = null;
      this.clientLname = null;
    }, (error) => {
      console.log(error);
      alert('Error Confirming.');
    });
  }

  //Navigation
  close() {
    this.viewCtrl.dismiss();
  }

  inputObjectIDfromComponent(selectedItem) {
    //retrieves selectedItem emitted from child class component
    //make sure it's listening to event from child class in view
    //console.log(selectedItem);
    this.medicalHistory.objectId = selectedItem.id; //Retrieve RESERVED Parse-Server Object ID Value
    this.clientFname = selectedItem.get('fname');
    this.clientLname = selectedItem.get('lname');
    console.log(this.medicalHistory.objectId);
  }




}
