import { View } from "./View";

/**界面管理器 */
export default class ViewManager {
    /**是否关闭全部窗口 */
    isCloseAllView = false;

    /**缓存视图 */
    viewPool = {};

    /**累计叠加次数 */
    addZindex = 0;

    constructor() {
        this.viewPool = {};
        this.addZindex = 0;
    }

    /**
     * 新建视图
     * @param node 节点
     * @param zIndex 层级
     * @param isaddPersistRoot 是否为常驻节点
     */
    newView(node: cc.Node, zIndex: number, isFull: boolean = true, isaddPersistRoot: boolean = false) {
        let view = new View(node, zIndex, isaddPersistRoot,isFull);
        let cell: View = this.viewPool[node.name]
        if (cell) {
            cell.destroy();
        }
        this.viewPool[node.name] = view;
    }

    /**
     * 打开视图
     * @param _name 视图名字
     */
    openView(_name) {
        this.addZindex++;
        if (!this.viewPool[_name]) {
            delete this.viewPool[_name];
            console.log("没有这个窗口哦");
            return
        } else {
            this.viewPool[_name].open(this.addZindex)
        }
    }

    /**
     * 关闭视图
     * @param _name 视图名字
     */
    closeView(_name) {
        if (!this.viewPool[_name]) {
            console.log("没有这个窗口哦", _name)
            delete this.viewPool[_name];
            return
        } else {
            this.viewPool[_name].close();
        }
    }

    /**
     * 关闭所有视图
     */
    closeAllView() {
        for (let name in this.viewPool) {
            this.closeView(name);
        }
    }

    /**
     * 销毁视图
     * @param _name 视图名字
     */
    destroyView(_name) {
        if (!this.viewPool[_name]) {
            delete this.viewPool[_name];
            console.log("没有这个窗口哦", _name)
            return
        } else {
            this.viewPool[_name].destroy();
            delete this.viewPool[_name];
        }
    }

    /**
     * 销毁全部视图
     */
    destroyAllView() {
        for (let name in this.viewPool) {
            this.destroyView(name);
        }
    }

}