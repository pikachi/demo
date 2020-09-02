import BaseComponent from "./Component/BaseComponent";
import { CommonEventName } from "./Util/EventName";

const { ccclass, property } = cc._decorator;

@ccclass
//主场景
export default class gameMain extends BaseComponent {

    /**记录点击按钮 */
    saveKeyBoard = {};

    onLoad() {
        this.initKeyInputEvent();
        this.createCombatView();
    }

    createCombatView() {
        sanka.loader.loadPrefabRes("CombatView", (asset) => {
            this.node.addChild(asset);
        }, { playerArr: [1, 3, 5], enemyArr: [9, 8, 7, 6, 5, 4, 3, 2, 1] });

    }

    initKeyInputEvent() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.keyInputDownEvent.bind(this), this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.keyInputUpEvent.bind(this), this);
    }

    keyInputDownEvent(e: KeyboardEvent) {
        // if(e.keyCode == )
        for (let key in cc.macro.KEY) {
            let data: number = Number(cc.macro.KEY[key]);
            if (data == e.keyCode) {
                if(!this.saveKeyBoard[data]){
                    this.saveKeyBoard[data] = key;
                    sanka.event.emit(CommonEventName.KEYBOARD_CLICK_EVENT,this.saveKeyBoard);
                }
            }
        }
    }

    keyInputUpEvent(e: KeyboardEvent) {
        if (this.saveKeyBoard[e.keyCode]) {
            delete this.saveKeyBoard[e.keyCode];
        }
        sanka.event.emit(CommonEventName.KEYBOARD_CLICK_EVENT,this.saveKeyBoard);
    }

}
