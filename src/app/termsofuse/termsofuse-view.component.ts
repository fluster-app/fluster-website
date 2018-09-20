import { Component, OnInit } from '@angular/core';

import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-termsofuse-view',
  templateUrl: './termsofuse-view.component.html'
})
export class TermsofuseViewComponent implements OnInit {

  constructor(private translateService: TranslateService) { }

  ngOnInit() {
  }

  getLang(): string {
    return this.translateService.currentLang;
  }

}
