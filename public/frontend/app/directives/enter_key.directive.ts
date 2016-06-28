import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Directive({ selector: '[enterKey]' })

export class EnterKeyDirective {
  @Output() enterExcute: any = new EventEmitter()

  @HostListener('keypress', ['$event']) onKeypress(event:any) {
    if(event.code == 'Enter'){
      this.enterExcute.emit()
    }
  }
}
