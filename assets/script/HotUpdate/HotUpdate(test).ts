const { ccclass, property } = cc._decorator;

@ccclass
export default class HotUpdate extends cc.Component {
    @property({ type: cc.Asset })
    manifestUrl: cc.Asset = null;

    _am = null;
    _storagePath = "";
    /**更新 */
    _updating = false;
    /**重试 */
    _canRetry = false;

    _checkListener = null;

    @property({ type: cc.Label })
    label: cc.Label = null;

    @property({ type: cc.ProgressBar })
    progressBar: cc.ProgressBar = null;
    onLoad() {
        this._storagePath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + 'blackjack-remote-asset');
        this._am = new jsb.AssetsManager('', this._storagePath, this.versionCompareHandle);
        // if (!cc.sys.ENABLE_GC_FOR_NATIVE_OBJECTS) {
        //     this._am.retain();
        // }
        this._am.setVerifyCallback((path, asset) => {
            var compressed = asset.compressed;
            var expectedMD5 = asset.md5;
            var relativePath = asset.path;
            var size = asset.size;
            if (compressed) {
                console.log("Verification passed : " + relativePath)
                return true;
            }
            else {
                console.log("Verification passed : " + relativePath + ' (' + expectedMD5 + ')')
                return true;
            }
        });

        if (cc.sys.os === cc.sys.OS_ANDROID) {
            this._am.setMaxConcurrentTask(2);
        }
    }

    hotUpdate() {
        if (this._am && !this._updating) {
            this._am.setEventCallback((date) => {
                this.updateCb(date)
            })
            if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
                let url = this.manifestUrl.nativeUrl;
                if (cc.loader.md5Pipe) {
                    url = cc.loader.md5Pipe["transformURL"](url);
                }
                this._am.loadLocalManifest(url);
            }
            // this._failCount = 0;
            this._am.update();
            // this._updating = true;
        }
    }

    updateCb(data) {
        let needRestart = false;
        let failed = false;
        console.log(data.getEventCode(), "updateCb")
        switch (data.getEventCode()) {
            case jsb.EventAssetsManager["ERROR_NO_LOCAL_MANIFEST"]:
                console.warn("No local manifest file found, hot update skipped")
                failed = true;
                break;
            case jsb.EventAssetsManager["UPDATE_PROGRESSION"]:

                break;
            case jsb.EventAssetsManager["ERROR_DOWNLOAD_MANIFEST"]:
                failed = true;
                break;
            case jsb.EventAssetsManager["ERROR_PARSE_MANIFEST"]:
                failed = true;
                break;
            case jsb.EventAssetsManager["ALREADY_UP_TO_DATE"]:
                break;
            case jsb.EventAssetsManager["UPDATE_FINISHED"]:
                failed = true;
                break;
            case jsb.EventAssetsManager["UPDATE_FAILED"]:
                this._updating = false;
                this._canRetry = true;
                needRestart = true;
                console.log("更新失败")
                break;
            case jsb.EventCode.ERROR_UPDATING:
                console.warn("错误地址:" + data.getAssetId() + ', ' + data.getMessage());
                break;
            case jsb.EventCode.ERROR_DECOMPRESS:
                console.warn(data.getMessage());
                break;
        }
        if (failed) {
            this._am.setEventCallback(null);
            // this._update
            this._updating = false;
        }
        if (needRestart) {
            this._am.setEventCallback(null);
            let searchPaths = jsb.fileUtils.getSearchPaths();
            let netPaths = this._am.getLocalManifest().getSearchPaths();
            console.log(JSON.stringify(netPaths));
            // searchPaths.unshift(netPaths);
            Array.prototype.unshift(searchPaths, netPaths);
            cc.sys.localStorage.setItem("HotUpdateSearchPaths", JSON.stringify(searchPaths));
            jsb.fileUtils.setSearchPaths(searchPaths);

            cc.game.restart();
        }
    }

    checkCb(data) {
        console.log(data);
        console.log("code:" + data.getEventCode(), "checkcb")
        let type = data.getEventCode();
        switch (type) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                console.log("No local manifest file found, hot update skipped.")
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
                // console.log("No local manifest file found, hot update skipped.")

                break;
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                console.log("Fail to download manifest file, hot update skipped.")

                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                console.log("Already up to date with the latest remote version.")

                break;
            case jsb.EventAssetsManager.NEW_VERSION_FOUND:
                console.log('New version found, please try to update. (' + this._am.getTotalBytes() + ')');
                break;
            default:
                return;
        }
        this._am.setEventCallback(null);
        this._checkListener = null;
        this._updating = false;
    }

    againScene() {

    }

    checkUpdate() {
        if (this._am.getState() == jsb.AssetsManager.State.UNINITED) {
            // Resolve md5 url
            var url = this.manifestUrl.nativeUrl;
            if (cc.loader.md5Pipe) {
                url = cc.loader.md5Pipe.transformURL(url);
            }
            this._am.loadLocalManifest(url);
        }    
        if (!this._am.getLocalManifest() || !this._am.getLocalManifest().isLoaded()) {
            console.log("Failed to load local manifest ...");
        }
        this._am.setEventCallback((data) => {
            this.checkCb(data)
        });

        this._am.checkUpdate();
        this._updating = true;
    }

    /**
     * 版本对比
     * @param versionA 新版本
     * @param versionB 旧版本
     */
    versionCompareHandle(versionA: any, versionB: any) {
        cc.log("JS Custom Version Compare: version A is " + versionA + ', version B is ' + versionB);
        var vA = versionA.split('.');
        var vB = versionB.split('.');
        for (var i = 0; i < vA.length; ++i) {
            var a = parseInt(vA[i]);
            var b = parseInt(vB[i] || 0);
            if (a === b) {
                continue;
            }
            else {
                return a - b;
            }
        }
        if (vB.length > vA.length) {
            return -1;
        }
        else {
            return 0;
        }
    }
}