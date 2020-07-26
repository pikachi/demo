/**人物基类 */
export default class CharacterBase {
    /**玩家id */
    playerId: number = 0;
    node: cc.Node = null;

    //角色属性
    hp = 0; // 生命值
    attack = 0; //攻击
    defense = 0;  //防御
    specialAttack = 0; // 特殊攻击
    specialDefense = 0; //特殊防御
    speed = 0; // 速度


    constructor(playerId, node:cc.Node) {
        this.playerId = playerId;
        this.node = node;
    }
}
