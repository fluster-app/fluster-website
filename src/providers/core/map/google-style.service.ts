import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export interface GoogleStyle {
  styles: google.maps.MapTypeStyle[];
}

@Injectable({
  providedIn: 'root'
})
export class GoogleStyleService {

  private style: GoogleStyle = null;

  private loaded: boolean;

  constructor(private httpClient: HttpClient) {
    this.loaded = false;
  }

  findStyle(): Promise<{}> {
    return new Promise((resolve) => {

      if (this.loaded) {
        resolve(this.style);
      } else {
        this.httpClient.get('/assets/map/fluster-map-style.json')
          .subscribe((res: GoogleStyle) => {
            this.style = res;
            this.loaded = true;

            resolve(this.style);
          }, (error: any) => {
            this.loaded = true;
            resolve(this.style);
          });
      }

    });
  }

}
