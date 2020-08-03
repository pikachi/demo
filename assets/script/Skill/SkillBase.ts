/**
 * 技能基类
 */

export default class SkillBase {
    /**技能数据 */
    saveKillData = null;
    /**技能名字 */
    killName:string = null;
    /**技能介绍 */
    killIntroduction:string = null;
    /**
     * 读取表取出相应的数值
     * @param SkillId 技能id
     */
    constructor(SkillId){
        // this._saveKillData = 
        this.initData(this.saveKillData);
    }

    /**
     * 技能数据
     */
    initData(killData){

    }


}