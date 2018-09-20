import {AfterViewChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core';

import {TranslateService} from '@ngx-translate/core';
import {Resources} from '../../providers/core/utils/resources';

export interface DemoScreen {
  imgName: string;
  show: boolean;
}

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html'
})
export class HomeViewComponent implements OnInit, AfterViewChecked {

  RESOURCES: any = Resources.Constants;

  highlights = true;

  demoScreens: DemoScreen[] = [
    {
      imgName: 'demo-screen-01-01',
      show: true
    },
    {
      imgName: 'demo-screen-06',
      show: false
    },
    {
      imgName: 'demo-screen-02-01',
      show: false
    }
  ];

  constructor(private translateService: TranslateService,
              private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

  getLang(): string {
    return this.translateService.currentLang;
  }

  highlightsLoaded(state: boolean) {
    this.highlights = state;
  }

  loadDemoScreenOne() {
    this.demoScreens[1].show = true;
  }

  loadDemoScreenTwo() {
    this.demoScreens[2].show = true;
  }
}
