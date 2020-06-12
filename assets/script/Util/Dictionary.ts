/**
 * 字典类
 */
export default class Dictionary {
    dictionaryPool = {};

    constructor() {
        this.dictionaryPool = {};
    }

    /**
     * 是否有值
     * @param key 键
     */
    isHadValue(key): boolean {
        if (this.dictionaryPool[key]) {
            return true
        }
        return false;
    }

    /**
     * 是否有键
     * @param key 键
     */
    isHadKey(key): boolean {
        let keyList = Object.keys(this.dictionaryPool);
        if (keyList && keyList.length > 0) {
            for (let index of keyList) {
                if (index === key) {
                    return true
                }
            }
        }
        return false
    }

    /**
     * 添加对象
     * @param key 键
     * @param value 值
     */
    add(key, value) {
        if (this.dictionaryPool[key]) {
            return false;
        } else {
            this.dictionaryPool[key] = value;
            return true;
        }
    }

    /**
     * 删除对象
     * @param key 键
     */
    delete(key) {
        if (this.dictionaryPool[key]) {
            delete this.dictionaryPool[key]
            return true;
        } else {
            return false
        }
    }

    /**
     * 获取值
     * @param key 键 
     */
    get(key) {
        return this.dictionaryPool[key];
    }

    /**
     * 获取字典长度
     */
    getLength() {
        return Object.keys(this.dictionaryPool).length;
    }

    /**清除字典 */
    deleteAll(){
        this.dictionaryPool = {};
    }
}