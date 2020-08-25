import ViewBase from "../View/ViewBase";

const {ccclass, property} = cc._decorator;

@ccclass
/**战斗场景 */
export default class combatView extends ViewBase {

    onLoad(){
        super.onLoad();
    }

    init(){

    }

    /**创建人物 */
    createPlayer(){
        // sanka.character.
    }

    /**创建敌人 */
    createEnemy(){

    }
}
