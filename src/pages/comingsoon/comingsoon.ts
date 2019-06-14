import { Component, Input, AfterViewInit, ViewChild, OnDestroy } from "@angular/core";
import { NavController, NavParams, Content } from "ionic-angular";

import introJs from 'intro.js/intro.js';


@Component({
  selector: 'page-comingsoon',
  templateUrl: 'comingsoon.html'
})
export class ComingsoonPage implements AfterViewInit{
  selectedItem={}
  constructor(public navCtrl: NavController,public navParams: NavParams) {
    this.selectedItem = navParams.get("item");
  }
  ngAfterViewInit(){
    this.intro();
  }
  openHome() {
    this.navCtrl.pop()
  }
  intro() {
  let intro = introJs.introJs();
  intro.setOptions({
  steps: [
    {
      intro: "Hello world!"
    },
    {
      element: '#step1',
      intro: "This is a tooltip.",
      position: 'bottom'

    },
    {
      element: '#step2',
      intro: "Ok, wasn't that fun?",
      position: 'bottom'
    }
  ]
  });
  intro.start();
}
}
