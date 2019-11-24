//正式环境
// var host = "http://124.160.167.142";
// var baseURL_SYSTEM = host + ":10011/system-server/";
// var baseURL_PEOPLE = host + ":10010/person-server/";


//测试环境
var host = "http://115.238.154.91";
var baseURL = host + ":8092/";

//接口管理
var Api = {
        Log: true,//全局console的开启和关闭
        uploadImg: baseURL + "file/local-upload",//文件上传接口
        login: {//登录
            in: baseURL + "login",//用户登录
        }
        , airPosition: {
            list: baseURL + "air-position/list",//站点列表查询
            add: baseURL + "air-position/add",//站点添加
            update: baseURL + "air-position/update"//站点信息修改
        },
        airDirty: {//污染源
            list: baseURL + "air-dirty/list",
            add: baseURL + "air-dirty/add",
            update: baseURL + "air-dirty/update"
        },
        data: {//实时数据
            info: baseURL + "data/query",//获取实时数据
        },
        indexEarlyWarning: {//指标预警
            list: baseURL + "report/report/early-warning",//指标预警列表
        },
        blueSky: {//蓝天数完成度
            data: baseURL + "report/blueday",//数据
        },
        siteRanking: {//站点排名
            data:baseURL+"report/position/ranking",//站点排名的数据
        },
        hour24:{//24小时数据轮流展示
            data:baseURL+"report/position/24hour",//24小时数据
        }


    }
;


window.Api = Api;

//全局console管理
console.log = (function (oriLogFunc) {
    return function () {
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
