import { Component } from '@angular/core';

import { App, ViewController } from 'ionic-angular';
//import { ToastController } from 'ionic-angular';


// Providers
import { ParseProvider } from '../../../providers/parse/parse';
//import { QueryServiceProvider } from '../../../providers/query-service/query-service'; //TO RECONSIDER
import { AuthProvider } from '../../../providers/auth/auth';

@Component({
  selector: 'evaluation-medical',
  templateUrl: 'evaluation-medical.html'
})
export class EvaluationMedicalForm {

  evaluationMedical = {
    AssessmentandEvaluation: null,
    planOfAction: null,
    notes: null,
    
    surveyingUser: this.auth.currentUser().name,
    surveyingOrganization: this.auth.currentUser().organization

  }
  
  constructor(private parseProvider: ParseProvider,
    //private querySrvc: QueryServiceProvider, //TO RECONSIDER
    private auth: AuthProvider,  
    private app: App, 
    public viewCtrl:ViewController) {

    console.log('Hello EvaluationMedicalForm');
    this.auth.authenticated();
  }


  public post_n_clear() {

    //TODO, change how this is posted to reflect new database design
    this.parseProvider.postObjectsToClass(this.evaluationMedical,'SurveyData').then((/*surveyPoint*/) => {
      for (var key in this.evaluationMedical){
        this.evaluationMedical[key] = null;
      }
    }, (error) => {
      console.log(error);
      alert('Error Confirming.');
    });
  }

  //Navigation
  close() {
    this.viewCtrl.dismiss();
  }



}
