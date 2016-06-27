import { MessageContentComponent }  from './components/message_content.component';
// import { HeroesComponent }     from './components/heroes.component';
// import { HeroDetailComponent } from './components/hero-detail.component';

export const APP_ROUTER_PROVIDERS = [
  { path: '/messages/direct/:username', name: 'DirectMessage', component: MessageContentComponent },
];
