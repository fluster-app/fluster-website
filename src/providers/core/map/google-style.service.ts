import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

// Web Google Maps
import {WebGoogleMapsStyle} from 'web-google-maps/dist/types/types/web-google-maps/web-google-maps-style';

@Injectable({
  providedIn: 'root'
})
export class GoogleStyleService {

  private style: WebGoogleMapsStyle = null;

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
          .subscribe((res: WebGoogleMapsStyle) => {
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
