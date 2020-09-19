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
    /**技能管理 */
    export var skill: SkillManger;
    /**人物管理 */
    export var character: CharacterManager;
    /**声音管理 */
    export var audio: AudioManager;

    /**工具集 */
    export class util {
        /**
         * 保存数据
         * @param key 
         * @param value 存储数据
         */
        static saveData(key, value);

        /**
         * 获取数据
         * @param key key值
         */
        static getData(key);

        /**
         * 移除数据
         * @param key 
         */
        static removeData(key);

        /**
         * 数组排列方式
         * @param array 传入需要排列字段 可多个 
         *@param  如["a"],["a","b"],默认从小到大排序
         * @param 需要从大到小则传入true
         *@param  如[["a",true]],[["a",true],["a",true]]
         */
        static sortFunc(array);

        /**
         * 数组去重
         * @param arr 数组 
         */
        static deduplication(arr: []): Array<any>[];

        /**
         * 扁平化去重(多层嵌套数组)如：[1,[2,2]]
         * @param arr 
         */
        static flattening(arr);
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

        /**
         * 加载预制体
         * @param url 路径
         * @param completeCallback 完成回调 
         * @param data 初始化数据
         */
        public loadPrefabRes(url: string, completeCallback?: Function, data?: any)
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

/**技能管理 */
declare class SkillManger {

    /**技能池 */
    skillPool: Array<cc.Node>;
    /**
     * 攻击敌人 
     * @param attack  攻击方
     * @param defense  防御方
     */
    attackEnemy(attack: cc.Node, defense: cc.Node);

    /**
     * 增益效果
     * @param playerId 受益方
     */
    buffStatc(playerId)

    /**
     * 被选中的技能
     * @param skillId 
     */
    chooseSkill(skillId);

    /**获得被选中技能 */
    getchooseSkill();

    /**重置被选中技能 */
    resetChooseSkill();

    /**
     * 导入技能池
     * @param skillId 技能id
     * @param node 技能卡
     */
    setSkill(index: number, node: cc.Node, skillId: number);

    /**隐藏技能 */
    hideSKill();

    /**返回 */
    returnSkill();

    /**获取技能池长度 */
    get getSkillPool()

    getSkillWidth()
}

/**人物管理 */
declare class CharacterManager {
    /**
     * 压入角色
     * @param playerId 玩家Id
     * @param node 玩家节点
     */
    public setPlayer(playerId: any, node: cc.Node)

    /**
     * 压入敌人
     * @param enemyId 敌人Id
     * @param node 敌人节点
     */
    setEnemy(enemyId: any, node: cc.Node)

    /**
     * 创建敌人
     * @param enemyArr 敌人组 
     */
    creatEnemy(enemyArr);

    /**
     * 创建玩家
     * @param playerArr 玩家组 
     */
    creatPlayer(playerArr: Array<number>);

    /**
     * 被选中的玩家
     * @param id 玩家id
     */
    choosePlayer(id)

    /**
     * 被选中的敌人
     * @param id 敌人id
     */
    chooseEnemy(id);

    /**移除选择 */
    resetChoose();

    /**设置存放点 */
    set saveNode(node: cc.Node);

    /**存放角色节点*/
    saveCharacterNode: cc.Node;

    /**获取所有敌人 */
    getAllEnemy()

    /**获取所有玩家 */
    getAllPlayer()
}

/**声音管理 */
declare class AudioManager {

    /**
     * 播放背景音乐
     * @param music 音乐
     * @param isLoop 是否循环
     */
    playBgMusic(music: cc.AudioClip, isLoop: boolean = true): number;

    /**
     * 播放音效
     * @param effect 音效 
     * @param loop 
     */
    playEffect(effect: cc.AudioClip, loop: boolean = false): number;

    /**停止背景音乐 */
    stopBgMusic(): void;

    /**
     * 停止音效 不填默认停止上一个音效
     * @param musicId 
     */
    stopEffect(musicId?: number): void;

    /**停止所有音效 */
    stopAllEffect(): void;

    /**
     * 设置音效音量
     * @param volume 范围(0~1) 
     */
    setEffectVolume(volume: number): void;

    /**
     * 设置背景音量
     * @param volume 范围(0~1)
     */
    setBgMusicVolume(volume: number): void;

    /**获取音效音量 */
    getEffectVolume(): void

    /**获取背景音乐音量 */
    getBgMusicVolume(): void
}