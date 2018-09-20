import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';

import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {DownloadComponent} from './download/download.component';
import {LoginDialogComponent} from './login/login-dialog.component';
import {MenuDialogComponent} from './menu/menu-dialog.component';

import {TranslateModule} from '@ngx-translate/core';

import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {RootLanguageTagDirective} from '../../directives/core/lang/root-language-tag.directive';

const CORE_COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  DownloadComponent,
  LoginDialogComponent,
  MenuDialogComponent,
  RootLanguageTagDirective
];

@NgModule({
  declarations: [
    CORE_COMPONENTS
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    MatIconModule,
    MatDialogModule,
    FontAwesomeModule
  ],
  exports: [
    CORE_COMPONENTS
  ],
  entryComponents: [
    LoginDialogComponent,
    MenuDialogComponent
  ]
})
export class ComponentsModule {
}
