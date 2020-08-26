import CharacterBase from "./CharacterBase";
import { playerPos } from "../Config";

/**玩家角色类 */
export default class Player extends CharacterBase {
    constructor(Id: number, characterId: number) {
        super(Id, characterId);
        this.createCharater("prePlayer",playerPos[characterId]);
    }
}