/**计数器 */
export class Resloader {
    static loaderPool: Resloader[] = [];
    /**资源路径 */
    url: string = "";
    /**引用次数 */
    count: number = 0;
    /**资源uuid */
    getDepends = null;
    /**资源名字 */
    name: "";
    /**资源类型 */
    assetKey = "";
    /**释放销毁资源 */
    isDestroy = false;


    /**设置计数器 */
    setTo(_url: string, _count: number, getDepends: string[], _name: string, assetKey: string, _isDestroy: boolean) {
        this.url = _url;
        this.count = _count;
        this.getDepends = getDepends;
        this.name = name;
        this.assetKey = assetKey;
        !this.isDestroy && (this.isDestroy = _isDestroy);
        return this;
    }

    /**计数 */
    countNote(_url, _isAdd = true) {
        if (_url && typeof (_url) === "string" && this.url === _url) {
            if (_isAdd) {
                this.count++;
            } else {
                this.count--;
            }
        }
    }

    /**创建计数器 */
    static create(_url: string, _count: number, getDepends: string[], _name: string, assetKey: string, _isDestroy: boolean): Resloader {
        if (Resloader.loaderPool.length <= 0) {
            return new Resloader().setTo(_url, _count, getDepends, _name, assetKey, _isDestroy);
        } else {
            return Resloader.loaderPool.pop().setTo(_url, _count, getDepends, _name, assetKey, _isDestroy)
        }
    }

    /**清除数据 */
    clear(): Resloader {
        for (let key of this.getDepends) {
            cc.loader.release(key);
        }
        this.url = "";
        this.count = 0;
        this.name = "";
        this.assetKey = "";
        this.isDestroy = false;
        return this;
    }

    /**回收计数器 */
    destory() {
        Resloader.loaderPool.push(this.clear());
    }
}