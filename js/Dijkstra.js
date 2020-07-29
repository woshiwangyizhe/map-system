function Dijkstra(matrix, start) {
	if(matrix && matrix.length == matrix[0].length && start < matrix.length) {
		let n = matrix.length; // 顶点个数
		let dis = new Array(); // start到各个顶点的最短距离
		let path = new Array(); // start到各个顶点的最短路径
		let visited = new Array(); // start到各个顶点的最短距离是否已求得
		for(let i = 0;i < n;i++) {
			visited[i] = false;
			path[i] = start + "->" + i;
		}
		dis[start] = 0; // start到自身的最短距离为0
		visited[start] = true;
		for(let i = 1;i < n;i++) {
			let min = Infinity; // 初始化最短距离
			let minIndex = -1; // 初始化距离start最短的顶点下标
			// 找出距离起点最近的点并设置为已访问
			for(let j = 0;j < n;j++) {
				if(!visited[j] && matrix[start][j] < min) {
					min = matrix[start][j];
					minIndex = j;
				}
			}
			dis[minIndex] = min;
			visited[minIndex] = true;
			// 松弛操作
			for(let k = 0;k < n;k++) {
				if(!visited[k] && matrix[start][minIndex] + matrix[minIndex][k] < matrix[start][k]) {
					matrix[start][k] = matrix[start][minIndex] + matrix[minIndex][k];
					path[k] = path[minIndex] + "->" + k;
				}
			}
		}
		return [dis, path];
	}
	else {
		throw new Error("邻接矩阵或起点有误！");
	}
}