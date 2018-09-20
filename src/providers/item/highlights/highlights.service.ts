import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {isPlatformServer} from '@angular/common';
import {makeStateKey, StateKey, TransferState} from '@angular/platform-browser';

import {Observable, from} from 'rxjs';

// Model
import {Item} from '../../model/item/item';

// Resources
import {Resources} from '../../core/utils/resources';

@Injectable({
  providedIn: 'root'
})
export class HighlightsService {

  private stateKey: StateKey<number>;

  selectedItem: Item;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private httpClient: HttpClient,
              private transferState: TransferState) {

    this.stateKey = makeStateKey<number>('highlights');
  }

  getHighlights(): Observable<Object> {
    if (isPlatformServer(this.platformId)) {
      return from(this.queryHighlights());
    } else {
      return this.retrieveHighlights();
    }
  }

  private queryHighlights(): Promise<{}> {
    return new Promise((resolve, reject) => {
      const params: HttpParams = new HttpParams();

      this.httpClient.get(Resources.Constants.API.HIGHLIGHTS, {params: params}).subscribe((results: Item[]) => {
        this.transferState.set(this.stateKey, results);
        resolve(results);
      }, (error) => {
        reject(error);
      });
    });
  }

  private retrieveHighlights(): Observable<Object> {
    return new Observable(observer => {
      observer.next(this.transferState.get(this.stateKey, new Array()));
    });
  }

}
