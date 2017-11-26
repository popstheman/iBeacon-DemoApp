import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
// plugins
import {IBeacon} from 'ionic-native';

// providers
import {BeaconProvider} from '../../providers/beacon-provider'

// models
import {BeaconModel} from '../../model/beacon-model';
import {RegionModel} from '../../model/region-model';
import { Storage } from '@ionic/storage';
/*
  Generated class for the AddBeaconModalPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-beacon-modal',
  templateUrl: 'add-beacon-modal.html'
})
export class AddBeaconModalPage {

  constructor(  public navCtrl: NavController,
                public navParams: NavParams,
                public beaconProvider: BeaconProvider,
                public viewCtrl: ViewController,
                public storage: Storage
                ) {
    this.parent = navParams.get('parent');
  }
  public identifier:any;
  public uuid:any;
  public major:number;
  public minor:number;
  public parent:any;
  public message:any;
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddBeaconModalPagePage');
  }
  addBeacon(){
    debugger;
    let region = {identifier:this.identifier,uuid:this.uuid,major:this.major,minor:this.minor};
    this.beaconProvider.initializeBeaconRanging(region).then((isInitialised) =>{
        if(isInitialised){
          region['message'] = this.message;
          // get value 
          this.storage.get('regions').then((regions) => {
            regions.push(region)
            this.storage.set('regions', regions);
          });
          this.parent.refreshRegionList();
          this.dismiss();
        }
    });
  }
  defaultValues(){
    this.identifier = "TestBeacon";
    this.uuid = "F7826DA6-4FA2-4E98-8024-BC5B71E0893E";
    this.major = 1;
    this.minor = 1;
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  

}
