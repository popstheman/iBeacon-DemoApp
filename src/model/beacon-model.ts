export class BeaconModel {

    public uuid: string;
    public major: number;
    public minor: number;
    public rssi: number;
    public accuracy: number;
    public proximity: string;
    public dormantCounter: number;

    constructor(public beacon: any) {
        this.uuid = beacon.uuid;
        this.major = beacon.major;
        this.minor = beacon.minor;
        this.rssi = beacon.rssi;
        this.accuracy = beacon.accuracy;
        this.proximity = beacon.proximity;
        this.dormantCounter = 0;
    }
    isSameBeacon(beacon){
        if(this.uuid.toUpperCase() == beacon.uuid.toUpperCase() &&
        this.major == beacon.major &&
        this.minor == beacon.minor){
            return true;
        }
        return false;
    }
}