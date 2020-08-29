
/**
 * 技能管理器
 * 所有技能通过该管理器处理
 */
export default class SkillManger {
    chooseSkillId = [];
    /**技能池 */
    skillPool = Array<cc.Node>();
    lastChossSkill = [];
    saveSkill = [];
    cardNode: cc.Node = null;
    constructor() {
    }


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
        // defense.getComponent(defense.name).
        // this.resetChooseSkill();
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
        for (let i = 0; i < this.chooseSkillId.length; i++) {
            let value = this.chooseSkillId[i];
            this.lastChossSkill[i] = value;
        }
        this.chooseSkillId.length = 0
    }

    /**
     * 导入技能池
     * @param index 索引
     * @param node 卡牌
     * @param skillId 技能id
     */
    setSkill(index: number, node: cc.Node, skillId: number) {
        if (!index || index < 0) {
            index = this.skillPool.length
        }
        this.skillPool[index] = node;
        node.getComponent(node.name).init(index,skillId);
    }

    /**隐藏技能 */
    hideSKill() {
        for (let key in this.chooseSkillId) {
            this.skillPool[this.chooseSkillId[key]].active = false;
        }
    }

    /**更新卡牌位置 */
    updateCardPos() {
        let length = this.skillPool.length;
        //取出中间值
        let width = length * 130 - 70;
        for (let i = 0; i < length; i++) {
            this.skillPool[i].x = -width / 2 + i * 130;
        }
    }

    /**返回 */
    returnSkill() {
        if (this.lastChossSkill.length != 0) {
            for (let key in this.lastChossSkill) {
                this.skillPool[this.lastChossSkill[key]].active = true;
            }
        }
    }

    createCard() {
        sanka.loader.loadRes("prefabs/preCard", async (asset) => {
            this.cardNode = asset;
        })
    }

    /**获取技能池长度 */
    get getSkillPool(){
        return this.skillPool.length
    }

}
