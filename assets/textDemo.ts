

const { ccclass, property } = cc._decorator;

@ccclass
export default class textDemo extends cc.Component {

    startpos = cc.v2(0, 0);
    movepos = cc.v2(0, 0);

    @property({ type: cc.Node })
    mask: cc.Node = null;


    onLoad() {
        // this.node.on("touchstart", this.touchstart, this);
        // this.node.on("touchmove", this.touchmove, this);
        // this.scrollView.node.on("touch-up",this.touchstart,this);
    }

    start() {

    }
    touchstart(e:cc.ScrollView) {
        // this.startpos = this.mask.convertToNodeSpaceAR(e.getLocation());
        // console.log(this.startpos);
        console.log(e.getContentPosition());

    }

    touchmove(e: cc.Touch) {
        // this.movepos = this.mask.convertToNodeSpaceAR(e.getLocation());
        // let mask = this.mask.getComponent(cc.Mask);
        // let graphics: cc.Graphics = mask["_graphics"];
        // graphics.circle(this.startpos.x, this.startpos.y, 10);
        // graphics.fill()
        // // graphics.lineTo(this.movepos.x, this.movepos.y);
        // graphics.strokeColor = cc.Color.WHITE;
        // this.startpos = this.movepos;

        // console.log(graphics);
    }
    onBeginContact() {

    }

    textFun(data) {

    }

    text1() {
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/Appactivity", "zhendong", "()V");
    }

    changeScene() {
        sanka.scene.loadScene("text2");
    }

    changeScene2() {
        sanka.scene.loadScene("text");
    }

    text2() {
        sanka.view.openView("richtext");
    }

    clear() {
        sanka.time.clearAllSchedule(this);
    }
    // update (dt) {}
}
