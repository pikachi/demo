import BaseComponent from "../Component/BaseComponent";

const { ccclass, property } = cc._decorator;
@ccclass
/**视图基类
 * 所有视图基于此类开发
 */
export default class ViewBase extends BaseComponent {
    /**是否全屏适配 */
    @property({ type: cc.Boolean, tooltip: "是否全屏适配,默认全屏适配" })
    isFull: boolean = true;

    /**是否为常驻节点 */
    @property({ type: cc.Boolean, tooltip: "常驻节点才勾选 通常是多场景切换使用" })
    isAddPersistRoot: boolean = false;

    /**设置层级 */
    @property({ type: Number, tooltip: "层级弹窗" })
    zIndex: number = 0;

    /**窗口动画 */
    @property({ type: Number, tooltip: "窗口动画" })
    isPlayAnimation = false;

    onLoad() {
        sanka.view.newView(this.node, this.zIndex, this.isAddPersistRoot, this.isFull);
    }

    onEnable() {
        this.startAnimation();
    }

    onDisable() {

    }

    onDestroy() {
        super.onDestroy();
        sanka.view.destroyView(this.node.name);
    }


    /**是否全屏适配 */
    setNodeWidget() {
        if (this.isFull) {
            let widget: cc.Widget = this.node.addComponent(cc.Widget);
            widget.isAlignTop = true;
            widget.isAlignBottom = true;
            widget.isAlignLeft = true;
            widget.isAlignRight = true;
        }

    }

    /**设置不可穿透 */
    setNoInputEvent() {
        this.node.on("touchend", this.touchEndEvent, this);
    }


    /**打开窗口动画 */
    startAnimation(){
        let action = cc.scaleTo(0.5,1)
        this.node.stopAllActions();
        this.node.scale = 0;
        this.node.runAction(action);
    }

}