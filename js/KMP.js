/**
 * KMP算法
 * @param {string} dest 主串
 * @param {string} pattern 模式串
 * @returns {boolean} 匹配为true，不匹配为false
 */
function KMP(dest, pattern) {
	// 根据模式串计算next数组
	let next = new Array(pattern.length); // next数组
	next[0] = -1;
	let i = 0;
	let j = -1;
	while(i < pattern.length) {
		if(j == -1 || pattern[i] == pattern[j]) {
			i++;
			j++;
			next[i] = j;
		}
		else {
			j = next[j];
		}
	}
	// KMP算法实现
	i = 0;
	j = 0;
	while(i < dest.length) {
		if(j == -1 || dest[i] == pattern[j]) {
			i++;
			j++;
		}
		else {
			j = next[j];
		}
		if(j == pattern.length) {
			return true;
		}
	}
	return false;
}