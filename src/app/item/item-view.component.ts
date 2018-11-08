import {Component, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Meta} from '@angular/platform-browser';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {Subscription} from 'rxjs';

import {isPlatformServer} from '@angular/common';

import {TranslateService} from '@ngx-translate/core';

// Resources
import {Item} from '../../providers/model/item/item';

// Utils
import {Comparator} from '../../providers/core/utils/utils';
import {ItemsComparator} from '../../providers/core/utils/items-utils';
import {Resources} from '../../providers/core/utils/resources';

// Services
import {ItemsService} from '../../providers/item/item/items.service';
import {HighlightsService} from '../../providers/item/highlights/highlights.service';
import {ItemImage} from '../../components/core/slider/slider.component';

// Web
import {WebSocialShareInput} from 'web-social-share/dist/types/types/web-social-share/web-social-share-input';

@Component({
  selector: 'app-item-view',
  styleUrls: ['./item-view.component.scss'],
  templateUrl: './item-view.component.html'
})
export class ItemViewComponent implements OnInit, OnDestroy {

  RESOURCES: any = Resources.Constants;

  private sub: Subscription;

  item: Item;
  itemImages: ItemImage[];

  showShare = false;
  shareOptions: WebSocialShareInput;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer,
              private meta: Meta,
              private translateService: TranslateService,
              private itemsService: ItemsService,
              private highlightsService: HighlightsService) {

  }

  async ngOnInit() {

    // In case we land here from the highlights, don't reload the item
    if (!Comparator.isEmpty(this.highlightsService.selectedItem)) {
      await this.loadItem(this.highlightsService.selectedItem);
      this.highlightsService.selectedItem = null;
      return;
    }

    this.sub = this.route.params.subscribe(params => {
      this.getAndLoadItem(params['id']);
    });
  }

  ngOnDestroy() {
    if (this.sub != null) {
      this.sub.unsubscribe();
    }
  }

  private getAndLoadItem(itemHashId: string) {
    this.itemsService.getItem(itemHashId).subscribe(async (result: Item) => {
      await this.loadItem(result);
    }, (error) => {
      // TODO display msg
    });
  }

  private async loadItem(result: Item) {
    this.item = result;
    await this.concatImages();

    if (isPlatformServer(this.platformId)) {
      this.updateMetadata();
    }
  }

  concatImages(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.itemImages = new Array();

      if (!Comparator.isEmpty(this.item)) {
        this.itemImages.push({
          image: this.item.mainPhoto,
          show: false
        });

        if (!Comparator.isEmpty(this.item.itemDetail.otherPhotos)) {
          this.item.itemDetail.otherPhotos.forEach((image: string) => {
            this.itemImages.push({
              image: image,
              show: false
            });
          });
        }
      }
    });
  }

  private updateMetadata() {
    if (!Comparator.isEmpty(this.item)) {
      this.meta.updateTag({
        property: 'og:image',
        content: this.RESOURCES.AWS.S3_URL + '/' + this.item.source + '/' + this.item.hashId + '/' + this.item.mainPhoto
      });
      this.meta.updateTag({
        property: 'og:image:secure_url',
        content: this.RESOURCES.AWS.S3_URL + '/' + this.item.source + '/' + this.item.hashId + '/' + this.item.mainPhoto
      });
      this.meta.updateTag({
        property: 'og:image:type',
        content: this.RESOURCES.PHOTO.MIME_TYPE
      });

      this.meta.updateTag({property: 'og:type', content: 'article'});
      this.meta.updateTag({property: 'og:url', content: this.RESOURCES.SOCIAL_SHARING.FLUSTER_WEBSITE + '/item/' + this.item.hashId});
    }
  }

  updateMetaDescription(formattedPrice: string) {
    if (Comparator.isEmpty(this.item)) {
      return;
    }

    let description: string = this.translateService.instant('META.TITLE') + ' | ';

    if (!Comparator.isStringEmpty(this.item.address.district)) {
      description = this.item.address.district + ', ';
    }

    description += this.item.address.city + ' | ';

    if (ItemsComparator.isItemShare(this.item)) {
      description += '' + this.item.attributes.sharedRooms + ' ' + (Comparator.equals(this.item.attributes.sharedRooms, 1) ? this.translateService.instant('SELECT_ATTRIBUTES.SHARED_ROOM') : this.translateService.instant('SELECT_ATTRIBUTES.SHARED_ROOMS'));
    } else if (ItemsComparator.isItemFlat(this.item)) {
      description += '' + this.item.attributes.rooms + ' ' + (Comparator.equals(this.item.attributes.rooms, 1) ? this.translateService.instant('SELECT_ATTRIBUTES.ROOM') : this.translateService.instant('SELECT_ATTRIBUTES.ROOMS'));

      if (this.item.attributes.size > 0) {
        description += ' ' + this.item.attributes.size + ' ' + this.translateService.instant('CORE.SQUARE_METER');
      }
    }

    if (!Comparator.isEmpty(this.item.attributes.availability)) {
      if (ItemsComparator.isItemShare(this.item)) {
        description += ' | ' + this.translateService.instant('TEXT.SHARE');
      } else if (ItemsComparator.isItemFlat(this.item)) {
        description += ' | ' + (ItemsComparator.hasItemEndAvailability(this.item) ? this.translateService.instant('TEXT.FLAT_LIMITED') : this.translateService.instant('TEXT.FLAT_TAKEOVER'));
      }

      if (ItemsComparator.isItemAvailableNow(this.item)) {
        if (ItemsComparator.hasItemEndAvailability(this.item)) {
          description += this.translateService.instant('ITEMS.AVAILABILITY.AVAILABLE_NOW_WITHOUT_END');
        } else {
          description += this.translateService.instant('ITEMS.AVAILABILITY.AVAILABLE_NOW_TILL', {formattedDate: ItemsComparator.getItemFormattedDate(this.item.attributes.availability.end)});
        }
      } else {
        if (ItemsComparator.hasItemEndAvailability(this.item)) {
          description += this.translateService.instant('ITEMS.AVAILABILITY.AVAILABLE_FROM', {formattedDate: ItemsComparator.getItemFormattedDate(this.item.attributes.availability.begin)});
          description += this.translateService.instant('ITEMS.AVAILABILITY.AVAILABLE_TILL', {formattedDate: ItemsComparator.getItemFormattedDate(this.item.attributes.availability.end)});
        } else {
          description += this.translateService.instant('ITEMS.AVAILABILITY.AVAILABLE_THE', {formattedDate: ItemsComparator.getItemFormattedDate(this.item.attributes.availability.begin)});
        }
      }
    }

    description += ' | ' + this.translateService.instant('ITEM_DETAILS.CONTENT.PRICE_GROSS') + ' ' + formattedPrice;

    this.meta.updateTag({name: 'description', content: description});
    this.meta.updateTag({property: 'og:description', content: description});
  }

  sanitize(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  async share(): Promise<{}> {
    return new Promise((resolve) => {
      this.shareOptions = {
        config: [{
          facebook: {
            socialShareUrl: this.RESOURCES.SOCIAL_SHARING.FLUSTER_WEBSITE + '/item/' + this.item.hashId,
            socialSharePopupWidth: 400,
            socialSharePopupHeight: 400
          }
        }, {
          twitter: {
            socialShareUrl: this.RESOURCES.SOCIAL_SHARING.FLUSTER_WEBSITE + '/item/' + this.item.hashId,
            socialSharePopupWidth: 300,
            socialSharePopupHeight: 400
          }
        }, {
          reddit: {
            socialShareUrl: this.RESOURCES.SOCIAL_SHARING.FLUSTER_WEBSITE + '/item/' + this.item.hashId,
            socialSharePopupWidth: 300,
            socialSharePopupHeight: 500
          }
        }, {
          linkedin: {
            socialShareUrl: this.RESOURCES.SOCIAL_SHARING.FLUSTER_WEBSITE + '/item/' + this.item.hashId
          }
        }, {
          pinterest: {
            socialShareUrl: this.RESOURCES.SOCIAL_SHARING.FLUSTER_WEBSITE + '/item/' + this.item.hashId
          }
        }, {
          email: {
            socialShareBody: this.RESOURCES.SOCIAL_SHARING.FLUSTER_WEBSITE + '/item/' + this.item.hashId
          }
        }]
      };

      this.showShare = true;

      resolve();
    });
  }

  shareClose() {
    this.showShare = false;
  }

}
