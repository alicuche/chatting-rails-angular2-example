import {Pipe} from '@angular/core';

@Pipe({
  name: 'SearchPipe'
})

export class SearchPipe {
  transform(message, searchString?) {
    return (!searchString || message.content.indexOf(searchString) != -1) ? message : null
  }
}
