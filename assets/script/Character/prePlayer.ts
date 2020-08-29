import CharacterBase from "./CharacterBase";
import { playerPos } from "../Config";
const { ccclass, property } = cc._decorator;

@ccclass
export default class prePlayer extends CharacterBase {
    
    init(Id: number, characterId: number) {
        super.init(Id, characterId)
        this.setStatus(playerPos[characterId]);
    }
}
