import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

// Parse
import { Parse } from 'parse';

// Constants
import { ENV } from '../../app/app.constant';

@Injectable()
export class ParseProvider {
  private parseAppId: string = ENV.parseAppId;
  private parseServerUrl: string = ENV.parseServerUrl;
  //private parseJavascriptKey: string = ENV.parseJavascriptKey;

  constructor() {
    this.parseInitialize();
    console.log('Initiated Parse');
  }

  //This is Retrieving Survey Results from Parse Server
  public getSurveyPoints(offset: number = 0, limit: number = 3): Promise<any> {
    //Returns the resolve (the query) and if there's an error, rejects
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //Creates local object based on "SurveyData" Object in Parse-Server
        const SurveyData = Parse.Object.extend('SurveyData');

        //Queries the SurveyData class from Parse Server
        let query = new Parse.Query(SurveyData);
        
        //You can skip the first results by setting skip
        query.skip(offset);

        //You can limit the number of results by setting "limit"
        query.limit(limit);

        //Below searches what's in the surveyPoints array
        query.find().then((surveyPoints) => {
          resolve(surveyPoints);
        }, (error) => {
          reject(error);
        });
      }, 500);
    });
  }

  //Sets up a New Survey
  //Creates and or Updates Parse Class
  public addSurveyResults(newSurvey): Promise<any> {
    const SurveyData = Parse.Object.extend('SurveyData');

    let surveyPoint = new SurveyData();
    surveyPoint.set('fname', newSurvey.fname);
    surveyPoint.set('lname', newSurvey.lname);
    /*
    surveyPoint.set('age', parseInt(newSurvey.age));
    surveyPoint.set('sex', newSurvey.sex);
    surveyPoint.set('phonenumber', newSurvey.phonenumber);
    surveyPoint.set('marriageStatus', newSurvey.marriageStatus);
    surveyPoint.set('occupation', newSurvey.occupation);
    surveyPoint.set('publicPrivateInsurance', newSurvey.publicPrivateInsurance);
    surveyPoint.set('memberProgresando', newSurvey.memberProgresando);
    surveyPoint.set('memberOfAssociation', newSurvey.memberOfAssociation);
    surveyPoint.set('familyHistoryDiabetes', newSurvey.familyHistoryDiabetes);
    surveyPoint.set('familyHIstoryCardiacDisease', newSurvey.familyHIstoryCardiacDisease);
    surveyPoint.set('familyHistoryofAlcoholism', newSurvey.familyHistoryofAlcoholism);
    surveyPoint.set('familyHistoryofBreastCancer', newSurvey.familyHistoryofBreastCancer);
    surveyPoint.set('familyHistoryofProstateCancer', newSurvey.familyHistoryofProstateCancer);
    surveyPoint.set('diabetesDiagnosis', newSurvey.diabetesDiagnosis);
    surveyPoint.set('respiratoryproblems', newSurvey.respiratoryproblems);
    surveyPoint.set('cardiacproblems', newSurvey.cardiacproblems);
    surveyPoint.set('numberofAlchoholDrinks', newSurvey.numberofAlchoholDrinks);
    surveyPoint.set('sexualHealth_Diseasesaproblem', newSurvey.sexualHealth_Diseasesaproblem);
    surveyPoint.set('sexualHealth_Teenagepregnancyaproblem', newSurvey.sexualHealth_Teenagepregnancyaproblem);
    surveyPoint.set('waterAccess', newSurvey.waterAccess);
    surveyPoint.set('waterQuality', newSurvey.waterQuality);
    surveyPoint.set('waterAccessfrequency', newSurvey.waterAccessfrequency);
    surveyPoint.set('clinicAccess', newSurvey.clinicAccess);
    surveyPoint.set('latrineAccess', newSurvey.latrineAccess);
    surveyPoint.set('trashDisposalLocation', newSurvey.trashDisposalLocation);
    surveyPoint.set('numberofpeoplelivingintheHouse', newSurvey.numberofpeoplelivingintheHouse);
    surveyPoint.set('childrenUnder5LivinginHouse', newSurvey.childrenUnder5LivinginHouse);
    surveyPoint.set('conditionofHouse_Roof', newSurvey.conditionofHouse_Roof);
    surveyPoint.set('conditionofHouse_Floor', newSurvey.conditionofHouse_Floor);
    surveyPoint.set('conditionofHouse_Walls', newSurvey.conditionofHouse_Walls);
    surveyPoint.set('biggestProblemintheCommunity', newSurvey.biggestProblemintheCommunity);
    surveyPoint.set('biggestProblemintheRegion', newSurvey.biggestProblemintheRegion);
    surveyPoint.set('howCanWeFixIt', newSurvey.howCanWeFixIt);
    surveyPoint.set('dayConvenience', newSurvey.dayConvenience);
    surveyPoint.set('hourConvenience', newSurvey.hourConvenience);
    */
    //Latitude and longitude?
    surveyPoint.set('latitude', newSurvey.latitude);
    surveyPoint.set('longitude', newSurvey.longitude);

    surveyPoint.set('cheatMode', false);


    return surveyPoint.save(null, {
      success: function (surveyPoint) {
        console.log(surveyPoint);
        return surveyPoint;
      },
      error: function (surveyPoint, error) {
        console.log(error);
        return error;
      }
    });
  }
  
  //Sets up a New Assets
  //Creates and or Updates Parse Class
  public addAssetsResults(newAssets): Promise<any> {
    const AssetData = Parse.Object.extend('AssetData');

    let assetPoint = new AssetData();
    assetPoint.set('physicalName', newAssets.physicalName);
    assetPoint.set('physicalName', newAssets.humanName);
    
    assetPoint.set('physicalAsset', newAssets.physicalAsset);
    assetPoint.set('humanAsset', newAssets.humanAsset);
    //Latitude and longitude?
    assetPoint.set('latitude', newAssets.latitude);
    assetPoint.set('longitude', newAssets.longitude);

    assetPoint.set('cheatMode', false);


    return assetPoint.save(null, {
      success: function (assetPoint) {
        console.log(assetPoint);
        return assetPoint;
      },
      error: function (assetPoint, error) {
        console.log(error);
        return error;
      }
    });
  }

  //Initialize Parse Server
  private parseInitialize() {
    //Parse.initialize(this.parseAppId,this.parseJavascriptKey);
    Parse.initialize(this.parseAppId);
    Parse.serverURL = this.parseServerUrl;
  }

}
