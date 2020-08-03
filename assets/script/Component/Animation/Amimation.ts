const { ccclass, property } = cc._decorator;
@ccclass
/**帧动画
 * 播放图片必须名字一致，且按正序排列，
 * 必须添加精灵组件 如无自动添加
 */
export default class Animation extends cc.Component {
    /**是否开始播放 */
    @property({ type: cc.Boolean, tooltip: "是否开始播放" })
    isStartPlay: boolean = true;

    /**是否循环 */
    @property({ type: cc.Boolean, tooltip: "是否循环播放" })
    isLoop: boolean = false;

    /**是否倒播 */
    @property({ type: cc.Boolean, tooltip: "是否倒序播放" })
    isRewind: boolean = false;

    /**循环次数 */
    @property({ type: Number, tooltip: "播放次数,选择循环播放同时设置-1默认无限循环" })
    playTime: number = 1;

    /**图集 */
    @property({ type: cc.SpriteAtlas, tooltip: "帧动画图集" })
    aniSpriteAtlas: cc.SpriteAtlas = null;

    /**播放名字（无需带数字） */
    @property({ type: cc.String, tooltip: "播放动画名字（无需带数字），如无则为轮播图集" })
    animationName: string = null;

    /**播放速度 */
    @property({ type: Number, tooltip: "播放速度" })
    playSpeed: number = 1;

    /**记录当前帧 */
    noteFrame: number = 0;

    isPlay: boolean = false;
    isPause: boolean = false;
    isStop: boolean = false;

    sprite: cc.Sprite = null;

    spriteArray: Array<cc.SpriteFrame> = [];

    onLoad() {
        this.setSpriteNode();
        this.setSpriteAltas();
        if (this.isStartPlay) {
            this.play();
        }
    }

    /**设置精灵 */
    setSpriteNode() {
        this.sprite = this.node.getComponent(cc.Sprite) || this.node.addComponent(cc.Sprite);
    }

    /**播放
     * 如果暂停则继续播放
     * 停止则重新播放
     */
    play() {
        this.isPlay = true;
        this.setNodeSprite(this.noteFrame);
    }

    /**暂停 */
    pause() {
        this.isPause = true;
    }

    /**停止 */
    stop() {
        this.isStop = true;
        this.noteFrame = 0;
    }

    /**将动画帧放入数组用于播放 */
    setSpriteAltas() {
        let arr = this.aniSpriteAtlas.getSpriteFrames();
        if (this.animationName) {
            for (let i = 0, l = arr.length; i < l; i++) {
                let tempDate = arr[i];
                if (tempDate["_name"].indexOf(this.animationName) != -1) {
                    this.spriteArray.push(tempDate);
                }
            }
        } else {
            this.spriteArray = arr;
        }
    }

    /**
     * 设置图片
     * @param num 帧数 
     */
    setNodeSprite(num: number | string) {
        if (this.isNumber(num)) return;
        this.sprite[num] = this.spriteArray[num];
    }

    /**
     * 设置帧数
     * @param index 帧数 
     */
    setFrame(index: number) {
        if (this.isNumber(index)) return;
        this.noteFrame = index;
    }

    /**是否为数字 */
    isNumber(num) {
        if (typeof num == "string") {
            num = Number(num);
            if (typeof num != "number") {
                console.log(num, "类型错误");
                return false;
            }
        }
        return true;
    }

    update(dt) {
        if (this.isPlay) {
            if (this.isPause) return;
            if (this.isStop) return;
            this.playSpeed -= dt;
            if (this.playSpeed <= 0) {
                this.playSpeed += 1;
                this.noteFrame += 1;
                this.setNodeSprite(this.noteFrame)
            }
        }
    }
}