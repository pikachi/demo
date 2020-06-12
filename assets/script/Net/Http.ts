export default class Http {
    xmlHttp: XMLHttpRequest = null;
    callFunc: Function = null;
    header = [
        /**documenet */
        { key: "content-type", value: "text/html;charset=UTF-8" },
        /**json */
        { key: "content-type", value: "application/json;charset=utf-8" },
        /**跨域 */
        { key: "Access-Control-Allow-Origin", value: "*" },

    ]
    constructor() {
        this.xmlHttp = new XMLHttpRequest();
    }


    /**http网络请求 */
    httpEvent() {
        this.xmlHttp.onload = (data) => {
            // this.httpLoad(data);
        }

        this.xmlHttp.onloadend = (data) => {
            this.httpError(data);
        }

        this.xmlHttp.onerror = (data) => {
            this.httpLoadEnd(data);
        }

        this.xmlHttp.onloadend = (data) => {
            this.httpError(data);
        }

        this.xmlHttp.ontimeout = (data) => {
            this.httpTimeOut(data);
        }
    }

    /**
     * 
     * @param method 
     * @param url 
     */
    httpConnect(method: string, url: string, responseType: string = "text") {
        this.xmlHttp.responseType = (responseType == "arraybuffer") ? "arraybuffer" : "text";
        this.httpEvent()
        this.xmlHttp.open(method, url)
        for (let index = 0; index < this.header.length; index++) {
            this.xmlHttp.setRequestHeader(this.header[index].key, this.header[index].value)
        }
    }

    /**
     * 
     * @param data 
     */
    httpLoad() {
        if (!this.xmlHttp) {

           return;
        }
        if (this.xmlHttp.status === 200 || this.xmlHttp.status === 204 || this.xmlHttp.status === 0) {

        }

    }

    httpError(data) {

    }

    httpLoadEnd(data) {

    }

    httpTimeOut(data) {

    }

    clear() {
        this.xmlHttp.onload = null;
        this.xmlHttp.onloadend = null;
        this.xmlHttp.onerror = null;
        this.xmlHttp.onloadend = null;
        this.xmlHttp.ontimeout = null;
    }

}
