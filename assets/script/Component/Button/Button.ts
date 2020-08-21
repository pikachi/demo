const { ccclass, property,menu,disallowMultiple } = cc._decorator;

@ccclass
@menu("sanka/button(按钮组件)")
@disallowMultiple
export default class Button extends cc.Button {
    @property({ type: cc.Component.EventHandler, tooltip: "长按回调" })
    longClickFunc: cc.Component.EventHandler[] = [];

    @property({ type: cc.Integer, tooltip: "点击间隔" })
    clickTime: number = 0.2;

    @property({ type: cc.Integer, tooltip: "长按间隔" })
    longClickTime: number = 1;


    /**点击后等待时间 */
    touchEndWaitTime: number = null;

    /**长按等待时间 */
    touchLongWaitTime: number = null;

    onLoad() {
        this.node.on("touchstart", this.touchStart, this);
        this.node.on("touchend", this.touchEnd, this);
    }

    /**点击结束回调 */
    touchEnd() {
        this.touchEndWaitTime = this.clickTime;
    }

    /**点击开始回调 */
    touchStart() {

    }

    onDestroy() {
        this.node.off("touchstart")
        this.node.off("touchend")
    }

    start() {
        this.touchLongWaitTime = this.longClickTime;
    }

    /**调用长按回调 */
    runLongClickFunc() {
        for (let i = 0, l = this.longClickFunc.length; i < l; i++) {
            // this
        }
    }

    update(dt) {
        if (this.touchEndWaitTime) {
            this.touchEndWaitTime -= dt;
            this.interactable = false;
            if (this.touchEndWaitTime <= 0) {
                this.touchEndWaitTime = null;
                this.interactable = true;
            }
        }
        if (this.touchLongWaitTime) {
            this.touchLongWaitTime -= dt;
            if (this.touchLongWaitTime <= 0) {
            }
        }
    }
}
