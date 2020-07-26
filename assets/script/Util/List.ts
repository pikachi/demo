/**列表类 */
export default class List<T>{
    array: Array<T>;
    constructor() {
        this.array = new Array<T>();
    }

    /**
     * 添加元素
     * @param value 元素 
     */
    push(value) {
        if (this.array.length < 0 || typeof (this.array) != "object") {
            console.error("数组有问题")
            return;
        }
        this.array.push(value);
    }

    /**取出元素 */
    pop() {
        if (this.array.length > 0) {
            return this.array.pop();
        }
        return null;
    }

    /**获取长度 */
    getLength() {
        return this.array.length;
    }

    /**
     * 清除数组
     */
    clear() {
        this.array.length = 0;
    }

    /**
     * 插入
     * @param start 开始位置
     * @param value 插入元素
     */
    insert(start, ...value) {
        if (start && typeof (start) === "number") {
            // this.array.splice(start, 0, ...value);
            return this.deleteInsert(start, 0, ...value);
        } else {
            console.warn("开始位置不存在：", start);
        }
    }

    /**
     * 删除元素
     * @param start 开始位置
     * @param length 删除长度
     */
    delete(start, length) {
        return this.deleteInsert(start, length);
    }

    /**
     * 删除并插入元素
     * @param start 开始位置
     * @param length 删除长度
     * @param value 插入数组
     */
    deleteInsert(start, length, ...value) {
        if (!start || typeof start !== "number") {
            console.warn("开始位置不存在：", start);
            return;
        }
        if (length <= 0) {
            console.warn("长度错误", length);
            return;
        }
        return this.array.splice(start, length, ...value);
    }

    /**
     * 删除第一个元素并返回第一个元素的值
     * 改变数组长度
     */
    shift() {
        if (this.array.length > 0) {
            return this.array.shift()
        } else {
            console.warn("数组长度小于0")
        }
    }

    /**
     * 插入元素到第一个位置
     * @param value 元素 可插入多个
     */
    unshift(...value) {
        if (this.array.length > 0) {
            return this.array.unshift(...value)
        } else {
            console.warn("数组长度小于0")
        }
    }

    /**数组排序 */
    sort() {
        if (this.getLength() < 0) {
            return this.array.sort();
        }
    }

    /**
     * 连接数组
     * @param arr 数组
     */
    concat(...arr: Array<T>) {
        this.array.concat(...arr);
    }
}