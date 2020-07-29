/**
 * @param {list} array 数组
 * @param {number} capacity 容量
 * @param {function} compare 比较函数
 */
// 二叉堆构造函数
function MinBinaryHeap() {
	this.array = [];
}

MinBinaryHeap.prototype = {
	// 构造函数
	constructor: MinBinaryHeap,
	// 增加元素
	add: function(e) {
		this.array.push(e);
		this.siftUp(this.array.length - 1);
	},
	// 减少元素
	extractMin: function() {
		let e = this.array.shift();
		if(this.isEmpty()) {
			return null;
		}
		let last = this.array.pop();
		this.array.unshift(last);
		this.siftDown(0);
		return e;
	},
	// 获取节点i的父节点
	parent: function(i) {
		return (i - 1) / 2 | 0;
	},
	// 获取节点i的左儿子
	left: function(i) {
		return 2 * i + 1;
	},
	// 获取节点i的右儿子
	right: function(i) {
		return 2 * i + 2;
	},
	// 获取二叉堆顶元素
	top: function() {
		return this.array[0];
	},
	// 判断二叉堆是否为空
	isEmpty: function() {
		return this.size == 0;
	},
	// 根据数组元素的索引进行交换
	swap: function(i, j) {
		let tmp = this.array[i];
		this.array[i] = this.array[j];
		this.array[j] = this.tmp;
	},
	// 元素上浮
	siftUp: function(i) {
		if(i == 0) {
			return;
		}
		let parentIdx = this.parent(i);
		if(this.array[i] > this.array[parentIdx]) {
			this.swap(i, parentIdx);
			this.siftUp(parentIdx);
		}
	},
	// 元素下沉
	siftDown: function(i) {
		let leftChild = this.left(i);
		let rightChild = this.right(i);
		let minChild = leftChild;
		if(leftChild >= this.array.length) {
			return;
		}
		if(rightChild < this.array.length && this.array[rightChild] > this.array[leftChild]) {
			minChild = rightChild;
		}
		if(this.array[i] > this.array[minChild]) {
			return;
		}
		this.swap(i, minChild);
		this.siftDown(minChild);
	}
}

function PriorityQueue() {
	this.data = new MinBinaryHeap();
}

PriorityQueue.prototype = {
	constructor: PriorityQueue,
	getSize: function() {
		return this.data.length;
	},
	getFront: function() {
		return this.data.top();
	},
	enqueue: function(e) {
		this.data.add(e);
	},
	dequeue: function() {
		return this.data.extractMin();
	},
	isEmpty: function() {
		return this.data.isEmpty();
	}
}