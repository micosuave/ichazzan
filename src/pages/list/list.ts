import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  icons: string[];
  titles: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.icons = ['logo-chrome', 'planet', 'logo-slack', 'paper-plane',
    'logo-codepen', 'logo-angular','paw'];
    this.titles = ['Kabbalat Shabbat','Maariv (Friday Night)','Shacharit - Psukei D\'zimra','Shacharit - Shochen Ad','Musaf','Mincha'];
    this.items = [];
    for(let i = 0; i < 6; i++) {
      this.items.push({
        title: this.titles[i] || 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }
}
