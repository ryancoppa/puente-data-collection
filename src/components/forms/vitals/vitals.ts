import { Component } from '@angular/core';

import { ViewController } from 'ionic-angular';
//import { ToastController } from 'ionic-angular';


// Providers
import { ParseProvider } from '../../../providers/parse/parse';
import { AuthProvider } from '../../../providers/auth/auth';

@Component({
  selector: 'vitals',
  templateUrl: 'vitals.html'
})
export class VitalsForm {

  clientFname: any;
  clientLname:any;

  vitals = {
    objectID: null,
    height: null,
    weight: null,
    bmi: null,
    temp: null,
    pulse: null,
    respRate:null,
    bloodPressure: null,
    bloodOxygen: null,
    bloodSugar:null,
    painLevels:null,
    
    surveyingUser: this.auth.currentUser().name,
    surveyingOrganization: this.auth.currentUser().organization

  }

  //Design Element: Content Drawer
  drawerOptions: any;
  
  constructor(private parseProvider: ParseProvider,
    private auth: AuthProvider,  
    public viewCtrl:ViewController) {

    console.log('Hello VitalsForm');
    this.auth.authenticated();

    //Design Element: Content Drawer
    this.drawerOptions = {
      handleHeight: 50,
      thresholdFromBottom: 200,
      thresholdFromTop: 200,
      bounceBack: true
    };
  }


  post_n_clear() {
    //TODO, change how this is posted to reflect new database design
    this.parseProvider.postObjectsToClass(this.vitals,'SurveyData').then((/*surveyPoint*/) => {
      for (var key in this.vitals){
        this.vitals[key] = null;
      }
    }, (error) => {
      console.log(error);
      alert('Error Confirming.');
    });
  }

  close() {
    this.viewCtrl.dismiss();
  }

  inputObjectIDfromComponent(selectedItem) {
    //retrieves selectedItem emitted from child class component
    //make sure it's listening to event from child class in view
    //console.log(selectedItem);
    this.vitals.objectID = selectedItem.id; //Retrieve RESERVED Parse-Server Object ID Value
    this.clientFname = selectedItem.get('fname');
    this.clientLname = selectedItem.get('lname');
    console.log(this.vitals.objectID);
  }


}
