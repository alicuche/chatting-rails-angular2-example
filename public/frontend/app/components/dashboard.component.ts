import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { UserService } from '../services/user.service';
import { User } from '../models/user'

@Component({
  moduleId: module.id,
  selector: 'my-dashboard',
  templateUrl: '../views/dashboard.component.html'
})

export class DashboardComponent {
  constructor(
    private router: Router,
    private heroService: UserService) {}

  ngOnInit() {
    this.getHeroes()
  }

  heroes: User[] = []

  getHeroes() {
    // this.heroService.getHeroes().then(heroes => this.heroes = heroes.slice(1, 5));
  }

  gotoDetail(hero) {
    let link = ['HeroDetail', { id: hero.id }];
    this.router.navigate(link);
  }
}
