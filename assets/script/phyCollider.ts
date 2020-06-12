// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class phyCollider extends cc.Component {

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_jointBit | cc.PhysicsManager.DrawBits.e_shapeBit;
        cc.director.getCollisionManager().enabled = true;
    }

    onBeginContact(contact, selfCollider, otherCollider) {
        console.log(contact, selfCollider, otherCollider)
    }

    onEndContact(contact, selfCollider, otherCollider) {
        console.log(contact, selfCollider, otherCollider)

    }
    
    // onPreSolve(contact, selfCollider, otherCollider) {
    //     console.log(contact, selfCollider, otherCollider)

    // }
}
