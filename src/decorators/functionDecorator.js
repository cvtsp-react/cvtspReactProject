import React from 'react'
import { Component } from '@/components'
import { Browser } from 'utils'

export default (WrappedComponent) => {
    return class Hoc extends Component {
        constructor(props) {
            super(props);
        }
        render() {
            // 公共方法名
            const publicMethods = {
                asyncDownloadScript: this.asyncDownloadScript.bind(this)
            }

            return (
                <WrappedComponent {...this.props} publicMethods={publicMethods} />
            )
        }
        
		/**
         * 异步加载cdn脚本文件
         * @param {String} name: 全局变量唯一性
         * @param {Url} cdn:  远程url地址
         */
        asyncDownloadScript(name = "wukangjun", cdn) {
            if (!global[name]) {
                global[name] = {};

                global[name]._preloader = new Promise((resolve, reject) => {
                    // 创建script 插入body
                    const $script = document.createElement('script');
                    $script.src = cdn;
                    global.document.body.appendChild($script);

                    // 是否是ie环境下(ie11目前不算是ie了)
                    if (Browser.IS_IE && Browser.IE_VERSION < 11) {
                        $script.onreadystatechange = function () {
                            if ($script.readyState === 'loaded' || $script.readyState === 'complete') {
                                resolve();
                                global[name]._preloader = null;
                            }
                        }
                    } else {
                        $script.onload = function () {
                            resolve();
                            global[name]._preloader = null;
                        }
                    }
                });
                return global[name]._preloader;
            } else if (!global[name]._preloader) {
                return Promise.resolve();
            } else {
                return global[name]._preloader;
            }
        }
    }
}
