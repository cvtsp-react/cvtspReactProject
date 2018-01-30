const filterGroups = {
	// 默认值
	defaultValue(val){
		// 不存在or空字符or不是数字
		if(!val || val == '' || isNaN(parseFloat(val))){
			return '--';
		}
		return val;
	},
	isOnline(str){
		switch(str){
			case '1': return '在线';
			case '0': return '离线';
			default: return '离线';
		}
	},
	onlineColor(str){
		switch(str){
			case '1': return '#67c23a';
			case '0': return '#878d99';
			default: return '#878d99';
		}
	},
	// 数字转化百分比
	toPercent(point){
		let str = Number(point * 100).toFixed(2);
		return str + '%';
	}
};

export default function(target, fnGroups){
	let i = 0,
		str = target,
		groups = fnGroups.split('|'),
		size = groups.length;
		iteration(groups);
	return str;

	function iteration(g){
		if(i > size -1 ) return;
		str = filterGroups[g[i]](str);
		i += 1;
		iteration(g);
	}
}
