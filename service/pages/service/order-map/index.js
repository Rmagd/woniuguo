var _Page;

function _defineProperty(t, e, o) {
    return e in t ? Object.defineProperty(t, e, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = o, t;
}

var api = require("../../../../api.js"), QQMapWX = require("../../../../qqmap-wx.js"), app = getApp(), order = wx.getStorageSync("current_order");

Page((_defineProperty(_Page = {
    data: {
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
        distance: 0,
        controls: [ {
            id: 0,
            position: {
                left: 20,
                top: 780,
                width: 40,
                height: 40
            },
            iconPath: "/we7/resource/images/frash.png",
            clickable: !0
        } ],
        input: [ {
            num: ""
        }, {
            num: ""
        }, {
            num: ""
        }, {
            num: ""
        } ],
        wap: !1
    },
    onLoad: function(o) {
        var a, r = this;
        app.request({
            url: api.runner_order.getRunnerOrderOne,
            method: "post",
            data: {
                oid: o.id
            },
            success: function(t) {
                a = t.data, console.log(t.data), wx.getLocation({
                    type: "gcj02",
                    success: function(t) {
                        var e = {
                            lat: t.latitude,
                            lng: t.longitude
                        };
                        0 == o.type ? 2 == a.class_id ? r.getPolyline(e, a.target_adds_location, function(t) {
                            console.log(a.target_adds_location, "--start_adds_location");
                            var e = r.data.polyline;
                            e[0].points = t, r.setData({
                                polyline: e
                            });
                        }, a.class_id) : r.getPolyline(e, a.start_adds_location, function(t) {
                            console.log(a.start_adds_location, "--start_adds_location");
                            var e = r.data.polyline;
                            e[0].points = t, r.setData({
                                polyline: e
                            });
                        }, a.class_id) : 2 == a.class_id ? r.getPolyline(e, a.start_adds_location, function(t) {
                            console.log(a.start_adds_location, "--target_adds_location");
                            var e = r.data.polyline;
                            e[0].points = t, r.setData({
                                polyline: e
                            });
                        }, a.class_id) : r.getPolyline(e, a.target_adds_location, function(t) {
                            console.log(a.target_adds_location, "--target_adds_location");
                            var e = r.data.polyline;
                            e[0].points = t, r.setData({
                                polyline: e
                            });
                        }, a.class_id);
                    },
                    fail: function() {},
                    complete: function() {}
                });
            }
        });
    },
    onReady: function(t) {},
    onmap: function(t) {
        app.navTo("/service/pages/service/order-map/index");
    },
    input: function(t) {
        for (var e = t.detail.value, o = [ {
            num: ""
        }, {
            num: ""
        }, {
            num: ""
        }, {
            num: ""
        } ], a = 0; a < e.length; a++) o[a].num = e[a];
        console.log(e, "---val"), this.setData({
            input: o,
            value: e
        });
    },
    controltap: function(t) {},
    getPolyline: function(t, e, n, o) {
        console.log(t, e, "------------------------");
        var a = t.lat + "," + t.lng + "&to=" + e.lat + "," + e.lng;
        4 === o ? wx.request({
            url: "https://apis.map.qq.com/ws/direction/v1/driving/?from=" + a + "&key=Z6RBZ-6H4CU-AV6V5-2OTIO-Q2CLZ-VMF5T",
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                if (console.log(t), 384 == t.data.status) wx.showToast({
                    title: t.data.message,
                    icon: "none",
                    duration: 2e3
                }); else {
                    for (var e = t.data.result.routes[0].polyline, o = 2; o < e.length; o++) e[o] = e[o - 2] + e[o] / 1e6;
                    for (var a = [], r = 0; r < e.length; r += 2) a[a.length] = {
                        longitude: e[r + 1],
                        latitude: e[r]
                    };
                    n(a);
                }
            },
            fail: function() {}
        }) : wx.request({
            url: "https://apis.map.qq.com/ws/direction/v1/bicycling/?from=" + a + "&key=Z6RBZ-6H4CU-AV6V5-2OTIO-Q2CLZ-VMF5T",
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                if (console.log(t), 384 == t.data.status) wx.showToast({
                    title: t.data.message,
                    icon: "none",
                    duration: 2e3
                }); else {
                    for (var e = t.data.result.routes[0].polyline, o = 2; o < e.length; o++) e[o] = e[o - 2] + e[o] / 1e6;
                    for (var a = [], r = 0; r < e.length; r += 2) a[a.length] = {
                        longitude: e[r + 1],
                        latitude: e[r]
                    };
                    n(a);
                }
            },
            fail: function() {}
        });
    },
    get_distance: function(t, e, o) {
        console.log(t, "--------------------------");
        var a = t.lat + "," + t.lng + "&to=" + e.lat + "," + e.lng + "," + e.lat + "," + e.lng;
        wx.request({
            url: "https://apis.map.qq.com/ws/distance/v1/?mode=driving&\nfrom=" + a + "&&key=Z6RBZ-6H4CU-AV6V5-2OTIO-Q2CLZ-VMF5T",
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                o({
                    distance: t.data.result
                });
            },
            fail: function() {}
        });
    },
    get_polyline: function(t) {
        var o = this, e = wx.getStorageSync("current_order");
        o.getPolyline(o.data.address, e.target_adds_location, function(t) {
            console.log(t);
            var e = o.data.polyline;
            e[0].points = t, o.setData({
                polyline: e
            });
        }, e.class_id);
    }
}, "controltap", function(t) {
    console.log(t.controlId);
}), _defineProperty(_Page, "close", function() {
    this.setData({
        wap: !1
    });
}), _defineProperty(_Page, "confirm", function() {
    app.request({
        url: api.runner_order.isService,
        method: "post",
        data: {
            oid: this.data.order.id,
            confirm_code: this.data.value
        },
        success: function(t) {
            console.log(t), 1 == t.code ? (wx.showToast({
                title: t.msg
            }), setTimeout(function() {
                wx.redirectTo({
                    url: "../index/index"
                });
            }, 1e3)) : 0 == t.code && wx.showToast({
                title: t.msg,
                icon: "none"
            });
        }
    });
}), _defineProperty(_Page, "send_handler", function() {
    1 == wx.getStorageSync("current_order").class_id || 2 == wx.getStorageSync("current_order").class_id ? 0 == wx.getStorageSync("index").is_confirm_code ? app.request({
        url: api.runner_order.isService,
        method: "post",
        data: {
            oid: this.data.order.id,
            confirm_code: ""
        },
        success: function(t) {
            console.log(t), 1 == t.code ? (wx.showToast({
                title: t.msg
            }), setTimeout(function() {
                wx.redirectTo({
                    url: "../index/index"
                });
            }, 1e3)) : 0 == t.code && wx.showToast({
                title: t.msg
            });
        }
    }) : (console.log(this.data.order.confirm_code, "that.data.order.confirm_code"), 
    this.setData({
        wap: !0
    })) : app.request({
        url: api.runner_order.isService,
        method: "post",
        data: {
            oid: this.data.order.id,
            confirm_code: ""
        },
        success: function(t) {
            console.log(t), 1 == t.code ? (wx.showToast({
                title: t.msg
            }), setTimeout(function() {
                wx.redirectTo({
                    url: "../index/index"
                });
            }, 1e3)) : 0 == t.code && wx.showToast({
                title: t.msg
            });
        }
    });
}), _defineProperty(_Page, "callPhone", function() {
    wx.makePhoneCall({
        phoneNumber: this.data.order.phone
    });
}), _defineProperty(_Page, "get_address_LatLntHandler", function() {
    var e = this;
    this.getLatLntHandler(function(t) {
        e.setData({
            lat: t.latitude,
            lng: t.longitude
        });
    });
}), _defineProperty(_Page, "getLatLntHandler", function(e) {
    var o = null, a = null, r = null, n = null;
    wx.getLocation({
        type: "gcj02",
        success: function(t) {
            o = t.latitude, a = t.longitude, r = t.speed, n = t.accuracy;
            t.latitude, t.longitude;
            e({
                latitude: o,
                longitude: a,
                speed: r,
                accuracy: n
            });
        },
        fail: function() {},
        complete: function() {}
    });
}), _defineProperty(_Page, "delete_order", function() {
    app.request({
        url: api.order.orderDel,
        methods: "POST",
        data: {
            oid: wx.getStorageSync("current_order").id
        },
        success: function(t) {
            console.log(t), 1 === t.code ? wx.navigateTo({
                url: "../order-list/index"
            }) : wx.showToast({
                title: "取消失败，请重新取消订单"
            });
        },
        fail: function() {}
    });
}), _defineProperty(_Page, "onShow", function() {
    var o = this;
    this.get_address_LatLntHandler(), this.setData({
        order: wx.getStorageSync("current_order"),
        avatar: wx.getStorageSync("user").avatar_url
    });
    var t = wx.getStorageSync("current_order");
    5 === t.class_id || 3 === t.class_id || 6 === t.class_id ? (wx.getLocation({
        type: "wgs84",
        success: function(t) {
            var e = {
                lat: t.latitude,
                lng: t.longitude
            };
            o.setData({
                address: e
            });
        }
    }), this.setData({
        markers: [ {
            iconPath: "/we7/resource/images/target_icon.png",
            id: 0,
            latitude: wx.getStorageSync("current_order").target_adds_location.lat,
            longitude: wx.getStorageSync("current_order").target_adds_location.lng,
            width: 14,
            height: 24
        }, {
            iconPath: "/we7/resource/images/fw_address.png",
            id: 1,
            latitude: wx.getStorageSync("current_order").target_adds_location.lat,
            longitude: wx.getStorageSync("current_order").target_adds_location.lng,
            width: 75,
            height: 22
        } ]
    })) : 1 === t.class_id ? this.setData({
        markers: [ {
            iconPath: "/we7/resource/images/start_icon.png",
            id: 0,
            latitude: wx.getStorageSync("current_order").start_adds_location.lat,
            longitude: wx.getStorageSync("current_order").start_adds_location.lng,
            width: 14,
            height: 24
        }, {
            iconPath: "/we7/resource/images/start_icons.png",
            id: 1,
            latitude: wx.getStorageSync("current_order").start_adds_location.lat,
            longitude: wx.getStorageSync("current_order").start_adds_location.lng,
            width: 75,
            height: 22
        }, {
            iconPath: "/we7/resource/images/target_icon.png",
            id: 2,
            latitude: wx.getStorageSync("current_order").target_adds_location.lat,
            longitude: wx.getStorageSync("current_order").target_adds_location.lng,
            width: 14,
            height: 24
        }, {
            iconPath: "/we7/resource/images/end_icons.png",
            id: 3,
            latitude: wx.getStorageSync("current_order").target_adds_location.lat,
            longitude: wx.getStorageSync("current_order").target_adds_location.lng,
            width: 75,
            height: 22
        } ]
    }) : 2 === t.class_id ? this.setData({
        markers: [ {
            iconPath: "/we7/resource/images/start_icon.png",
            id: 0,
            latitude: wx.getStorageSync("current_order").target_adds_location.lat,
            longitude: wx.getStorageSync("current_order").target_adds_location.lng,
            width: 14,
            height: 24
        }, {
            iconPath: "/we7/resource/images/bwm_01.png",
            id: 1,
            latitude: wx.getStorageSync("current_order").target_adds_location.lat,
            longitude: wx.getStorageSync("current_order").target_adds_location.lng,
            width: 75,
            height: 22
        }, {
            iconPath: "/we7/resource/images/target_icon.png",
            id: 2,
            latitude: wx.getStorageSync("current_order").start_adds_location.lat,
            longitude: wx.getStorageSync("current_order").start_adds_location.lng,
            width: 14,
            height: 24
        }, {
            iconPath: "/we7/resource/images/bwm_02.png",
            id: 3,
            latitude: wx.getStorageSync("current_order").start_adds_location.lat,
            longitude: wx.getStorageSync("current_order").start_adds_location.lng,
            width: 75,
            height: 22
        } ]
    }) : 4 === t.class_id ? (console.log("这是一个小车型"), this.setData({
        markers: [ {
            iconPath: "/we7/resource/images/start_icon.png",
            id: 0,
            latitude: wx.getStorageSync("current_order").start_adds_location.lat,
            longitude: wx.getStorageSync("current_order").start_adds_location.lng,
            width: 14,
            height: 24
        }, {
            iconPath: "/we7/resource/images/dj_start.png",
            id: 1,
            latitude: wx.getStorageSync("current_order").start_adds_location.lat,
            longitude: wx.getStorageSync("current_order").start_adds_location.lng,
            width: 75,
            height: 22
        }, {
            iconPath: "/we7/resource/images/target_icon.png",
            id: 2,
            latitude: wx.getStorageSync("current_order").target_adds_location.lat,
            longitude: wx.getStorageSync("current_order").target_adds_location.lng,
            width: 14,
            height: 24
        }, {
            iconPath: "/we7/resource/images/dj_end.png",
            id: 3,
            latitude: wx.getStorageSync("current_order").target_adds_location.lat,
            longitude: wx.getStorageSync("current_order").target_adds_location.lng,
            width: 75,
            height: 22
        } ]
    })) : this.setData({
        markers: [ {
            iconPath: "/we7/resource/images/start_icon.png",
            id: 0,
            latitude: wx.getStorageSync("current_order").start_adds_location.lat,
            longitude: wx.getStorageSync("current_order").start_adds_location.lng,
            width: 14,
            height: 24
        }, {
            iconPath: "/we7/resource/images/start_location.png",
            id: 1,
            latitude: wx.getStorageSync("current_order").start_adds_location.lat,
            longitude: wx.getStorageSync("current_order").start_adds_location.lng,
            width: 75,
            height: 22
        }, {
            iconPath: "/we7/resource/images/target_icon.png",
            id: 2,
            latitude: wx.getStorageSync("current_order").target_adds_location.lat,
            longitude: wx.getStorageSync("current_order").target_adds_location.lng,
            width: 14,
            height: 24
        }, {
            iconPath: "/we7/resource/images/target_location.png",
            id: 3,
            latitude: wx.getStorageSync("current_order").target_adds_location.lat,
            longitude: wx.getStorageSync("current_order").target_adds_location.lng,
            width: 75,
            height: 22
        } ]
    });
}), _defineProperty(_Page, "send_handlers", function() {
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
            })) : 0 == t.code ? wx.showToast({
                title: "信息发送失败，请重新发送"
            }) : wx.showToast({
                title: "网络链接失败，请重新链接"
            });
        }
    });
}), _defineProperty(_Page, "start_address", function() {
    this.data.order;
    this.setData({
        lat: wx.getStorageSync("current_order").start_adds_location.lat,
        lng: wx.getStorageSync("current_order").start_adds_location.lng
    });
}), _defineProperty(_Page, "end_address", function() {
    this.data.order;
    this.setData({
        lat: wx.getStorageSync("current_order").target_adds_location.lat,
        lng: wx.getStorageSync("current_order").target_adds_location.lng
    });
}), _defineProperty(_Page, "callPhone", function() {
    wx.makePhoneCall({
        phoneNumber: this.data.order.phone
    });
}), _defineProperty(_Page, "onHide", function() {}), _defineProperty(_Page, "onUnload", function() {}), 
_defineProperty(_Page, "onPullDownRefresh", function() {}), _defineProperty(_Page, "onReachBottom", function() {}), 
_defineProperty(_Page, "onShareAppMessage", function() {}), _Page));