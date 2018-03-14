import { Component } from '@angular/core';

// Providers
import { AuthProvider } from '../../providers/auth/auth';

// Pages
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { MapPage } from '../map/map';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = MapPage;

  constructor(private auth: AuthProvider) { }

  ionViewCanEnter(): boolean {
    return this.auth.authenticated();
  }

}
