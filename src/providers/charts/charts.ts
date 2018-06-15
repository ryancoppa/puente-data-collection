import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import  { QueryServiceProvider }  from '../../providers/query-service/query-service';

@Injectable()
export class ChartsProvider {

  constructor(private querySrvc:QueryServiceProvider) {
    console.log('Hello ChartsProvider Provider');
  }

  //TODO
  defineChartData(parseObject: string, parseColumn: string) {
    let chartLabels;
    let chartValues;
    let chartColours;
    let chartHoverColours;
    
    let arrayOfObjects : any;
    
    this.querySrvc.genericQuery(parseObject, parseColumn).then ((result) => {
      for (let i = 0; i < result.length; i++) {
        let object = result[i];
        arrayOfObjects.push(object);
        /*
        var tech  = this.technologies.technologies[k];
        chartLabels.push(tech.technology);
          //.get('value')
        chartValues.push(tech.time);
          //for chart values, push the number frequency of an item in an array
        chartColours.push(tech.color);
        chartHoverColours.push(tech.hover);
        */
      }
    });
  }

}
