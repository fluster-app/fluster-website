import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DeferLoadDirective} from './defer-load.directive';

const CORE_COMPONENTS = [
  DeferLoadDirective
];

@NgModule({
  declarations: [
    CORE_COMPONENTS
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CORE_COMPONENTS
  ]
})
export class DeferLoadModule {
}
