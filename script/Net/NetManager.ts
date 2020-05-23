import EventManager from "../Event/EventManager";
import { webStatus } from "../Util/Enum";
/**WEBSOCKET管理器 */
export default class NetManager extends EventManager {
    weburl = "ws://121.40.165.18:8800/";

    /**网络连接 */
    web: WebSocket = null;
    constructor() {
        super();
    }

    /**网络事件 */
    webEvent() {
        this.web.onopen = (data) => {
            this.netOpen(data)
        }
        this.web.onmessage = (data) => {
            this.netOn(data);
        }
        this.web.onerror = (data) => {
            this.netError(data)
        }
        this.web.onclose = (data) => {
            this.netClose(data)
        }
    }

    /**网络连接成功 */
    netOpen(data) {
        console.log(data)
    }

    /**网络连接 */
    netConnect(data?) {
        if (!this.web || this.netStatus() != webStatus.one) {
            console.log("连接socket", this.weburl)

            this.web = new WebSocket(this.weburl);
            this.webEvent();

        }
    }

    /**网络状态 */
    netStatus() {
        switch (this.web.readyState) {
            case webStatus.zero:
                console.warn("连接尚未建立")
                break;
            case webStatus.one:
                console.warn("连接已建立")
                break;
            case webStatus.two:
                console.warn("连接正在进行关闭")
                break;
            case webStatus.four:
                console.warn("连接已经关闭或者连接不能打开")
                break;
        }
        return this.web.readyState;
    }

    /**请求发送 */
    netSend(_netName, _data) {
        this.web.send(_data)
    }

    /**数据回包 */
    netOn(data) {
        console.log(data)
    }

    /**心跳包 */
    netPing(data) {
        console.log(data)

    }

    /**断开网络 */
    netClose(data) {
        console.log(data)

    }

    /**网络异常 */
    netError(data) {
        console.log(data)
    }
}
