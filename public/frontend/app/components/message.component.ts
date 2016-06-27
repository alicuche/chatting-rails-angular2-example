import { Component, OnInit, Input } from '@angular/core'
import { RouteParams } from '@angular/router-deprecated';

import { MessageService } from '../services/message.service'
import { UserService } from '../services/user.service'

declare  var $:any
declare  var currentUser:any

@Component({
  moduleId: module.id,
  selector: 'message',
  templateUrl: '../views/message.component.html'
})

export class MessageComponent implements OnInit{
  @Input() message: any

  constructor(
    private userService: UserService,
    private messageService: MessageService) {}

  ngOnInit(){
    setTimeout(()=> $('#messages-content').scrollTop(10000), 0)
  }

}
