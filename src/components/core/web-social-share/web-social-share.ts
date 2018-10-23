import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';

// Web
import {WebSocialShareInput} from 'web-social-share/dist/types/types/web-social-share/web-social-share-input';

@Component({
    templateUrl: 'web-social-share.html',
    styleUrls: ['./web-social-share.scss'],
    selector: 'app-web-social-share',
    encapsulation: ViewEncapsulation.None
})
export class WebSocialShareComponent {

    @Input() show = false;
    @Input() share: WebSocialShareInput;

    @Output() closed: EventEmitter<boolean> = new EventEmitter<boolean>();

    sharePWAClose() {
        this.closed.emit(true);
    }

}
