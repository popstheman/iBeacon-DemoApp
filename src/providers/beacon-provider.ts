import {Injectable} from '@angular/core';
import {Platform, Events} from 'ionic-angular';
import {IBeacon} from 'ionic-native';
import { BackgroundMode } from '@ionic-native/background-mode';



/*
 Generated class for the BeaconProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class BeaconProvider {

    delegate: any;
    region: any;

    constructor(public platform: Platform,
                public events: Events,
                public backgroundMode: BackgroundMode
    ) {
        this.backgroundMode.enable();
        console.log(this.backgroundMode.isEnabled());
    }

    initialiseBeaconMonitoring(region): any {
        let promise = new Promise((resolve, reject) => {
            // we need to be running on a device
            if (this.platform.is('cordova')) {

                // Request permission to use location on iOS
                IBeacon.requestAlwaysAuthorization();

                // create a new delegate and register it with the native layer
                this.delegate = IBeacon.Delegate();

                // Subscribe to some of the delegate's event handlers

                this.delegate.didEnterRegion()
                    .subscribe(
                        data => {
                            this.events.publish('didEnterRegion', data);
                        },
                        error => console.error()
                    );
                // this.delegate.didExitRegion()
                //     .subscribe(
                //         data => {
                //             this.events.publish('didExitRegion', data);
                //         },
                //         error => console.error()
                //     );
                // setup a beacon region
                this.region = IBeacon.BeaconRegion(region.identifier, region.uuid,region.major,region.minor);

                // start monitoring
                IBeacon.startMonitoringForRegion(this.region)
                    .then(
                        () => {
                            resolve(true);
                        },
                        error => {
                            console.error('Failed to begin monitoring: ', error);
                            resolve(false);
                        }
                    );
            } else {
                console.error("This application needs to be running on a device");
                resolve(false);
            }
        });

        return promise;
    }

    initializeBeaconRanging(region)
    {
        let promise = new Promise((resolve, reject) => {
            // we need to be running on a device
            if (this.platform.is('cordova')) {

                // Request permission to use location on iOS
                IBeacon.requestAlwaysAuthorization();

                // create a new delegate and register it with the native layer
                this.delegate = IBeacon.Delegate();

                // Subscribe to some of the delegate's event handlers
                this.delegate.didRangeBeaconsInRegion()
                    .subscribe(
                        data => {
                            this.events.publish('didRangeBeaconsInRegion', data);
                        },
                        error => console.error()
                    );
                // setup a beacon region
                this.region = IBeacon.BeaconRegion(region.identifier, region.uuid,region.major,region.minor);

                // start ranging
                IBeacon.startRangingBeaconsInRegion(this.region)
                    .then(
                        () => {
                            resolve(true);
                        },
                        error => {
                            console.error('Failed to begin monitoring: ', error);
                            resolve(false);
                        }
                    );
            } else {
                console.error("This application needs to be running on a device");
                resolve(false);
            }
        });
        return promise;
    }

    uninitializeBeaconRanging(region)
    {
        let promise = new Promise((resolve, reject) => {
            // we need to be running on a device
            if (this.platform.is('cordova')) {

                // Request permission to use location on iOS
                IBeacon.requestAlwaysAuthorization();

                // create a new delegate and register it with the native layer
                this.delegate = IBeacon.Delegate();

                // Subscribe to some of the delegate's event handlers
                // setup a beacon region
                this.region = IBeacon.BeaconRegion(region.identifier, region.uuid,region.major,region.minor);

                // start ranging
                IBeacon.stopRangingBeaconsInRegion(this.region)
                    .then(
                        () => {
                            resolve(true);
                        },
                        error => {
                            console.error('Failed to stop ranging: ', error);
                            resolve(false);
                        }
                    );
            } else {
                console.error("This application needs to be running on a device");
                resolve(false);
            }
        });
        return promise;
    }
}
