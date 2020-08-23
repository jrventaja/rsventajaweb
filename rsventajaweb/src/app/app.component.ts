import { Component } from '@angular/core';
import {  faEnvelope, faCar , faHome, faArrowUp, faHeartbeat, faBuilding, faBriefcase, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rsventajaweb';
  faCar = faCar;
  faHome = faHome;
  faHeartbeat = faHeartbeat;
  faBuilding = faBuilding;
  faBriefcase = faBriefcase;
  faMobileAlt = faMobileAlt;
  isNavbarCollapsed = false;
  faArrowUp = faArrowUp;
  faEnvelope = faEnvelope;
}
