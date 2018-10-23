import {Component, Inject, Input, OnChanges, OnInit, PLATFORM_ID, SimpleChange} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

// Model
import {Item} from '../../../../providers/model/item/item';

// Utils
import {Comparator} from '../../../../providers/core/utils/utils';
import {Resources} from '../../../../providers/core/utils/resources';

// Services
import {GoogleStyleService} from '../../../../providers/core/map/google-style.service';

// Web Google Maps
import {WebGoogleMapsCircle} from 'web-google-maps/dist/types/types/web-google-maps/web-google-maps-circle';
import {WebGoogleMapsOptions} from 'web-google-maps/dist/types/types/web-google-maps/web-google-maps-options';
import {WebGoogleMapsStyle} from 'web-google-maps/dist/types/types/web-google-maps/web-google-maps-style';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit, OnChanges {

  RESOURCES: any = Resources.Constants;

  @Input() item: Item;

  latitude: number;
  longitude: number;

  options: WebGoogleMapsOptions;

  style: WebGoogleMapsStyle;

  circles: WebGoogleMapsCircle[];

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private googleStyleService: GoogleStyleService) {

  }

  ngOnInit() {
    this.googleStyleService.findStyle().then((style: WebGoogleMapsStyle) => {
      this.style = style;
    });
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    if (!Comparator.isEmpty(this.item) && !Comparator.isEmpty(this.item.address)) {
      this.longitude = this.item.address.location.coordinates[0];
      this.latitude = this.item.address.location.coordinates[1];

      this.options = {
        zoom: 14
      };

      this.circles = [{
        lat: this.latitude,
        lng: this.longitude,
        radius: 1000,
        fillColor: '#ff8ea3',
        strokeColor: '#ff65a9',
        draggable: false,
        editable: false,
        clickable: false
      }];
    }
  }

  isBrowser() {
    return isPlatformBrowser(this.platformId);
  }

}
