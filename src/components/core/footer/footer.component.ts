import {Component, Input, OnInit} from '@angular/core';

import {TranslateService} from '@ngx-translate/core';

import {TranslateSwitcherService} from '../../../providers/core/translate/translate-switcher.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

  @Input() home = false;
  @Input() social = true;
  @Input() copyright = false;
  @Input() language = true;
  @Input() about = false;

  constructor(private translateService: TranslateService,
              private translateSwitcherService: TranslateSwitcherService) {
  }

  ngOnInit() {
  }

  getLang(): string {
    return this.translateService.currentLang;
  }

  switchLang(lang: string) {
    this.translateSwitcherService.switchLang(lang);
  }


}
