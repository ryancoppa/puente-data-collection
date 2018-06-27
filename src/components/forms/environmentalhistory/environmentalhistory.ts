import { Component, Input, ViewChild, ElementRef, Renderer } from '@angular/core';

import { App, ViewController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';


// Providers
import { ParseProvider } from '../../../providers/parse/parse';
import { QueryServiceProvider } from '../../../providers/query-service/query-service';

import { AuthProvider } from '../../../providers/auth/auth';
import { Geolocation, GeolocationOptions } from '@ionic-native/geolocation';

@Component({
  selector: 'environmentalhistory',
  templateUrl: 'environmentalhistory.html'
})
export class EnvironmentalHistoryForm {

  clientFname: any;
  clientLname:any;

  environmentalHealth = {
    objectID: null,
    yearsLivedinthecommunity: null,
    yearsLivedinThisHouse: null,
    waterAccess: null,
    typeofWaterdoyoudrink: null,
    latrineAccess: null,
    clinicAccess: null,
    conditionoFloorinyourhouse: null,
    conditionoRoofinyourhouse: null,
    medicalproblemswheredoyougo: null,
    dentalproblemswheredoyougo:null
  }

  //Design Element
  accordionItems: any = [];

  //Design Element: Content Drawer
  drawerOptions: any;

  constructor(private auth: AuthProvider,  
    private parseProvider: ParseProvider,
    private viewCtrl: ViewController) {

    console.log('Hello EnvironmentalHistoryForm ');
    this.auth.authenticated();
    
    //Design Element: Accordion
    this.accordionItems = [
      {expanded: false},
      {expanded: false},
      {expanded: false},
    ];

    //Design Element: Content Drawer
    this.drawerOptions = {
      handleHeight: 50,
      thresholdFromBottom: 200,
      thresholdFromTop: 200,
      bounceBack: true
    };
  }

  public post_n_clear() {
    //Posts an object to parse server and clears the local form array

    //Adds array to parseServer (newSurvey)
    //Then adds element to local array (surveyPoint)
    //Then clears the Form/array (surveyPoint)

    //TODO, change how this is posted to reflect new database design
    this.parseProvider.postObjectsToClass(this.environmentalHealth,'SurveyData').then((/*surveyPoint*/) => {
      //This is for the list of results
    //this.submittedList.push(surveyPoint);
      for (var key in this.environmentalHealth){
        this.environmentalHealth[key] = null;
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

  //Design Element: Accordion
  expandItem(item){
 
    this.accordionItems.map((listItem) => {

        if(item == listItem){
            listItem.expanded = !listItem.expanded;
        } else {
            listItem.expanded = false;
        }

        return listItem;

    });

  }

  inputObjectIDfromComponent(selectedItem) {
    //retrieves selectedItem emitted from child class component
    //make sure it's listening to event from child class in view
    //console.log(selectedItem);
    this.environmentalHealth.objectID = selectedItem.id; //Retrieve RESERVED Parse-Server Object ID Value
    this.clientFname = selectedItem.get('fname');
    this.clientLname = selectedItem.get('lname');
    console.log(this.environmentalHealth.objectID);
  }



}
