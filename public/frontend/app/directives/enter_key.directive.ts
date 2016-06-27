import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Directive({ selector: '[enterKey]' })

export class EnterKeyDirective {
  @Output() enterExcute = new EventEmitter()

  @HostListener('keypress', ['$event']) onKeypress(event:Event) {
    if(event.code == 'Enter'){
      this.enterExcute.emit()
    }
  }
}
