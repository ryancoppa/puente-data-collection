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
    surveyPoint.set('lname' , newSurvey.lname);
    surveyPoint.set('dob' , newSurvey.dob);
    surveyPoint.set('sex' , newSurvey.sex);
    surveyPoint.set('marriageStatus' , newSurvey.marriageStatus);
    surveyPoint.set('numberofIndividualsLivingintheHouse' , newSurvey.numberofIndividualsLivingintheHouse);
    surveyPoint.set('numberofChildrenLivingintheHouse' , newSurvey.numberofChildrenLivingintheHouse);
    surveyPoint.set('numberofChildrenLivinginHouseUndertheAgeof5' , newSurvey.numberofChildrenLivinginHouseUndertheAgeof5);
    surveyPoint.set('occupation' , newSurvey.occupation);
    surveyPoint.set('educationLevel' , newSurvey.educationLevel);
    surveyPoint.set('telephoneNumber' , newSurvey.telephoneNumber);
    surveyPoint.set('yearsLivedinthecommunity' , newSurvey.yearsLivedinthecommunity);
    surveyPoint.set('memberofthefollowingorganizations' , newSurvey.memberofthefollowingorganizations);
    surveyPoint.set('typeofHealthinsuranceDoyouHave' , newSurvey.typeofHealthinsuranceDoyouHave);
    surveyPoint.set('frequencyofYourMedicalVisits' , newSurvey.frequencyofYourMedicalVisits);
    surveyPoint.set('familyhistory' , newSurvey.familyhistory);
    surveyPoint.set('diagnosisfromadoctor' , newSurvey.diagnosisfromadoctor);
    surveyPoint.set('sexuallytransmitteddiseasesinyourcommunity' , newSurvey.sexuallytransmitteddiseasesinyourcommunity);
    surveyPoint.set('teenagePregnancyprevalentinyourcommunity' , newSurvey.teenagePregnancyprevalentinyourcommunity);
    surveyPoint.set('waterAccess' , newSurvey.waterAccess);
    surveyPoint.set('typeofWaterdoyoudrink' , newSurvey.typeofWaterdoyoudrink);
    surveyPoint.set('clinicAccess' , newSurvey.clinicAccess);
    surveyPoint.set('qualityClinicService' , newSurvey.qualityClinicService);
    surveyPoint.set('latrineAccess' , newSurvey.latrineAccess);
    surveyPoint.set('conditionoFloorinyourhouse' , newSurvey.conditionoFloorinyourhouse);
    surveyPoint.set('conditionoRoofinyourhouse' , newSurvey.conditionoRoofinyourhouse);
    surveyPoint.set('availableTrashManagementandDisposalServices' , newSurvey.availableTrashManagementandDisposalServices);
    surveyPoint.set('trashDisposalLocation' , newSurvey.trashDisposalLocation);
    surveyPoint.set('immediateCare' , newSurvey.immediateCare);
    surveyPoint.set('biggestProblemintheimmediatecommunity' , newSurvey.biggestProblemintheimmediatecommunity);
    surveyPoint.set('biggestProblemintheregion' , newSurvey.biggestProblemintheregion);
    surveyPoint.set('howCanweaddressandimprovethesituation' , newSurvey.howCanweaddressandimprovethesituation);
    surveyPoint.set('otherOrganizationsYouKnow' , newSurvey.otherOrganizationsYouKnow);
    surveyPoint.set('dayMostConvenient' , newSurvey.dayMostConvenient);
    surveyPoint.set('hourMostConvenient' , newSurvey.hourMostConvenient);
    surveyPoint.set('latitude' , newSurvey.latitude);
    surveyPoint.set('longitude' , newSurvey.longitude);
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
