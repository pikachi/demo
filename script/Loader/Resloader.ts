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


    /**设置计数器 */
    setTo(_url: string, _count: number, getDepends: string[], _name: string, assetKey: string) {
        this.url = _url;
        this.count = _count;
        this.getDepends = getDepends;
        this.name = name;
        this.assetKey = assetKey;
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
    static create(_url: string, _count: number, getDepends: string[], _name: string, assetKey: string): Resloader {
        if (Resloader.loaderPool.length <= 0) {
            return new Resloader().setTo(_url, _count, getDepends, _name, assetKey);
        } else {
            return Resloader.loaderPool.pop().setTo(_url, _count, getDepends, _name, assetKey)
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
        return this;
    }

    /**回收计数器 */
    destory() {
        Resloader.loaderPool.push(this.clear());
    }
}