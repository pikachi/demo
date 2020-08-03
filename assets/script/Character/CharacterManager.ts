import SkillManger from '../Skill/SkillManager';
/**
 * 角色管理器
 */
export default class CharacterManager {
    constructor() {
    }
    /**角色池 */
    playerPool = {};
    /**敌人池 */
    enemyPool = {};

    choosePlayerId = null;

    chooseEnemyId = null;

    /**
     * 压入角色
     * @param playerId 玩家Id
     * @param node 玩家节点
     */
    public setPlayer(playerId: any, node: cc.Node) {
        this.playerPool[playerId] = node;
    }

    /**
     * 压入敌人
     * @param enemyId 敌人Id
     * @param node 敌人节点
     */
    setEnemy(enemyId: any, node: cc.Node) {
        this.enemyPool[enemyId] = node;
    }

    /**
     * 创建敌人
     * @param enemyArr 敌人组 
     */
    creatEnemy(enemyArr) {

    }

    /**
     * 被选中的玩家
     * @param id 玩家id
     */
    choosePlayer(id) {
        this.choosePlayerId = id;
        sanka.skill.hideSKill();
    }

    /**
     * 被选中的敌人
     * @param id 敌人id
     */
    chooseEnemy(id) {
        this.chooseEnemyId = id;
        if (this.choosePlayerId && this.chooseEnemyId) {
            sanka.skill.attackEnemy(this.playerPool[this.choosePlayerId], this.enemyPool[this.chooseEnemyId]);
        }
    }


    /**移除选择 */
    resetChoose() {
        this.choosePlayerId = null;
        this.chooseEnemyId = null;
    }


    // update (dt) {}
}