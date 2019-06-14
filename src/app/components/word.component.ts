import { TrackService } from './../services/track.service';
import { Component, Input, HostListener, ElementRef, OnInit, OnDestroy, AfterViewInit } from "@angular/core";

@Component({
  selector: "word",
  template: `
    <span
      *ngIf="
        color == 'em' &&
        word !== '<br>' &&
        word !== '<em>' &&
        word !== '<small>' &&
        word !== '</em>' &&
        word !== '</small>'
      "
      dir="rtl"
    >
      <em>
        <small>
          {{ word }}
        </small>
      </em>
    </span>
    <br *ngIf="word == '<br>'" />
    <span
      *ngIf="
        color !== 'em' &&
        word !== '<br>' &&
        word !== '<em>' &&
        word !== '<small>' &&
        word !== '</em>' &&
        word !== '</small>'
      "
      dir="rtl"
    >
    {{word}}
    </span>

  `
})
export class word implements OnInit, OnDestroy, AfterViewInit {
  @Input() word: string;
  @Input() start: number;
  @Input() end: number;
  @Input() color: any;
  @Input() number: number;
  @Input() index: number;
  @HostListener("tap") onclick() {
    this.play(this.start);
  }
  is_playing: boolean;
  audio: any;
  cancel: any;
  unsub2: any;
  y: any;
  constructor(public el: ElementRef, public trackService: TrackService) {
    let that = this;
    this.audio = document.getElementById("audioplayer");
    // this.unsub2 = this.trackService.trackConfirmed$.subscribe(
    //   _ => {
    //     if (_ >= this.start && _ <= this.end) {
    //       // setTimeout(b => {this.play(this.start)},50)
    //       // setTimeout(a => {
    //       //   // let pop = this.start;
    //       //   // this.play(this.start);
    //       //   // alert(this.start);
    //       //   // this.audio.pause();
    //       //   this.audio.currentTime = this.start;
    //       // },500)

    //     }
    //     // this.audio.currentTime = _;
    //     // this.play();
    //   }
    // )

  }
  ngOnInit() {
    this.el.nativeElement.style.fontSize = "14pt";
    if (this.color == "sung") {
      let that = this;
      this.el.nativeElement.style.color = "blue";

      this.audio.addEventListener(
        "playing",
        function (e) {
          // that.el.nativeElement.style.color = that.color;
          that.unselect();
          that.is_playing = true;
          if (that.audio.currentTime < that.start){
            that.cancel = setTimeout(() => {
              that.selectCurrentWord();
            }, (that.start - that.audio.currentTime) * 1000);
          }
          // that.selectCurrentWord();
        },
        false
      );
      this.audio.addEventListener("seeked", function (e) {
        if (that.audio.currentTime <= that.start) {
          setTimeout(() => {
            that.selectCurrentWord();
          }, (that.start - that.audio.currentTime) * 1000);
        }
      });
      this.audio.addEventListener("pause", function (e) {
        that.is_playing = false;

      });
    }
  }
  ngAfterViewInit(){
    this.y = this.el.nativeElement.getBoundingClientRect();
    // console.log("afterviewinit");
  }
  selectCurrentWord() {
    // this.trackService.confirmTrack(1);
// this.y  = this.el.nativeElement.getBoundingClientRect()
    if( this.color !== "sung"){
      return
    }
    else if (
      this.color == "sung" &&
      this.audio.currentTime < this.end &&
      this.audio.currentTime >= this.start
    ) {

      this.el.nativeElement.style.backgroundColor = "yellow";
      this.el.nativeElement.style.fontSize = "24pt";
      // console.log(this.word + ' - yellow')
      if (this.is_playing) {
        setTimeout(() => {
          this.selectCurrentWord();
        }, (this.end - this.audio.currentTime) * 1000);
      }
      if (this.number == 0) {
        console.log(this.word + ' ' + this.index + ' ' + this.y.y)
        // this.el.nativeElement.scrollBy(0,this.y.y)
        this.trackService.confirmTrack(this.y.y)
        // this.el.nativeElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    } else {
      this.el.nativeElement.style.backgroundColor = null;
      this.el.nativeElement.style.fontSize = "14pt";

      if (this.is_playing && this.audio.currentTime < this.start) {
        setTimeout(() => {
          this.selectCurrentWord();
        }, (this.start - this.audio.currentTime) * 1000);
      }
    }
  }
  unselect(){
    this.el.nativeElement.style.backgroundColor = null;
    this.el.nativeElement.style.fontSize = "14pt";
  }
  play(_) {
    // alert("play " + this.word)
    // this.audio.play();
    // this.audio.pause();//.then(result => {
    //   console.log(this.word);
    //   this.is_playing = true;
      this.audio.currentTime = _ || this.start;
      this.audio.play();
    this.selectCurrentWord();
    //})//.catch((err) => {
      // alert(err)
    //});;
    // this.audio.play();

  }
  ngOnDestroy(){
    // this.unsub2.unsubscribe();
    // console.log(this.word)
  }
}
