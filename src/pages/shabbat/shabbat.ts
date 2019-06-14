import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';
import sections from '../../assets/data/shabbat.json';
import shabbat from '../../assets/data/shabbattext.json';

@Component({
  selector: 'page-shabbat',
  templateUrl: 'shabbat.html'
})
export class ShabbatPage {
  icons: string[];
  titles: string[];
  //items: Array<{ title: string, note: string, icon: string }>;
  items: any;
  sections: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.sections = sections;
    this.icons = ['logo-chrome', 'planet', 'logo-slack', 'paper-plane',
      'logo-codepen', 'logo-angular', 'paw'];
    this.titles = ['Kabbalat Shabbat', 'Maariv (Friday Night)', 'Shacharit - Psukei D\'zimra', 'Shacharit - Shochen Ad', 'Musaf', 'Mincha'];
    // this.items = [];
    // for (let i = 0; i < 6; i++) {
    //   this.items.push({
    //     title: this.titles[i] || 'Item ' + i,
    //     note: 'This is item #' + i,
    //     icon: this.icons[Math.floor(Math.random() * this.icons.length)]
    //   });
    // }
    // this.items = Object.getOwnPropertyNames(shabbat);
    // for (let i = 0; i < Object.getOwnPropertyNames(shabbat).length; i++){
    //   this.items.push({
    //     i: i
    //   })
    // }
   this.items = []
    let name;
    for (name in shabbat) this.items[name] = shabbat[name]

  }

  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }
}
