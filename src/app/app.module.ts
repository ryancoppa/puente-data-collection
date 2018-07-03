import { NgModule, ErrorHandler } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
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
import { QueryServiceProvider } from '../providers/query-service/query-service';
import { ChartsProvider } from '../providers/charts/charts';
import { UserpositionProvider } from '../providers/userposition/userposition';

// Components
import { AccordionComponent } from '../components/accordion/accordion';
import { CardFlippingComponent } from '../components/card-flipping/card-flipping';
import { ContentDrawerComponent } from '../components/content-drawer/content-drawer';
import { SearchbarObjectIdComponent } from '../components/searchbar-object-id/searchbar-object-id';

//Charts
import { BarchartComponent } from '../components/charts/barchart/barchart';

// Forms
import { PatientIDForm } from '../components/forms/patientid/patientid';
import { EnvironmentalHistoryForm } from '../components/forms/environmentalhistory/environmentalhistory';
import { MedicalHistoryForm } from '../components/forms/medicalhistory/medicalhistory';
import { VitalsForm } from '../components/forms/vitals/vitals';
import { EvaluationMedicalForm } from '../components/forms/evaluation-medical/evaluation-medical';
import { EvaluationSurgicalForm } from '../components/forms/evaluation-surgical/evaluation-surgical';

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
import { VisualChartsPage } from '../pages/visual-charts/visual-charts';
import { FindRecordsPage } from '../pages/find-records/find-records';


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
    VisualChartsPage,
    FindRecordsPage,
    AccordionComponent,
    CardFlippingComponent,
    ContentDrawerComponent,
    SearchbarObjectIdComponent,
    BarchartComponent,
    PatientIDForm,
    EnvironmentalHistoryForm,
    MedicalHistoryForm,
    VitalsForm,
    EvaluationMedicalForm,
    EvaluationSurgicalForm
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ChartsModule
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
    VisualChartsPage,
    FindRecordsPage,
    PatientIDForm,
    EnvironmentalHistoryForm,
    MedicalHistoryForm,
    VitalsForm,
    EvaluationMedicalForm,
    EvaluationSurgicalForm
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ParseProvider,
    AuthProvider,
    Geolocation,
    QueryServiceProvider,
    ChartsProvider,
    UserpositionProvider,
  ]
})
export class AppModule { }
