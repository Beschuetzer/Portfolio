export class BridgeSectionHidingLogic {
    public isBridgeHeroVisible;
	public leftDisplayCondition;
	public rightDisplayCondition; 

    constructor(clickedBridgeInfoButtonCount: number, currentBridgeSection: number, bridgeSectionsLength: number) {
        this.isBridgeHeroVisible = clickedBridgeInfoButtonCount < 2;
        this.leftDisplayCondition = currentBridgeSection > 0 ? false : true;
        this.rightDisplayCondition = this.isBridgeHeroVisible || currentBridgeSection >= bridgeSectionsLength - 1;
    }
}