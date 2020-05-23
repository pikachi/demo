/**视图类 */
export class View {
    /**视图级数 */
    zIndex = 0;
    /**视图节点 */
    node: cc.Node = null;
    /**是否为常驻节点 */
    isaddPersistRoot = false;

    /**层级跨度 */
    zIndexSpan:number = 10000;

    constructor(node: cc.Node, zIndex: number, isaddPersistRoot: boolean) {
        this.node = node;
        this.zIndex = zIndex;
        this.isaddPersistRoot = isaddPersistRoot;
        this.node.parent = cc.director.getScene().getChildByName("Canvas");
        if(this.isaddPersistRoot){
            cc.game.addPersistRootNode(this.node)
        }
    }

    /**清除节点 */
    destroy() {
        this.node.destroy();
        this.zIndex = 0;
        this.node = null;
        this.isaddPersistRoot = false;
    }

    /**
     * 打开界面
     * @param _zIndex 当前层级 
     */
    open(_zIndex) {
        this.node.active = true;
        this.node.zIndex = this.zIndex * this.zIndexSpan + _zIndex;
    }

    /**关闭视图 */
    close(){
        this.node.active = false;
    }

}