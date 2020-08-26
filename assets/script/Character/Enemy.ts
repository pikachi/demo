import CharacterBase from "./CharacterBase";
import { enemyPos } from "../Config";

/**敌人类 */
export default class Enemy extends CharacterBase {
    constructor(Id: number, characterId: number) {
        super(Id, characterId);
        this.createCharater("preEnemy", enemyPos[Id + 1]);
    }

    setStatus(array: { v2, scale, zIndex }) {
        this.node.position = array.v2;
        this.node.scaleX = -array.scale;
        this.node.scaleY = array.scale;
        this.node.zIndex = array.zIndex;
    }
}
