import {Directive, ElementRef, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject, Subscription} from "rxjs";
import {debounceTime, delay} from "rxjs/operators";

@Directive({
  selector: '[ngxResizeDetector]'
})
export class NgxResizeDetectorDirective implements OnInit, OnDestroy {

  @Input() set debounce(value: number) {
    this._debounce = value;
    this._syncElementDimensions();
  }

  @Input() set delay(value: number) {
    this._delay = value;
    this._syncElementDimensions();
  }

  @Output() onDimensionsChange = new Subject<ElementDimensions>();

  private _debounce: number = 0;
  private _delay: number = 0;
  private _resizeObserver!: ResizeObserver | MutationObserver;
  private _oldDimensionsString: string = '';
  private _elementDimensions$ = new Subject<ElementDimensions>();
  private _elementDimensionsSubscription!: Subscription;

  constructor(private _host: ElementRef<HTMLElement>) {}

  ngOnInit() {
    this._syncElementDimensions();
    this._attachObserverToElement();
  }

  ngOnDestroy() {
    this._disconnectAttachedObserver();
  }

  private _syncElementDimensions() {
    this._elementDimensionsSubscription?.unsubscribe();
    this._elementDimensionsSubscription = this._elementDimensions$
      .pipe(debounceTime(this._debounce), delay(this._delay))
      .subscribe((dimensions: ElementDimensions) => this.onDimensionsChange.next(dimensions));
  }

  private _attachObserverToElement() {
    const isResizeObserverSupported = window.hasOwnProperty('ResizeObserver');
    if (isResizeObserverSupported) {
      this._resizeObserver = new ResizeObserver(this._validateElementChanges.bind(this));
      this._resizeObserver.observe(this._host.nativeElement);
    } else {
      this._resizeObserver = new MutationObserver(mutations => mutations.forEach(_ => this._validateElementChanges()));
      this._resizeObserver.observe(this._host.nativeElement, {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true
      });
    }
  }

  private _validateElementChanges() {
    const element: HTMLElement = this._host.nativeElement;
    const newDimensionsString = element.offsetWidth.toString() + element.clientWidth.toString() +
      element.offsetHeight.toString() + element.clientHeight.toString();

    // Check if dimensions are changed as compared to previous one.
    if (this._oldDimensionsString !== newDimensionsString) {
      this._elementDimensions$.next({
        offsetWidth: element.offsetWidth,
        offsetHeight: element.offsetHeight,
        clientWidth: element.clientWidth,
        clientHeight: element.clientHeight
      });
    }

    // Update old dimensions string.
    this._oldDimensionsString = newDimensionsString;
  }

  private _disconnectAttachedObserver() {
    this._resizeObserver?.disconnect();
  }
}

export interface ElementDimensions {
  offsetWidth: number;
  offsetHeight: number;
  clientWidth: number;
  clientHeight: number;
}
