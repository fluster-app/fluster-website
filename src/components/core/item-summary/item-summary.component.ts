import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

// Model
import {Item} from '../../../providers/model/item/item';

// Utils
import {ItemsComparator} from '../../../providers/core/utils/items-utils';
import {Comparator} from '../../../providers/core/utils/utils';
import {Resources} from '../../../providers/core/utils/resources';

// Services
import {CurrencyService} from '../../../providers/core/currency/currency.service';

@Component({
  selector: 'app-item-summary',
  templateUrl: './item-summary.component.html',
  styleUrls: ['./item-summary.component.scss']
})
export class ItemSummaryComponent implements OnInit {

  RESOURCES: any = Resources.Constants;

  @Input() item: Item;

  @Output() notifyPrice: EventEmitter<string> = new EventEmitter<string>();

  price: Promise<string> = null;

  constructor(private currencyService: CurrencyService) {
  }

  ngOnInit() {
    this.formatPrice();
  }

  private formatPrice() {
    this.price = new Promise<string>((resolve) => {
      if (Comparator.isEmpty(this.item) || Comparator.isEmpty(this.item.address) || Comparator.isStringEmpty(this.item.address.country)) {
        resolve(null);
      } else {
        this.currencyService.initDefaultCurrency(this.item.address.country).then(() => {
          const price: string = this.currencyService.transformToLocaleString(this.item.attributes.price.gross);

          this.notifyPrice.emit(price);

          resolve(price);
        });
      }
    });
  }

  isItemShare(): boolean {
    return ItemsComparator.isItemShare(this.item);
  }

  isItemFlat(): boolean {
    return ItemsComparator.isItemFlat(this.item);
  }

  isAvailableNow(): boolean {
    return ItemsComparator.isItemAvailableNow(this.item);
  }

  hasEndAvailability(): boolean {
    return ItemsComparator.hasItemEndAvailability(this.item);
  }

  getFormattedDate(input: any): string {
    return ItemsComparator.getItemFormattedDate(input);
  }

  hasUserLimitations(): boolean {
    return !Comparator.isEmpty(this.item) && !Comparator.isEmpty(this.item.userLimitations);
  }

  hasVisibilityMale(): boolean {
    return this.hasVisibility(this.RESOURCES.ITEM.USER_RESTRICTIONS.GENDER.MALE);
  }

  hasVisibilityFemale(): boolean {
    return this.hasVisibility(this.RESOURCES.ITEM.USER_RESTRICTIONS.GENDER.FEMALE);
  }

  private hasVisibility(gender: string): boolean {
    return this.item.userLimitations.gender && (
      this.item.userLimitations.gender === this.RESOURCES.ITEM.USER_RESTRICTIONS.GENDER.IRRELEVANT ||
      this.item.userLimitations.gender === gender);
  }
}
