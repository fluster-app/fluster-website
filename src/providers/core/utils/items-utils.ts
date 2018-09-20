import * as moment from 'moment';

// Model
import {Item} from '../../model/item/item';

// Utils
import {Comparator, Converter} from './utils';
import {Resources} from './resources';

export class ItemsComparator {

    static isItemShare(item: Item): boolean {
        return !Comparator.isEmpty(item) && Comparator.equals(Resources.Constants.ITEM.TYPE.SHARE, item.attributes.type);
    }

    static isItemFlat(item: Item): boolean {
        return !Comparator.isEmpty(item) && Comparator.equals(Resources.Constants.ITEM.TYPE.TAKEOVER, item.attributes.type);
    }

    static isItemAvailableNow(item: Item): boolean {
      const begin: Date = Converter.getDateObj(item.attributes.availability.begin);
      return begin != null && begin.getTime() <= new Date().getTime();
    }

    static hasItemEndAvailability(item: Item): boolean {
      const end: Date = Converter.getDateObj(item.attributes.availability.end);
      return end != null;
    }

    static getItemFormattedDate(input: any): string {
      const displayDate: Date = Converter.getDateObj(input);

      return displayDate != null ? moment(displayDate).format('ll') : '';
    }
}
