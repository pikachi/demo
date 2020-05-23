

/**事件处理器 */
export default class Handler {
    /**处理器对象池 */
    protected static _handlerPool: Handler[] = [];
    /**事件执行函数 */
    caller: Function;
    /**事件作用域 */
    owner: any;
    /**参数 */
    protected arg: any[] = [];
    // /**事件标识 */
    protected static Hid: number = 0;

    // /**事件 */
    private id: number = 0;

    /**一次执行 */
    private once: boolean = false;

    constructor(_owner, _caller, _arg, _once) {
        this.setTo(_owner, _caller, _arg, _once)
    }

    /**
     * 设置一个事件处理器
     * @param _owner 事件作用域
     * @param _caller 事件执行函数
     * @param _arg 携带数据
     * @param _once 执行一次
     */
    setTo(_owner: any, _caller: Function, _arg: any, _once: boolean = false): Handler {
        this.id = Handler.Hid++;
        this.caller = _caller;
        this.owner = _owner;
        this.arg = _arg;
        this.once = _once;
        return this;
    }

    /**
     * 创建事件处理器
     * @param _owner 事件作用域
     * @param _caller 事件执行函数
     * @param _arg 携带数据
     * @param _once 是否执行一次
     */
    static create(_owner: any, _caller: Function, _arg: any, _once: boolean = false): Handler {
        if (Handler._handlerPool.length <= 0) {
            return new Handler(_owner, _caller, _arg, _once)
        } else {
            return Handler._handlerPool.pop().setTo(_owner, _caller, _arg, _once)
        }
    }

    /**销毁事件处理器 */
    clear() {
        this.once = false;
        this.owner = null;
        this.caller = null;
        this.arg = null;
        return this;
    }

    /**执行处理器 */
    runwith(..._data) {
        if (!this.caller) return;
        if (!this.arg) this.arg = _data;
        else this.arg.concat(_data);
        this.caller.apply(this.owner, _data);
        if (this.once) {
            this.recover();
        }
    }

    /**放回事件对象池 */
    recover() {
        if (this.id >= 0) {
            this.id = 0;
            Handler._handlerPool.push(this.clear());
        }
    }
}
