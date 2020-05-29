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
    sanka.view = new ViewManager();

    let TimeManager = require("../Util/TimeManager").default;
    sanka.time = new TimeManager();

    window["sanka"] = sanka;
    return sanka;
})(sanka || (sanka = {}));

