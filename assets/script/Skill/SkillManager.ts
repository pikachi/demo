
/**
 * 技能管理器
 * 所有技能通过该管理器处理
 */
export default class SkillManger {

    chooseSkillId = [];

    /**技能池 */
    skillPool = {};

    lastChossSkill = [];


    /**
     * 实例化技能
     * 返回技能数据
     * @param playerId 玩家Id 
     */
    creatSkill(playId) {
        return;
    }

    /**
     * 攻击敌人 
     * @param skillId 技能Id
     * @param attack  攻击方
     * @param defense  防御方
     */
    attackEnemy(attack: cc.Node, defense: cc.Node) {
        defense.getChildByName("hp").getComponent(cc.Label).string = "hp" + (Number(111) - 10).toString();
        this.resetChooseSkill();
    }

    /**
     * 增益效果
     * @param sikllId 技能Id 
     * @param playerId 受益方
     */
    buffStatc(playerId) {

    }

    /**
     * 防御
     * @param skillId 技能Id
     * @param defenseId 防御方
     */
    defenseStatc(skillId, defenseId) {

    }

    /**
     * 被选中的技能
     * @param skillId 
     */
    chooseSkill(skillId) {
        for (let value of this.chooseSkillId) {
            if (value == skillId) {
                return
            }
        }
        this.chooseSkillId.push(skillId);
    }

    getchooseSkill() {
        return this.chooseSkillId
    }

    resetChooseSkill() {
        for(let i = 0;i<this.chooseSkillId.length;i++){
            let value = this.chooseSkillId[i];
            this.lastChossSkill[i] = value;
        }
        this.chooseSkillId.length = 0
    }

    setSkill(skillId, node: cc.Node) {
        this.skillPool[skillId] = node;
    }

    /**隐藏技能 */
    hideSKill(){
        for(let key in this.chooseSkillId){
            this.skillPool[this.chooseSkillId[key]].active = false;
        }
    }

    /**返回 */
    returnSkill(){
        if(this.lastChossSkill.length != 0){
            for(let key in this.lastChossSkill){
                this.skillPool[this.lastChossSkill[key]].active = true;
            }   
        }
    }
}
