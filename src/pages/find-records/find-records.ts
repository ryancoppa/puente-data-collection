import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';

//Providers
import { ParseProvider } from '../../providers/parse/parse';
import { QueryServiceProvider } from '../../providers/query-service/query-service';
import { AuthProvider } from '../../providers/auth/auth';
import { UiUxProvider } from '../../providers/ui-ux/ui-ux';

//Pages
import { ConsumerEnviroEvalPage } from '../consumer-enviro-eval/consumer-enviro-eval';
import { ConsumerMedicalEvalPage } from '../consumer-medical-eval/consumer-medical-eval';

@Component({
  selector: 'page-find-records',
  templateUrl: 'find-records.html',
})
export class FindRecordsPage {
  searchTerm: string = '';
  communityRecords: any[] = [];

  
  filteredCommunityRecords:any;


  constructor(public navCtrl: NavController, 
    public auth: AuthProvider,
    public navParams: NavParams,
    private parseSrvc: ParseProvider,
    private querySrvc: QueryServiceProvider,
    public actionSheetCtrl: ActionSheetController,
    private themeCtrl: UiUxProvider) {
      this.aggregateRecords();
      this.filteredCommunityRecords = this.communityRecords;
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
        this.communityRecords.push(object);
      }

    }, (error) => {
      console.log(error);
    });
  }

  //Navigation
  openConsumerEnviroEval(){
    this.navCtrl.push(ConsumerEnviroEvalPage)
  }

  openConsumerMedicalEval(patient){
    //this.navCtrl.push(ConsumerMedicalEvalPage);
    this.navCtrl.push(ConsumerMedicalEvalPage,{
      patient:patient
    });
  }

  //Searchbar
  filterItems(){
    this.filteredCommunityRecords = this.communityRecords.filter((result) => {
      let fname =  result.get('fname').toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      let lname =  result.get('lname').toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      let dataCollector =  result.get('surveyingUser').toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      return fname || lname || dataCollector;
    });
  }

  presentActionSheet(objectID) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Are you sure?',
      subTitle:'This action is unreversible',
      buttons: [
        {
          text: 'Destroy',
          role: 'destructive',
          handler: () => {
            this.parseSrvc.removeObjectsinClass(objectID,'SurveyData');
            this.communityRecords = [];
            this.aggregateRecords().then(()=>{
              this.filteredCommunityRecords = this.communityRecords;
            })
            this.themeCtrl.toasting("Deleted",'bottom');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
 
    actionSheet.present();
  }



}
