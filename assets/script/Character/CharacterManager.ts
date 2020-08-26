import Enemy from "./Enemy";
import Player from "./Player";
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

    /**存放角色节点*/
    saveCharacterNode: cc.Node = null;

    /**
     * 压入角色
     * @param playerId 玩家Id
     * @param node 玩家节点
     */
    public setPlayer(playerId: any, player: Player) {
        this.playerPool[playerId] = player;
    }

    /**
     * 压入敌人
     * @param enemyId 敌人Id
     * @param node 敌人节点
     */
    setEnemy(enemyId: any, enemy: Enemy) {
        this.enemyPool[enemyId] = enemy;
    }

    /**
     * 创建敌人
     * @param enemyArr 敌人组 
     */
    creatEnemy(enemyArr: Array<number>) {
        for (let i = 0, l = enemyArr.length; i < l; i++) {
            let tempEnemy = new Enemy(i, enemyArr[i])
            this.setEnemy(i, tempEnemy)
        }
    }

    /**
     * 创建玩家
     * @param playerArr 玩家组 
     */
    creatPlayer(playerArr: Array<number>) {
        if (typeof playerArr != "object") {
            return;
        }
        if (playerArr.length == 0) {
            return;
        }
        for (let i = 0, l = playerArr.length; i < l; i++) {
            let tempPlayer = new Player(i, playerArr[i])
            this.setPlayer(i, tempPlayer)
        }
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

    /**设置存放点 */
    set saveNode(node: cc.Node) {
        this.saveCharacterNode = node;
    }


    // update (dt) {}
}
