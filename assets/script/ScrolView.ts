// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class ScrollView extends cc.Component {

    @property(cc.Node)
    content: cc.Node = null;

    startEvent: cc.Touch = null;
    moveEvent: cc.Touch = null;

    start() {
        this.node.on("touchstart", this.touchStart, this);
        this.node.on("touchmove", this.touchMove, this);
    }

    touchStart(e: cc.Touch) {
        this.startEvent = e;
        console.log(e.getLocation())
    }

    touchMove(e: cc.Touch) {
        this.moveEvent = e;
        console.log(e.getLocation(),"end")
    }

    getContentPosition(){
        return this.content.position;
    }

    // update (dt) {}
}
