import CharacterBase from "./CharacterBase";
import { enemyPos } from "../Config";
const { ccclass, property } = cc._decorator;

@ccclass
export default class preEnemy extends CharacterBase {

    onLoad() {
        this.node.on("touchend", this.touchEndEvent.bind(this), this);
    }

    touchEndEvent(e) {

    }

    init(Id: number, characterId: number) {
        super.init(Id, characterId)
        this.setStatus(enemyPos[characterId]);
    }

    setStatus(array: { v2, scale, zIndex }) {
        this.node.position = array.v2;
        this.node.scaleX = -array.scale;
        this.node.scaleY = array.scale;
        this.node.zIndex = array.zIndex;
    }
}
