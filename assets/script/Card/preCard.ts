import BaseComponent from "../Component/BaseComponent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class preCard extends BaseComponent {

    index: number = 0
    skillId: number = 0;
    onLoad() {
        this.node.on("touchmove", this.touchMoveEvent.bind(this), this);
        this.node.on("mouseleave", this.touchMoveEvent.bind(this), this);

    }


    init(index: number, skillId: number) {
        this.index = index;
        this.skillId = skillId;
    }

    start() {

    }


}
