import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//Providers
import { QueryServiceProvider } from '../../providers/query-service/query-service';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-find-records',
  templateUrl: 'find-records.html',
})
export class FindRecordsPage {

  communityRecords: any[] = [];


  constructor(public navCtrl: NavController, 
    public auth: AuthProvider,
    public navParams: NavParams,
    private querySrvc: QueryServiceProvider) {
      this.aggregateRecords();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FindRecordsPage');
  }

  //Function that constructs an Array of Community Records
  public aggregateRecords(){
    let offset = this.communityRecords.length;
    let limit = 1000;


    return this.querySrvc.basicQuery(offset,limit,'SurveyData','surveyingOrganization',String(this.auth.currentUser().organization)).then((result) =>{
      for (let i = 0; i < result.length; i++) {
        let object = result[i];
        
        if (object.attributes != null) {
          this.communityRecords.push(object.attributes);
        }
      }
      //console.log(this.communityRecords);

    }, (error) => {
      console.log(error);
    });
  }

}
