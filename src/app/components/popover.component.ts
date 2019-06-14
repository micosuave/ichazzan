import { TrackService } from './../services/track.service';
import { Component, Output, EventEmitter, OnChanges, SimpleChanges } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { NavParams, ViewController } from "ionic-angular";
import { ItemContentPage } from '../../pages/item-content/item-content';

@Component({
  selector: "popovercomp",
  template: `
    <form (ngSubmit)="dismiss(audiotracks.value)" id="step11">
      <ion-list radio-group [formControl]="audiotracks">
        <ion-list-header> Available Audio </ion-list-header>

        <ion-item *ngFor="let track of selectedItem.audiotracks, let i = index" (tap)="dismiss(i)">
          <ion-label>{{ track.title }}</ion-label>
          <ion-radio value="{{i}}" ></ion-radio>
        </ion-item>
      </ion-list>
       
      <!--<button type="submit" ion-button block>Close</button>-->
    </form>
  `
  // ,
  // providers: [TrackService]
})
export class PopoverComponent implements OnChanges {
  ev: any;
  selectedItem: any;
  audiotracks = new FormControl('')
  @Output() trackChange: EventEmitter<any> = new EventEmitter();
  constructor(public navParams: NavParams, public viewCtrl: ViewController,
    public trackService: TrackService) {

    this.selectedItem = this.navParams.get("item");
    this.ev = this.navParams.get("ev");
    let ind = this.selectedItem.audiotracks
    const index = ind.findIndex(fruit => fruit.title === this.selectedItem.title);
    if (index == -1){
      this.audiotracks.setValue(0);
    }
    else{
      this.audiotracks.setValue(index);
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    this.dismiss(changes)
    for (let propName in changes) {
      /*let chng = changes[propName];
      let cur  = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);
      this.changeLog.push(`propName: currentValue = cur, previousValue = prev`);*/
    }
  }
  dismiss(selection) {
    this.trackService.announceTrack(selection);
    this.trackChange.emit(selection);
    // alert(JSON.stringify(this.selectedItem.audiotracks[didDismiss]));
    // this.viewCtrl.dismiss();
    //this.viewCtrl._nav.push(ItemContentPage, {item: this.selectedItem.audiotracks[selection]})
    this.viewCtrl._nav.pop();
  }
}
