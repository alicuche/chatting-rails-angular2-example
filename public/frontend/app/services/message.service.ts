import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { HttpService } from './http.service'

@Injectable()
export class MessageService {
  constructor(private httpService: HttpService) {}

  addFriend(userName) {
    var data = { user: { username: userName } }
    return this.httpService.post('/users/add_friend', data)
  }

  sendDirectMessage(user, message){
    var data = { message: {content: message, receive_id: user.id, message_type: 0} }
    return this.httpService.post('/messages', data)
  }
}
