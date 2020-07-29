function DFS(matrix, i, path, visited) {
	visited[i] = true; // 设置已访问
	path.push(i);
	for(let j = 0;j < matrix.length;j++) {
		if(matrix[i][j] != Infinity && !visited[j]) {
			DFS(matrix, j, path, visited);
		}
	}
}