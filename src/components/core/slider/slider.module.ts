import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MatTabsModule} from '@angular/material/tabs';

import {SliderComponent} from './slider.component';

import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {TranslateModule} from '@ngx-translate/core';

import {DeferLoadModule} from '../../../directives/core/lazy/defer-load.module';

const CORE_COMPONENTS = [
  SliderComponent
];

@NgModule({
  declarations: [
    CORE_COMPONENTS
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    FontAwesomeModule,
    TranslateModule.forChild(),
    DeferLoadModule
  ],
  exports: [
    CORE_COMPONENTS
  ]
})
export class SliderModule {
}
