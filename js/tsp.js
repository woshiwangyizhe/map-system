// 根据路径和邻接矩阵计算回路总长度
function getDistance(matrix, path) {
	let dis = 0;
	let n = path.length;
	for(let i = 0;i < n;i++) {
		dis += matrix[path[i]][path[(i+1)%n]];
	}
	return dis;
}

function tsp(matrix, start, max_count) {
	/**
	 * 贪心算法求解tsp问题，获得一个局部最优解
	 */
	let path = []; // 存储最优路径
	let min_length = 0; // 存储最优路径的总长度
	let visited = []; // 用于标记景点是否已被访问
	// 初始化visited数组
	for(let i = 0;i < matrix.length;i++) {
		visited.push(false);
	}
	visited[start] = true; // 设置起点为已访问
	path.push(start);
	
	let cur = start; // 当前景点下标
	// 寻找与当前节点距离最近的点
	for(let i = 0;i < matrix.length;i++) {
		let min = Infinity; // 当前节点与离当前节点最近的点的距离
		let min_idx = -1; // 与当前节点距离最近的点的下标
		// 查找离当前节点最近的点
		for(let j = 0;j < matrix.length;j++) {
			if(!visited[j] && matrix[j][cur] < min && cur != j) {
				min = matrix[j][cur];
				min_idx = j;
			}
		}
		if(min_idx != -1) {
			visited[min_idx] = true; // 设置离当前节点最近的点为已访问
			path.push(min_idx); // 将离当前节点最近的点的下标加入路径中
			cur = min_idx; // 移动当前节点至离当前节点最近的点
			min_length += min; // 更新路径总长度
		}
	}
	min_length += matrix[cur][start];

	/**
	 * 利用贪心算法求得的结果通过2-opt算法继续求解tsp问题，获得更优解
	 */
	let path_copy = []; // 路径深拷贝，用于进行交换操作
	let count = 0;
	for(let count = 0;count <= max_count;count++) {
		// 均衡获取 0 到 matrix.length - 1 的随机整数
		let rand1 = Math.floor(Math.random()*matrix.length);
		let rand2 = Math.floor(Math.random()*matrix.length);

		for(let i = 0;i < path.length;i++) {
			path_copy[i] = path[i];
		}
		let length = 0;  // 初始化两个随机点之间的路径长度
		// 交换两个随机点之间的路径
		let i = Math.min(rand1,rand2);
		let j = Math.max(rand1,rand2);
		while(i < j) {
			let tmp = path_copy[i];
			path_copy[i] = path_copy[j];
			path_copy[j] = tmp;
			i++;
			j--;
		}
		// 求两个随机点之间的路径反转后的总路径长度
		for(let i = 0;i < matrix.length;i++) {
			length += matrix[path_copy[i]][(path_copy[(i+1)%matrix.length])];
		}
		// 若路径反转后的总路径长度小于局部最优解的路径长度，则更新局部最优解
		if(length < min_length) {
			for(let i = 0;i < path.length;i++) {
				path[i] = path_copy[i];
			}
			min_length = length;
		}
		if(count % 10000 == 0) {
			console.log("第" + count + "次迭代的最短路径长度为：" + getDistance(matrix, path), "路径为：" + path);
		}
	}
	console.log(getDistance(matrix, path));
	return [min_length, path];
}