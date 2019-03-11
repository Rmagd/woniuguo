var api = require("../../../../api.js"), QQMapWX = require("../../../../qqmap-wx.js"), app = getApp(), demo = new QQMapWX({
    key: "EXZBZ-HMSWP-HLCDB-VQUP6-JLTS7-ZCB3Z"
});

Page({
    data: {
        imgurl: app.imgurl,
        order: {},
        polyline: [ {
            points: [],
            color: "#0299de",
            width: 5,
            dottedLine: !1,
            arrowLine: !0
        } ],
        lat: "",
        lng: "",
        markers: [],
        avatar: "",
        distance: 0
    },
    getPolyline: function(t, e, r) {
        console.log(t, e);
        var a = t.lat + "," + t.lng + "&to=" + e.lat + "," + e.lng;
        wx.request({
            url: "https://apis.map.qq.com/ws/direction/v1/bicycling/?from=" + a + "&key=EXZBZ-HMSWP-HLCDB-VQUP6-JLTS7-ZCB3Z",
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                console.log(t);
                for (var e = t.data.result.routes[0].polyline, a = 2; a < e.length; a++) e[a] = e[a - 2] + e[a] / 1e6;
                for (var n = [], o = 0; o < e.length; o += 2) n[n.length] = {
                    longitude: e[o + 1],
                    latitude: e[o]
                };
                r(n);
            },
            fail: function() {}
        });
    },
    get_distance: function(t, e, a) {
        demo.calculateDistance({
            from: {
                latitude: t.lat,
                longitude: t.lng
            },
            to: [ {
                latitude: e.lat,
                longitude: e.lng
            } ],
            success: function(t) {
                console.log(t.result.elements[0].distance), a({
                    distance: t.result
                });
            },
            fail: function(t) {
                a(t);
            },
            complete: function(t) {
                console.log(t);
            }
        });
    },
    get_polyline: function() {
        var a = this, t = wx.getStorageSync("current_order");
        this.getPolyline(t.start_adds_location, t.target_adds_location, function(t) {
            console.log(t);
            var e = a.data.polyline;
            e[0].points = t, a.setData({
                polyline: e
            }), console.log(a.data.polyline, "+++++++++++++4156415+++++++++++++++++");
        });
    },
    controltap: function(t) {
        console.log(t.controlId);
    },
    send_handler: function() {
        app.request({
            url: api.runner_order.isService,
            data: {
                oid: this.data.order.id
            },
            success: function(t) {
                console.log(t), 1 == t.code ? (wx.showToast({
                    title: t.msg
                }), wx.redirectTo({
                    url: "../index/index"
                })) : 0 == t.code && wx.showToast({
                    title: "信息发送失败，请重新发送"
                });
            }
        });
    },
    callPhone: function(t) {
        wx.makePhoneCall({
            phoneNumber: t.currentTarget.dataset.phone
        });
    },
    get_address_LatLntHandler: function() {
        var e = this;
        this.getLatLntHandler(function(t) {
            e.setData({
                lat: t.latitude,
                lng: t.longitude
            });
        });
    },
    getLatLntHandler: function(e) {
        var a = null, n = null, o = null, r = null;
        wx.getLocation({
            type: "gcj02",
            success: function(t) {
                a = t.latitude, n = t.longitude, o = t.speed, r = t.accuracy;
                t.latitude, t.longitude;
                e({
                    latitude: a,
                    longitude: n,
                    speed: o,
                    accuracy: r
                });
            },
            fail: function() {},
            complete: function() {}
        });
    },
    curry_order: function() {
        app.request({
            url: api.order.orderDun,
            method: "POST",
            data: {
                oid: wx.getStorageSync("current_order").id
            },
            success: function(t) {
                console.log(t), 1 === t.code ? wx.showToast({
                    title: "催单成功",
                    icon: "none"
                }) : wx.showToast({
                    title: t.msg,
                    icon: "none"
                });
            },
            fail: function() {}
        });
    },
    delete_order: function() {
        app.request({
            url: api.order.orderDel,
            method: "POST",
            data: {
                oid: wx.getStorageSync("current_order").id
            },
            success: function(t) {
                console.log(t), 1 === t.code ? wx.showToast({
                    title: "取消成功",
                    success: function() {
                        wx.redirectTo({
                            url: "../order-list/index"
                        });
                    }
                }) : wx.showToast({
                    title: t.msg,
                    icon: "none"
                });
            },
            fail: function() {}
        });
    },
    onShow: function() {
        var e = this;
        this.get_address_LatLntHandler(), this.setData({
            order: wx.getStorageSync("current_order"),
            avatar: wx.getStorageSync("user").avatar_url,
            phone: wx.getStorageSync("index").phone
        });
        var t = wx.getStorageSync("current_order");
        5 === t.class_id || 3 === t.class_id || 6 === t.class_id ? this.setData({
            markers: [ {
                iconPath: e.data.imgurl + "target_icon.png",
                id: 0,
                latitude: wx.getStorageSync("current_order").target_adds_location.lat,
                longitude: wx.getStorageSync("current_order").target_adds_location.lng,
                width: 14,
                height: 24
            }, {
                iconPath: e.data.imgurl + "fw_address.png",
                id: 1,
                latitude: wx.getStorageSync("current_order").target_adds_location.lat,
                longitude: wx.getStorageSync("current_order").target_adds_location.lng,
                width: 75,
                height: 22
            } ]
        }) : 1 == t.class_id ? (this.get_polyline(), this.setData({
            markers: [ {
                iconPath: e.data.imgurl + "start_icon.png",
                id: 0,
                latitude: wx.getStorageSync("current_order").start_adds_location.lat,
                longitude: wx.getStorageSync("current_order").start_adds_location.lng,
                width: 14,
                height: 24
            }, {
                iconPath: e.data.imgurl + "start_icons.png",
                id: 1,
                latitude: wx.getStorageSync("current_order").start_adds_location.lat,
                longitude: wx.getStorageSync("current_order").start_adds_location.lng,
                width: 75,
                height: 22
            }, {
                iconPath: e.data.imgurl + "target_icon.png",
                id: 2,
                latitude: wx.getStorageSync("current_order").target_adds_location.lat,
                longitude: wx.getStorageSync("current_order").target_adds_location.lng,
                width: 14,
                height: 24
            }, {
                iconPath: e.data.imgurl + "end_icons.png",
                id: 3,
                latitude: wx.getStorageSync("current_order").target_adds_location.lat,
                longitude: wx.getStorageSync("current_order").target_adds_location.lng,
                width: 75,
                height: 22
            } ]
        })) : 2 == t.class_id ? (this.get_polyline(), this.setData({
            markers: [ {
                iconPath: e.data.imgurl + "start_icon.png",
                id: 0,
                latitude: wx.getStorageSync("current_order").start_adds_location.lat,
                longitude: wx.getStorageSync("current_order").start_adds_location.lng,
                width: 14,
                height: 24
            }, {
                iconPath: e.data.imgurl + "start_location.png",
                id: 1,
                latitude: wx.getStorageSync("current_order").start_adds_location.lat,
                longitude: wx.getStorageSync("current_order").start_adds_location.lng,
                width: 75,
                height: 22
            }, {
                iconPath: e.data.imgurl + "target_icon.png",
                id: 2,
                latitude: wx.getStorageSync("current_order").target_adds_location.lat,
                longitude: wx.getStorageSync("current_order").target_adds_location.lng,
                width: 14,
                height: 24
            }, {
                iconPath: e.data.imgurl + "end_icons.png",
                id: 3,
                latitude: wx.getStorageSync("current_order").target_adds_location.lat,
                longitude: wx.getStorageSync("current_order").target_adds_location.lng,
                width: 75,
                height: 22
            } ]
        })) : 4 == t.class_id ? (this.get_polyline(), console.log("这是一个小车型"), this.setData({
            markers: [ {
                iconPath: e.data.imgurl + "start_icon.png",
                id: 0,
                latitude: wx.getStorageSync("current_order").start_adds_location.lat,
                longitude: wx.getStorageSync("current_order").start_adds_location.lng,
                width: 14,
                height: 24
            }, {
                iconPath: e.data.imgurl + "dj_start.png",
                id: 1,
                latitude: wx.getStorageSync("current_order").start_adds_location.lat,
                longitude: wx.getStorageSync("current_order").start_adds_location.lng,
                width: 75,
                height: 22
            }, {
                iconPath: e.data.imgurl + "target_icon.png",
                id: 2,
                latitude: wx.getStorageSync("current_order").target_adds_location.lat,
                longitude: wx.getStorageSync("current_order").target_adds_location.lng,
                width: 14,
                height: 24
            }, {
                iconPath: e.data.imgurl + "dj_end.png",
                id: 3,
                latitude: wx.getStorageSync("current_order").target_adds_location.lat,
                longitude: wx.getStorageSync("current_order").target_adds_location.lng,
                width: 75,
                height: 22
            } ]
        })) : (this.get_polyline(), this.setData({
            markers: [ {
                iconPath: e.data.imgurl + "start_icon.png",
                id: 0,
                latitude: wx.getStorageSync("current_order").start_adds_location.lat,
                longitude: wx.getStorageSync("current_order").start_adds_location.lng,
                width: 14,
                height: 24
            }, {
                iconPath: e.data.imgurl + "start_location.png",
                id: 1,
                latitude: wx.getStorageSync("current_order").start_adds_location.lat,
                longitude: wx.getStorageSync("current_order").start_adds_location.lng,
                width: 75,
                height: 22
            }, {
                iconPath: e.data.imgurl + "target_icon.png",
                id: 2,
                latitude: wx.getStorageSync("current_order").target_adds_location.lat,
                longitude: wx.getStorageSync("current_order").target_adds_location.lng,
                width: 14,
                height: 24
            }, {
                iconPath: e.data.imgurl + "target_location.png",
                id: 3,
                latitude: wx.getStorageSync("current_order").target_adds_location.lat,
                longitude: wx.getStorageSync("current_order").target_adds_location.lng,
                width: 75,
                height: 22
            } ]
        }));
        var a = this.data.markers;
        1 == t.is_send && a.push({
            iconPath: e.data.imgurl + "bike.png",
            id: 4,
            latitude: wx.getStorageSync("current_order").location.lat,
            longitude: wx.getStorageSync("current_order").location.lng,
            width: 30,
            height: 30
        }), this.setData({
            markers: a
        }), 3 == t.class_id && 5 == t.class_id && 6 == t.class_id || this.get_distance(t.start_adds_location, t.target_adds_location, function(t) {
            console.log(t, t.distance.elements[0].distance, (t.distance.elements[0].distance / 1e3).toFixed(3)), 
            e.setData({
                distance: (t.distance.elements[0].distance / 1e3).toFixed(3)
            });
        });
    },
    onLoad: function(t) {},
    onReady: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});