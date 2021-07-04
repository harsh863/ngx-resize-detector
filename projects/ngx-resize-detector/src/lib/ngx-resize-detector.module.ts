import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxResizeDetectorDirective} from "./ngx-resize-detector.directive";



@NgModule({
  declarations: [ NgxResizeDetectorDirective ],
  imports: [ CommonModule ],
  exports: [ NgxResizeDetectorDirective ]
})
export class NgxResizeDetectorModule { }
