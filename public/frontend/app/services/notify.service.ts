import { Injectable } from '@angular/core';

  declare var window: any
  declare var Notification: any

@Injectable()
export class NotifyService {
  constructor() {}

  create(options = {}){
    if(window.Notification && Notification.permission !== "denied") {
      Notification.requestPermission(status => {
        var notify = new Notification(options.title, {
          body: options.body,
          icon: `/images/avatar/${options.icon}`,
          iconUrl: '#'
        })

        setTimeout(notify.close.bind(notify), options.closeAfter || 5000)
      })

    }else{
      this.requestPermission()
    }
  }

  requestPermission(){
    Notification.requestPermission()
  }
}
