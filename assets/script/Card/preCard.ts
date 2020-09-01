import BaseComponent from "../Component/BaseComponent";
import { CommonEventName } from "../Util/EventName";

const { ccclass, property } = cc._decorator;

@ccclass
export default class preCard extends BaseComponent {

    index: number = 0
    skillId: number = 0;
    onLoad() {
        // this.initTouchEvent();
    }



    init(index: number, skillId: number) {
        this.index = index;
        this.skillId = skillId;
    }

    start() {

    }

    touchStartEvent(e) {
        sanka.event.emit(CommonEventName.STOP_ALL_MOUSE_EVENT, { mouseStaus: false });
    }

    touchEndEvent(e) {
        sanka.event.emit(CommonEventName.START_ALL_MOUSE_EVENT, { mouseStaus: true });
    }

    /**
     * 飞往控制台
     * @param v2 世界坐标
     */
    flyToCtrlConsole(v2?: cc.Vec2) {
        let worldPos = cc.v2(1920, 540) || v2;
        let localPos = this.getNodeLocalPos(worldPos);
        this.node.setPosition(localPos);
        let endX = -sanka.skill.getSkillWidth() / 2 + this.index * 130;
        this.flyAction(null, cc.v2(endX, 0));
    }

    /**
     * 飞行动画
     * @param start 开始位置
     * @param end 结束位置
     */
    flyAction(start: cc.Vec2, end: cc.Vec2) {
        start && this.node.setPosition(start);
        let action = cc.moveTo(0.2, end);
        this.node.stopAllActions();
        this.node.runAction(action);
    }


}
