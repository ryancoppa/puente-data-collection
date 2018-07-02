import { Component } from '@angular/core';

import { ViewController } from 'ionic-angular';

// Providers
import { ParseProvider } from '../../../providers/parse/parse';
import { AuthProvider } from '../../../providers/auth/auth';

@Component({
  selector: 'evaluation-surgical',
  templateUrl: 'evaluation-surgical.html'
})
export class EvaluationSurgicalForm {

  clientFname: any;
  clientLname: any;

  evaluationSurgical = {
    objectId: null,
    AssessmentandEvaluationSurgical: null,
    planOfActionSurgical: null,
    notesSurgical: null,
    
    surveyingUser: this.auth.currentUser().name,
    surveyingOrganization: this.auth.currentUser().organization

  }

  //Design Element: Content Drawer
  drawerOptions: any;
  
  constructor(private parseProvider: ParseProvider,
    private auth: AuthProvider,  
    public viewCtrl:ViewController) {

    console.log('Hello EvaluationSurgicalForm');
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
    this.parseProvider.postObjectsToClass(this.evaluationSurgical,'SurveyData').then((/*surveyPoint*/) => {
      for (var key in this.evaluationSurgical){
        this.evaluationSurgical[key] = null;
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
    this.evaluationSurgical.objectId = selectedItem.id; //Retrieve RESERVED Parse-Server Object ID Value
    this.clientFname = selectedItem.get('fname');
    this.clientLname = selectedItem.get('lname');
    console.log(this.evaluationSurgical.objectId);
  }




}
