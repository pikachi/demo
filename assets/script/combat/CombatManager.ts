import CharacterBase from "../Character/CharacterBase";
import preEnemy from "../Character/preEnemy";

const { ccclass, property } = cc._decorator;

@ccclass
/**
 * 战斗管理器
 * 管理所有战斗部分
 */
export default class CombatManager {

    nowSpeedLine = Array<CharacterBase>();

    constructor() {

    }

    //检查当前速度线
    checkNowSpeedLine() {
        this.nowSpeedLine = [];
        for (let key in sanka.character.getAllEnemy()) {
            let data: preEnemy = sanka.character.getAllEnemy()[key];
            if (this.nowSpeedLine.length == 0) {
                this.nowSpeedLine.push(data);
            } else {
                for (let i = 0; i < this.nowSpeedLine.length; i++) {
                    let temp: CharacterBase = this.nowSpeedLine[i];
                    if (temp.speed > data.speed) {
                        this.nowSpeedLine.splice(i, 0, data);
                        return;
                    }
                }
                this.nowSpeedLine.push(data);
            }
        }
    }

    /**
     * 更新当前速度线
     * @param characterJs 
     */
    updateNowSpeedLine(characterJs: CharacterBase) {
        if (!characterJs) return;
        if (this.nowSpeedLine.length == 0) return;
        // 
        this.nowSpeedLine.sort(sanka.util.sortFunc(["speed",true]))
    }

    //播放战斗流程
}
