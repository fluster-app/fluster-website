import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

export interface ItemImage {
  image: string;
  show: boolean;
}

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SliderComponent implements OnInit {

  @Input() images: ItemImage[];
  @Input() imgSrc: string;

  imgIndex = 0;

  constructor() {
  }

  ngOnInit() {
  }

  back() {
    this.imgIndex--;
  }

  next() {
    this.imgIndex++;
  }

  select(index: number) {
    this.imgIndex = index;
  }

}
