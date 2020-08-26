import BaseComponent from "../Component/BaseComponent";
const { ccclass, property } = cc._decorator;

@ccclass
export default class preEnemy extends BaseComponent {
    
    onLoad(){
        this.node.on("touchend",this.touchEndEvent.bind(this),this);
    }

    touchEndEvent(e) {
        
    }
}
