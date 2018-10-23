import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TranslateModule} from '@ngx-translate/core';

import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import {ItemSummaryComponent} from './item-summary.component';

const CORE_COMPONENTS = [
  ItemSummaryComponent
];

@NgModule({
  declarations: [
    CORE_COMPONENTS
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    FontAwesomeModule
  ],
  exports: [
    CORE_COMPONENTS
  ]
})
export class ItemSummaryModule {
}
