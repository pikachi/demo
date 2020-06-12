import EventManager from "../Event/EventManager";
import WebSock from "./WebSock";
import { NetEventName } from "../Util/EventName";
import Http from "./Http";
/**网络管理器 */
export default class NetManager extends EventManager {
    /**websock */
    websock: WebSock = null;

    constructor() {
        super();
    }

    /**连接socket */
    connect() {
        if (this.websock === null) {
            this.websock = new WebSock();
            this.on(NetEventName.netOpen, this, this.connectOpen);
            this.on(NetEventName.netMessage, this, this.connectMessage);
            this.on(NetEventName.netClose, this, this.connectClose);
        }
        this.websock.netConnect(this.boolUrl());
    }

    /**网络服务器 */
    boolUrl(ip?, port?) {
        if (!ip && !port) {
            ip = this.websock.webUrl;
            port = this.websock.webPort;
        }
        let url = `ws://${ip}:${port}`;
        return url;
    }

    /**
     * 网络连接
     * @param data 数据流
     */
    connectOpen(data) {
        this.emit(NetEventName.NET_CONNECT);
    }

    /**
     * 网络回包
     * @param data 数据流
     */
    connectMessage(data) {
        /**数据反序列化 */
        let eventName = null;
        let _data = null;
        this.emitListens(eventName, _data);
    }

    /**
     * 请求数据
     * @param eventName 事件名 
     * @param data 数据
     */
    send(eventName, data?) {
        /**数据序列化 */
        let _data = null;
        this.websock.netSend(_data);
    }

    /**
     * 网络断开
     * @param data 数据流
     */
    connectClose(data) {
        this.emit(NetEventName.NET_CLOSE);
    }

    /**网络状态 */
    connectStatus() {
        return this.websock.netStatus();
    }

    //#region 
    http(url: string, func: Function, data: any, method?: string, responseType?: string) {
        let httpXml = new Http();
        httpXml.callFunc = func;

        httpXml.httpConnect(method,url,responseType);
    }
    //#endregion
} 