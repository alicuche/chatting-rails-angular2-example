import { Component, OnInit } from '@angular/core'
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteParams } from '@angular/router-deprecated'
import { APP_ROUTER_PROVIDERS } from '../routes'

// components
import { DirectMessagesComponent } from './direct_messages.component'

// services
import { HttpService } from '../services/http.service'
import { UserService } from '../services/user.service'
import { MessageService } from '../services/message.service'
import { CableService } from '../services/cable.service'

// directives
import { EnterKeyDirective } from '../directives/enter_key.directive';

declare  var $:any
declare  var window:any
declare  var document:any
declare  var currentUser:any

@Component({
  moduleId: module.id,
  selector: '#chat',
  templateUrl: '../views/layouts/application.html',
  directives: [ROUTER_DIRECTIVES, DirectMessagesComponent, EnterKeyDirective],
  providers: [
    ROUTER_PROVIDERS,
    HttpService,
    UserService,
    MessageService,
    CableService
   ]
})

@RouteConfig(APP_ROUTER_PROVIDERS)

export class AppComponent implements OnInit {
  constructor(
    private cableService: CableService,
    private userService: UserService ){}

  currentUser:any = {}

  ngOnInit(){
    this.currentUser = currentUser
    this.cableService.newChannel(currentUser.id)
  }
}
