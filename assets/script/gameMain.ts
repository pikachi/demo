import BaseComponent from "./Component/BaseComponent";

const { ccclass, property } = cc._decorator;

@ccclass
//主场景
export default class gameMain extends BaseComponent {

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        sanka.loader.loadPrefabRes("CombatView", (asset) => {
            this.node.addChild(asset);
        }, { playerArr: [1, 3, 5], enemyArr: [9, 8, 7, 6, 5, 4, 3, 2, 1] });
    }

    start() {

    }

}
