import {Component, Input, OnInit} from '@angular/core';

import {TranslateService} from '@ngx-translate/core';
import {Resources} from '../../../providers/core/utils/resources';
import {Router} from '@angular/router';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html'
})
export class DownloadComponent implements OnInit {

  RESOURCES: any = Resources.Constants;

  @Input() displayCompetitionLink: boolean = false;

  constructor(private translateService: TranslateService, private router: Router) {
  }

  ngOnInit() {
  }

  getLang(): string {
    return this.translateService.currentLang;
  }

  navigateCompetition() {
    this.router.navigate(['competition']).then(() => {
      window.scrollTo(0, 0);
    });
  }

}
