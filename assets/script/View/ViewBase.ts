const { ccclass, property } = cc._decorator;
@ccclass
/**视图基类
 * 所有视图基于此类开发
 */
export default class ViewBase extends cc.Component {
    /**是否全屏适配 */
    @property({ type: cc.Boolean, tooltip: "是否全屏适配,默认全屏适配" })
    isFull: Boolean = true;


    /**设置层级 */
    @property({ type: Number, tooltip: "层级弹窗" })
    zIndex: number = 0;

    onLoad() {
        sanka.view.newView(this.node, this.zIndex);

    }

    start() {

    }

    onEnable() {

    }

    onDisable() {

    }

    onDestroy() {
        this.node.off("touchend");
        sanka.event.offListenAll(this);
        sanka.event.offListens(this);
        sanka.view.destroyView(this.node.name);
    }

    update(dt) {

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
        this.node.on("touchend", this.touchend, this);
    }

    touchend() {

    }
}