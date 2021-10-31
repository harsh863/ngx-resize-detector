<div align="center">
    <img src="https://img.icons8.com/color/96/000000/resize.png"/>
</div>
<h1 align="center">ngxResizeDetector</h1>

<p align="center"><b><i>Angular directive to listen all resize events on the host element.</i></b></p>
<p align="center">
		<a href="https://www.npmjs.com/package/ngx-resize-detector"><img alt="NPM Version" src="https://img.shields.io/npm/v/ngx-resize-detector.svg" height="20"/></a>
    <a href="https://www.npmjs.com/package/ngx-resize-detector"><img alt="Total downloads" src="https://img.shields.io/npm/dt/ngx-resize-detector.svg" height="20"/></a>
</p>

## Demo:-

Here is the working demonstration of package: https://ngx-resize-detector-demo.vercel.app/

## Installation:-

1.&nbsp; Download the package from npm using: `npm i ngx-resize-detector`.

2.&nbsp; Add `NgxResizeDetectorModule` into your NgModule imports:
```ts
import {NgxResizeDetectorModule} from "ngx-resize-detector";

@NgModule({
  ...
    imports: [ NgxResizeDetectorModule, ... ],
...
})
```

3.&nbsp; Add `ngxResizeDetector` on any element like this:
```angular2html
<div ngxResizeDetector
     [debounce]="<DEBOUNCE_TIME(in milliseconds, default = 0)>"
     [delay]="<DELAY_TIME(in milliseconds, default = 0)>"
     [disabled]="<LISTEN_EVENTS_OR_NOT(boolean, default = false)>"
     [distinctUntilChanged]="<LISTEN_SPECIFIC_DIMENSION(ElementDimension | ElementDimension[], default = [] { listen_to_all })>"
     (onDimensionsChange)="onDimensionChange($event)">
  ...
</div>
```

4.&nbsp; Now in your `component.ts`:
```ts
import {ElementDimensions} from "ngx-resize-detector";
...
onDimensionChange(event: ElementDimensions) {
 // post resize action goes here.
}
```

## Interface:-

```ts
interface ElementDimensions {
  offsetWidth: number;
  offsetHeight: number;
  clientWidth: number;
  clientHeight: number;
}
```

## Enum:-

```ts
enum ElementDimension {
  CLIENT_HEIGHT = 'clientHeight',
  CLIENT_WIDTH = 'clientWidth',
  OFFSET_HEIGHT = 'offsetHeight',
  OFFSET_WIDTH = 'offsetWidth'
}
```

## Author:-

<img src="https://avatars.githubusercontent.com/u/53868138?s=400&u=af1bb288033e40fde4f68cfc6ed4b10f7a696316&v=4" alt="Harsh Mittal Github" width="100"/>

**[Harsh Mittal](https://github.com/harsh863/)**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/harsh863/)
[![StackOverflow](https://img.shields.io/badge/Stack_Overflow-FE7A16?logo=stack-overflow&logoColor=white)](https://stackoverflow.com/users/12774193/harsh-mittal)
[![DEV](https://img.shields.io/badge/DEV-%23000000.svg?logo=dev.to&logoColor=white)](https://dev.to/harsh863)
[![Facebook](https://img.shields.io/badge/Facebook-%231877F2.svg?logo=facebook&logoColor=white)](https://www.facebook.com/harsh863)
