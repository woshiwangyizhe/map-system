function knapsack(weight, value, capacity) {
	let dp = [];
	let ispush = [];
	// 初始化dp数组
	for(let i = 0;i <= weight.length;i++) {
		dp[i] = []
		for(let j = 0;j <= capacity;j++) {
			dp[i][j] = 0;
		}
	}
	// 动态规划 状态转移方程：dp[i+1][j] = Max(dp[i][j], dp[i][j-weight[i]] + value[i]
	for(let i = 0;i < weight.length;i++) {
		ispush[i] = false;
		for(let j = 0;j <= capacity;j++) {
			if(j < weight[i]) {
				dp[i+1][j] = dp[i][j];
			}
			else {
				dp[i+1][j] = Math.max(dp[i][j], dp[i][j-weight[i]] + value[i]);
			}
		}
	}
	// 回溯查找背包装入的物品
	let c = capacity;
	for(let i = weight.length;i > 0;i--) {
		if(dp[i][c] == dp[i-1][c-weight[i-1]] + value[i-1]) {
			ispush[i] = true;
			c -= weight[i-1];
		}
		else {
			ispush[i] = false;
		}
	}
	ispush.splice(0,1); // 去掉首元素后为所有景点的游玩情况
	return [dp, ispush];
}