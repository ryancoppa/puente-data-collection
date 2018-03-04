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

  constructor() {
    this.parseInitialize();
    console.log('Initiated Parse');
  }

  public getSurveyPoints(offset: number = 0, limit: number = 3): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const SurveyData = Parse.Object.extend('SurveyData');

        //Above queries the SurveyData class
        let query = new Parse.Query(SurveyData);
        query.skip(offset);
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

  private parseInitialize() {
    Parse.initialize(this.parseAppId);
    Parse.serverURL = this.parseServerUrl;
  }

}
