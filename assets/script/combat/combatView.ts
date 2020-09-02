import ViewBase from "../View/ViewBase";
import { CommonEventName } from "../Util/EventName";

const { ccclass, property } = cc._decorator;

@ccclass
/**战斗场景 */
export default class CombatView extends ViewBase {

    data = null;

    @property(cc.Node)
    saveCharacter: cc.Node = null;

    @property(cc.Node)
    saveCard: cc.Node = null;

    @property(cc.Node)
    preCard: cc.Node = null;

    /**缓存预制体 */
    cardNode: cc.Node = null;

    mouseStaus = true;

    cliskShift = false;

    onLoad() {
        super.onLoad();
        this.initEvent();
        this.initTouchEvent();
    }

    initEvent() {
        sanka.event.on(CommonEventName.START_ALL_MOUSE_EVENT, this, this.mouseEvent);
        sanka.event.on(CommonEventName.STOP_ALL_MOUSE_EVENT, this, this.mouseEvent);
        sanka.event.on(CommonEventName.KEYBOARD_CLICK_EVENT, this, this.keyboardEvent);
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
        this.saveCard.on(cc.Node.EventType.MOUSE_MOVE, this.mouseMoveEvent.bind(this), this);
        this.saveCard.on(cc.Node.EventType.MOUSE_LEAVE, this.mouseLeaveEvent.bind(this), this);
    }

    mouseMoveEvent(e: cc.Event) {
        super.mouseMoveEvent(e);
        if (!this.mouseStaus) return;
        if (this.cliskShift) return;
        let node: cc.Node = e.target;
        let index = node.getComponent(node.name) ? node.getComponent(node.name).index : null;
        this.updateCardPos(index);
    }

    touchLeaveEvent(e) {
        if (!this.mouseStaus) return;
        this.updateCardPos();
    }

    /**
     * 鼠标状态
     * @param data 
     */
    mouseEvent(data) {
        this.mouseStaus = data.mouseStaus;
    }

    keyboardEvent(data) {
        for (let key in data) {
            if (data[key] == "shift") {
                this.cliskShift = true
                return;
            }
        }
        this.cliskShift = false;
    }

    /**创建卡牌 */
    createCard(cardList: Array<number> | number) {
        let func = (asset) => {
            if (cardList instanceof Array) {
                for (let i = 0; i < cardList.length; i++) {
                    let cell: cc.Node = cc.instantiate(asset)
                    this.saveCard.addChild(cell);
                    sanka.skill.setSkill(i, cell, cardList[i]);
                    // sanka.time.addScheduleOnce(`flyTime${i}`, () => {
                    //     cell.getComponent(cell.name).flyToCtrlConsole();
                    // }, 0.1 * i, this)
                }
            } else {
                let cell = cc.instantiate(asset)
                sanka.skill.setSkill(null, cell, cardList);
            }
            this.saveCard.width = sanka.skill.skillPool.length * 130 + 200;
            this.updateCardPos();
        }
        if (this.cardNode) {
            func(this.cardNode);
            return;
        }
        sanka.loader.loadRes("prefabs/preCard", async (asset) => {
            func(asset);
        })

    }

    /**
     * 更新卡牌位置
     * @param index 
     */
    updateCardPos(index?) {
        let skillPool = sanka.skill.skillPool;
        let length = sanka.skill.getSkillPool;
        let width = length * 130 - 70;
        if (index != null) {
            for (let i = 0; i < length; i++) {
                if (skillPool[i]) {
                    if (i <= index) {
                        skillPool[i].x = -width / 2 + i * 130;
                    } else {
                        skillPool[i].x = -width / 2 + i * 130 + 70;
                    }
                }
            }
        } else {
            for (let i = 0; i < length; i++) {
                skillPool[i].x = -width / 2 + i * 130;
            }
        }
    }
}
