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
export class ItemsService {

  private stateKey: StateKey<number>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private httpClient: HttpClient,
              private transferState: TransferState) {

    this.stateKey = makeStateKey<number>('web-item');
  }

  getItem(itemHashId: string): Observable<Object> {
    if (isPlatformServer(this.platformId)) {
      return from(this.getItemServer(itemHashId));
    } else {
      return this.getItemClient();
    }
  }

  private getItemServer(itemHashId: string): Promise<{}> {
    return new Promise((resolve, reject) => {
      const params: HttpParams = new HttpParams();

      this.httpClient.get(Resources.Constants.API.ITEMS + itemHashId, {params: params}).subscribe((result: Item) => {
        this.transferState.set(this.stateKey, result);
        resolve(result);
      }, (error) => {
        reject(error);
      });
    });
  }

  private getItemClient(): Observable<Object> {
    return new Observable(observer => {
      observer.next(this.transferState.get(this.stateKey, null));
    });
  }

}
