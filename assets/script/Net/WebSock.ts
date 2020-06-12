import EventManager from "../Event/EventManager";
import { webStatus } from "../Util/Enum";
import { NetEventName } from "../Util/EventName";
/**WEBSOCKET管理器 */
export default class WebSock extends EventManager {
    webUrl = "ws://121.40.165.18";
    webPort = "8800"
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
        this.emit(NetEventName.netOpen);
    }

    /**网络连接 */
    netConnect(webIp) {
        if (!this.web || this.netStatus() != webStatus.one) {
            console.log("连接socket", webIp)
            this.web = new WebSocket(webIp);
            this.webEvent();
        }
    }

    /**网络状态 */
    netStatus() {
        switch (this.web.readyState) {
            case webStatus.zero:
                console.warn("连接尚未建立");
                break;
            case webStatus.one:
                console.warn("连接已建立");
                break;
            case webStatus.two:
                console.warn("连接正在进行关闭");
                break;
            case webStatus.four:
                console.warn("连接已经关闭或者连接不能打开");
                break;
        }
        return this.web.readyState;
    }

    /**请求发送 */
    netSend(_data) {
        this.web && this.web.send(_data)
    }

    /**数据回包 */
    netOn(data) {
        console.log(data)
        this.emit(NetEventName.netMessage, data);
    }

    /**断开网络 */
    netClose(data) {
        console.log("网络断开", data)
        this.emit(NetEventName.netClose, data);
    }

    /**网络异常 */
    netError(data) {
        console.log("网络异常", data);
        this.emit(NetEventName.netError, data);
    }

    /**关闭网络 */
    close() {
        this.web.close()
        this.web.onopen = null;
        this.web.onmessage = null
        this.web.onerror = null
        this.web.onclose = null
    }
}
