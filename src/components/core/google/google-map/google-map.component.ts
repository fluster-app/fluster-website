import {Component, Inject, Input, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

// Model
import {Item} from '../../../../providers/model/item/item';

// Utils
import {Comparator} from '../../../../providers/core/utils/utils';

// Services
import {GoogleStyle, GoogleStyleService} from '../../../../providers/core/map/google-style.service';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {

  @Input() item: Item;

  latitude: number;
  longitude: number;
  zoom = 14;

  style: GoogleStyle;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private googleStyleService: GoogleStyleService) {

  }

  ngOnInit() {
    this.googleStyleService.findStyle().then((style: GoogleStyle) => {
      this.style = style;
    });

    if (!Comparator.isEmpty(this.item) && !Comparator.isEmpty(this.item.address)) {
      this.longitude = this.item.address.location.coordinates[0];
      this.latitude = this.item.address.location.coordinates[1];
    }
  }

  isBrowser() {
    return isPlatformBrowser(this.platformId);
  }

}
