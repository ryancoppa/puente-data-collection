import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';

/**
 * Generated class for the VisualChartsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
    selector: 'page-visual-charts',
    templateUrl: 'visual-charts.html',
})
export class VisualChartsPage {


    constructor(public navCtrl: NavController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad VisualChartsPage');
    }

}
