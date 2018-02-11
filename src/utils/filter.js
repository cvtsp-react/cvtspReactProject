let filters = {};

// 默认情况下的填充内容
const slot = '--';

/**
 * 默认值
 * @param {*} val 
 */
filters.defaultValue = (val) => {
	if(!val || val == '' || isNaN(parseFloat(val))) return slot;
	return val;
}

/**
 * 是否在线和离线
 * @param {*} val 
 */
filters.isOnline = (val) => {
	switch(val) {
		case '1': return '在线';
		case '0': return '离线';
		default: return '离线';
	}
}

/**
 * 在线和离线的颜色过滤
 * @param {*} val 
 */
filters.onlineColor = (val) => {
	switch(val) {
		case '1': return '#67c23a';
		case '0': return '#878d99';
		default: return '#878d99';
	}
}

/**
 * 小数转换百分比(0.48 --> 48%)
 * @param {Decimals} point: (小数)
 */
filters.toPercent = (point) => {
	let str = Number(point * 100).toFixed(2);
	return str + '%';
}

/**
 * @param {any} target: 需要处理的值(待过滤的值)
 * @param {Functions} fnGroups: (fn1|fn2|fn3) 
 */
export default function(target, fnGroups){
	let i = 0,
		str = target,

		// methods分割([fn1, fn2, fn3])
		groups = fnGroups.split('|'),
		size = groups.length;
		iteration(groups);
	return str;

	function iteration(g){
		if(i > size -1 ) return;
		if(!filters[g[i]]) return console.warn(g[i] + ' is not exist in filters !!');
		str = filters[g[i]](str);
		i += 1;
		iteration(g);
	}
}
