﻿//正式环境
// var host = "http://124.160.167.142";
// var baseURL_SYSTEM = host + ":10011/system-server/";
// var baseURL_PEOPLE = host + ":10010/person-server/";







//测试环境
// var host = "http://112.14.32.62";


//正式环境
var host = "http://blyjsb.jfbrother.com";





var baseURL = host + ":9012/";

//接口管理
var Api = {
    Log: false, //全局console的开启和关闭
    typeList:baseURL +"jfV5blyjsb/api/data_list"

};


window.Api = Api;

//全局console管理
console.log = (function(oriLogFunc) {
    return function() {
        //判断配置文件是否开启日志调试
        if (Api.Log) {
            try {
                oriLogFunc.call(console, ...arguments);
            } catch (e) {
                console.error('console.log error', e);
            }
        }
    }
})(console.log);


// layui.config({
//     base: '../js/layuiadmin/' //静态资源所在路径
// }).extend({
//     notice: 'notice'//第三方通知插件
// });