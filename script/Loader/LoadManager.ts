import { Resloader } from "./Resloader";

export default class LoadManager {
    loadPool: any = {};

    constructor() {
        this.loadPool = {}
    }

    /**获取指定资源 */
    getRes(_asset) {
        console.log(cc.loader["_cache"][_asset])

        return cc.loader["_cache"][_asset];
    }

    /**获取当前缓存池资源长度 */
    getCacheLength() {
        let length = Object.keys(cc.loader["_cache"]).length;
        console.log(length)
        return length;
    }

    /**
     * 动态加载资源
     * @param _url 路径
     * @param completeCallback 完成回调
     * @param _asset 资源类型
     * @param progressCallback 进度回调
     */
    public loadRes(_url: string, completeCallback?: Function, _asset?: typeof cc.Asset, progressCallback?: Function, isDestroy?: boolean) {
        if (!_url || typeof (_url) !== "string") {
            console.warn("哔哔哔路径错误------>", _url);
        }
        /**记录加载的资源 */
        let tempCompleteCallback = (err, asset) => {
            if (err) {
                console.warn("资源错误资源错误", err);
            } else {
                if (asset) {
                    if (Array.isArray(asset)) {
                        for (let key of asset) {
                            this.countRes(key);
                        }
                    } else {
                        this.countRes(asset, isDestroy)
                    }
                }
                completeCallback && completeCallback(asset);
            }
        }

        let tempProgressCallback = (completedCount: number, totalCount: number, item: any) => {
            progressCallback && progressCallback(completedCount, totalCount, item);
        }

        cc.loader.loadRes(_url, _asset, tempProgressCallback, tempCompleteCallback);
    }

    /**
     * 批量动态加载资源
     * @param url 资源路径
     * @param completeCallback 完成回调
     * @param type 资源类型
     * @param progressCallback 过程回调
     */
    public loadResArray(url: string[], completeCallback: (resource: any[]) => void | null, type: typeof cc.Asset | null, progressCallback: (completedCount: number, totalCount: number, item: any) => void) {
        if (!Array.isArray(url) || url.length <= 0) {
            console.warn("哔哔哔路径错误------>", url);
        }
        /**记录加载的资源 */
        let tempCompleteCallback = (err, asset) => {
            if (err) {
                console.warn("资源错误资源错误", err);
            } else {
                if (asset) {
                    if (Array.isArray(asset)) {
                        for (let key of asset) {
                            this.countRes(key);
                        }
                    } else {
                        this.countRes(asset)
                    }
                }
                completeCallback && completeCallback(asset);
            }
        }

        let tempProgressCallback = (completedCount: number, totalCount: number, item: any) => {
            progressCallback && progressCallback(completedCount, totalCount, item);
        }
        cc.loader.loadResArray(url, type, tempProgressCallback, tempCompleteCallback);

    }

    /**
     * 加载文件夹下面的所有资源
     * @param url 资源路径
     * @param completeCallback 完成回调 
     * @param type 资源类型
     * @param progressCallback 过程回调 
     */
    public loadResDir(url: string, completeCallback: (resource: any[], urls: string[]) => void | null,
        type: typeof cc.Asset | null, progressCallback: (completedCount: number, totalCount: number, item: any) => void | null) {
        if (!url || typeof (url) !== "string") {
            console.warn("哔哔哔路径错误------>", url);
        }
        /**记录加载的资源 */
        let tempCompleteCallback = (err, asset, _urls) => {
            if (err) {
                console.warn("资源错误资源错误", err);
            } else {
                if (asset) {
                    if (Array.isArray(asset)) {
                        for (let key of asset) {
                            this.countRes(key);
                        }
                    } else {
                        this.countRes(asset)
                    }
                }
                completeCallback && completeCallback(asset, _urls);
            }
        }

        let tempProgressCallback = (completedCount: number, totalCount: number, item: any) => {
            progressCallback && progressCallback(completedCount, totalCount, item);
        }
        cc.loader.loadResDir(url, type, tempProgressCallback, tempCompleteCallback)
    }

    /**记录资源 */
    private countRes(_asset, _isDestroy: boolean = false) {
        let res = cc.loader.getDependsRecursively(_asset)
        let name = _asset.uuid
        let assetKey = cc.loader["_getReferenceKey"](_asset);
        let ref: Resloader = null;
        if (this.loadPool[assetKey]) {
            ref = this.loadPool[assetKey];
            ref.countNote(assetKey)
        } else {
            ref = Resloader.create(assetKey, 0, res, name, assetKey, _isDestroy);
            this.loadPool[assetKey] = ref;
        }
    }

    /**销毁资源 */
    public destroy(_asset) {
        this.loadPool[_asset];
        for (let key of this.loadPool[_asset]) {
            key.destory();
        }
    }

    /**批量销毁资源 */
    public destroyAll() {
        for (let key in this.loadPool) {
            if (this.loadPool[key] && !this.loadPool[key].isDestroy) {
                this.loadPool[key].destory();
                delete this.loadPool[key]
            }
        }

    }

}