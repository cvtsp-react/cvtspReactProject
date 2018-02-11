
// 是否是浏览器环境还是服务器环境
const isServer = typeof window === 'undefined';

const requestFrame = (function() {
    if(isServer) return;

    const raf = window.requestAnimationFrame || window.mozRequestAnimation || window.webkitRequestAnimationFrame ||
    function (fn) {
        return window.setTimeout(fn, 20);
    }

    return function(fn) {
        return raf(fn);
    }
})();

const cancelFrame = (function() {
    if(isServer) return;

    const cancel = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame ||
    window.cleaerTimeout;

    return function(id) {
        return cancel(id);
    }
})();

const attachEvent = isServer ? {} : document.attachEvent;
const DOM_PREFIXES = 'Webkit Moz O Ms'.split(' ');
const START_EVENTS = 'webkitAnimationStart animationstart oAnimationStart MZAnimationStart'.split(' ');
const RESET_ANIMATION_NAME = 'resizeanimation';
let animation = false;
let keyFramePrefix = '';
let animationStartEvent = 'animationstart';

// 高级浏览器下
if(!attachEvent && !isServer) {
    const testElement = document.createElement('fakeelement');
    if(testElement.style.animationName !== undefined) {
        animation = true;
    }

    if(animation == false) {
        let prefix = '';
        for(var i = 0; i < DOM_PREFIXES.length; i++) {
            if(testElement.style[DOM_PREFIXES[i] + 'AnimationName'] !== undefined) {
                prefix = DOM_PREFIXES[i];
                // -webkit-; -o-; -moz-; 
                keyFramePrefix = '-' + prefix.toLowerCase() + '-';
                animationStartEvent = START_EVENTS[i];
                animation = true;
                break;
            }
        }
    }
}

let stylesCreated = false;
const createStyles = function() {
    if(!stylesCreated && !isServer) {
        // @-webkit-keyframes name {}
        const animationKeyframes = `@${keyFramePrefix}keyframes ${RESET_ANIMATION_NAME} {from {opacity: 0} to {opacity: 0}}`;
    }
}
git branch
/**
 * 添加监听元素尺寸变化事件
 * @param {Element} element 
 * @param {Function} fn 
 */
export const addResizeListener = function(element, fn) {
    if(isServer) return;
    // ie下存在监听元素的变化事件
    if(attachEvent) {
        elemetn.attachEvent('onresize', fn);
    } else {
        if(!element.__resizeTrigger__) {
            if(getComputedStyle(element).position === 'static') {
                element.position = 'relative';
            }

        }
    }

}