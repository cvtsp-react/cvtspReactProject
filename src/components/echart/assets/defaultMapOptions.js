export default {
    tooltip: {
        trigger: 'item',
        formatter: '{b}'
    },
    series: [
        {
            name: '中国',
            type: 'map',
            mapType: 'china',
            selectedMode: 'multiple',
            left:'center',
            top:'30px',
            label: {
                normal: {
                    show: true
                },
                emphasis: {
                    show: true
                }
            },
            aspectScale:0.8,
             
            itemStyle: {
                normal: {
                    borderWidth: .5,//区域边框宽度
                    borderColor: '#000',//区域边框颜色
                    areaColor: "rgba(0,0,0,0.1)"//区域颜色
                },
                emphasis: {
                    borderWidth: .5,
                    borderColor: '#4b0082',
                    areaColor: "#135c9c",
                }
            },
            data: [
                 {name: '北京',value: 0 },
                 {name: '天津',value: 0 },
                 {name: '上海',value: 0 },
                 {name: '重庆',value: 0 },
                 {name: '河北',value: 0 },
                 {name: '河南',value: 0 },
                 {name: '云南',value: 0 },
                 {name: '辽宁',value: 0 },
                 {name: '黑龙江',value: 0 },
                 {name: '湖南',value: 0 },
                 {name: '安徽',value: 0 },
                 {name: '山东',value: 0 },
                 {name: '新疆',value: 0 },
                 {name: '江苏',value: 0 },
                 {name: '浙江',value: 0 },
                 {name: '江西',value: 0 },
                 {name: '湖北',value: 0 },
                 {name: '广西',value: 0 },
                 {name: '甘肃',value: 0 },
                 {name: '山西',value: 0 },
                 {name: '内蒙古',value: 0 },
                 {name: '陕西',value: 0 },
                 {name: '吉林',value: 0 },
                 {name: '福建',value: 0 },
                 {name: '贵州',value: 0 },
                 {name: '广东',value: 0 },
                 {name: '青海',value: 0 },
                 {name: '西藏',value: 0 },
                 {name: '四川',value: 0 },
                 {name: '宁夏',value: 0 },
                 {name: '海南',value: 0 },
                 {name: '台湾',value: 0 },
                 {name: '香港',value: 0 },
                 {name: '澳门',value: 0 },

            ]
        }
    ]
}