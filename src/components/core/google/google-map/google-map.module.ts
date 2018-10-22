import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GoogleMapComponent} from './google-map.component';

const CORE_COMPONENTS = [
  GoogleMapComponent
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
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoogleMapModule {
}
