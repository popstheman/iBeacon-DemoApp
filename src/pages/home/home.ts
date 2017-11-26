// core stuff
import {Component} from '@angular/core';
import {NavController, Platform, Events, AlertController} from 'ionic-angular';
import {NgZone} from "@angular/core";

// plugins
import {IBeacon} from 'ionic-native';

// providers
import {BeaconProvider} from '../../providers/beacon-provider'

// models
import {BeaconModel} from '../../model/beacon-model';
import {RegionModel} from '../../model/region-model';
import {BackgroundMode} from "@ionic-native/background-mode";
import {LocalNotifications} from "@ionic-native/local-notifications";

import { Storage } from '@ionic/storage';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    public beacons: BeaconModel[] = [];
    zone: any;
    public messageDisplay: boolean = false;
    public noBeaconsMessage: string = "";
    monitoredRegions:any[];
    rangedRegions:any[];

    constructor(public navCtrl: NavController,
                public platform: Platform,
                public beaconProvider: BeaconProvider,
                public events: Events,
                public alertCtrl: AlertController,
                public backgroundMode: BackgroundMode,
                public localNotifcation: LocalNotifications,
                public storage: Storage
    ) {
        // required for UI update
        this.zone = new NgZone({enableLongStackTrace: false});
        // initialize region with empty array
        let savedRegionsList = [];
        this.storage.set('regions', savedRegionsList);
          
    }

    ionViewDidLoad() {
        this.platform.ready().then(() => {
            this.listenToBeaconEvents();
        });

        this.platform.resume.subscribe(()=>{
            console.log("RESUMED!!!!");
            this.backgroundMode.disable();
        });

        this.platform.pause.subscribe(()=>{
            console.log("PAUSED!!!");
        });
    }

    refreshRegionList(){
        this.monitoredRegions = [];this.rangedRegions= [];
        IBeacon.getMonitoredRegions().then((regions)=>{
            this.monitoredRegions = regions;
        });
        IBeacon.getRangedRegions().then((regions)=>{
            this.rangedRegions = regions;
        });
    }

    updateBeaconList(beacon)
    {
        let beaconFound = false;
        for(let i=0;i<this.beacons.length;i++)
        {
            if(this.beacons[i].isSameBeacon(beacon))
            {
                this.beacons[i] = beacon;
                beaconFound  = true;
                this.beacons[i].dormantCounter = 0;
            }
            
        }
        if(!beaconFound){
            this.beacons.push(beacon);
            // get value 
            this.storage.get('regions').then((regions) => {
                for(let z=0;z<regions.length;z++){
                    let region = regions[z];
                    if(beacon.isSameBeacon(region)){
                        this.fireNotification(region.identifier,region.identifier,region.message);    
                    }
                }
            });
        }
    }
    removeFromBeaconList(beacon){
        for(let i=0;i<this.beacons.length;i++)
        {
            if(this.beacons[i].isSameBeacon(beacon))
            {
                debugger;
                this.beacons.splice(i, 1);
                return;
            }
        }
    }
    dormantBeaconChecker() {
        IBeacon.getRangedRegions().then((regions)=>{
            this.rangedRegions = regions;
            for(let i=0;i<this.beacons.length;i++)
            {
                this.beacons[i].dormantCounter=this.beacons[i].dormantCounter+1;
                if(this.beacons[i].dormantCounter>=2)
                {
                    for(let j=0;j<this.rangedRegions.length;j++)
                    {
                        if(this.beacons[i].isSameBeacon(this.rangedRegions[j]))
                        {
                            this.stopRanging(this.rangedRegions[j]);        
                        }
                    }
                    
                }
            }
        });
        setTimeout(() => {
            this.dormantBeaconChecker();
        }, 5000);
    } 
    listenToBeaconEvents() {

        // this.events.subscribe('didEnterRegion', (data) => {
        //     this.zone.run(() => {
        //         let region = data.region;
        //         this.beaconProvider.initializeBeaconRanging(region).then((isInitialised) =>{
        //             if(isInitialised){
        //                 this.fireNotification(region.identifier,region.identifier,region.identifier+" welcomes you with a warm heart");
        //             }
        //         });
                
        //     });
        // });
        // this.events.subscribe('didExitRegion', (data) => {
        //     this.zone.run(() => {
        //         let region = data.region;
        //         this.beaconProvider.uninitializeBeaconRanging(region).then((isUnInitialised) =>{
        //             if(isUnInitialised){
        //                 this.removeFromBeaconList({uuid:region.uuid,major:region.major,minor:region.minor});
        //                 this.fireNotification(region.identifier,region.identifier,region.identifier+" bids you farewell");
        //             }
        //         });
        //     });
        // });
        this.events.subscribe('didRangeBeaconsInRegion', (data) => {
            // update the UI with the beacon list
            this.zone.run(() => {
                let beaconList = data.beacons;
                console.log("didRangedList: "+beaconList.length);
                beaconList.forEach((beacon) => {
                    console.log("didRangedList: Beacon: "+beacon.uuid+" Mj "+beacon.major+" Mi "+beacon.minor);
                    let beaconObject = new BeaconModel(beacon);
                    this.updateBeaconList(beaconObject);
                });
            });
        });
        this.dormantBeaconChecker();
    }

    stopRanging(region)
    {
        // this.beaconProvider.uninitializeBeaconRanging(region).then((isUnInitialised) =>{
        //     if(isUnInitialised){
                this.removeFromBeaconList({uuid:region.uuid,major:region.major,minor:region.minor});
                this.fireNotification(region.identifier,region.identifier,region.identifier+" bids you farewell");
                this.refreshRegionList();
        //     }
        // });
    }

    fireNotification(id,title,message)
    {
        this.localNotifcation.schedule({
            id: id,
            title:title,
            text: message,
        });
        this.localNotifcation.get(1).then(()=>{
            console.log("Recv");
        });
    }

}
