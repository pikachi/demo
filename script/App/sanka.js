var sanka;
(function () {
    let EventManager = require("../Event/EventManager").default;
    sanka.EventManager = EventManager
    sanka.event = new EventManager();

    let LoadManager = require("../Loader/LoadManager").default;
    sanka.LoadManager = LoadManager;
    sanka.loader = new LoadManager();

    let SceneManager = require("../Loader/SceneManager").default
    sanka.SceneManager = SceneManager;
    sanka.scene = new SceneManager();

    let NetManager = require("../Net/NetManager").default
    sanka.NetManager = NetManager;
    sanka.net = new NetManager();

    let ViewManager = require("../View/ViewManager").default;
    ViewManager.ViewManager = ViewManager;
    sanka.view = new ViewManager();

    window["sanka"] = sanka;
    return sanka;
})(sanka || (sanka = {}));

