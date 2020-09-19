export default class Util {

    /**
     * 快速排序
     * @param arr 数组 
     * 1.通过一趟排序将序列分成左右两部分，其中左半部分的的值均比右半部分的值小，2.然后再分别对左右部分的记录进行排序，直到整个序列有序。
     */
    static quickSort(arr: []) {
        let func = (head, end, _arr) => {
            if (_arr < 1) {
                return;
            }
            let temp = 0;
            for (let i = 0; i < _arr.length; i++) {
                let cell = _arr[i];

            }
        }
    }

    /**
     * 冒泡排序
     * @param arr 数组
     * 1.比较相邻的元素。如果第一个比第二个大，就交换他们两个。2.针对所有的元素重复以上的步骤，除了最后一个。3.持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较
     */
    static bubbleSort(arr: []) {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 1; j < arr.length; j++) {
                if (arr[i] > arr[j]) {
                    let cell = arr[j];
                    arr[j] = arr[i];
                    arr[i] = cell;
                }
            }
        }
        return arr;
    }

    /**
     * 堆排序
     * @param arr 数组
     * 假设序列有n个元素,先将这n建成大顶堆，然后取堆顶元素，与序列第n个元素交换，然后调整前n-1元素，使其重新成为堆，然后再取堆顶元素，与第n-1个元素交换，再调整前n-2个元素...直至整个序列有序。
     */
    static heapSort(arr: []) {

    }

    /**
     * 插入排序
     * @param arr 数组
     * 将一个记录插入到已排序的有序表中，从而得到一个新的，记录数增1的有序表
     */
    static insertSort(arr: []) {

    }

    /**
     * 选择排序
     * @param arr 数组
     * 选择排序与冒泡排序有点像，只不过选择排序每次都是在确定了最小数的下标之后再进行交换，大大减少了交换的次数
     */
    static selectSort(arr: []) {
        let _arr = [];
        for (let i = 0; i < arr.length; i++) {
            if (_arr.length == 0) {
                _arr.push(arr[i]);
            } else {
                for (let j = 0; j < _arr.length; j++) {
                    if (_arr[j] > arr[i]) {
                        _arr.splice(j, 0, arr[i]);
                    }
                }
            }
        }
        return _arr;
    }

    /**
     * 希尔排序
     * @param arr 数组
     * 希尔排序是插入排序的一种高效率的实现，也叫缩小增量排序。简单的插入排序中，如果待排序列是正序时，时间复杂度是O(n)，如果序列是基本有序的，使用直接插入排序效率就非常高。希尔排序就利用了这个特点。基本思想是：先将整个待排记录序列分割成为若干子序列分别进行直接插入排序，待整个序列中的记录基本有序时再对全体记录进行一次直接插入排序。
     */
    static shellSort(arr: []) {

    }

    /**
     * 归并排序
     * @param arr 数组
     * 1.把有序表划分成元素个数尽量相等的两半2.把两半元素分别排序3.把两个有序表合并成一个
     */
    static metgeSort(arr: []) {

    }

    /**
     * 计数排序
     * @param arr 数组
     * 当待排序的数的值都是在一定的范围内的整数时，可以用待排序的数作为计数数组的下标，统计每个数的个数，然后依次输出即可
     */
    static countSort(arr: Array<number>, isReplace: boolean = true) {
        if (!Array.isArray(arr)) {
            return;
        }
        let _arr = [];
        for (let i = 0; i < arr.length; i++) {
            _arr[arr[i]]++;
        }
        let index = 0
        for (let i = 0; i < _arr.length; i++) {
            if (!_arr[i]) continue;
            for (let j = 0; j < _arr[i]; j++) {
                arr[index] = _arr[i];
                index++;
            }
        }
        return arr;
    }

    /**
     * 保存数据
     * @param key 
     * @param value 存储数据
     */
    static saveData(key, value) {
        let json = JSON.stringify(value);
        localStorage.setItem(key, json);
    }

    /**
     * 获取数据
     * @param key key值
     */
    static getData(key) {
        let text = localStorage.getItem(key)
        return JSON.parse(text);
    }

    /**
     * 移除数据
     * @param key 
     */
    static removeData(key) {
        localStorage.removeItem(key)
    }

    /**
     * 数组排列方式
     * @param array 传入需要排列字段 可多个 
     *@param  如["a"],["a","b"],默认从小到大排序
     * @param 需要从大到小则传入true
     *@param  如[["a",true]],[["a",true],["a",true]]
     */
    static sortFunc(array) {
        return (front, next) => {
            let count = 0;
            let length = Object.keys(array).length;
            for (let key in array) {
                count ++;
                let temp = array[key];
                let element = null;
                let tempSort = null
                if (typeof temp == "object") {
                    element = temp[0];
                    tempSort = temp[1];
                } else {
                    element = temp;
                }
                let frontValue = front[element] || 0;
                let nextValue = next[element] || 0;
                if(frontValue != nextValue||count == length){
                    if (tempSort) {
                        return nextValue - frontValue;
                    } else {
                        return frontValue - nextValue;
                    }
                }
            }
        }
    }

    /**
     * 数组去重
     * @param arr 数组 
     */
    static deduplication(arr: []): Array<any>[] {
        let newArr = new Set(arr);
        return Array.from(newArr);
    }

    /**
     * 扁平化去重(多层嵌套数组)如：[1,[2,2]]
     * @param arr 
     */
    static flattening(arr){
        return arr.reduce((pre, item)=>{
            return pre.concat(Array.isArray(item) ? this.flattening(item) : item);
        }, [])
    }
}



//12:00 集合
//12:00-3；00 过去
//3:00-4：00:卡丁车
//4-7:00 
//7：00以后烧烤