import { TrackService } from './../../app/services/track.service';
import { PopoverComponent } from './../../app/components/popover.component';
import { Component, Input, AfterViewInit, ViewChild, OnDestroy } from "@angular/core";

import { NavController, NavParams, Content } from "ionic-angular";
import { PopoverController } from "ionic-angular";

import { ReadAlong } from "../../app/components/readalong.component";
import { PowerManagement } from '@ionic-native/power-management';
import { Storage } from '@ionic/storage';
import introJs from 'intro.js/intro.js';


@Component({
  selector: "page-item-content",
  templateUrl: "item-content.html",
  //providers: [TrackService]
})
export class ItemContentPage implements AfterViewInit, OnDestroy {
  selectedItem: any;
  audio: any;
  is_playing: boolean;
  nodes: any;
  next: any;
  previous: any;
  index: number;
  isLast: boolean;
  unsub: any;
  unsub2: any;
  count: number;
  // popover: any;
  @ViewChild(Content) content: Content;
  @ViewChild(PopoverComponent)
  public popover: PopoverComponent;
  @ViewChild(ReadAlong)
  public readalong: ReadAlong;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverController: PopoverController,
    public trackService: TrackService,
    public powerManagement: PowerManagement,
    public storage: Storage
  ) {
    this.count = 0;

    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get("item");
    if (this.selectedItem.title !== undefined){
      let ind = this.selectedItem.audiotracks
      const index = ind.findIndex(fruit => fruit.title === this.selectedItem.title);
      if (index == -1) {
        if (this.selectedItem.audiotracks && this.selectedItem.audiotracks[0].audio) {
          this.selectedItem.audio = this.selectedItem.audiotracks[0].audio
        }
        if (this.selectedItem.audiotracks && this.selectedItem.audiotracks[0].words) {
          this.selectedItem.words = this.selectedItem.audiotracks[0].words
        }
      }
      else {
        if (this.selectedItem.audiotracks && this.selectedItem.audiotracks[index].audio) {
          this.selectedItem.audio = this.selectedItem.audiotracks[index].audio
        }
        if (this.selectedItem.audiotracks && this.selectedItem.audiotracks[index].words) {
          this.selectedItem.words = this.selectedItem.audiotracks[index].words
        }
      }
    }
    else{
      if (this.selectedItem.audiotracks && this.selectedItem.audiotracks[0].audio) {
        this.selectedItem.audio = this.selectedItem.audiotracks[0].audio
      }
      if (this.selectedItem.audiotracks && this.selectedItem.audiotracks[0].words) {
        this.selectedItem.words = this.selectedItem.audiotracks[0].words
      }
    }
    this.nodes = Array.from(navParams.get("nodes"));
    this.is_playing = false;
    this.index = this.nodes.indexOf(this.selectedItem);
    if (this.index == this.nodes.length -1){
      this.isLast = true;
    }
    else{
      this.isLast = false;
    }
    this.unsub = this.trackService.trackAnnounced$.subscribe(
      _ => {
        // let time = this.audio.currentTime;
        this.selectedItem.title = this.selectedItem.audiotracks[_].title;
        this.selectedItem.audio = this.selectedItem.audiotracks[_].audio;
        // this.audio.src = this.selectedItem.audiotracks[_].audio;
        this.selectedItem.words = this.selectedItem.audiotracks[_].words;
        // alert(time)
        // setTimeout(p => {
        //   // this.trackService.confirmTrack(time)
        //   this.audio.play();
        //   setTimeout(o => this.audio.pause(),25)
        // }, 100)
        this.itemTapped(this.selectedItem)
      }
    )
    this.unsub2 = this.trackService.trackConfirmed$.subscribe(
      _ => {
        // this.count++
        // console.log(_)
        this.content.scrollTo(null,(_ - 250),1000)
      }
    )
    // this.popover = this.popoverController.create(PopoverComponent);
  }
  ngAfterViewInit() {
    let that = this;
    // this.audio = this.readalong.audio_element;
    this.audio = document.getElementById("audioplayer");
    // this.content = document.querySelector('ion-content');
    this.audio.play();
    this.audio.addEventListener("playing", function(e) {
      that.is_playing = true;
      that.powerManagement.acquire();
    });
    this.audio.addEventListener("pause", function(e) {
      that.is_playing = false;
      clearTimeout();
      that.powerManagement.release();
    });

    // document.addEventListener(
    //   "keypress",
    //   function(e) {
    //     if ((e.charCode || e.keyCode) === 32) {
    //       e.preventDefault();
    //       console.log(e);
    //       that.togglePlay();
    //     } else if ((e.charCode || e.keyCode) === 37) {
    //       e.preventDefault();
    //       console.log("left arrow pressed");
    //       that.audio.currentTime = that.audio.currentTime - 0.5;
    //     } else if ((e.charCode || e.keyCode) === 39) {
    //       e.preventDefault();
    //       console.log("right arrow pressed");
    //       that.audio.currentTime = that.audio.currentTime + 0.5;
    //     }
    //   },
    //   false
    // );
    this.audio.pause();

  // this.storage.get('tutorial').then(val => {
  //   //console.log(val)
  //   if (val !== "true"){
  //    setTimeout(function(){ that.intro()},500);
  //   }
  //   else{

  //   }
  // });

  }
  itemTapped(item) {
    this.navCtrl.pop();
    this.navCtrl.push(ItemContentPage, {
      item: item,
      nodes: this.nodes
    });
  }
  swipedRight() {
      this.audio.pause();
      if(this.index == 0){
        this.navCtrl.pop();
      }
      else{
        this.navCtrl.pop().then(_ =>{
          if (this.nodes[this.index - 1].nodes !== undefined) {
            this.navCtrl.push(ItemContentPage, {
              item: this.nodes[this.index - 1].nodes[this.nodes[this.index-1].nodes.length - 1],
              nodes: this.nodes[this.index - 1].nodes
            })
          }
          else{
            this.navCtrl.push(ItemContentPage, {
              item: this.nodes[this.index - 1],
              nodes: this.nodes
            })
          }

        })
        // this.navCtrl.insert((this.navCtrl.length() - 1), ItemContentPage, {
        //   item: this.nodes[this.index - 1],
        //   nodes: this.nodes
        // })
        // .then(_ => this.navCtrl.pop())
      // this.navCtrl.push(ItemContentPage, {
      //   item: this.nodes[this.index - 1],
      //   nodes: this.nodes
      // })
      // .then(_ => {
      //   this.navCtrl.remove(this.navCtrl.length() - 2,1);
      // })
    }
  }
  swipedLeft() {
      this.audio.pause();
      if (this.isLast == true){
        this.navCtrl.pop();
      }else{
        // this.navCtrl
        //   .insert(this.navCtrl.length() - 1, ItemContentPage, {
        //     item: this.nodes[this.index + 1],
        //     nodes: this.nodes
        //   })
        //   .then(_ => this.navCtrl.pop());
        this.navCtrl.pop().then(_ => {
          if (this.nodes[this.index+1].nodes !== undefined){
              this.navCtrl.push(ItemContentPage, {
                item: this.nodes[this.index +1].nodes[0],
                nodes: this.nodes[this.index + 1].nodes
              })
          }
          else{
          this.navCtrl.push(ItemContentPage, {
            item: this.nodes[this.index + 1],
            nodes: this.nodes
          })
        }
        })
      // this.navCtrl.push(ItemContentPage, {
      //   item: this.nodes[this.index + 1],
      //   nodes: this.nodes
      // })
      //   .then(_ => {
      //     this.navCtrl.remove(this.navCtrl.length() - 2, 1);
      //   })
      }
  }
  togglePlay() {
    if (this.is_playing) {
      this.audio.pause();
    } else {
      this.audio.play();
    }
  }
  //  async presentPopover(ev: any) {
  //   let popover = await this.popoverController.create({
  //     component: PopoverComponent,
  //     event: ev,
  //     translucent: true
  //   });
  //   return await popover.present();
  // }
  async presentPopover(ev: any, data: any) {
    let pop = "this is pop";
    this.audio.pause()
    let opts = {
      componentProps: { greeting: ev },
      event: ev,
      ev: ev,
      item: this.selectedItem,
      showBackdrop: true
    }
    let popover =  await this.popoverController.create(PopoverComponent, opts);
    // this.popover.present();

    // return this.popover = popover.present();
    return await popover.present();
  }
  intro() {
  let intro = introJs.introJs();
  intro.setOptions({
  steps: [
    {

      intro: `<h3>Swipe left or right to move between items</h3><img style="-webkit-user-select: none;" src="https://thumbs.gfycat.com/PhonyWealthyEastrussiancoursinghounds-small.gif">`
    },
    {
      element: '#step8',
      intro: `<h3 style="color:blue">Blue text is sung</h3><h3>Black text is silent</h3><h3>Tap any word to play</h3>`
    },
    {
      element: '#step6',
      intro: "<h3>Play/Pause</h3><h6>You can also tap the text to skip</h6>"
    },
    {
      element: '#step7',
      intro: "<h3>Toggle English</h3><h6>Enable translation or note here</h6>",
      position: 'bottom'

    },

    {
      element: '#step9',
      intro: "<h3>English notes & translations found here</h3>",
      position: 'bottom'
    },

    {
      element: '#step10',
      intro: "<h3>Select Audio</h3><h6>Select alternative melodies here</h6>"
    }
  ]
  });
  intro.start();
   this.storage.set('tutorial', 'true');

}
reset(){
  this.storage.set('tutorial','false');
}
  ngOnDestroy() {
    this.unsub.unsubscribe();
    this.unsub2.unsubscribe();
  }
}
