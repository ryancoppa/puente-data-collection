import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//Providers
import { ParseProvider } from '../../../providers/parse/parse';
import { UiUxProvider} from '../../../providers/ui-ux/ui-ux';

@Component({
  selector: 'page-consumer-medical-eval',
  templateUrl: 'consumer-medical-eval.html',
})
export class ConsumerMedicalEvalPage {
  //we need to push patientsID into this page and retrieve
  patient : any;
  
  patientID = {
    id: null,
    fname: null,
    lname: null,
    nickname: null,
    dob: null,
    sex: null,
    telephoneNumber:null,
    marriageStatus: null,
    familyRelationships: null,
    occupation:null,
    educationLevel:null,
    communityname:null,
    city: null,
    province: null,
    insuranceNumber: null,
    insuranceProvider: null,
    clinicProvider: null,
    cedulaNumber: null
  } 


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private parsePrvdr:ParseProvider,
    private themeSrvc:UiUxProvider) {
    this.patient = navParams.get('patient');
    this.populateFields();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConsumerMedicalEvalPage');
  }
  

  popView(){
    this.navCtrl.pop();
  }

  populateFields(){ 
    /*
      Pulls object from other page and puts the attributes in localObject
    */
    
    for (var property in this.patient.attributes) {
      if (this.patientID.hasOwnProperty(property)) {
        this.patientID[property] = this.patient.attributes[property];
      }

    }

    //Updates Forms!
    //for (var prop in this.patient.attributes) this.patientID[prop] = this.patient.attributes[prop];
  }

  public post_n_update() {
    this.patientID.id = this.patient.id;
    console.log(this.patientID.fname);

    this.parsePrvdr.postObjectsToClass(this.patientID,'SurveyData').then(() => {
      this.themeSrvc.toasting('Saved | Guardado', 'top');
    }, (error) => {
      console.log(error);
      alert('Error Confirming.');
    });
  }

}
