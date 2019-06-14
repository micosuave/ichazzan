import { Component, Input} from "@angular/core";
import { NavParams } from "ionic-angular";

@Component({
  selector: "read-along",
  template: `
    <audio
      id="audioplayer"
      src="{{audio}}"
      controls
      style="display:none;"
    ></audio>
    <p dir="rtl" *ngFor="let line of item.words, let i = index">
      <word
        *ngFor="let word of line"
        word="{{word[3]}}"
        start="{{word[4]}}"
        end="{{word[5]}}"
        color="{{word[6]}}"
        number="{{word[2]}}"
        index="{{word[0]}}"
      ></word>
    </p>
  `
})
export class ReadAlong {
  item: any;
 @Input() audio: string;
  audio_element: any;

  constructor(public navParams: NavParams) {
    this.item = navParams.get("item");
    this.audio_element = document.getElementById("audioplayer");

  }
  play() {
    this.audio_element.play();
  }

  pause() {
    this.audio_element.pause();
  }
}
