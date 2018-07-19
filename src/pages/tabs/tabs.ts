import { Component } from '@angular/core';

// Providers
import { AuthProvider } from '../../providers/auth/auth';

// Pages
import { HomePage } from '../home/home';
import { MapPage } from '../map/map';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = HomePage;
  tab4Root = MapPage;

  constructor(private auth: AuthProvider) { }

  ionViewCanEnter(): boolean {
    return this.auth.authenticated();
  }

}
