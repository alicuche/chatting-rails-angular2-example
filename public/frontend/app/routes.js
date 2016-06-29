"use strict";
var message_content_component_1 = require('./components/message_content.component');
// import { HeroesComponent }     from './components/heroes.component';
// import { HeroDetailComponent } from './components/hero-detail.component';
exports.APP_ROUTER_PROVIDERS = [
    { path: '/messages/direct/:username', name: 'DirectMessage', component: message_content_component_1.MessageContentComponent },
    { path: '/', name: 'HomePage', component: message_content_component_1.MessageContentComponent }
];
//# sourceMappingURL=routes.js.map