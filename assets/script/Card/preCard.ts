import BaseComponent from "../Component/BaseComponent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class preCard extends BaseComponent {

    onLoad(){
        this.node.on("touchmove",this.touchMoveEvent.bind(this),this);
        this.node.on("mouseleave",this.touchMoveEvent.bind(this),this);
        
    }

    
    init(skillId){
        
    }

    start () {

    }


}
