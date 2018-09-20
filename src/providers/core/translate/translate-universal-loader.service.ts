import {TranslateLoader} from '@ngx-translate/core';

import {Observable, of} from 'rxjs';

import * as translationEn from 'assets/i18n/en.json';
import * as translationFr from 'assets/i18n/fr.json';
import * as translationDe from 'assets/i18n/de.json';
import * as translationIt from 'assets/i18n/it.json';

const TRANSLATIONS = {
  en: translationEn,
  fr: translationFr,
  de: translationDe,
  it: translationIt
};

export class TranslateUniversalLoader implements TranslateLoader {

  constructor() {
  }

  public getTranslation(lang: string): Observable<any> {
    return of(TRANSLATIONS[lang]);
  }
}

export function translateFactory() {
  return new TranslateUniversalLoader();
}
