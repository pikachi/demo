/**
 * 对象池
 */
export default class NodePool {
    /**存储对象 */
    node: cc.Node = null;
    /**数量 */
    count = -1;
    /**缓存对象 */
    objectPool = [];

    /**
     * 实例化对象池
     * @param node 节点
     * @param count 对象池长度 默认长度为-1;不会控制对象池的长度，设置值会控制对象池长度;
     */
    constructor(node: cc.Node, count: number = -1) {
        if (!node) {
            console.log("莫得节点");
            return;
        }
        this.node = node;
        this.count = count;
    }

    /**
     * 放回对象池
     * @param node 节点
     * @param cleanUp 是否移除节点所有事件
     */
    push(node: cc.Node, cleanUp: boolean = true) {
        if (!node) {
            console.log("莫得节点");
            return;
        }
        this.objectPool.push(node);
        this.node.active = false;
        node.removeFromParent(cleanUp);
        if (this.count > 0 && this.getPoolLength() > this.count) {
            let cell: cc.Node = this.objectPool.shift();
            cell.destroy();
        }
    }

    /**
     * 取出对象池
     */
    get(): cc.Node {
        let node: cc.Node = null;
        if (this.objectPool.length <= 0) {
            node = cc.instantiate(this.node);
            node.active = true;
        } else {
            node = this.objectPool.shift();
        }
        return node;
    }

    /**清除对象池 */
    clear() {
        let node: cc.Node
        for (node of this.objectPool) {
            node.destroy();
        }
        this.objectPool.length = 0;
        this.count = 0;
        this.node = null;
    }

    /**获取对象池长度 */
    getPoolLength() {
        return this.objectPool.length;
    }
}