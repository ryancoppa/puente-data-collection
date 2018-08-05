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

  isenabled:boolean=false;
  
  client = {
    objectID: null,
    fname: null,
    lname: null
  }

  evaluationSurgical = {
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


  post_n_clear(){
    this.parseProvider.postObjectsToClassWithRelation(this.evaluationSurgical,'EvaluationSurgical','SurveyData',this.client.objectID).then(()=> {
      for (var key in this.evaluationSurgical){
        this.evaluationSurgical[key] = null;
      }
      this.client.fname=null; 
      this.client.lname=null;
      this.isenabled=false;
    }, (error) => {
      console.log(error);
      alert('Error Confirming.');
    });
  }

  //Navigation
  close() {
    this.viewCtrl.dismiss();
    this.isenabled=false;
  }

  inputObjectIDfromComponent(selectedItem) {
    this.isenabled=true;
    this.client.objectID= selectedItem.id; //Retrieve RESERVED Parse-Server Object ID Value
    this.client.fname = selectedItem.get('fname');
    this.client.lname = selectedItem.get('lname');
    console.log(this.client.objectID);
  }



}
