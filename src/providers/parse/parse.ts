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
  private parseJavascriptKey: string = ENV.parseJavascriptKey;

  constructor() {
    this.parseInitialize();
    console.log('Initiated Parse');
  }

  /*
    Takes in local array and posts
  */
  
  public postObjectsToClass(localObject, parseClass:string): Promise<any> {
    //Creates and or Updates Parse Class
    //const SurveyData = Parse.Object.extend('SurveyData');
    const SurveyData = Parse.Object.extend(parseClass);
    let surveyPoint = new SurveyData();

    for (var key in localObject) {
      var obj = localObject[key];
      surveyPoint.set(String(key),obj);
    }

    
    var point = new Parse.GeoPoint(localObject.latitude,localObject.longitude);
    surveyPoint.set('location', point);
  
    

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

  public postObjectsToClassWithRelation(localObject, parseClass:string,parseParentClass:string,parseParentClassID): Promise<any> {
    //Declare the types.
    const ChildClass = Parse.Object.extend(parseClass);
    const ParentClass = Parse.Object.extend(parseParentClass);

    let child = new ChildClass();
    let parent = new ParentClass();

    //Create child points
    for (var key in localObject) {
      var obj = localObject[key];
      child.set(String(key),obj);
    }

    var point = new Parse.GeoPoint(localObject.latitude,localObject.longitude);
    child.set('location', point);

    // Add the parent as a value in the child
    parent.id = String(parseParentClassID);
    child.set('client', parent);

    return child.save(null, {
      success: function (child) {
        console.log(child);
        return child;
      },
      error: function (child, error) {
        console.log(error);
        return error;
      }
    });
  }
  
  //Sets up a New Assets
  //Creates and or Updates Parse Class
  //TO  remove
  public addAssetsResults(newAssets): Promise<any> {
    const AssetData = Parse.Object.extend('AssetData');

    let assetPoint = new AssetData();
    assetPoint.set('physicalName', newAssets.physicalName);
    assetPoint.set('physicalName', newAssets.humanName);
    
    assetPoint.set('physicalAsset', newAssets.physicalAsset);
    assetPoint.set('humanAsset', newAssets.humanAsset);

    //Latitude and longitude
    var point = new Parse.GeoPoint(newAssets.latitude,newAssets.longitude);
    assetPoint.set('latitude', newAssets.latitude);
    assetPoint.set('longitude', newAssets.longitude);
    assetPoint.set('location', point);

    //Enterprise Information
    assetPoint.set('surveyingUser', newAssets.surveyingUser);
    assetPoint.set('surveyingOrganization', newAssets.surveyingOrganization);

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

  getParseENV () {
    return Parse;
  }
  //Initialize Parse Server
  public parseInitialize() {
    //Back4app
    Parse.initialize(this.parseAppId,this.parseJavascriptKey);
    
    //Heroku
    //Parse.initialize(this.parseAppId);
    
    //Server
    Parse.serverURL = this.parseServerUrl;
  }



}
