import { AboutOhevPage } from '../pages/about/aboutohev';
import { TrackService } from './services/track.service';
import { PopoverComponent } from './components/popover.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ReadAlong } from './components/readalong.component';
import { WriteAlong } from './components/writealong.component';
import { Singalong } from './components/singalong.component';
import { AboutAppPage } from '../pages/about/about';
import { ComingsoonPage } from '../pages/comingsoon/comingsoon';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { Homepage } from "../pages/homepage/homepage";
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ItemContentPage } from '../pages/item-content/item-content';

// import { PopoverComponent } from './components/popover.component';
import { ClipboardModule } from "ngx-clipboard";
import { MediaCapture } from "@ionic-native/media-capture";
import { File } from "@ionic-native/file";
import { PowerManagement } from '@ionic-native/power-management';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';


import { word } from './components/word.component';

import { ListPage } from '../pages/list/list';
import { MyTestPage } from '../pages/my-test-page/my-test-page';
import { ShabbatPage } from '../pages/shabbat/shabbat';

import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    MyTestPage,
    Homepage,
    AboutAppPage,
    AboutOhevPage,
    ComingsoonPage,
    ShabbatPage,
    ItemContentPage,
    word,
    ReadAlong,
    WriteAlong,
    Singalong,
    PopoverComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ClipboardModule,
    IonicStorageModule.forRoot({

driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
    ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    MyTestPage,
    Homepage,
    AboutAppPage,
    AboutOhevPage,
    ComingsoonPage,
    ShabbatPage,
    ItemContentPage,
    word,
    ReadAlong,
    WriteAlong,
    Singalong,
    PopoverComponent,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    MediaCapture,
    File,
    TrackService,
   PowerManagement,
    InAppBrowser
  ]
})
export class AppModule {}
