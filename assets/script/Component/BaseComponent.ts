/**组件基类 */
export default class BaseComponent extends cc.Component {

    isHadChild: boolean = false;

    /**
     * 获取子节点
     * @param childName 子节点名
     * @param parentNode 父节点名字
     */
    getChildNode(childName: string, parentNode?: cc.Node,) {
        parentNode = parentNode || this.node;
        this.isHadChild = false;
        return this.findChild(childName, parentNode)
    }

    findChild(childName: string, parentNode?: cc.Node): cc.Node {
        if (this.isHadChild) return;
        for (let i = 0, l = parentNode.childrenCount; i < l; i++) {
            let child: cc.Node = this.node.children[i];
            if (child.name == childName) {
                this.isHadChild = true;
                return child;
            } else {
                this.findChild(childName, child)
            }
        }
    }

    /**初始化触摸 */
    initTouchEvent(){
        this.node.on("touchstart", this.touchStartEvent.bind(this), this);
        this.node.on("touchmove", this.touchMoveEvent.bind(this), this);
        this.node.on("touchend", this.touchEndEvent.bind(this), this);
    }


    /**触摸结束事件 */
    touchEndEvent(e) {
    }

    /**触摸开始事件 */
    touchStartEvent(e) {

    }

    /**触摸移动事件 */
    touchMoveEvent(e) {

    }

    /**触摸移出事件 */
    touchLeaveEvent(e) {

    }

    onDestroy() {
        this.node.off("touchend");
        this.node.off("touchstart");
        this.node.off("touchmove");
        this.node.off("mouseleave");
        sanka.event.offListenAll(this);
        sanka.event.offListens(this);
        sanka.time.clearAllSchedule(this);
    }

    /**获取节点世界坐标 */
    getNodeWorldPos(pos?: cc.Vec2): cc.Vec2 {
        return this.node.parent.convertToWorldSpaceAR(pos || new cc.Vec2(0, 0))
    }

    /**
     * 子节点转换世界坐标
     * @param node 子节点
     */
    getChildNodePos() {
        return this.node.convertToWorldSpaceAR(this.node.position);
    }

    /**获取节点相对坐标 */
    getNodeLocalPos(pos: cc.Vec2): cc.Vec2 {
        return this.node.convertToNodeSpaceAR(pos);
    }


} 