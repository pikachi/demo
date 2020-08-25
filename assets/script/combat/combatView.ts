import ViewBase from "../View/ViewBase";

const {ccclass, property} = cc._decorator;

@ccclass
/**战斗场景 */
export default class combatView extends ViewBase {

    data = null;

    onLoad(){
        super.onLoad();
    }

    init(data){
        this.data = data;
        
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
