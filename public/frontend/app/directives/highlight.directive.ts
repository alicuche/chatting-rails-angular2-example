import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({ selector: '[myHighlight]' })

export class HighlightDirective {
  private el: HTMLElement;
  constructor(el: ElementRef) { this.el = el.nativeElement; }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('yellow');
  }

  @HostListener('window:keypress', ['$event']) onKeypress(event:Event) {

  }

  private highlight(color: string) {
    this.el.style.backgroundColor = color;
  }
}
