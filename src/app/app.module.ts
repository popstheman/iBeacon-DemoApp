import {NgModule} from '@angular/core';
import {IonicApp, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {BeaconProvider} from '../providers/beacon-provider'
import {TabsPage} from "../pages/tabs/tabs";
import {SettingsPage} from "../pages/settings/settings";
import {AboutPage} from "../pages/about/about";
import {AddBeaconModalPage} from "../pages/add-beacon-modal/add-beacon-modal";
import {BackgroundMode} from "@ionic-native/background-mode";
import {LocalNotifications} from "@ionic-native/local-notifications";
import { Storage } from '@ionic/storage';
import { Clipboard } from '@ionic-native/clipboard';


@NgModule({
    declarations: [
        MyApp,
        HomePage,
        TabsPage,
        SettingsPage,
        AboutPage,
        AddBeaconModalPage
    ],
    imports: [
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        TabsPage,
        SettingsPage,
        AboutPage,
        AddBeaconModalPage
    ],
    providers: [BeaconProvider, BackgroundMode, LocalNotifications, Storage, Clipboard]
})
export class AppModule {
}
