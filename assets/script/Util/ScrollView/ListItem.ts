const { ccclass, property } = cc._decorator;

@ccclass
export default class ListItem extends cc.Component {

    /**子物体标识 */
    itemId: number = null;

    initData(index,data) {
        this.itemId = index;
        this.init(data);
    }

    /**初始化数据 */
    init(data) {

    }
}
