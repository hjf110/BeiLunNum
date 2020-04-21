const table = layui.table;
const layer = layui.layer;
let vm = new Vue({
    el: "#app",
    data() {
        return {
            keyWord: "", //关键字
            infoList: [],
            layerIndex: "",
            ispc: true,
            clickType: "Whqyxx", //点击按钮的类型 (默认为危化企业)
            infoData: [],
            realTime: {
                is: false, //是否实时显示
                time: 5, //实时刷新时间(单位为秒)
                Interval: "", //定时器索引
            },
            nowdataType: "o3",
            showOption: {
                isRightShow: false,
                isRightShow2: true,
                isLeftShow: true,
                isLeftShow2: false
            },
            setting: {
                dianWeiShow: true,
                isShowCz: true,
                dirtyClick: false, //显示污染源是否点击
                addDirty: false,
                updateDirty: false,
                clickType: 108, //点击了右边哪个按钮
                colorType: true
            },
            dirtyForm: {
                id: "" //id
            },
            pop: {
                layuiIdx: "",
                siteAnalysis: false, //站点分析的显示与隐藏
                dirty: false, //污染源管理的显示与影藏
                clearDw: false, //点位管理的显示与隐藏

            },
            //点位与地图信息----------------------
            map: "",
            marker: new Array(),
            infoWindow: new Array(),
            point: new Array(),
            myIcon: new Array(),
            label: new Array(),
            info: [], //所有点位的经纬度信息

            marker2: new Array(),
            infoWindow2: new Array(),
            point2: new Array(),
            myIcon2: new Array(),
            info2: [], //所有点位的经纬度信息
            //-------------------------------------


            //图表参数----------------------
            echartsSetting: {
                zdfxOption: [{
                        xAxis: {
                            type: 'category',
                            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [{
                            data: [820, 932, 901, 934, 1290, 1330, 1320],
                            type: 'line'
                        }]
                    },
                    {
                        xAxis: {
                            type: 'category',
                            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [{
                            data: [820, 932, 901, 934, 1290, 1330, 1320],
                            type: 'line'
                        }]
                    },
                    {
                        xAxis: {
                            type: 'category',
                            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [{
                            data: [820, 932, 901, 934, 1290, 1330, 1320],
                            type: 'line'
                        }]
                    },
                    {
                        xAxis: {
                            type: 'category',
                            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [{
                            data: [820, 932, 901, 934, 1290, 1330, 1320],
                            type: 'line'
                        }]
                    },
                    {
                        xAxis: {
                            type: 'category',
                            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [{
                            data: [820, 932, 901, 934, 1290, 1330, 1320],
                            type: 'line'
                        }]
                    },
                    {
                        xAxis: {
                            type: 'category',
                            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [{
                            data: [820, 932, 901, 934, 1290, 1330, 1320],
                            type: 'line'
                        }]
                    },
                    {
                        xAxis: {
                            type: 'category',
                            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [{
                            data: [820, 932, 901, 934, 1290, 1330, 1320],
                            type: 'line'
                        }]
                    },
                    {
                        xAxis: {
                            type: 'category',
                            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [{
                            data: [820, 932, 901, 934, 1290, 1330, 1320],
                            type: 'line'
                        }]
                    },
                    {
                        xAxis: {
                            type: 'category',
                            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [{
                            data: [820, 932, 901, 934, 1290, 1330, 1320],
                            type: 'line'
                        }]
                    },
                    {
                        xAxis: {
                            type: 'category',
                            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [{
                            data: [820, 932, 901, 934, 1290, 1330, 1320],
                            type: 'line'
                        }]
                    }
                ]
            },
            //-----------------------------

            //指标预警-----------------------------
            indexEarlyWarning: {
                show: false, //是否显示弹出层
                list: [], //指标预警列表
            },
            //蓝天完成数---------------------------------------
            blueSky: {
                show: false, //是否显示蓝天数弹窗
                data: { //数据
                    complete: 0, //完成值
                    completerate: 0, //完成率
                    distance: 0, //距离目标
                    predicate: 0, //预计值
                    predicaterate: 0, //预计完成率
                    step: 0, //阶段目标值
                    steperate: 0, //阶段完成率
                    total: 0, //总目标值
                }
            },
            //站点排名------------------------------------------
            siteRanking: {
                selectOption: [
                    { name: "24小時", val: 1 },
                    { name: "24小時", val: 2 },
                ],
                show: false, //站点排名的显示与隐藏
                type: "1", //站点排名的查询条件
                data: [], //数据
            },
            //多站对比----------------------------------------------
            siteComparison: {
                show: false,
                dataOption: {}
            },
            //24小时轮播-----------------------------------------------
            hour24: {
                show: true,
                percentage: 0,
                customColor: '#409eff',
                customColors: [
                    { color: '#f56c6c', percentage: 20 },
                    { color: '#e6a23c', percentage: 40 },
                    { color: '#5cb87a', percentage: 60 },
                    { color: '#1989fa', percentage: 80 },
                    { color: '#6f7ad3', percentage: 100 }
                ]
            }
        }
    },
    methods: { //方法
        //截取数字 num代表要截取的数字  type代表要截取几位数
        cutOutNum(num) {
            let list = (num + "").split("."); //根据点拆分成数组
            if (list[1]) { //说明有小数点后面的数
                let a = "";
                if (list[0].length == 3) { //说明是三位数
                    a = list[0];
                } else if (list[0].length == 2) { //说明是两位数,截取小数点后一位
                    a = list[0];
                    let b = ".";
                    $.each(list[1].split(''), (idx, obj) => {
                        if (idx == 0) {
                            b = b + obj + "";
                        }
                    });
                    a = a + b + "";

                } else if (list[0].length == 1) { //说明是一位数,截取小数点后两位
                    a = list[0];
                    let b = ".";
                    $.each(list[1].split(''), (idx, obj) => {
                        if (idx >= 0 && idx <= 1) {
                            b = b + obj + "";
                        }
                    });
                    a = a + b + "";
                }

                return a;
            } else {
                return list[0];
            }
        },
        //判断AQI颜色值
        panDuanColor(num) {
            let a;
            if (num >= 0 && num <= 50) {
                a = "../../static/img/p1.png";
            } else if (num > 50 && num <= 100) {
                a = "../../static/img/p2.png";
            } else if (num > 100 && num <= 150) {
                a = "../../static/img/p3.png";
            } else if (num > 150 && num <= 200) {
                a = "../../static/img/p4.png";
            } else if (num > 200 && num <= 300) {
                a = "../../static/img/p5.png";
            } else if (num > 300) {
                a = "../../static/img/p6.png";
            }
            return a;
        },
        // 根据经纬度获取标记点的索引值
        getPointIndexByLatAndLng(lat, lng, list) {
            let a;
            $.each(list, (idx, obj) => {
                if (obj.lat == lat && obj.lng == lng) {
                    a = idx;
                }
            });
            return a;
        },
        // 根据设备id获取标记点的索引值
        getPointIndexByUnionid(unionid) {
            let _this = this;
            let a;
            console.log("unionid-----", unionid);
            $.each(_this.info, (idx, obj) => {
                console.log(obj);
                if (obj.unionid == unionid) {
                    a = idx;
                }
            });
            console.log("得到的索引为-----", a);
            return a;
        },
        showAndHideUi(type) {
            this.setting.isShowCz = type;
            this.showAndHideLeft(type);
            this.showAndHideRight(type);
            this.showOption.isRightShow2 = false;
            this.showOption.isLeftShow2 = false;
        },
        showAndHideLeft(type) {
            let _this = this;
            console.log(type);
            if (type) { //显示
                // console.log(111);
                _this.showOption.isLeftShow = true;
                _this.showOption.isLeftShow2 = false;
            } else if (type == false) {
                _this.showOption.isLeftShow = false;
                _this.showOption.isLeftShow2 = true;
                // console.log( _this.showOption.isLeftShow2);
            }
        },
        showAndHideRight(type) {
            let _this = this;
            console.log(type);
            if (type) { //显示
                // console.log(111);
                _this.showOption.isRightShow = true;
                _this.showOption.isRightShow2 = false;
            } else if (type == false) {
                _this.showOption.isRightShow = false;
                _this.showOption.isRightShow2 = true;
                // console.log( _this.showOption.isLeftShow2);
            }
        },
        panduan(n1, n2) {
            let a = (parseInt(n1) / parseInt(n2) * 100).toFixed(0);
            // console.log("----------+++++++",a);
            let b = "";
            if (a >= 90 && a <= 100) {
                b = "c1";
            } else if (a >= 80 && a < 90) {
                b = "c2";
            } else if (a >= 70 && a < 80) {
                b = "c3";
            } else if (a >= 60 && a < 70) {
                b = "c4";
            } else if (a >= 50 && a < 60) {
                b = "c5";
            } else if (a >= 40 && a < 50) {
                b = "c6";
            } else if (a >= 30 && a < 40) {
                b = "c7";
            } else if (a >= 20 && a < 30) {
                b = "c8";
            } else {
                b = "c9";
            }


            var cnt = document.getElementById("count");
            var water = document.getElementById("water");
            water.style.transform = 'translate(0' + ',' + (100 - a) + '%)';


            $(".r_c").addClass(b);
            // $(".r_c").addClass(b);
            $(".r_c").animate({
                height: a + "%"
            }, 1000);

        },
        changeDate(num) {
            let s = num + "";
            let newNum;
            let a = s.split(".")[0];
            let b = s.split(".")[1];
            // console.log();
            if (b) { //有小数点
                newNum = s.substring(0, s.indexOf(".") + 2);
            } else { //没有小数点
                newNum = s;
            }
            // let newNum =Math.round(parseInt(num)*100)/100;
            console.log("131------,,,", newNum);
        },
        getBoundary(map_search) {
            const _this = this;
            var bdary = new BMap.Boundary();
            bdary.get("宁波市北仑区", function(rs) { //获取行政区域
                map_search.clearOverlays(); //清除地图覆盖物
                var count = rs.boundaries.length; //行政区域的点有多少个
                if (count === 0) {
                    alert('未能获取当前输入行政区域');
                    return;
                }
                var pointArray = [];
                for (var i = 0; i < count; i++) {
                    var ply = new BMap.Polygon(rs.boundaries[i], {
                        strokeWeight: 4,
                        strokeColor: "#fa1306",
                        fillColor: "#0852c2",
                        fillOpacity: 0.1
                    }); //建立多边形覆盖物
                    map_search.addOverlay(ply); //添加覆盖物
                    pointArray = pointArray.concat(ply.getPath());
                }
                map_search.setViewport(pointArray); //调整视野，根据提供的地理区域或坐标设置地图视野，调整后的视野会保证包含提供的地理区域或坐标
                _this.addLabel(true); //添加文本标记
            });

            console.log("--------------");
        },
        //刷新污染源点位信息
        pushDirtyPoint() {
            if (this.setting.dirtyClick) { //如果页面上原来是显示污染源的就刷新一下污染源的信息
                this.showDirtyPoint(false); //清空
                this.showDirtyPoint(true); //刷新
            }
        },
        // 显示与去掉污染源
        showDirtyPoint(isShow) {
            const _this = this;
            let map_search = this.map;
            if (isShow) {
                this.setting.dirtyClick = true;
                //------------------参数定义
                _this.marker2 = {};
                _this.infoWindow2 = {};
                _this.point2 = {};
                _this.myIcon2 = {};
                _this.info2 = [];


                ajaxSubmit({ limit: 500, page: 1 }, Api.airDirty.list, "post", res => {
                    console.log("获得的值---", res);
                    // 循环标记站点
                    $.each(res.data, (idx, obj) => {
                        _this.point2[idx] = new window.BMap.Point(obj.lon, obj.lat); //存入坐标
                        _this.myIcon2[idx] = new BMap.Icon("../../static/img/w2.png", new BMap.Size(65, 45), {
                            anchor: new BMap.Size(30, 45),
                            imageSize: new BMap.Size(65, 45)
                        }); //引用点图标文件
                        _this.marker2[idx] = new BMap.Marker(_this.point2[idx], { icon: _this.myIcon2[idx] }); // 创建标注，为要查询的地方对应的经纬度
                        //_this.label[idx] = new BMap.Label("23", {offset: new BMap.Size(10, 0)}); //创建点文字组件,文字内容和位置
                        _this.infoWindow2[idx] = new BMap.InfoWindow('<p style="text-align:center;font-weight:bolder;color:red;">无污染源名称:' + obj.name + '</p>');
                        _this.info2.push({ lat: obj.lat, lng: obj.lon });

                        map_search.addOverlay(_this.marker2[idx]); //加入坐标点
                        _this.marker2[idx].setAnimation(BMAP_ANIMATION_BOUNCE);
                        setTimeout(() => {
                            _this.marker2[idx].setAnimation(null);
                        }, 1000);


                        // //设置点文字组件统一样式
                        // _this.label[idx].setStyle({
                        //     color: "black",
                        //     fontSize: "16px",
                        //     height: "30px",
                        //     lineHeight: "30px",
                        //     fontWeight: "bolder",
                        //     fontFamily: "微软雅黑",
                        //     padding: "5px",
                        //     backgroundColor: "none",
                        //     opacity: "1",
                        //     border: "none"
                        //     //backgroundColor: "rgba(0, 0, 0, 0.4)";
                        // });
                        //_this.marker[idx].setLabel(_this.label[idx]); //将文字组添加到点坐标中

                        _this.marker2[idx].addEventListener("click", function() {
                            map_search.enableScrollWheelZoom();
                            _this.marker2[idx].openInfoWindow(_this.infoWindow2[idx]);
                        });


                    });
                    map_search.enableScrollWheelZoom(); //启用滚轮放大缩小，默认禁用
                    map_search.enableContinuousZoom(); //启用地图惯性拖拽，默认禁用
                    //限制显示区域
                    var b = new BMap.Bounds(new BMap.Point(121.324514, 29.865837), new BMap.Point(121.693034, 30.076832));
                    try {
                        BMapLib.AreaRestriction.setBounds(map_search, b);
                    } catch (e) {
                        alert(e);
                    }

                }, err => {

                });

            } else {
                this.setting.dirtyClick = false;
                var allOverlay = map_search.getOverlays();
                // console.log(allOverlay);
                $.each(this.marker2, (idx, obj) => {
                    // console.log(obj);
                    $.each(allOverlay, (_idx, _obj) => {
                        // console.log(_obj);
                        if (_obj.point) {
                            if (_obj.point.lat === obj.point.lat && _obj.point.lng === obj.point.lng) {
                                map_search.removeOverlay(_obj);
                            }
                        }
                    })
                })

            }

        },
        //刷新站点信息
        pushClearPoint() {
            this.addLabel(false);
            this.addLabel(true);
        },
        closeAndOpen(type) {
            let _this = this;
            console.log(1212121212121);
            if (type) { //打開
                _this.layerIndex = layer.open({
                    type: 1,
                    area: ['15%', '100%'],
                    offset: 'r',
                    title: false,
                    anim: 1,
                    shade: 0,
                    closeBtn: 0,
                    content: $('#nameInfo'), //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
                    end: function(index, layero) {

                    }
                });
            } else { //关闭
                layer.close(_this.layerIndex);
            }
        },
        // 转换坐标
        zbChange(lngStr, latStr) {
            let lng;
            let lat;
            if (lngStr && latStr) {
                if (lngStr.indexOf("E") >= 0) {
                    lng = lngStr.replace("E", "");
                    lat = latStr.replace("N", "");
                } else {
                    lng = lngStr;
                    lat = latStr;
                }
                lng = Number(lng.substring(-1, lng.indexOf("°"))) + Number(lng.substring(lng.indexOf("°") + 1, lng.indexOf("′"))) / 60 + Number(lng.substring(lng.indexOf("′") + 1, lng.indexOf("″"))) / 3600;
                lat = Number(lat.substring(-1, lat.indexOf("°"))) + Number(lat.substring(lat.indexOf("°") + 1, lat.indexOf("′"))) / 60 + Number(lat.substring(lat.indexOf("′") + 1, lat.indexOf("″"))) / 3600;
                // console.log("1-----------------------------------", lng, "-----", lat);

            } else {
                lng = 0;
                lat = 0
            }
           console.log(lngStr,"+++++++",lng,"-----",lat,"-------------")
            return [lng, lat]
        },
        getIcon() {
            let cc = this.clickType;
            let a;
            if (cc == "Whqyxx") {
                a = "../../static/img/img_1.png";
            } else if (cc == "Bzazcs") {
                a = "../../static/img/img_4.png";
            } else if (cc == "Dzzhxx") {
                a = "../../static/img/img_8.png";
            } else if (cc == "Bwdxxp") {
                a = "../../static/img/img_7.png";
            } else if (cc == "Jydwxx") {
                a = "../../static/img/img_6.png";
            } else if (cc == "Slfhsj") {
                a = "../../static/img/img_5.png";
            }
            return a;
        },
        toClickType(type, e, idx) {
            $(".menu_blue_right").removeClass().addClass("menu_yellow_right");
            this.setting.clickType = idx;
            e.target.className = "menu_blue_right";
            this.clickType = type;
            //先刷新站点
            this.pushClearPoint();
        },
        thisMarker(idx) {
            let _this = this;
            console.log(idx);
            let point = _this.marker[idx].point;
            console.log(point);
            console.log(_this.marker[idx]);

            _this.map.centerAndZoom(new BMap.Point(point.lng, point.lat), 12); //将点选的坐标设为中心
            setTimeout(() => {
                _this.map.centerAndZoom(new BMap.Point(point.lng, point.lat), 40); //放大坐标点
            }, 1000);
            // setTimeout(() => {
            //     _this.map.centerAndZoom(new BMap.Point(point.lng, point.lat), 12); //视图复位
            // }, 20000);

            // var geolocation = new BMap.Geolocation();
            // geolocation.getCurrentPosition(function(r){
            //     if(this.getStatus() == BMAP_STATUS_SUCCESS){
            //         // var mk = new BMap.Marker(r.point);
            //         // map.addOverlay(mk);
            //         // map.panTo(r.point);
            //         alert('您的位置：'+r.point.lng+','+r.point.lat);


            //         let driving = new BMap.DrivingRoute(  _this.map, {
            //             renderOptions: {
            //                 map:   _this.map,
            //                 autoViewport: true
            //             }
            //         });
            //         let start = new BMap.Point(r.point.lng, r.point.lat);
            //         let end = new BMap.Point(point.lng,point.lat);
            //         driving.search(start, end);








            //     }
            //     else {
            //         alert('failed'+this.getStatus());
            //     }
            // },{enableHighAccuracy: true})

            $.each(_this.marker, (idx, obj) => {
                obj.setAnimation(null);
            });

            _this.marker[idx].setAnimation(BMAP_ANIMATION_BOUNCE);
            setTimeout(() => {
                _this.marker[idx].setAnimation(null);
            }, 20000);

        },
        //显示与去掉站点
        addLabel(isShow) {
            const _this = this;
            let map_search = this.map;
            //------------------参数定义
            // var marker = _this.marker; //标记数组
            // var infoWindow = _this.infoWindow; //标记内容窗口数组
            // var point = _this.point; //标记坐标数组
            // var myIcon = _this.myIcon; //标记图标数组
            // var label = _this.label; //标记文字显示数组

            if (isShow) {
                _this.map.setZoom(11);
                _this.setting.dianWeiShow = false;
                _this.marker = {};
                _this.infoWindow = {};
                _this.point = {};
                _this.myIcon = {};
                _this.label = {};
                _this.info = [];
                ajaxSubmit({ pageSize: 10000, pageNo: 1 }, Api.typeList + _this.clickType, "get", res => {
                    console.log("获得的值---", res);

                    _this.infoData = [];
                    _this.infoData = res.rows;
                    _this.infoList = [];
                    // 循环标记站点
                    $.each(res.rows, (idx, obj) => {
                        let aa = "";
                        let bb = "";
                        let cccc = _this.clickType;
                        if (cccc == "Whqyxx") {
                            aa = coordtransform.wgs84togcj02(obj.WZJD, obj.WZWD);
                            bb = coordtransform.gcj02tobd09(aa[0], aa[1]);
                        } else if (cccc == "Bzazcs") {
                            let dd = _this.zbChange(obj.JD, obj.WD);
                            aa = coordtransform.wgs84togcj02(dd[0], dd[1]);
                            bb = coordtransform.gcj02tobd09(aa[0], aa[1]);
                        } else if (cccc == "Bwdxxp" || cccc == "Dzzhxx") {
                            let dd = _this.zbChange(obj.DJ, obj.BW);
                            aa = coordtransform.wgs84togcj02(dd[0], dd[1]);
                            bb = coordtransform.gcj02tobd09(aa[0], aa[1]);
                        } else if (cccc == "Slfhsj") {
                            aa = coordtransform.wgs84togcj02(obj.JD, obj.WD);
                            bb = coordtransform.gcj02tobd09(aa[0], aa[1]);
                        } else if (cccc == "Jydwxx") {
                            aa = coordtransform.wgs84togcj02(obj.WD, obj.JD);
                            bb = coordtransform.gcj02tobd09(aa[0], aa[1]);
                        }



                        switch (cccc) {
                            case "Whqyxx":
                                _this.infoList.push({ name: obj.QYJC, index: idx });
                                break;
                            case "Bzazcs":
                                _this.infoList.push({ name: obj.BZAZCS, index: idx });
                                break;
                            case "Bwdxxp":
                                _this.infoList.push({ name: obj.WZ, index: idx });
                                break;
                            case "Dzzhxx":
                                _this.infoList.push({ name: obj.WZ, index: idx });
                                break;
                            case "Slfhsj":
                                _this.infoList.push({ name: obj.MC, index: idx });
                                break;
                            case "Jydwxx":
                                _this.infoList.push({ name: obj.DWMC, index: idx });
                                break;
                            default:
                                break;
                        }

                        console.log(aa);
                        console.log(bb);
                        // console.log(data);
                        _this.point[idx] = new window.BMap.Point(bb[0], bb[1]); //存入坐标
                        let iconGet = _this.getIcon()
                        _this.myIcon[idx] = new BMap.Icon(iconGet, new BMap.Size(30, 40), {
                            anchor: new BMap.Size(13, 42),
                            imageSize: new BMap.Size(30, 40)
                        }); //引用点图标文件
                        _this.marker[idx] = new BMap.Marker(_this.point[idx], { icon: _this.myIcon[idx] }); // 创建标注，为要查询的地方对应的经纬度
                        // _this.label[idx] = new BMap.Label(obj.name, { offset: new BMap.Size(-12, 0) }); //创建点文字组件,文字内容和位置
                        let opts = {
                            title: obj.name, // 信息窗口标题
                            enableMessage: false, //设置允许信息窗发送短息
                            message: ""
                        }

                        _this.infoWindow[idx] = new BMap.InfoWindow(' ', opts);
                        _this.info.push({ unionid: obj.unionid, lat: obj.lat, lng: obj.lon });

                        map_search.addOverlay(_this.marker[idx]); //加入坐标点

                        _this.marker[idx].setAnimation(BMAP_ANIMATION_DROP);

                        setTimeout(() => {
                            // _this.marker[idx].setAnimation(null);
                        }, 1000);

                        //设置点文字组件统一样式
                        // _this.label[idx].setStyle({
                        //     marginTop: "5px",
                        //     marginLeft: "50px",
                        //     width: "200px",
                        //     color: "white",
                        //     fontSize: "10px",
                        //     height: "12px",
                        //     lineHeight: "12px",
                        //     fontWeight: "bolder",
                        //     fontFamily: "arial",
                        //     padding: "5px",
                        //     backgroundColor: "black",
                        //     opacity: "0.6",
                        //     border: "none",
                        //     textAlign: "center"
                        //     //backgroundColor: "rgba(0, 0, 0, 0.4)";
                        // });
                        //_this.marker[idx].setLabel(_this.label[idx]); //将文字组添加到点坐标中

                        _this.marker[idx].addEventListener("click", function() {
                            // map_search.enableScrollWheelZoom();
                            // _this.marker[idx].openInfoWindow(_this.infoWindow[idx]);
                            console.log(_this.infoData[idx].PC_URL);
                            // if (_this.clickType == "Whqyxx") {
                            if (_this.ispc) {
                                layer.open({
                                    type: 2,
                                    title: '信息',
                                    shadeClose: true,
                                    shade: 0.8,
                                    area: ['90%', '90%'],
                                    content: _this.infoData[idx].PC_URL
                                });
                            } else {
                                layer.open({
                                    type: 2,
                                    title: '信息',
                                    shadeClose: true,
                                    shade: 0.8,
                                    area: ['90%', '90%'],
                                    content: _this.infoData[idx].MO_URL
                                });
                            }


                            // }

                        });

                    });

                    // _this.getNowData("o3");


                    map_search.enableScrollWheelZoom(); //启用滚轮放大缩小，默认禁用
                    map_search.enableContinuousZoom(); //启用地图惯性拖拽，默认禁用

                }, err => {

                });
            } else {
                _this.setting.dianWeiShow = true;
                var allOverlay = map_search.getOverlays();
                // console.log(allOverlay);
                $.each(_this.marker, (idx, obj) => {
                    // console.log(obj);
                    $.each(allOverlay, (_idx, _obj) => {
                        // console.log(_obj);
                        if (_obj.point) {
                            if (_obj.point.lat === obj.point.lat && _obj.point.lng === obj.point.lng) {
                                map_search.removeOverlay(_obj);
                            }
                        }
                    })
                })

            }


        },
        //获取实时数据
        getNowData() {
            let _this = this;
            let type = _this.nowdataType;
            ajaxSubmit({ type: type }, Api.data.info, "get", res => {
                console.log("获取的实时数据-=-=-=-", res.data);
                $.each(res.data, (idx, obj) => {
                    let _idx = _this.getPointIndexByUnionid(obj.mn);
                    console.log("索引是-----=-=-=-=--==--=-", _idx);
                    if (_idx !== undefined) {
                        if (type == "o3" || type == "pm25") {
                            console.log("进入了-----------------------------------------");
                            _this.label[_idx].setContent(_this.cutOutNum(obj[type].value));
                            console.log(_this.myIcon[_idx]);
                            _this.myIcon[_idx].setImageUrl(_this.panDuanColor(obj[type].i));
                            _this.marker[_idx].setIcon(_this.myIcon[_idx]);
                            console.log(_this.myIcon[_idx]);
                        } else {
                            _this.myIcon[_idx].setImageUrl(_this.panDuanColor(1));
                            _this.marker[_idx].setIcon(_this.myIcon[_idx]);
                            _this.label[_idx].setContent(_this.cutOutNum(obj[type]));
                        }
                    }
                });
            }, err => {
                _this.$message.error(err);
            })
        },
        setLabelContent(idx) { //设置点上的值
            idx = 0;
            console.log(this.label[0]);
            this.label[2].setContent(44);
        },
        mouseIn2(e, type) {
            e.target.className = "menu_blue_right";

        },
        mouseOut2(e, type) {
            if (type != this.setting.clickType) {
                e.target.className = "menu_yellow_right";
            }
        },
        mouseIn(e, type) {
            e.target.className = "menu_blue";

        },
        mouseOut(e, type) {
            e.target.className = "menu_yellow";
        },
        getData(e, type, idx) { //显示相应的值
            // this.setting.colorType = true;
            this.setting.clickType = idx;
            $(".menu_blue_right").removeClass().addClass("menu_yellow_right");
            e.target.className = "menu_blue_right";

            console.log(this.label);

            this.nowdataType = type;
            this.getNowData();


        },
        //鼠标在地图上的点击回调
        getMapClick(e) {
            // this.pop.layuiIdx.close();
            // console.log(e);
            console.log("纬度--", e.point.lat);
            console.log("经度--", e.point.lng);
            const _this = this;

            //如果是添加污染源信息
            if (this.setting.addDirty) {
                this.$prompt('请输入污染源名称', '添加污染源', {
                    confirmButtonText: '确定添加',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    ajaxSubmit({ lat: e.point.lat, lon: e.point.lng, name: value }, Api.airDirty.add, "post", res => {
                        _this.$message.closeAll();
                        _this.$message.success("添加成功");
                        _this.pop.dirty = true;
                        table.reload('dirtyTable');
                        _this.setting.addDirty = false;
                        // _this.showAndHideUi(true);
                        _this.pushDirtyPoint(); //刷新污染源

                    }, err => {
                        _this.setting.addDirty = false;
                        // _this.showAndHideUi(true);
                        _this.pop.dirty = true;
                        _this.$message.success(err);
                    });

                }).catch(() => {
                    // _this.showAndHideUi(true);
                    this.pop.dirty = true;
                    this.setting.addDirty = false;
                    _this.$message.closeAll();
                });
            }
            //如果是更新污染源信息
            if (this.setting.updateDirty) {
                this.$confirm('确认将此污染源定位到这里吗', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    ajaxSubmit({
                        id: _this.dirtyForm.id,
                        lat: e.point.lat,
                        lon: e.point.lng
                    }, Api.airDirty.update, "post", res => {
                        _this.$message.closeAll();
                        _this.$message.success("重新定位成功");
                        _this.pop.dirty = true;
                        table.reload('dirtyTable');
                        _this.setting.updateDirty = false;
                        // _this.showAndHideUi(true);
                        _this.pushDirtyPoint(); //刷新污染源
                        //setTimeout(()=>{ _this.$message.closeAll();},1000);

                    }, err => {
                        _this.setting.updateDirty = false;
                        // _this.showAndHideUi(true);
                        _this.pop.dirty = true;
                        _this.$message.success(err);
                    });


                }).catch(() => {
                    // _this.showAndHideUi(true);
                    this.pop.dirty = true;
                    this.setting.updateDirty = false;
                    _this.$message.closeAll();
                });


            }


        },
        //*显示与隐藏污染源管理-----------
        dirtyGL(type) {
            const _this = this;
            //隐藏定位
            this.addLabel(false);
            //显示污染源的点位
            this.showDirtyPoint(false);
            this.showDirtyPoint(true);
            this.showAndHideUi(false); //隐藏ui

            this.pop.dirty = true;


            layer.open({
                type: 1,
                area: ['30%', '100%'],
                offset: 'r',
                anim: 1,
                shade: 0,
                content: $('#dirty'), //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
                end: function(index, layero) {
                    _this.hideDirtyGL();
                }
            });


            // console.log(this.pop.dirty);
            //  第一个实例
            setTimeout(() => {
                table.render({
                    elem: '#dirtyTable',
                    height: 800,
                    url: Api.airDirty.list //数据接口
                        ,
                    method: "post",
                    page: true //开启分页
                        ,
                    cols: [
                        [ //表头
                            { title: '序号', type: "numbers" }, {
                                field: 'id',
                                title: 'ID',
                                sort: true,
                                hide: true
                            }, { field: 'lat', title: '纬度' }, { field: 'lon', title: '经度' }, {
                                field: 'name',
                                title: '污染源名称',
                                edit: 'text'
                            }, { fixed: 'right', width: 150, align: 'center', toolbar: '#barDemo' }
                        ]
                    ],
                    toolbar: "#toolbar"
                });
            }, 100);


        },
        hideDirtyGL() {
            console.log(1111111111111111111111111111111111111);
            this.showAndHideUi(true); //显示ui
            this.pop.dirty = false;
            //显示点位
            this.addLabel(false);
            this.addLabel(true);
            //影藏污染源的点位
            this.showDirtyPoint(false);
        },
        //*----------------------------
        //*显示与隐藏点位管理-------------
        dwGL() {
            let _this = this;
            //显示点位
            this.showDirtyPoint(false);
            this.addLabel(false);
            this.addLabel(true);
            //显示污染源的点位
            this.showAndHideUi(false); //隐藏ui
            this.pop.clearDw = true;


            layer.open({
                type: 1,
                area: ['30%', '100%'],
                offset: 'r',
                anim: 1,
                shade: 0,
                content: $('#clearDw'), //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
                end: function(index, layero) {
                    _this.hideDwGL();
                }
            });


            // console.log(this.pop.dirty);
            //  第一个实例
            setTimeout(() => {
                table.render({
                    elem: '#clearDwTable',
                    height: 800,
                    url: Api.airPosition.list //数据接口
                        ,
                    method: "post",
                    page: true //开启分页
                        ,
                    cols: [
                        [ //表头
                            { title: '序号', type: "numbers" }, {
                                field: 'id',
                                title: 'ID',
                                sort: true,
                                hide: true
                            }, { field: 'unionid', title: '设备id' }, { field: 'lat', title: '纬度' }, { field: 'lon', title: '经度' }
                            //, {fixed: 'right', width: 150, align: 'center', toolbar: '#barDemo'}
                        ]
                    ],
                    //  toolbar: "#toolbar"
                });
            }, 100);
        },
        hideDwGL() {
            console.log(1111111111111111111111111111111111111);
            this.showAndHideUi(true); //显示ui
            this.pop.clearDw = false;
            //显示点位
            this.addLabel(false);
            this.addLabel(true);
            //影藏污染源的点位
            this.showDirtyPoint(false);
        },
        //*----------------------------
        //显示站点分析图表
        siteAnalysisShow() {
            this.pop.siteAnalysis = true;
            setTimeout(() => {
                $.each(this.echartsSetting.zdfxOption, (idx, obj) => {
                    let myChart = echarts.init(document.getElementById('ech' + idx));
                    myChart.setOption(obj);
                });
            }, 1000);


        },
        /**
         * 是否开启实时刷新
         * @param type (true开启,false关闭)
         */
        realTimeClick(type) {
            let _this = this;
            _this.realTime.is = type;
            if (type) { //打开定时器
                _this.realTime.Interval = setInterval(() => {
                    _this.getNowData();
                }, _this.realTime.time * 1000);
            } else { //关闭定时器
                clearInterval(_this.realTime.Interval)
            }
        },

        //显示指标预警
        showIndexEarlyWarning() {
            let _this = this;
            this.indexEarlyWarning.show = true; //显示弹窗
            ajaxSubmit({}, Api.indexEarlyWarning.list, "get", res => {
                console.log(res);
                _this.indexEarlyWarning.list = res.data; //赋值数据
            }, err => {
                _this.$message.error(err);
            })
        },
        //获取蓝天数完成度的数据
        getBlueSkyData() {
            let _this = this;
            ajaxSubmit({}, Api.blueSky.data, "get", res => {
                _this.blueSky.data = res.data; //赋值蓝天数数据
                _this.panduan(res.data.complete, res.data.total); //赋值蓝天数血瓶显示
            }, err => {});
        },
        //获取站点排名的数据-------------------
        getSiteRankingData() {
            let _this = this;
            ajaxSubmit({ timetype: _this.siteRanking.type }, Api.siteRanking.data, "get", res => {
                console.log(res);
                _this.siteRanking.data = res.data;
            }, err => {
                _this.$message.error(err);
            });
        },
        showSiteRanking() {
            this.siteRanking.show = true;
            this.getSiteRankingData();

        },
        //24小时轮播-------------------------------------
        hour24_Show() {
            this.hour24.show = false;
            this.getHour24Data();
        },
        getHour24Data() {
            let _this = this;
            ajaxSubmit({}, Api.hour24.data, "get", res => {
                console.log(res);
                let data = res.data;
                $.each(_this.info, (idx, obj) => {
                    if (data[obj.unionid + '']) {
                        console.log("24小时的值---", data[obj.unionid + ''][_this.nowdataType + '']);
                        let data24 = data[obj.unionid + ''][_this.nowdataType + '']; //24小时的值
                        $.each(data24, (_idx, _obj) => {
                            setTimeout(() => {
                                console.log("执行--------------------------", _obj.avg);
                                _this.label[_this.getPointIndexByUnionid(obj.unionid)].setContent(_this.cutOutNum(_obj.avg));
                            }, (_idx + 1) * 1000)
                        });
                    }
                });

                let c = 0;
                let index = setInterval(() => {
                    if (c < 24) {
                        console.log("----------------++----", c);
                        c++;
                        _this.hour24.percentage = _this.hour24.percentage + 4.16666;
                    } else {
                        _this.pushClearPoint();
                        _this.hour24.percentage = 0;
                        _this.hour24.show = true;
                        clearInterval(index);
                    }
                }, 1000);


            }, err => {})
        }


    },
    watch: {
        "siteRanking.type"(newVal, oldVal) {
            this.getSiteRankingData();
        },
        "blueSky.show"(newVal, oldVal) {
            this.showAndHideUi(!newVal);
        },
        "showOption.isRightShow"(newVal, oldVal) {
            console.log('进入了------------------------',newVal);
            // this.showAndHideUi(!newVal);
            this.closeAndOpen(newVal)
        }
    },
    // 定义计算属性选项
    computed: {
        // 过滤出不同状态数据
        filterItems() {

            let reg = new RegExp(this.keyWord);

            if (this.keyWord) {
                return this.infoList.filter(item => item.name.match(reg))
            } else {
                return this.infoList
            }


        }

    },
    mounted() {
        const _this = this;
        // _this.closeAndOpen(true);
        var map_search = new BMap.Map("container_search", {
            mapType: BMAP_NORMAL_MAP,
            // minZoom: 12,
            // maxZoom: 30,
            enableMapClick: false
        });

        var mapType1 = new BMap.MapTypeControl({
            mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP, BMAP_SATELLITE_MAP],
            anchor: BMAP_ANCHOR_TOP_LEFT
        });
        map_search.addControl(mapType1);

        this.map = map_search;
        map_search.enableScrollWheelZoom(); //启用滚轮放大缩小，默认禁用
        map_search.enableContinuousZoom(); //启用地图惯性拖拽，默认禁用
        //设置地图中心
        // map_search.centerAndZoom(new BMap.Point(121.56168, 29.893093), 5);
        // var b = new BMap.Bounds(new BMap.Point(121.630954, 29.695737), new BMap.Point(122.200228, 30.017797));
        // try {
        //     BMapLib.AreaRestriction.setBounds(map_search, b);
        // } catch (e) {
        //     alert(e);
        // }


        //监听地图点击事件
        map_search.addEventListener("click", this.getMapClick);

        setTimeout(function() {
            _this.getBoundary(map_search);
        }, 100);


        //判断是否为pc端
        _this.ispc = IsPC();





        //污染源管理模块------------------------------------------------------------------------


        //_this.changeDate(num);
        //监听事件头工具点击事件
        table.on('toolbar(dirtyTable)', function(obj) {
            var checkStatus = table.checkStatus(obj.config.id);
            switch (obj.event) {
                case 'add':
                    _this.pop.dirty = false;
                    _this.setting.addDirty = true;
                    _this.showAndHideUi(false);
                    // _this.pop.layuiIdx=layer.msg('请在地图上鼠标左键选择污染源',{time:0,icon:0,offset: 't'});
                    _this.pop.layuiIdx = _this.$message({
                        message: '请在地图上鼠标左键选择污染源',
                        type: 'warning',
                        duration: 0
                    });
                    break;
            }
        });

        //监听单元格编辑事件
        table.on('edit(dirtyTable)', function(obj) { //注：edit是固定事件名，test是table原始容器的属性 lay-filter="对应的值"
            console.log(obj.value); //得到修改后的值
            console.log(obj.data); //得到修改后的值
            // console.log(obj.data); //得到修改后的值
            _this.$confirm('是否更改此污染源名称', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {

                ajaxSubmit({ id: obj.data.id, name: obj.value }, Api.airDirty.update, "post", res => {
                    _this.$message.success("污染源名称修改成功");
                    table.reload('dirtyTable');
                }, err => {
                    _this.$message.success(err);
                });

            }).catch(() => {

            });

        });

        //监听工具条
        table.on('tool(dirtyTable)', function(obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
            var data = obj.data; //获得当前行数据
            var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
            var tr = obj.tr; //获得当前行 tr 的 DOM 对象（如果有的话）
            console.log(obj.data);

            if (layEvent === 'detail') { //查看

                _this.pop.dirty = false;
                _this.setting.updateDirty = true;
                _this.showAndHideUi(false);
                // _this.pop.layuiIdx=layer.msg('请在地图上鼠标左键选择污染源',{time:0,icon:0,offset: 't'});
                _this.pop.layuiIdx = _this.$message({
                    message: '请在地图上鼠标左键重新选择污染源',
                    type: 'warning',
                    duration: 0
                });


                //do somehing
                _this.dirtyForm.id = obj.data.id;
                _this.setting.updateDirty = true;
            }
        });


        //监听行单击事件
        table.on('row(dirtyTable)', function(obj) {
            // console.log(obj.tr); //得到当前行元素对象
            // console.log(obj.data) ;//得到当前行数据
            //obj.del(); //删除当前行
            //obj.update(fields) //修改当前行数据
            let val = obj.data;
            let idx = _this.getPointIndexByLatAndLng(val.lat, val.lon, _this.info2);
            // 清空所有弹跳动画
            $.each(_this.marker2, (idx, obj) => {
                obj.setAnimation(null);
            });

            //为该标记点添加弹跳动画
            _this.marker2[idx].setAnimation(BMAP_ANIMATION_BOUNCE);
            setTimeout(() => {
                _this.marker2[idx].setAnimation(null);
            }, 3000);
        });

        //点位管理模块------------------------------------------------------------------------

        //监听行单击事件
        table.on('row(clearDwTable)', function(obj) {
            // console.log(obj.tr); //得到当前行元素对象
            // console.log(obj.data) ;//得到当前行数据
            //obj.del(); //删除当前行
            //obj.update(fields) //修改当前行数据
            let val = obj.data;
            let idx = _this.getPointIndexByLatAndLng(val.lat, val.lon, _this.info);
            // 清空所有弹跳动画
            $.each(_this.marker, (idx, obj) => {
                obj.setAnimation(null);
            });

            //为该标记点添加弹跳动画
            _this.marker[idx].setAnimation(BMAP_ANIMATION_BOUNCE);
            setTimeout(() => {
                _this.marker[idx].setAnimation(null);
            }, 3000);
        });


        //获取蓝天数数据
        // _this.getBlueSkyData();


        //监听按键
        document.onkeydown = function(e) {
            let _key = window.event.keyCode;
            // console.log(_key);
            if (_key === 27) { //按下了ESC健
                // _this.login(1);
                if (_this.setting.addDirty || _this.setting.updateDirty) { //污染源管理的添加和更新
                    _this.setting.addDirty = false; //重置状态
                    _this.setting.updateDirty = false; //重置状态
                    // _this.showAndHideUi(true);//显示ui
                    //显示污染源管理的数据表格
                    setTimeout(() => {
                        _this.pop.dirty = true;
                    }, 300);

                }


            }
        }

        //console.log(_this.zbChange("E121°50′55.98″", "N29°54′53.56″"));;
    },
});
