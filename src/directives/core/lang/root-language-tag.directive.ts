import {Directive, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';

import {TranslateService} from '@ngx-translate/core';

import {Subscription} from 'rxjs';

import {TranslateSwitcherService} from '../../../providers/core/translate/translate-switcher.service';

@Directive({
  selector: '[appRootTagLang]'
})
export class RootLanguageTagDirective implements OnInit, OnDestroy {

  private sub: Subscription;

  constructor(private el: ElementRef,
              private renderer: Renderer2,
              private translateService: TranslateService,
              private translateSwitcherService: TranslateSwitcherService) {
    this.sub = this.translateSwitcherService.watch().subscribe((lang: string) => {
        this.setTagLang(lang);
    });
  }

  ngOnInit() {
    this.setTagLang(this.translateService.currentLang);
  }

  private setTagLang(lang: string) {

    if (!this.el.nativeElement.parentElement) {
      // No app-header
      return;
    }

    if (!this.el.nativeElement.parentElement) {
      // No view
      return;
    }

    if (!this.el.nativeElement.parentElement.parentElement) {
      // No app-root
      return;
    }

    if (!this.el.nativeElement.parentElement.parentElement.parentElement) {
      // No body
      return;
    }

    if (!this.el.nativeElement.parentElement.parentElement.parentElement.parentElement) {
      // No html element
      return;
    }

    this.renderer.setAttribute(this.el.nativeElement.parentElement.parentElement.parentElement.parentElement.parentElement,
                        'lang', lang);
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
