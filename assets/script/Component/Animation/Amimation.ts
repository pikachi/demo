const { ccclass, property } = cc._decorator;
@ccclass
/**帧动画
 * 播放图片必须名字一致，且按正序排列，
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

    /**记录当前帧 */
    noteFrame = 0;

    onLoad() {
        if (this.isStartPlay) {
            this.play();
        }
    }

    play() {

    }
}