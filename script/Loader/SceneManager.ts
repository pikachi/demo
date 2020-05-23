export default class SceneManager {
    /**当前场景 */
    currentScene = null;

    /**当前场景资源 */
    dependAssets = null;

    /**预加载资源 */
    preloadAssets = null;

    /**是否预加载 */
    ispreLoad = false;

    list = []

    constructor() {
        /**场景加载前调用 */
        cc.director.on(cc.Director.EVENT_BEFORE_SCENE_LOADING,
            (...assetName) => {
                console.log("加载新场景之前所触发的事件", assetName, this.ispreLoad)
                !this.ispreLoad && this.reSceneLease();
            }
        );
        /**场景加载完后第二个调用 */
        cc.director.on(cc.Director.EVENT_AFTER_SCENE_LAUNCH,
            (sceneAsset) => {
                // console.log("运行新场景之后所触发的事件", sceneAsset)
                this.currentScene = sceneAsset["_name"];
                sanka.loader.destroyAll();
                this.preloadAssets = this.getSceneAsset();
                this.reProSceneLease();
            }
        );
    }

    /**
     * 加载场景
     * @param _sceneName 场景名字
     * @param callback 回调
     */
    loadScene(_sceneName: string, callback?: Function) {
        if (_sceneName == this.currentScene) {
            console.log("不许进入相同场景")
            return;
        }
        let caller = () => {
            callback && callback();
        }
        this.dependAssets = this.getSceneAsset();
        // console.log(this.ispreLoad, this.preloadAssets, this.dependAssets)
        cc.director.loadScene(_sceneName, caller)
    }

    /**预加载场景--未完成 */
    preloadScene(sceneName: string, onLoaded?: Function, onProgress?: (completedCount: number, totalCount: number, item: any) => void) {
        this.ispreLoad = true;
        if (typeof (sceneName) != "string") {
            console.warn("无效场景名", sceneName);
            return;
        }
        if (sceneName == this.currentScene) {
            console.log("同一个场景")
            return;
        }
        let onLoadFunc = (err, assst) => {
            if (err) {
                console.log("场景预加载报错啦", err);
            } else {
                this.preloadAssets = assst;
                onLoaded && onLoaded(assst)
            }
        }
        let onProFunc = (completedCount: number, totalCount: number, item: any) => {
            // console.log(item["dependKeys"]);
            onProgress && onProFunc(completedCount, totalCount, item)
            // item["dependKeys"] && this.list.concat(item["dependKeys"])
            // console.log(this.list)
        }
        // console.log(this.getSceneAsset());
        cc.director.preloadScene(sceneName, onProFunc, onLoadFunc)
    }

    /**获取当前场景 */
    getScene() {
        return cc.director.getScene()["_name"];
    }

    /**获取场景资源 */
    getSceneAsset() {
        return cc.director.getScene()["dependAssets"];
    }

    /**清除场景资源 */
    reSceneLease() {
        if (!this.dependAssets) {
            console.log("当前场景空空荡荡")
            return;
        } else {
            if (!this.ispreLoad) {
                for (let key of this.dependAssets) {
                    cc.loader.release(key)
                }
                this.dependAssets = null;
                console.log("清除场景资源")
            }
        }
        this.preloadAssets = null;
        this.ispreLoad = false;
    }

    /**预加载资源清除 */
    reProSceneLease() {
        let otherList = []
        if (this.ispreLoad && this.preloadAssets) {
            console.log(this.preloadAssets, this.dependAssets)
            for (let index of this.preloadAssets) {
                let otherChange = false;
                for (let key of this.dependAssets) {
                    if (index == key) {
                        otherChange = true;
                        break;
                    }
                }
                if (!otherChange) {
                    otherList.push(index);
                }
            }
            console.log(otherList)
            for (let i of otherList) {
                cc.loader.release(i)
            }
        }
    }
}