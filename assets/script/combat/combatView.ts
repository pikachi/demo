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

    clickShift = false;

    // 点击位置
    clickCardPos = null;

    onLoad() {
        super.onLoad();
        this.initEvent();
        this.initTouchEvent();
    }

    initEvent() {
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
        this.node.on(cc.Node.EventType.MOUSE_MOVE, this.mouseMoveEvent.bind(this), this);
        this.saveCard.on(cc.Node.EventType.MOUSE_LEAVE, this.mouseLeaveEvent.bind(this), this);
        this.saveCard.on(cc.Node.EventType.TOUCH_START, this.touchStartEvent.bind(this), this);
        this.saveCard.on(cc.Node.EventType.TOUCH_MOVE, this.touchMoveEvent.bind(this), this);
        this.saveCard.on(cc.Node.EventType.TOUCH_END, this.touchEndEvent.bind(this), this);
    }

    mouseMoveEvent(e: cc.Event) {
        super.mouseMoveEvent(e);
        if (!this.mouseStaus) return;
        if (this.clickShift) return;
        let node: cc.Node = e.target;
        let index = node.getComponent(node.name) ? node.getComponent(node.name).index : null;
        this.updateCardPos(index);
    }

    touchLeaveEvent(e) {
        if (!this.mouseStaus) return;
        this.updateCardPos();
    }

    keyboardEvent(data) {
        for (let key in data) {
            if (data[key] == "shift") {
                this.clickShift = true
                return;
            }
        }
        this.clickShift = false;
    }

    touchStartEvent(e: cc.Event.EventTouch) {
        this.mouseStaus = false;
        this.clickCardPos = this.saveCard.convertToNodeSpaceAR(e.getLocation()).x
    }

    touchEndEvent(e: cc.Event.EventTouch) {
        this.mouseStaus = true;
        let movingX = this.saveCard.convertToNodeSpaceAR(e.getLocation()).x;
        if (movingX == this.clickCardPos) {  //莫得点
            for (let i = 0; i < sanka.skill.getSkillWidth(); i++) {
                let card = sanka.skill.skillPool[i];
                if (card && this.noteCardArrow(card) < movingX && this.noteCardArrow(card, false) > movingX) {
                    cc.log(card.getComponent(card.name).index, "莫得移动")
                }
            }
        }
    }

    touchMoveEvent(e: cc.Event.EventTouch) {
        this.mouseStaus = false;
        let movingX = this.saveCard.convertToNodeSpaceAR(e.getLocation()).x;
        let left = movingX > this.clickCardPos ? this.clickCardPos : movingX;
        let right = movingX < this.clickCardPos ? this.clickCardPos : movingX;
        for (let i = 0; i < sanka.skill.getSkillWidth(); i++) {
            let card = sanka.skill.skillPool[i];
            if(card){
                if (this.slideLength(card, left, right)) {
                    card.getComponent(card.name).showHight(true);
                }else{
                    card.getComponent(card.name).showHight(false);
                }
            }
        }
    }

    /**
     * 计算card的有效范围
     * @param card 卡牌
     * @param isleft 是否为最左边
     */
    noteCardArrow(card: cc.Node, isleft = true) {
        let x = card.x;
        let width = card.width;
        if (isleft) return x - width / 2;
        return x + width / 2;
    }


    /**
     * 判断滑动距离
     * @param left 左边
     * @param right 右边
     * @param card 卡牌
     */
    slideLength(card, left, right) {
        if (!card) return false;
        //极限左边                                                 
        if (this.noteCardArrow(card, false) - 130 >= left && this.noteCardArrow(card, false) - 130 <= right) {
            return true;
        }
        //极限右边
        if (this.noteCardArrow(card) < right && this.noteCardArrow(card) > left) {
            return true;
        }
        else false;
    }

    /**创建卡牌 */
    createCard(cardList: Array<number> | number) {
        let func = (asset) => {
            if (cardList instanceof Array) {
                for (let i = 0; i < cardList.length; i++) {
                    let cell: cc.Node = cc.instantiate(asset)
                    this.saveCard.addChild(cell);
                    sanka.skill.setSkill(i, cell, cardList[i]);
                    cell.getComponent(cell.name).setOpacity(0);
                    sanka.time.addScheduleOnce(`flyTime${i}`, () => {
                        cell.getComponent(cell.name).flyToCtrlConsole();
                    }, 0.1 * i, this)
                }
            } else {
                let cell = cc.instantiate(asset)
                sanka.skill.setSkill(null, cell, cardList);
            }
            this.saveCard.width = sanka.skill.skillPool.length * 130 + 200;
            this.updateCardPos();
            sanka.time.addScheduleOnce("mouseStaus",()=>{
                this.mouseStaus = true;
            },0,this);
        }
        this.mouseStaus = false;
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
