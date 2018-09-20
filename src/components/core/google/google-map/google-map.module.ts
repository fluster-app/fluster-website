import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AgmCoreModule} from '@agm/core';

import {GoogleMapComponent} from './google-map.component';

const CORE_COMPONENTS = [
  GoogleMapComponent
];

@NgModule({
  declarations: [
    CORE_COMPONENTS
  ],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC6nINcbbISK5EnwMrPpVUc4oAHi6JtDFw'
    })
  ],
  exports: [
    CORE_COMPONENTS
  ]
})
export class GoogleMapModule {
}
