import { Component } from '@angular/core';

import { ViewController } from 'ionic-angular';


// Providers
import { ParseProvider } from '../../../providers/parse/parse';
import { AuthProvider } from '../../../providers/auth/auth';

@Component({
  selector: 'evaluation-medical',
  templateUrl: 'evaluation-medical.html'
})
export class EvaluationMedicalForm {
  clientFname: any;
  clientLname: any;

  evaluationMedical = {
    objectId: null,
    AssessmentandEvaluation: null,
    planOfAction: null,
    notes: null,
    
    surveyingUser: this.auth.currentUser().name,
    surveyingOrganization: this.auth.currentUser().organization

  }

  drawerOptions: any;
  
  constructor(private parseProvider: ParseProvider,
    private auth: AuthProvider,  
    public viewCtrl:ViewController) {

    console.log('Hello EvaluationMedicalForm');
    this.auth.authenticated();

    this.drawerOptions = {
      handleHeight: 50,
      thresholdFromBottom: 200,
      thresholdFromTop: 200,
      bounceBack: true
    };
  }


  post_n_clear() {

    //TODO, change how this is posted to reflect new database design
    this.parseProvider.postObjectsToClass(this.evaluationMedical,'SurveyData').then((/*surveyPoint*/) => {
      for (var key in this.evaluationMedical){
        this.evaluationMedical[key] = null;
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
    this.evaluationMedical.objectId = selectedItem.id; //Retrieve RESERVED Parse-Server Object ID Value
    this.clientFname = selectedItem.get('fname');
    this.clientLname = selectedItem.get('lname');
    console.log(this.evaluationMedical.objectId);
  }




}
