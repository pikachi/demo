import ViewBase from "../View/ViewBase";

const { ccclass, property } = cc._decorator;

@ccclass
/**战斗场景 */
export default class CombatView extends ViewBase {

    data = null;

    @property(cc.Node)
    saveCharacter: cc.Node = null;

    @property(cc.Node)
    saveCard: cc.Node = null;

    onLoad() {
        super.onLoad();
        this.initTouchEvent();
    }

    initEvent() {

    }

    init(data) {
        this.data = data;
        sanka.character.saveNode = this.saveCharacter;
        this.createPlayer();
        this.createEnemy();
        this.createCard([1, 2, 2]);
    }

    /**创建人物 */
    createPlayer() {
        sanka.character.creatPlayer(this.data.playerArr)
    }

    /**创建敌人 */
    createEnemy() {
        sanka.character.creatEnemy(this.data.enemyArr);
    }

    initTouchEvent() {
        this.saveCard.on(cc.Node.EventType.MOUSE_MOVE, this.touchMoveEvent.bind(this), this);
        this.saveCard.on(cc.Node.EventType.MOUSE_LEAVE, this.touchLeaveEvent.bind(this), this);
    }

    touchMoveEvent(e) {
        super.touchMoveEvent(e);
        console.log(e);
    }

    /**创建卡牌 */
    createCard(cardList: Array<number> | number) {
        sanka.loader.loadRes("prefabs/preCard", async (asset) => {
            if (cardList instanceof Array) {
                for (let i = 0; i < cardList.length; i++) {
                    let cell = cc.instantiate(asset)
                    this.saveCard.addChild(cell);
                    sanka.skill.setSkill(i, cell, cardList[i]);
                }
            } else {
                let cell = cc.instantiate(asset)
                sanka.skill.setSkill(null, cell, cardList)
            }
            this.saveCard.width = sanka.skill.skillPool.length * 130 + 70;
            sanka.skill.updateCardPos()
        })
    }
}
