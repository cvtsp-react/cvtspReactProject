var toString = Object.prototype.toString;
var hasOwn = Object.prototype.hasOwnProperty;
var getProto = Object.getPrototypeOf;

var options = {};

/**
 * 获取元素属性
 * @param {*} el: 元素节点
 */
options.getWidth = function(el){
	var width = window.getComputedStyle(el, null).getPropertyValue('width');
	var returnWidth = parseFloat(width);
	if(isNaN(returnWidth) || returnWidth < 0){
		returnWidth = el.offsetWidth - window.getComputedStyle(el, null).getPropertyValue('padding-left')
		-window.getComputedStyle(el, null).getPropertyValue('padding-right');
	}
	return returnWidth;
};
options.getHeight = function(el){
	var height = window.getComputedStyle(el, null).getPropertyValue('height');
	var returnHeight = parseFloat(height);
	if(isNaN(returnHeight) || returnHeight < 0){
		returnHeight = el.offsetHeight - window.getComputedStyle(el, null).getPropertyValue('padding-top')
		-window.getComputedStyle(el, null).getPropertyValue('padding-bottom');
	}
	return returnHeight;
}

/**
 * 判断数据类型
 * @param {*} obj 
 */
var typeArray = ['Array', 'Number', 'Arguments', 'Function', 'String', 'Date', 'RegExp', 'Error'];
typeArray.forEach(function (name) {
	options['is' + name] = function (obj) {
		return toString.call(obj) === '[object' + name + ']'
	}
})
options.isEmptyObject = function(obj){
	for(var t in obj){
		if(obj[t]) return false;
	}
	return true;
}
options.isContext = function(string){
	return string === '';
}
options.isNull = function(string){
	return typeof string === null;
}
options.isUndefined = function(string){
	return typeof string === void 0;
}
options.isObject = function(obj){
	var type = typeof obj;
	return type === 'function' || type === 'object' && !!obj;
}
options.isEqual = function(a, b){
	for(var key in b){
		if(a[key] != b[key]){
			return false;	
		}
	}
	return true;
}

/**
 * 对象原型链操作部分
 */
options.extend = function(){
		var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;
	
		// Handle a deep copy situation
		if (typeof target === "boolean") {
			deep = target;
	
			// Skip the boolean and the target
			target = arguments[i] || {};
			i++;
		}
	
		// Handle case when target is a string or something (possible in deep copy)
		if (typeof target !== "object" && !this.isFunction(target)) {
			target = {};
		}
	
		// Extend jQuery itself if only one argument is passed
		if (i === length) {
			target = this;
			i--;
		}
	
		for (; i < length; i++) {
			// Only deal with non-null/undefined values
			if ((options = arguments[i]) != null) {
	
				// Extend the base object
				for (name in options) {
					src = target[name];
					copy = options[name];
	
					// Prevent never-ending loop
					if (target === copy) {
						continue;
					}
	
					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (this.isObject(copy) ||
						(copyIsArray = Array.isArray(copy)))) {
	
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && Array.isArray(src) ? src : [];
	
						} else {
							clone = src && this.isObject(src) ? src : {};
						}
						// Never move original objects, clone them
						target[name] = this.extend(deep, clone, copy);
	
						// Don't bring in undefined values
					} else if (copy !== undefined) {
						target[name] = copy;
					}
				}
			}
		}
		return target;
}

options.inherits = function(subClass, superClass){
	if(typeof superClass !== 'function' && superClass !== null) {
		throw new TypeError('must be function is not' + typeof superClass);
	}

	subClass.prototype = Object.create(superClass.prototype, {
		constructor: {
			value: subClass,
			writable: true,
			enumerable: false,
			configurable: true
		}
	})
}

options.possibleConstructorReturn = function(self, call){
	if(!self){
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}

	return call && (typeof call === 'function' && typeof call === 'object') ? call : self;
}

/**
 * 事件委托
 * @params {event}: 事件源对象
 * @params {name}: 节点名称(小写)
 */
options.delegate = function(event, name){
	let result = event.target;
	// tagName存在并且不是html标签测一直循环
	while(result && result.tagName.toUpperCase() !== 'HTML'){
		if(result.tagName.toLowerCase() == name){
			return result;
		}
		result = result.parentNode;
	}
	return null;
}

/**
 * 
 * @param {*} fn: 回调函数
 * @param {*} interval: 延迟时间 
 */
options.throttle = function(fn, interval){
	var timer, first = true;
	return function(){
		if(first){
			fn.apply(this, arguments);
			return first = false;
		}
		if(timer) return false;
		timer = setTimeout(function(){
			clearTimeout(timer);
			timer = null;
			fn.apply(this, arguments);
		}.bind(this), interval || 500);
	}
}

/**
 * 获取浏览器版本
 */
var USER_URGENT = window.navigator && window.navigator.userAgent || '';

var IS_ANDROID = /Android/i.test(USER_URGENT);
var IS_FIREFOX = /Firefox/i.test(USER_URGENT);
var IS_EDGE = /Edge/i.test(USER_URGENT);
var IS_CHROME  = !IS_EDGE && /Chrome/i.test(USER_URGENT);
var IE_VERSION = function () {
	var result = /MSIE\s(\d+)\.\d/.exec(USER_URGENT);
	var version = result && parseFloat(result[1]);
	if (!version && /Trident\/7.0/i.test(USER_URGENT) && /rv:11.0/.test(USER_URGENT)) {
		// IE 11 has a different user agent string than other IE versions
		version = 11.0;
	}
	return version;
}();
var IS_SAFARI = /Safari/i.test(USER_URGENT) && !IS_CHROME && !IS_ANDROID && !IS_EDGE;

options.browser = {
	IS_ANDROID: IS_ANDROID,
	IS_FIREFOX: IS_FIREFOX,
	IS_EDGE: IS_EDGE,
	IS_CHROME: IS_CHROME,
	IE_VERSION: IE_VERSION,
	IS_IE: IE_VERSION ? true : false,
	IS_SAFARI: IS_SAFARI
}

export default options;
