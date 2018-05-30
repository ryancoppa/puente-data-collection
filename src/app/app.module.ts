import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

// App
import { MyApp } from './app.component';

// Native imports
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';


// Providers
import { ParseProvider } from '../providers/parse/parse';
import { AuthProvider } from '../providers/auth/auth';

// Components
import { AccordionComponent } from '../components/accordion/accordion';

// Pages
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { Splash } from '../pages/splash/splash';
import { MapPage } from '../pages/map/map';
import { ProfileModalPage } from '../pages/profile-modal/profile-modal';
import { HelpPage } from '../pages/help/help';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SigninPage,
    SignupPage,
    Splash,
    MapPage,
    ProfileModalPage,
    HelpPage,
    AccordionComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SigninPage,
    SignupPage,
    Splash,
    MapPage,
    ProfileModalPage,
    HelpPage,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ParseProvider,
    AuthProvider,
    Geolocation
  ]
})
export class AppModule { }
