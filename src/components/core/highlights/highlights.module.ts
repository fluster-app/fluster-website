import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TranslateModule} from '@ngx-translate/core';

import {HighlightsComponent} from './highlights.component';

import {ItemSummaryModule} from '../item-summary/item-summary.module';
import {DeferLoadModule} from '../../../directives/core/lazy/defer-load.module';

const CORE_COMPONENTS = [
  HighlightsComponent
];

@NgModule({
  declarations: [
    CORE_COMPONENTS
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    ItemSummaryModule,
    DeferLoadModule
  ],
  exports: [
    CORE_COMPONENTS
  ]
})
export class HighlightsModule {
}
