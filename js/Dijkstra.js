function Dijkstra(matrix, start) {
	console.time("Dijkstra算法的运行时间为");
	let n = matrix.length; // 顶点个数
	let dis = []; // start到各个顶点的最短距离
	let path = []; // start到各个顶点的最短路径
	let visited = []; // start到各个顶点的最短距离是否已求得
	let _matrix = []; // 邻接矩阵深拷贝
	for(let i = 0;i < n;i++) {
		visited[i] = false;
		path[i] = start + "->" + i;
		_matrix.push([]);
	}
	// 邻接矩阵深拷贝
	for(let i = 0;i < n;i++) {
		for(let j = i;j < n;j++) {
			_matrix[i][j] = _matrix[j][i] = matrix[i][j];
		}
	}
	dis[start] = 0; // start到自身的最短距离为0
	visited[start] = true;
	for(let i = 1;i < n;i++) {
		let min = Infinity; // 初始化最短距离
		let minIndex = -1; // 初始化距离start最短的顶点下标
		// 找出距离起点最近的点并设置为已访问
		for(let j = 0;j < n;j++) {
			if(!visited[j] && _matrix[start][j] < min) {
				min = _matrix[start][j];
				minIndex = j;
			}
		}
		dis[minIndex] = min;
		visited[minIndex] = true;
		// 松弛操作
		for(let k = 0;k < n;k++) {
			if(!visited[k] && _matrix[start][minIndex] + _matrix[minIndex][k] < _matrix[start][k]) {
				_matrix[start][k] = _matrix[start][minIndex] + _matrix[minIndex][k];
				path[k] = path[minIndex] + "->" + k;
			}
		}
	}
	console.timeEnd("Dijkstra算法的运行时间为");
	return [dis, path];
}

// let test = [];
// for(let i = 0;i < 500;i++) {
// 	test.push([]);
// }
// for(let i = 0;i < 500;i++) {
// 	for(let j = 0;j < 500;j++) {
// 		if(i == j) {
// 			test[i][j] = 0;
// 		}
// 		else {
// 			test[i][j] = Math.ceil(Math.random()*100);
// 		}
// 	}
// }
// for(let i = 0;i < 10;i++) {
// 	Dijkstra(test, 0);
// }
