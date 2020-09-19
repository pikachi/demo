/**时间类 */
export default class TimeManager {
    timePool = {}
    constructor() {
        this.timePool = {}
    }

    /**
     * 添加倒计时
     * @param func 回调
     * @param time 时间 单位秒
     * @param owner 执行域
     */
    addSchedule(timeName: string, func: Function, time: number, owner) {
        if (!timeName || typeof timeName != "string") {
            return;
        }
        let timeOwner = this.timePool[owner];
        if (!timeOwner) {
            this.timePool[owner] = {};
            let timer = setInterval(func, time * 1000);
            this.timePool[owner][timeName] = timer;
        } else {
            if (timeOwner[timeName]) {
                this.clearSchedule(timeName, owner);
            }
            let timer = setInterval(func, time * 1000);
            this.timePool[owner][timeName] = timer;

        }

    }

    /**
     * 添加一次倒计时
     * @param func 回调
     * @param time 时间 单位秒
     * @param owner 执行域
     */
    addScheduleOnce(timeName: string, func: Function, time: number = 0, owner) {
        time = time || 0;
        owner = owner || this;
        if (!timeName || typeof timeName != "string") {
            return;
        }
        if (!owner) {
            console.log("不存在owner", owner)
            return;
        }
        let timeOwner = this.timePool[owner];
        let timer = setTimeout(() => {
            func();
            this.clearSchedule(timeName, owner);
        }, time * 1000);
        if (!timeOwner) {
            this.timePool[owner] = {}
            this.timePool[owner][timeName] = timer;
        } else {
            if (timeOwner[timeName]) {
                this.clearSchedule(timeName, owner);
            }
            this.timePool[owner][timeName] = timer;
        }
    }

    /**
     * 清除倒计时
     * @param funcName 回调 
     * @param owner 执行域
     */
    clearSchedule(timeName: any, owner) {
        if (!timeName || typeof timeName != "string") {
            console.log("名字不对哦", this.timePool);
            return;
        }
        if (!owner) {
            console.log("不存在owner", owner)
            return;
        }
        clearTimeout(this.timePool[owner][timeName]);
        delete this.timePool[owner][timeName];
    }

    /**
     * 清除全部倒计时
     * @param owner 执行域
     */
    clearAllSchedule(owner) {
        for (let key in this.timePool[owner]) {
            if (this.timePool[owner][key]) {
                this.clearSchedule(key, owner)
            } else {
                delete this.timePool[owner][key];
            }
        }
    }
}