import { Component, AfterViewInit } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { ItemContentPage } from '../item-content/item-content';
import { Storage } from '@ionic/storage';

import introJs from 'intro.js/intro.js';


@Component({
  selector: "page-item-details",
  templateUrl: "item-details.html"
})
export class ItemDetailsPage implements AfterViewInit{
  selectedItem: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,  public storage: Storage) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get("item");
  }
  itemTapped(event, item) {
    if(item.nodes != undefined && item.nodes.length > 0){
      this.navCtrl.push(ItemDetailsPage, {
        item: item
      })
    }
    else {
    this.navCtrl.push(ItemContentPage, {
      item: item,
      nodes: this.selectedItem.nodes
    });
  }
  }
  intro() {
  let intro = introJs.introJs();
  intro.setOptions({
  steps: [
    {
      element: '#step1',
      intro: "<h3>Every section has a list of available items</h3>",
      position: 'bottom'

    },
    {
      element: '#step2',
      intro: `<h3 style="font:sans-serif;">Audio available</h3>`,
      position: 'bottom'
    },
    {
      element: '#step3',
      intro: "<h3>Hebrew Title</h3>",
      position: 'bottom'

    },
    {
      element: '#step4',
      intro: `<h3>Note or translation available</h3>`,
      position: 'bottom'
    },
    {
      element: '#step1',
      intro: `<h3 style="color:#006699">Blue tracks have only one available audio track</h3>`
    },
    {
      element: '#step11',
      intro:`<h3 style="color:#006600">Green tracks have multiple audio tracks</h3>`,
      position: 'right'
    }
  ]
  });
  intro.start();
  this.storage.set('tutorial1', 'true');
}
ngAfterViewInit(){
  // let that = this
  // this.storage.get('tutorial1').then(val => {
  //   //console.log(val)
  //   if (val !== "true"){
  //    setTimeout(function(){ that.intro()},500); 
  //   }
  //   else{

  //   }
  // });
}
}
