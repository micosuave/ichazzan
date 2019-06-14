import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class TrackService {

  // Observable string sources
  private trackAnnouncedSource = new Subject<number>();
  private trackConfirmedSource = new Subject<number>();

  // Observable string streams
  trackAnnounced$ = this.trackAnnouncedSource.asObservable();
  trackConfirmed$ = this.trackConfirmedSource.asObservable();

  // Service message commands
  announceTrack(track: number) {
    this.trackAnnouncedSource.next(track);
  }

  confirmTrack(track: number) {
    this.trackConfirmedSource.next(track);
  }
}
