var size; // 固定已经排好的元素

// 交换两个元素
function swap(arr, i, j) {
	let tmp = arr[i];
	arr[i] = arr[j];
	arr[j] = tmp;
}

// 堆排序
function heapSort(arr, key) {
	buildMinHeap(arr, key); // 构造最小堆
	size = arr.length;
	while(size > 1) {
		swap(arr, 0, --size);
		heapify(arr, 0, size, key);
	}
	return arr;
}

// 构造最小堆
function buildMinHeap(arr, key) {
	for(let i = 0;i < arr.length;i++) {
		let curIdx = i; // 当前插入的下标
		let parentIdx = parseInt((curIdx - 1) / 2); // 父节点下标（去掉小数取整）
		// console.log(parentIdx);
		
		/*
		如果当前插入的值小于其父节点的值，则交换，并且当前下标指向父节点，
		继续和上面的父节点比较，直到不小于父节点
		*/
		while(arr[curIdx][key] < arr[parentIdx][key]) {
			swap(arr, curIdx, parentIdx); // 交换当前节点与父节点
			curIdx = parentIdx; // 当前节点下标指向父节点下标
			parentIdx = parseInt((curIdx - 1) / 2); // 重新计算当前节点的父节点下标
		}
	}
	// console.log(arr);
}

// 将除了固定好的数以外的剩余数构造成最小堆
function heapify(arr, idx, size, key) {
	let left = 2 * idx + 1;
	let right = 2 * idx + 2;
	while(left < size) {
		let minIdx;
		// 取值较小的孩子节点的索引
		if(arr[left][key] > arr[right][key] && right < size) {
			minIdx = right;
		}
		else {
			minIdx = left;
		}
		// 比较父节点与选出的孩子节点的大小，确定最小值的下标
		if(arr[idx][key] < arr[minIdx][key]) {
			minIdx = idx;
		}
		// 如果父节点的下标是最小值的下标，则最小堆构建完成，退出循环
		if(idx == minIdx) {
			break;
		}
		
		swap(arr, minIdx, idx); // 父节点不是最小值，则与较小值的孩子节点交换
		idx = minIdx; // 将下标指向较小值的孩子节点的下标
		// 重新计算交换后孩子节点的下标
		left = 2 * idx + 1;
		right = 2 * idx + 2;
	}
}