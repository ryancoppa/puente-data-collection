import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController,ViewController } from 'ionic-angular';

//Providers
import { QueryServiceProvider } from "../../../providers/query-service/query-service";


@Component({
  selector: 'listofvitals',
  templateUrl: 'listofvitals.html'
})
export class ListofvitalsComponent {

  vitalsList = [];

  //Object
  patient : any;

  constructor(private querySrvc:QueryServiceProvider,
    public navParams: NavParams,
    private viewCtrl:ViewController) {
    console.log('Hello ListofvitalsComponent');
    this.patient = navParams.get('patient');
    this.aggregateVitals(this.patient);
  }

  aggregateVitals(patientObject:string) {
    let offset = this.vitalsList.length;
    let limit = 1000;

    console.log(patientObject);
    return this.querySrvc.basicQuery(offset,limit,'Vitals','client', patientObject).then((result) =>{
      for (let i = 0; i < result.length; i++) {
        let vitalsObject = result[i];
        this.vitalsList.push(vitalsObject);
        console.log(vitalsObject);
      }

    }, (error) => {
      console.log(error);
    });
  }

  //Navigation
  closeModal() {
    this.viewCtrl.dismiss();
  }

}
