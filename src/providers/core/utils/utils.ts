import * as _ from 'underscore';

export class Comparator {

    static isEmpty(obj: any): boolean {
        return obj == null || Object.keys(obj).length === 0;
    }

    static isNumberNullOrZero(obj: number): boolean {
        return obj == null || obj === 0;
    }

    static equals(obj1: any, obj2: any): boolean {
        return _.isEqual(obj1, obj2);
    }

    static isStringEmpty(str: string): boolean {
        return !str || 0 === str.length;
    }

    static isStringBlank(str: string): boolean {
        return !str || /^\s*$/.test(str);
    }

    static isBiggerThanZero(num: any): boolean {
        return Comparator.isNumber(num) && num > 0;
    }

    static isNumber(num: any): boolean {
        return num != null && num !== undefined && !isNaN(parseFloat(num)) && isFinite(num);
    }

    static hasElements(obj: any[]): boolean {
        return !this.isEmpty(obj) && obj.length > 0;
    }
}

export class Converter {

  static getDateObj(myDate: any): Date {
    if (myDate == null) {
      return null;
    }

    if (myDate instanceof String || typeof myDate === 'string') {
      return new Date('' + myDate);
    }

    return myDate;
  }

}

export class Validator {

  static generateRandomString(length: number): string {
    let text: string = '';
    let possible: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i: number = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

}
