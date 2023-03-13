export class BridgeSectionHidingLogic {
    public areBridgeSectionsVisible;
	public leftDisplayCondition;
	public rightDisplayCondition; 

    constructor(clickedBridgeInfoButtonCount: number, currentBridgeSection: number, bridgeSectionsLength: number) {
        this.areBridgeSectionsVisible = clickedBridgeInfoButtonCount < 2;
        this.leftDisplayCondition = currentBridgeSection > 0 ? false : true;
        this.rightDisplayCondition = this.areBridgeSectionsVisible || currentBridgeSection >= bridgeSectionsLength - 1;
    }
}