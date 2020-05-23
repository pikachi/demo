import EventManager from "../Event/EventManager";

export default class HttpManager extends EventManager {

    xmlHttp: XMLHttpRequest = null;

    /**http网络请求 */
    httpEvent() {
        this.xmlHttp.onload = (data) => {
            this.httpLoad(data);
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

    httpLoad(data) {

    }

    httpError(data) {

    }

    httpLoadEnd(data) {

    }

    httpTimeOut(data) {

    }

    clear(){
        this.xmlHttp.onload = null;
        this.xmlHttp.onloadend = null;
        this.xmlHttp.onerror = null;
        this.xmlHttp.onloadend = null;
        this.xmlHttp.ontimeout = null;
    }

}
