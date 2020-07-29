function levenstein(s, t) {
	// 字符串短的在前，长的在后
	if(s.length > t.length) {
		let tmp = s;
		s = t;
		t = tmp;
	}
	// 当某一个字符串为空时，编辑距离为另一个字符串的长度
	if(s.length == 0) {
		return t.length;
	}
	if(t.length == 0) {
		return s.length;
	}
	// 初始化向量v0
	let v0 = [];
	for(let i = 0;i <= t.length;i++) {
		v0[i] = i;
	}
	let v1 = new Array(s.length + 1);
	let cost = 0;
	// 计算填表
	for(let i = 1;i <= s.length;i++) {
		if(i > 1) {
			v0 = v1.slice(0);
		}
		v1[0] = i;
		for(let j = 1;j <= t.length;j++) {
			if(s[i-1] == t[j-1]) {
				cost = 0;
			}
			else {
				cost = 1;
			}
			v1[j] = Math.min.call(null, v1[j - 1] + 1, v0[j - 1] + cost);
		}
	}
	return v1.pop();
}