import BaseComponent from "../Component/BaseComponent";

/**人物基类 */
export default class CharacterBase extends BaseComponent {
    /**玩家id */
    Id: number = 0;
    characterId: number = null;

    //角色属性
    hp = 0; // 生命值
    attack = 0; //攻击
    defense = 0;  //防御
    specialAttack = 0; // 特殊攻击
    specialDefense = 0; //特殊防御
    speed = 0; // 速度

    node: cc.Node = null;
    onLoad() {
    }
    /**
     * 初始化
     * @param Id 
     * @param CharacterId 
     */
    init(Id: number, characterId: number) {
        this.Id = Id;
        this.characterId = characterId;
    }

    /**
     * 设置玩家位置 大小
     * @param array { v2, scale }
     */
    setStatus(array: { v2, scale, zIndex }) {
        this.node.position = array.v2;
        this.node.scale = array.scale;
        this.node.zIndex = array.zIndex;
    }

    /**设置基础属性 */
    setAttribute() {

    }
}
