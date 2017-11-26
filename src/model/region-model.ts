export class RegionModel {

    identifier: string;
    major: number;
    minor: number;
    notifyEntryStateOnDisplay: boolean;
    uuid: string;

    constructor(public region: any) {
        this.uuid = region.uuid;
        this.major = region.major;
        this.minor = region.minor;
        this.identifier = region.identifier;
        this.notifyEntryStateOnDisplay = region.notifyEntryStateOnDisplay;
    }
}