import { Component, OnInit } from '@angular/core'
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated'
import { APP_ROUTER_PROVIDERS } from '../routes'
import { UserService } from '../services/user.service'
import { User } from '../models/user'

declare  var $:any
declare  var window:any
declare  var document:any
declare  var currentUser:any

@Component({
  moduleId: module.id,
  selector: '#chat',
  templateUrl: '../views/layouts/application.html',
  directives: [ROUTER_DIRECTIVES],
  providers: [
    ROUTER_PROVIDERS,
    UserService
  ]
})

@RouteConfig(APP_ROUTER_PROVIDERS)

export class AppComponent {
  constructor(
    private userService: UserService ){}

  currentUser:any = {}

  ngOnInit(){
    this.userService.getCurrentUser().then(user => {
      currentUser = user
      this.currentUser = currentUser
    })
  }
}
