//https://blog.csdn.net/u012278016/article/details/103984458/ 参考地址
import ListItem from "./ListItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ListView extends cc.ScrollView {


    @property({ type: cc.Prefab, tooltip: "子物体" })
    prefab: cc.Node = null;

    @property({ type: cc.Float, tooltip: "物体相隔距离" })
    offset: number = 0;

    @property({ type: cc.Float, tooltip: "显示总数（即可显示总数）只能为偶数" })
    bufferZoneCount: number = 0;

    /**数据 */
    dataList: [] = [];

    /**存放子物体 */
    itemPool: cc.Node[] = [];

    /**是否滚动 */
    isScroll: boolean = false;

    /**记录预制体高度 */
    notePrefabHeigh: number = 0

    /**记录预制体宽度 */
    notePrefabWidth: number = 0;

    /**共生成总数 */
    allItemCount: number = 0;

    /**记录当前content位置 */
    noteContent: number = 0

    /**
     * 视图高度
     * 如果子物体超出此高度，则重新放置位置
     */
    offestScrollView: number = 0;

    onLoad() {
        this.node.on("scrolling", this.scrolling, this);
        this.node.on("scroll-ended", this.scrolling, this);
        this.init();
        this.setNotePrefab();
        this.createItem();
    }

    /**记录预制体状态 */
    setNotePrefab() {
        if (!this.prefab) {
            console.warn("甘霖娘子物体咋没了");
            return;
        }
        this.notePrefabHeigh = this.prefab.height;
        this.notePrefabWidth = this.prefab.width;
        if (this.bufferZoneCount <= 0) {
            console.warn("不设置长度看鸡掰");
            return;
        }
        this.allItemCount = this.bufferZoneCount * 1.5;
    }

    start() {
        this.setNoteContent();
    }

    setNoteContent() {
        if (this.horizontal) {
            this.noteContent = this.content.x;
        } else if (this.vertical) {
            this.noteContent = this.content.y;
        }
    }

    /**初始化滚动视图 */
    init() {
        /**设置content锚点 */
        if (this.horizontal) {
            this.content.anchorX = 0;
            this.content.anchorY = 0.5;
            this.offestScrollView = this.node.width;
            this.scrollToleft();
        } else if (this.vertical) {
            this.content.anchorX = 0.5;
            this.content.anchorY = 1;
            this.offestScrollView = this.node.height;
            this.scrollToTop();
        }
        if (this.horizontal && this.vertical) return;

        this.content.destroyAllChildren();
    }

    /**设置数据 */
    setListData(data) {
        this.dataList = data;
    }

    /**划置左边 */
    scrollToleft(time: number = 0) {
        this.scrollToLeft(time);
    }
    /**划置右边 */
    scrollToRight(time: number = 0) {
        this.scrollToRight(time);
    }
    /**划置顶部 */
    scrollToTop(time: number = 0) {
        this.scrollToTop(time);
    }
    /**划置底部 */
    scrollToBottom(time: number = 0) {
        this.scrollToBottom(time);
    }

    /**创建子物体 */
    createItem() {
        for (let i = 0; i < this.allItemCount; i++) {
            this.itemPool[i] = cc.instantiate(this.prefab);
            this.content.addChild(this.itemPool[i]);
            if (this.horizontal) {
                this.itemPool[i].setPosition(this.notePrefabWidth * (i + 0.5) + this.offset * i, 0);
            } else if (this.vertical) {
                this.itemPool[i].setPosition(0, -this.notePrefabHeigh * (i + 0.5) - this.offset * i);
                this.content.height = this.notePrefabHeigh * (i + 1) + this.offset * i;
            }
        }
    }


    /**
     * 获取子物体位置
     * @param item 子物体
     */
    getListItem(item: cc.Node) {
        let worldItemPos = item.parent.convertToWorldSpaceAR(item.position);
        let localitemPos = this.node.convertToNodeSpaceAR(worldItemPos);
        return localitemPos;
    }

    /**
     * 设置子物体数据
     * @param index 索引
     * @param data 数据
     */
    setListItemData(index: number, data) {
        this.itemPool[index].getComponent(ListItem).initData(index, data);
    }

    /**滚动回调 */
    scrolling() {
        this.isScroll = true;
    }

    /**停止滚动回调 */
    scrollingEnd() {
        this.isScroll = false;
    }

    update(dt) {
        if (!this.isScroll) return;
        /**水平滑动 */

    }

    /**检测滚动 */
    checkScrolling() {
        if (this.horizontal) {
            let isRight: boolean = this.content.x < this.noteContent;
            for (let i = 0, l = this.itemPool.length; i < l; i++) {
                let pos = this.getListItem(this.itemPool[i]);
                if (isRight) {
                    if (pos.x > this.content.x) {
                        this.itemPool[i].x -= this.content.width;
                        this.itemPool[i].getChildByName(this.itemPool[i].name)
                    }
                } else {

                }
            }

        }
        /**垂直滑动 */
        else if (this.vertical) {
            let isDown: boolean = this.content.y < this.noteContent;
            if (isDown) {

            } else {

            }
        }
        this.setNoteContent();
    }
}
