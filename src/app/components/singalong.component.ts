import { MediaCapture, MediaFile, CaptureError, CaptureAudioOptions } from '@ionic-native/media-capture';
import { Component, Input, HostListener, ElementRef, OnInit } from "@angular/core";
import { File } from "@ionic-native/file";
import { NavParams } from "ionic-angular";
@Component({
  selector: "singalong",
  template: `
    <button ion-button color="primary" (click)="recordAudio()"></button>
    <audio src="../Library/NoCloud{{selectedFile.fullPath}}" controls></audio>
    <p>{{selectedFile | json:2}}</p>
    <ion-list>
      <ion-item *ngFor="let x of list" (click)="open(x)">
        <ion-icon
          name="folder"
          class="file-color"
          item-start
          *ngIf="x.isDirectory"
        ></ion-icon>
        {{ x.name }}
      </ion-item>
    </ion-list>
    <p>Temp Directory</p>
    <ion-list>
      <ion-item *ngFor="let x of dirs" (click)="open(x)">
        <ion-icon
          name="folder"
          class="file-color"
          item-start
          *ngIf="x.isDirectory"
        ></ion-icon>
        {{ x.name }}
      </ion-item>
    </ion-list>
  `
})
export class Singalong {
  list: any;
  item: any;
  title: string;
  dirs: any;
  selectedFile: any;
  constructor(
    private mediaCapture: MediaCapture,
    private file: File,
    private navParams: NavParams
  ) {
    this.item = navParams.get("item");
    this.title = this.item.enTitle;
    this.file
      .checkDir(this.file.dataDirectory, this.title)
      .then(_ => console.log("Directory exists"))
      .catch(err => this.setupDirectory());
    this.file
      .listDir(this.file.dataDirectory, this.title)
      .then(_ => (this.list = _))
      .catch(err => console.log("Error getting files"));
    this.file
      .listDir(this.file.tempDirectory, "")
      .then(_ => (this.dirs = _))
      .catch(err => console.log("Error getting files"));
  }
  setupDirectory() {
    console.log("Directory doesn't exist");
    this.file.createDir(this.file.dataDirectory, this.title, false);
  }
  open(x) {
    this.selectedFile= x
  }
  recordAudio() {
    let options: CaptureAudioOptions = { limit: 1 };
    let dirEntry = this.file.dataDirectory;
    // let dir = this.file
    //   .getDirectory(dirEntry, this.title, null)
    //   .then(_ => (dir = _));
    this.mediaCapture.captureAudio(options).then(
      (data: MediaFile[]) => {
        console.log(data);
        // this.file.checkFile(data[0].fullPath,data[0].name).then(_ => console.log(_)).catch(err => console.log(err))
        this.file
          .copyFile(
            this.file.tempDirectory,
            data[0].name,
            this.file.dataDirectory + '/'+this.title,
            this.title + this.list.length
          )
          .then(entry => console.log("Saved"))
          .catch(err => console.log(err));

      },
      (err: CaptureError) => console.error(err)
    );
  }
}
