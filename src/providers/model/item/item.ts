import {Location} from '../location/location';

export class ItemItemAddress {
  location: Location;
  district: string;
  city: string;
  country: string;
}

export class ItemAvailability {
  begin: Date;
  end: Date;
}


export class ItemItemPrice {
  gross: number;
  net: number;
  charges: number;
  currency: string;
}

export class ItemItemAttributes {
  type: string;
  sharedRooms: number;
  rooms: number;
  size: number;
  price: ItemItemPrice;
  availability: ItemAvailability;
}

export class ItemDetail {
  otherPhotos: string[];
}

export class ItemUserLimitationsAge {
  min: number;
  max: number;
}

export class ItemUserLimitations {
  age: ItemUserLimitationsAge;
  gender: string;
}

export class Item {
  hashId: string;
  title: string;
  address: ItemItemAddress;
  attributes: ItemItemAttributes;
  userLimitations: ItemUserLimitations;
  mainPhoto: string;
  source: string;
  type: string;

  itemDetail: ItemDetail;

  // To lazy load images
  showImage = false;
}
