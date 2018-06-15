import { Component } from '@angular/core';

import { App, ViewController } from 'ionic-angular';
//import { ToastController } from 'ionic-angular';


// Providers
import { ParseProvider } from '../../../providers/parse/parse';
//import { QueryServiceProvider } from '../../../providers/query-service/query-service'; //TO RECONSIDER
import { AuthProvider } from '../../../providers/auth/auth';

@Component({
  selector: 'evaluation-surgical',
  templateUrl: 'evaluation-surgical.html'
})
export class EvaluationSurgicalForm {

  evaluationSurgical = {
    AssessmentandEvaluationSurgical: null,
    planOfActionSurgical: null,
    notesSurgical: null,
    
    surveyingUser: this.auth.currentUser().name,
    surveyingOrganization: this.auth.currentUser().organization

  }
  
  constructor(private parseProvider: ParseProvider,
    //private querySrvc: QueryServiceProvider, //TO RECONSIDER
    private auth: AuthProvider,  
    private app: App, 
    public viewCtrl:ViewController) {

    console.log('Hello EvaluationSurgicalForm');
    this.auth.authenticated();
  }


  public post_n_clear() {

    //TODO, change how this is posted to reflect new database design
    this.parseProvider.postObjectsToClass(this.evaluationSurgical,'SurveyData').then((/*surveyPoint*/) => {
      for (var key in this.evaluationSurgical){
        this.evaluationSurgical[key] = null;
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
