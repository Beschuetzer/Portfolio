import { BRIDGE_INFO_BUTTON_CLICK_COUNT_MAX } from "../../../components/constants";

export class BridgeSectionHidingLogic {
    public isBridgeHeroVisible;
	public isMobile; 
	public leftDisplayCondition;
	public rightDisplayCondition; 

    constructor(clickedBridgeInfoButtonCount: number, currentBridgeSection: number, bridgeSectionsLength: number, isMobile: boolean) {
        this.isMobile = isMobile;
        this.isBridgeHeroVisible = !isMobile && clickedBridgeInfoButtonCount < BRIDGE_INFO_BUTTON_CLICK_COUNT_MAX;
        this.leftDisplayCondition = currentBridgeSection > 0 ? false : true;
        this.rightDisplayCondition = this.isBridgeHeroVisible || currentBridgeSection >= bridgeSectionsLength - 1;
    }
}