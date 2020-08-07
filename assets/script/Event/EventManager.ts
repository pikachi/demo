import Handler from "./Handler";

/**事件监听类 */
export default class EventManager {
    static eventPool: object = {};

    static listenPool: object = {};

    constructor() {
        EventManager.eventPool = {};
        EventManager.listenPool = {};
    }
    //#region 方法1 单个事件单独监听
    /**
     * 事件注册
     * @param _eventName 事件名
     * @param _owner 作用域
     * @param _caller 事件
     * @param _arg 参数
     */
    public on(_eventName: string, _owner: any, _caller: Function, _arg: any = null): EventManager {
        this.createEvent(_eventName, _owner, _caller, _arg)
        return this;
    }

    /**
     * 事件派发
     * @param _eventName 事件名
     * @param _arg 数据
     */
    public emit(_eventName: string, ..._arg: any): EventManager {
        let eventList: Array<Handler> = [];
        if (!_eventName || typeof (_eventName) != "string") {
            console.log(_eventName, "不存在事件名");
            return;
        }
        if (!EventManager.eventPool[_eventName]) {
            console.log("莫得注册事件")
            return;
        } else {
            eventList = EventManager.eventPool[_eventName];
        }
        for (let i = 0; i < eventList.length; i++) {
            eventList[i].runwith(_arg);
        }
        if (eventList.length == 0 && EventManager.eventPool) {
            delete EventManager.eventPool[_eventName];
        }
    }

    /**一次监听 */
    public once(_eventName: string, _owner: any, _caller: Function, _arg: any[], offBefore: boolean = true): EventManager {
        this.createEvent(_eventName, _owner, _caller, _arg, true, offBefore)
        return this;
    }

    /**
     * 事件状态
     * @param _eventName 事件名
     * @param _owner 作用域
     * @param _caller 执行函数
     * @param args 数据
     * @param once 执行一次
     * @param offBefore 是否移除之前的事件
     */
    private createEvent(_eventName: string, _owner: any, _caller: Function, _arg: any[], once: boolean = false, offBefore: boolean = true) {
        // offBefore && this.off(_eventName, _owner, _caller);
        if (!_eventName || typeof (_eventName) != "string") {
            console.log(_eventName, "不存在事件名");
            return;
        }
        if (!_owner) {
            console.log(_owner, "不存在作用域")
            return;
        }
        if (!_caller) {
            console.log(_caller, "不存在事件")
            return;
        }
        let event: Handler = Handler.create(_owner, _caller, _arg, once);
        if (!EventManager.eventPool[_eventName]) {
            EventManager.eventPool[_eventName] = [];
        }
        EventManager.eventPool[_eventName].push(event);
    }

    /**移除指定监听 */
    off(_eventName: string, _owner: any, _caller: Function = null): EventManager {
        let event: Handler[] = EventManager.eventPool[_eventName];
        if (!event) {
            console.log("莫得事件")
            return;
        }
        for (let i = 0; i < event.length; i++) {
            if (event[i].owner == _owner) {
                console.log(event[i]);
                if (event[i].caller == _caller) {
                    console.log("移除监听")
                    event[i].recover();
                }
                if (event[i].caller == null) {
                    event[i].recover();
                }
            }
        }
        return this;
    }

    /**移除事件所有监听 */
    offEventAll(_eventName: string): EventManager {
        if (typeof (_eventName) == "string") {
            delete EventManager.eventPool[_eventName];
            console.log(EventManager.eventPool);
        }
        return this;
    }

    /**移除作用域所有监听 */
    offListenAll(_owner): EventManager {
        if (!_owner) {
            console.log("莫得作用域")
            return;
        }
        for (let key in EventManager.eventPool) {
            // let listen: Handler[] = EventManager.eventPool[key];
            this.off(key, _owner)
        }
        return this;
    }

    //#endregion

    //#region 方法2 传入对象监听所有事件
    /**
     * 监听执行域所有事件
     * @param _listen 
     */
    addAllListens(_listen, offBefore: boolean = true) {
        if (!_listen) {
            console.log("莫得对象");
            return;
        }
        if (EventManager.listenPool[_listen]) {
            if (offBefore) {
                delete EventManager.listenPool[_listen];
                EventManager.listenPool[_listen] = _listen;
                console.log(EventManager.listenPool[_listen]);
            }
        } else {
            EventManager.listenPool[_listen] = _listen;
            // console.log(EventManager.listenPool[_listen]);
        }
    }

    /**
     * 事件派发
     * @param _eventName 事件名
     * @param _data 数据流
     */
    emitListens(_eventName: string, ..._data: any) {
        if (!_eventName) {
            console.log("莫得事件名")
            return;
        }
        for (let key in EventManager.listenPool) {
            let listen = EventManager.listenPool[key];
            listen[_eventName] && listen[_eventName].call(listen, ..._data);
        }
    }

    /**
     * 移除事件
     * @param _listen 移除对象 
     */
    offListens(_listen: any) {
        if (EventManager.listenPool[_listen]) {
            delete EventManager.listenPool[_listen];
        } else {
            console.log("莫得执行域")
        }
        console.log(EventManager.listenPool)
    }

    //#endregion
}

