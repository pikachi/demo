/**sanka声明 */
declare module sanka {
    /**事件管理 */
    export var event: EventManager;
    /**加载管理 */
    export var loader: LoadManager;
    /**场景管理 */
    export var scene: SceneManager;
    /**网络管理 */
    export var net: NetManager;
    /**视图管理 */
    export var view: ViewManager;
    /**事件管理 */
    export var time: TimeManager;
    /**工具集 */
    export class util {

    }

    export class EventManager {
        //#region 
        /**
         * 事件注册
         * @param _eventName 事件名
         * @param _owner 作用域
         * @param _caller 事件
         * @param _arg 参数
         */
        public on(_eventName: string, _owner: any, _caller: Function, _arg?: any): EventManager;

        /**
         * 事件派发
         * @param _eventName 事件名
         * @param _arg 数据
         */
        public emit(_eventName: string, _arg?: any): EventManager;

        /**
         * 移除指定事件
         * @param _eventName 事件名 
         * @param _owner 执行域
         * @param _caller 事件
         */
        public off(_eventName: string, _owner: any, _caller: Function): EventManager;

        /**
         * 一次监听
         * @param _eventName 事件名
         * @param _owner 作用域
         * @param _caller 事件
         * @param _arg 参数
         * @param offBefore 是否移除相同监听 默认true
         */
        public once(_eventName: string, _owner: any, _caller: Function, _arg: any[], once?: boolean, offBefore?: boolean): EventManager;

        /**
         * 移除所有事件监听
         * @param _eventName 事件名
         */
        public offEventAll(_eventName: string): EventManager;

        /**
         * 移除所有作用域的监听
         * @param _owner 执行域
         */
        offListenAll(_owner): EventManager;
        //#endregion

        //#region 
        /**
         * 监听执行域所有事件
         * @param _listen 
         */
        addAllListens(_listen, offBefore?: boolean)

        /**
        * @param _eventName 事件名
        * @param _data 数据流
        */
        emitListens(_eventName: string, ..._data: any)

        /**
         * 移除事件
         * @param _listen 移除对象 
         */
        offListens(_listen: any)
        //#region 
    }

    export class LoadManager {
        /**
         * 动态加载资源
         * @param _url 路径
         * @param completeCallback 完成回调
         * @param _asset 资源类型
         * @param progressCallback 进度回调
         */
        public loadRes(_url: string, completeCallback?: Function, _asset?: typeof cc.Asset, progressCallback?: Function, isDestroy?: boolean);

        /**
         * 批量动态加载资源
         * @param url 资源路径
         * @param completeCallback 完成回调
         * @param type 资源类型
         * @param progressCallback 过程回调
         */
        public loadResArray(url: string[], completeCallback: (resource: any[]) => void | null, type: typeof cc.Asset | null, progressCallback: (completedCount: number, totalCount: number, item: any) => void)

        /**
         * 加载文件夹下面的所有资源
         * @param url 资源路径
         * @param completeCallback 完成回调 
         * @param type 资源类型
         * @param progressCallback 过程回调 
         */
        public loadResDir(url: string, completeCallback?: (resource: any[], urls: string[]) => void | null, type?: typeof cc.Asset | null, progressCallback?: (completedCount: number, totalCount: number, item: any) => void | null)

        /**批量销毁资源 */
        public destroyAll()

    }

    export class SceneManager {
        /**
         * 加载场景
         * @param _sceneName 场景名字
         * @param callback 回调
         */
        loadScene(_sceneName: string, callback?: Function);

        /**获取当前场景 */
        getScene()

        /**获取场景资源 */
        getSceneAsset()

        /**清除场景资源 */
        reSceneLease()
    }

    export class NetManager {
        netConnect(data?);
        netStatus();
        netSend(_netName, _data?);
        netOn(data?);
        netClose(data?);
        netError(data?);
        netOpen(data?)
    }

}

/**视图管理 */
declare class ViewManager {
    /**
     * 新建视图
     * @param node 节点
     * @param zIndex 层级
     * @param isaddPersistRoot 是否为常驻节点
     * @param isFull 是否为全屏视图
     */
    newView(node: cc.Node, zIndex: number, isaddPersistRoot?: boolean, isFull?: boolean);

    /**
     * 打开视图
     * @param _name 视图名字
     */
    openView(_name);

    /**
     * 关闭视图
     * @param _name 视图名字
     */
    closeView(_name)

    /**
     * 关闭所有视图
     */
    closeAllView()

    /**
     * 销毁视图
     * @param _name 视图名字
     */
    destroyView(_name)

    /**
     * 销毁全部视图
     */
    destroyAllView()
}

/**时间管理 */
declare class TimeManager {
    /**
     * 添加倒计时
     * @param timeName 定时器名字
     * @param func 回调
     * @param time 时间 单位秒
     * @param owner 执行域
     */
    addSchedule(timeName: string, func: Function, time: number, owner)

    /**
     * 添加一次倒计时
     * @param timeName 定时器名字
     * @param func 回调
     * @param time 时间 单位秒
     * @param owner 执行域
     */
    addScheduleOnce(timeName: string, func: Function, time: number, owner)

    /**
     * 清除倒计时
     * @param timeName 定时器名字 
     * @param owner 执行域
     */
    clearSchedule(timeName: any, owner)

    /**
     * 清除全部倒计时
     * @param owner 执行域
     */
    clearAllSchedule(owner)
}