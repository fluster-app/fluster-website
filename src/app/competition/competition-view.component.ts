import {Component, OnInit, ViewEncapsulation} from '@angular/core';

import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-competition-view',
  styleUrls: ['./competition-view.component.scss'],
  templateUrl: './competition-view.component.html',
  encapsulation: ViewEncapsulation.None
})
export class CompetitionViewComponent implements OnInit {

  constructor(private translateService: TranslateService, private router: Router) { }

  ngOnInit() {
  }

  getLang(): string {
    return this.translateService.currentLang;
  }

  navigateTermsOfUse() {
    this.router.navigate(['termsofuse']).then(() => {
      window.scrollTo(0, 0);
    });
  }

}
