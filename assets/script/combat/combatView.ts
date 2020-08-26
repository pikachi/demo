import ViewBase from "../View/ViewBase";

const {ccclass, property} = cc._decorator;

@ccclass
/**战斗场景 */
export default class CombatView extends ViewBase {

    data = null;

    @property(cc.Node)
    saveCharacter:cc.Node = null;

    onLoad(){
        super.onLoad();
    }

    init(data){
        this.data = data;
        sanka.character.saveNode = this.saveCharacter;
        this.createPlayer();
        this.createEnemy();
    }

    /**创建人物 */
    createPlayer(){
        sanka.character.creatPlayer(this.data.playerArr)
    }

    /**创建敌人 */
    createEnemy(){
        sanka.character.creatEnemy(this.data.enemyArr);
    }
}
