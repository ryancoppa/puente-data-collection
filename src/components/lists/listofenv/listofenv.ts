import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController,ViewController } from 'ionic-angular';

//Providers
import { QueryServiceProvider } from "../../../providers/query-service/query-service";


@Component({
  selector: 'listofenv',
  templateUrl: 'listofenv.html'
})
export class ListofEnviroComponent {

  envList = [];

  //Object
  patient : any;

  constructor(private querySrvc:QueryServiceProvider,
    public navParams: NavParams,
    private viewCtrl:ViewController) {
    console.log('Hello ListofEnviroComponent');
    this.patient = navParams.get('patient');
    this.aggregate(this.patient);
  }

  aggregate(patientObject:string) {
    let offset = this.envList.length;
    let limit = 1000;

    console.log(patientObject);
    return this.querySrvc.basicQuery(offset,limit,'HistoryEnvironmentalHealth','client', patientObject).then((result) =>{
      for (let i = 0; i < result.length; i++) {
        let object = result[i];
        this.envList.push(object);
        console.log(object);
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
