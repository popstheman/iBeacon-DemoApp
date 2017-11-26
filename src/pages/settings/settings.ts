import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Clipboard } from '@ionic-native/clipboard';
import { AddBeaconModalPage } from '../add-beacon-modal/add-beacon-modal';
// plugins
import {IBeacon} from 'ionic-native';

// providers
import {BeaconProvider} from '../../providers/beacon-provider'

// models
import {BeaconModel} from '../../model/beacon-model';
import {RegionModel} from '../../model/region-model';
import {BackgroundMode} from "@ionic-native/background-mode";

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  monitoredRegions:any[];
  rangedRegions:any[];
  ionViewDidLeave() { 

  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public clipboard: Clipboard
  ) {
	  //this.oldUUID = "F7826DA6-4FA2-4E98-8024-BC5B71E0893E"
  }
  refreshRegionList(){
      this.monitoredRegions = [];this.rangedRegions= [];
      // IBeacon.getMonitoredRegions().then((regions)=>{
      //     this.monitoredRegions = regions;
      // });
      IBeacon.getRangedRegions().then((regions)=>{
          this.rangedRegions = regions;
      });
  }
  openAddBeaconModal(){
    let profileModal = this.modalCtrl.create(AddBeaconModalPage, { parent: this });
    profileModal.present();
  }

  copyUUID(id){
    this.clipboard.copy(id);
  }
}
