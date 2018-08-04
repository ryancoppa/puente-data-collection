import { Component } from '@angular/core';


@Component({
  selector: 'radar',
  templateUrl: 'radar.html'
})
export class RadarComponent {

  // Doughnut
  /*
  public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData:number[] = [350, 450, 100];
  public doughnutChartType:string = 'doughnut'; */

  public radarLabels:string[] = ['One', "Two", "Three"];
  public radarData:number[] = [1,2,3];
  public radarChartType:string = 'radar';

  constructor() {
    console.log('Hello Radar Component');
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  } 

}
