import { Component } from "@angular/core";

import { NavController } from "ionic-angular";
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: "page-about-app",
  templateUrl: "about.html"
})
export class AboutAppPage {
  constructor(public navCtrl: NavController, public iab: InAppBrowser) {}
  openHome() {
    this.navCtrl.pop();
  }
  openLink(link){
    this.iab.create(link);
  }
  openMLink(link){
    this.iab.create(link, '_system');
  }
}
