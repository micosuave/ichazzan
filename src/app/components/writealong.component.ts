import { Component, ElementRef } from "@angular/core";
import { NavParams } from "ionic-angular";
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: "write-along",
  template: `

    <div id="audioplayer1">{{ audio.currentTime }}</div>
    <button ion-button (click)="setPlayback(0.5)">0.5x</button>
    <button ion-button (click)="setPlayback(1.0)">1.0x</button>
    <button ion-button (click)="setPlayback(1.5)">1.5x</button>
    <p>Playback Rate: {{ playbackRate }}x</p>
    <p>
      <button ion-button color="dark" (click)="export()">Export</button>
      <button ion-button color="secondary" (click)="test()">Test</button>
      <button ion-button color="dark" (click)="skipline(next_word[1])">Skip Line</button>
      <button ion-button color="danger" (click)="mark('em')">Em Word</button>
      <button ion-button color="dark" (click)="mark('silent')">Skip Word</button>
      <button ion-button color="primary" (click)="mark('sung')" *ngIf="next_word == null">Finish</button>
      <button
        ion-button
        color="primary"
        (click)="mark('sung')"
        *ngIf="next_word !== null"
      >
        Mark Word
      </button>
      <span *ngIf="next_word !== null"> Next Word: {{ next_word[3] }}</span>
    </p>
    <p>Marked:</p>
    <table style="padding:5px;">
      <thead>
        <th>Index</th>
        <th>Line</th>
        <th>Word</th>
        <th>Text</th>
        <th>Start</th>
        <th>End</th>
      </thead>
      <tr *ngFor="let word of marked">
        <td style="padding:5px;">{{ word[0] }}</td>
        <td style="padding:5px;">{{ word[1] }}</td>
        <td style="padding:5px;">{{ word[2] }}</td>
        <td style="padding:5px;">{{ word[3] }}</td>

        <td style="padding:5px;">
          {{ word[4] }}
          <button (click)="increaseStart(word)">
            <ion-icon name="arrow-up"></ion-icon>
          </button>
          <button (click)="decreaseStart(word)">
            <ion-icon name="arrow-down"></ion-icon>
          </button>
        </td>
        <td style="padding:5px;">
          {{ word[5] }}
          <button (click)="increaseEnd(word)">
            <ion-icon name="arrow-up"></ion-icon>
          </button>
          <button (click)="decreaseEnd(word)">
            <ion-icon name="arrow-down"></ion-icon>
          </button>
        </td>
      </tr>
    </table>
  `
})
export class WriteAlong {
  item: any;
  playbackRate: number;
  next_word: string;
  previous_word: any;
  audio: any;
  currentIndex: number;
  words: any;
  previous_time: number;
  marked: any;
  audio_props: any;
  constructor(
    public navParams: NavParams,
    public el: ElementRef,
    public clipboard: ClipboardService
  ) {
    this.item = navParams.get("item");
    this.audio = document.createElement("audio");
    this.audio.src = this.item.audio;
    this.audio.id = "audioplay2";
    this.audio.controls = true;
    el.nativeElement.append(this.audio);

    this.audio_props = this.audio.length;
    this.words = [];
    for (let i = 0; i < this.item["text-hebrew"].length; i++) {
      let line = this.item["text-hebrew"][i];
      let linewords = line.split(" ");
      for (let j = 0; j < linewords.length; j++) {
        this.words.push([
          this.words.length,
          Number(i),
          Number(j),
          linewords[j]
        ]);
      }
    }

    this.next_word = this.words[0];
    this.currentIndex = 0;
    this.previous_time = 0.0;
    this.previous_word = null;
    this.marked = [];
  }
  setPlayback(num) {
    this.playbackRate = num;
    this.audio.playbackRate = num;
  }
skipline(line){
    if (this.next_word[3] !== '<br>'){
      let line_num = JSON.parse(this.next_word[1]);
      if(line_num == line){
        this.mark('silent');
        this.skipline(line);
      }
    }
    else if (this.next_word[3] == '<br>'){
      this.mark('silent')
    }

  }
  mark(color: string) {
    let time = Math.trunc(this.audio.currentTime * 100) / 100;
    if (this.next_word !== null) {
      let newword = [
        this.next_word[0],
        this.next_word[1],
        this.next_word[2],
        this.next_word[3],
        time,
        time,
        color
      ];
      if (this.previous_word !== null) {
        this.previous_word[5]= time;
        this.marked.push(this.previous_word);
      }
      this.previous_word = newword;
      this.previous_time = this.audio.currentTime;
      this.currentIndex++;
      if (this.words[this.currentIndex] !== undefined) {
        this.next_word = this.words[this.currentIndex];
      } else {
        this.next_word = null;
      }
    } else if (this.next_word === null && this.previous_word !== null) {
      this.previous_word[5]= time;
      this.marked.push(this.previous_word);
      this.previous_word = null;
      this.currentIndex = 0;
      this.test();
    }
  }
  increaseStart(word) {
    word[4] = Math.trunc((word[4] + 0.1) * 100) / 100;
    this.marked[word[0]] = word;
  }
  increaseEnd(word) {
    word[5] = Math.trunc((word[5] + 0.1) * 100) / 100;
    this.marked[word[0]] = word;
  }
  decreaseStart(word) {
    word[4] = Math.trunc((word[4] - 0.1) * 100) / 100;
    this.marked[word[0]] = word;
  }
  decreaseEnd(word) {
    word[5] = Math.trunc((word[5] - 0.1) * 100) / 100;
    this.marked[word[0]] = word;
  }
  test() {
    let fullarray = [];
    for (let l = 0; l < this.item["text-hebrew"].length; l++) {
      let linearray = [];
      for (let k = 0; k < this.marked.length; k++) {
        if (this.marked[k][1] == l) {
          linearray.push(this.marked[k]);
        }
      }
      fullarray.push(linearray);
    }
    this.item.words = fullarray;
  }
  export() {
    this.clipboard.copyFromContent(JSON.stringify(this.item.words, null, 2));
    alert("Copied to Clipboard!");
  }
}
