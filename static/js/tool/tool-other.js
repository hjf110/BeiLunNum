//工具集合Tools

//region 工具集合
var param = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};

var ajaxSubmit = function (submitData, submitUrl, httpMethod, method) {
    var data;
    if (httpMethod != "GET") {
        data = JSON.stringify(submitData);
    } else {
        data = submitData;
    }
    jQuery.ajax({
        url: submitUrl,
        data: data,
        type: httpMethod,
        contentType: "application/json;charset=UTF-8",
        timeout: 1000000,
        async: true, //异步
        cache: false, //不缓存
        success: function (data) {
            if (data.code == "0") {
                method(data);
            } else {
                alert(data.msg);
            }
        },
        error: function () {
            alert("网络错误");
        }
    });
}

var postAjaxFile = function (submitData, submitUrl, method) {
    jQuery.ajax({
        url: submitUrl,
        data: submitData, //FormData对象
        type: "POST",
        timeout: 10000,
        processData: false, //是否对data序列化
        contentType: false,
        async: true, //异步
        cache: false, //不缓存
        success: function (data) {
            method(JSON.parse(data));
        },
        error: function () {
            alert("网络错误");
        }
    });
}

var locationSet = function (key, info) {
    localStorage.setItem(key, info);
}

var locationGet = function (key) {
    return localStorage.getItem(key);
}

var sessionGet = function (key) {
    return sessionStorage.getItem(key);
}

var sessionSet = function (key, info) {
    sessionStorage.setItem(key, info);
}

var jsonToObject = function (json) {
    return JSON.parse(json);
}

var objectToJson = function (Obj) {
    return JSON.stringify(Obj);
}

var popup = function (title, le, size, _confirm) {
    var index = layer.open({
        title: title,
        type: 1,
        content: le,
        shade: [0.01, '#393D49'],
        area: size,
        btn: ['取消', '确认'],
        btn2: function (index, layero) {
            _confirm();
            return false;
        }
    });
    return index;
}

var tips = function (data) {
    layer.msg(data);
}

//获取ajax返回的对象
var GetAjaxData = function (data) {

    return data;

}
//endregion


var timeStampToDateFormat = function (timestamp, fmt) {
    if (timestamp == null || timestamp == "null" || timestamp == undefined || timestamp == "undefined") {

        return "——";
    }

    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var o = {
        "y+": date.getFullYear(),    //年份
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;

}


//集合取交集
var intersect = function () {
    var result = new Array();
    var obj = {};
    for (var i = 0; i < arguments.length; i++) {
        for (var j = 0; j < arguments[i].length; j++) {
            var str = arguments[i][j];
            if (!obj[str]) {
                obj[str] = 1;
            }
            else {
                obj[str]++;
                if (obj[str] == arguments.length) {
                    result.push(str);
                }
            }//end else
        }//end for j
    }//end for i
    return result;
}

var nowTimeStamp = function () {

    return Math.ceil(new Date().getTime() / 1000)
}


var blobToBase64 = function (blob, callback) {
    var a = new FileReader();
    a.onload = function (e) {
        callback(e.target.result);
    }
    a.readAsDataURL(blob);
}


function base64ToBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type: mime});
}

var loading = function () {
    return layer.load(1, {
        shade: [0.1, '#fff'] //0.1透明度的白色背景
    });

}

var randomNumber = function () {
    var n = 5;
    var rnd = "";
    for (var i = 0; i < n; i++)
        rnd += Math.floor(Math.random() * 10);
    return nowTimeStamp().toString() + "" + rnd.toString();
}

var tool = {
    stringHelper: {
        randomNumber: randomNumber

    },
    loading: loading,
    base64Helper: {
        blobToBase64: blobToBase64,
        base64ToBlob: base64ToBlob
    },
    urlHelper: {
        getUrlParam: param
    },
    ajaxHelper: {
        ajaxSubmit: ajaxSubmit,
        postAjaxFile: postAjaxFile,
        getAjaxData: GetAjaxData
    },
    cacheHelper: {
        locationSet: locationSet,
        locationGet: locationGet,
        sessionGet: sessionGet,
        sessionSet: sessionSet,
    },
    jsonHelper: {
        jsonToObject: jsonToObject,
        objectToJson: objectToJson
    },
    popupHelper: {
        popup: popup,
        tips: tips
    },
    dataHelper: {
        timeStampToDateFormat: timeStampToDateFormat,
        dateFormatToTimeStamp: function (dateFormat) {
            return new Date(Date.parse(dateFormat.replace(/-/g, "/"))).getTime() / 1000;
        }
    },
    arrayHelper: {
        intersect: intersect
    },
    timeHelper: {
        nowTimeStamp: nowTimeStamp,
        todayStart: new Date(new Date().setHours(0, 0, 0, 0)) / 1000,
        todayEnd: new Date(new Date().setHours(23, 59, 59, 0)) / 1000
    }
}

window.Tool = tool;
window.Tool.GetWidth = function (num) {
    return $(window).width() * num + "px";
}

window.Tool.GetHeight = function (num) {
    return $(window).height() * num + "px";
}


