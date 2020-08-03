/**人物基类 */
export default class CharacterBase {
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

    node:cc.Node = null;

    

    /**
     * 构造函数
     * @param Id 
     * @param CharacterId 
     */
    constructor(Id:number, characterId:number) {
        this.Id = Id;
        this.characterId = characterId;
        this.createCharater();
    }

    /**创建人物 */
    createCharater(){
        sanka.loader.loadRes("",(cell)=>{
            this.node = cell;
        });
    }

    /**设置基础属性 */
    setAttribute(){
        
    }
}
