import BaseComponent from "./Component/BaseComponent";

const {ccclass, property} = cc._decorator;

@ccclass
//主场景
export default class gameMain extends BaseComponent {

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        sanka.loader.loadRes("prefabs/combatView");
    }

    start () {

    }

    // update (dt) {}
}
