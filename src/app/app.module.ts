import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AgmCoreModule } from '@agm/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicStorageModule } from '@ionic/storage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';

import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Camera } from '@ionic-native/camera/ngx';

// Services/Providers
import { TranslateProvider, PropertyService } from './providers';

// Modal Pages
import { ImagePageModule } from './pages/modal/image/image.module';
import { SearchFilterPageModule } from './pages/modal/search-filter/search-filter.module';

// Environment
import { environment } from '../environments/environment';

// Components
import { NotificationsComponent } from './components/notifications/notifications.component';

// Pipes
import { PipesModule } from './pipes/pipes.module';

// Base de Datos

import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';

// DEDO
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';


// Para convertir PDFs.
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';


// Para Notificaciones PUSH

import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';

// Compartir APP
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

// Geolocalizacion
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ComponentsModule } from './components/components.module';


// Local Notification

import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';




export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, NotificationsComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(environment.config),
    AppRoutingModule,
    HttpClientModule,
    ImagePageModule,
    SearchFilterPageModule,
    IonicStorageModule.forRoot({
      name: '__Ayuntamiento Alcantarilla',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDM_zkRTTP-VuyvypxSeEGcM8PMSfyqZ4k'
     // apiKey: 'AIzaSyBnTnX1cVqp8AbMAL6TNL50WV8pKPI6t7Q'
    }),
    PipesModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  entryComponents: [NotificationsComponent],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    TranslateProvider,
    LocalNotifications,
    PropertyService,
    SQLitePorter,
    SQLite,
    FileOpener,
    File,
    FingerprintAIO,
    FCM,
    FileChooser,
    FilePath,
    File,
    Camera,
    SocialSharing,
    Geolocation,
    ComponentsModule,
    InAppBrowser
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
