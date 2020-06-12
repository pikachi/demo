/**链表类 */
export default class LinkedList {
    /**头节点 */
    head: Node = null;
    /**尾结点 */
    end: Node = null;
    /**链表长度 */
    length: number = 0;

    constructor(){
        this.length = 0;
    }

    /**
     * 设置头结点
     * @param _node 节点 
     */
    setHead(_node:Node) {
        this.head = _node;
        this.head.head = null;
        this.end = _node;
        this.end.next = null;
        this.length ++;
    }

    /**
     * 添加节点
     * @param _node  
     */
    addBody(_node:Node){
        this.end.next = _node;
        this.end = _node;
        this.end.next = null;
    }

    // delete(previous:){

    // }
}

/**类型声明 */
interface Node {
    /**上一个节点指向 */
    head: Node;
    /**下一个节点指向 */
    next: Node;
    /**存储内容 */
    previous: any
}