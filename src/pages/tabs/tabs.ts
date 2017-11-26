import { Component } from '@angular/core';

import { BeaconsPage } from '../beacons/beacons';
import { SettingsPage } from '../settings/settings';
import { AboutPage } from '../about/about';
import {HomePage} from "../home/home";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = HomePage;
  tab2Root: any = SettingsPage;
  tab3Root: any = AboutPage;
}
