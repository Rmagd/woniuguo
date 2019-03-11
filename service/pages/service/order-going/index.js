var _Page;

function _defineProperty(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var api = require("../../../../api.js"), QQMapWX = require("../../../../qqmap-wx.js"), app = getApp();

Page((_defineProperty(_Page = {
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
        distance: 0,
        controls: [ {
            id: 0,
            position: {
                left: 20,
                top: 780,
                width: 40,
                height: 40
            },
            iconPath: app.imgurl + "frash.png",
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
    onLoad: function(t) {
        var e = wx.getStorageSync("current_order");
        console.log(e.id, "-----id");
    },
    onReady: function(t) {},
    onmap: function(t) {
        var e = wx.getStorageSync("current_order");
        if (console.log(e.class_id), 0 == t.currentTarget.dataset.type) if (2 == e.class_id || 7 == e.class_id) var a = Number(e.target_adds_location.lat), n = Number(e.target_adds_location.lng), o = e.target_adds; else a = Number(e.start_adds_location.lat), 
        n = Number(e.start_adds_location.lng), o = e.start_adds; else if (2 == e.class_id || 7 == e.class_id) a = Number(e.start_adds_location.lat), 
        n = Number(e.start_adds_location.lng), o = e.start_adds; else a = Number(e.target_adds_location.lat), 
        n = Number(e.target_adds_location.lng), o = e.target_adds;
        return wx.openLocation({
            latitude: a,
            longitude: n,
            address: o
        }), !1;
    },
    input: function(t) {
        for (var e = t.detail.value, a = [ {
            num: ""
        }, {
            num: ""
        }, {
            num: ""
        }, {
            num: ""
        } ], n = 0; n < e.length; n++) a[n].num = e[n];
        console.log(e, "---val"), this.setData({
            input: a,
            value: e
        });
    },
    controltap: function(t) {},
    getPolyline: function(t, e, r, a) {
        console.log(t, e);
        var n = t.lat + "," + t.lng + "&to=" + e.lat + "," + e.lng;
        4 === a ? wx.request({
            url: "https://apis.map.qq.com/ws/direction/v1/driving/?from=" + n + "&key=EXZBZ-HMSWP-HLCDB-VQUP6-JLTS7-ZCB3Z",
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
        }) : wx.request({
            url: "https://apis.map.qq.com/ws/direction/v1/bicycling/?from=" + n + "&key=EXZBZ-HMSWP-HLCDB-VQUP6-JLTS7-ZCB3Z",
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
        console.log(t, "--------------------------");
        var n = t.lat + "," + t.lng + "&to=" + e.lat + "," + e.lng + "," + e.lat + "," + e.lng;
        wx.request({
            url: "https://apis.map.qq.com/ws/distance/v1/?mode=driving&\nfrom=" + n + "&&key=EXZBZ-HMSWP-HLCDB-VQUP6-JLTS7-ZCB3Z",
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                a({
                    distance: t.data.result
                });
            },
            fail: function() {}
        });
    },
    get_polyline: function(t) {
        var a = this, e = wx.getStorageSync("current_order");
        0 == t ? a.getPolyline(a.data.address, e.target_adds_location, function(t) {
            console.log(t);
            var e = a.data.polyline;
            e[0].points = t, a.setData({
                polyline: e
            });
        }, e.class_id) : a.getPolyline(e.start_adds_location, e.target_adds_location, function(t) {
            console.log(t);
            var e = a.data.polyline;
            e[0].points = t, a.setData({
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
                title: "确认送达成功",
                icon: "none"
            }), setTimeout(function() {
                wx.navigateBack({
                    delta: 2
                });
            }, 1e3)) : 0 == t.code && wx.showToast({
                title: t.msg,
                icon: "none"
            });
        }
    });
}), _defineProperty(_Page, "send_handler", function() {
    var e = this;
    1 == wx.getStorageSync("current_order").class_id || 2 == wx.getStorageSync("current_order").class_id || 7 == wx.getStorageSync("current_order").class_id ? 0 == wx.getStorageSync("index").is_confirm_code ? app.request({
        url: api.runner_order.isService,
        method: "post",
        data: {
            oid: e.data.order.id,
            confirm_code: ""
        },
        success: function(t) {
            console.log(t), 1 == t.code ? (1 == e.data.order.class_id || 2 == e.data.order.class_id ? wx.showToast({
                title: "确认送达成功",
                icon: "none"
            }) : wx.showToast({
                title: "确认订单完成",
                icon: "none"
            }), setTimeout(function() {
                wx.redirectTo({
                    url: "../index/index"
                });
            }, 1e3)) : 0 == t.code && wx.showToast({
                title: t.msg
            });
        }
    }) : (console.log(e.data.order.confirm_code, "that.data.order.confirm_code"), e.setData({
        wap: !0
    })) : app.request({
        url: api.runner_order.isService,
        method: "post",
        data: {
            oid: e.data.order.id,
            confirm_code: ""
        },
        success: function(t) {
            console.log(t), 1 == t.code ? (1 == e.data.order.class_id || 2 == e.data.order.class_id ? wx.showToast({
                title: "确认送达成功",
                icon: "none"
            }) : wx.showToast({
                title: "确认订单完成",
                icon: "none"
            }), setTimeout(function() {
                wx.navigateBack({
                    delta: 2
                });
            }, 1e3)) : 0 == t.code && wx.showToast({
                title: t.msg,
                icon: "none"
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
    var a = this;
    this.get_address_LatLntHandler(), this.setData({
        order: wx.getStorageSync("current_order"),
        avatar: wx.getStorageSync("user").avatar_url
    });
    var n = wx.getStorageSync("current_order");
    5 === n.class_id || 3 === n.class_id || 6 === n.class_id ? (wx.getLocation({
        type: "wgs84",
        success: function(t) {
            var e = {
                lat: t.latitude,
                lng: t.longitude
            };
            a.setData({
                address: e
            }), a.get_distance(e, n.target_adds_location, function(t) {
                console.log(t, t.distance.elements[0].distance, (t.distance.elements[0].distance / 1e3).toFixed(3)), 
                a.setData({
                    distance: (t.distance.elements[0].distance / 1e3).toFixed(3)
                });
            }), a.get_polyline(0);
        }
    }), this.setData({
        markers: [ {
            iconPath: a.data.imgurl + "target_icon.png",
            id: 0,
            latitude: wx.getStorageSync("current_order").target_adds_location.lat,
            longitude: wx.getStorageSync("current_order").target_adds_location.lng,
            width: 14,
            height: 24
        }, {
            iconPath: a.data.imgurl + "fw_address.png",
            id: 1,
            latitude: wx.getStorageSync("current_order").target_adds_location.lat,
            longitude: wx.getStorageSync("current_order").target_adds_location.lng,
            width: 75,
            height: 22
        } ]
    })) : 1 === n.class_id ? (this.get_distance(n.start_adds_location, n.target_adds_location, function(t) {
        console.log(t, t.distance.elements[0].distance, (t.distance.elements[0].distance / 1e3).toFixed(3)), 
        a.setData({
            distance: (t.distance.elements[0].distance / 1e3).toFixed(3)
        });
    }), this.get_polyline(1), this.setData({
        markers: [ {
            iconPath: a.data.imgurl + "start_icon.png",
            id: 0,
            latitude: wx.getStorageSync("current_order").start_adds_location.lat,
            longitude: wx.getStorageSync("current_order").start_adds_location.lng,
            width: 14,
            height: 24
        }, {
            iconPath: a.data.imgurl + "start_icons.png",
            id: 1,
            latitude: wx.getStorageSync("current_order").start_adds_location.lat,
            longitude: wx.getStorageSync("current_order").start_adds_location.lng,
            width: 75,
            height: 22
        }, {
            iconPath: a.data.imgurl + "target_icon.png",
            id: 2,
            latitude: wx.getStorageSync("current_order").target_adds_location.lat,
            longitude: wx.getStorageSync("current_order").target_adds_location.lng,
            width: 14,
            height: 24
        }, {
            iconPath: a.data.imgurl + "end_icons.png",
            id: 3,
            latitude: wx.getStorageSync("current_order").target_adds_location.lat,
            longitude: wx.getStorageSync("current_order").target_adds_location.lng,
            width: 75,
            height: 22
        } ]
    })) : 2 === n.class_id ? (this.get_distance(n.start_adds_location, n.target_adds_location, function(t) {
        console.log(t, t.distance.elements[0].distance, (t.distance.elements[0].distance / 1e3).toFixed(3)), 
        a.setData({
            distance: (t.distance.elements[0].distance / 1e3).toFixed(3)
        });
    }), this.get_polyline(1), this.setData({
        markers: [ {
            iconPath: a.data.imgurl + "start_icon.png",
            id: 0,
            latitude: wx.getStorageSync("current_order").target_adds_location.lat,
            longitude: wx.getStorageSync("current_order").target_adds_location.lng,
            width: 14,
            height: 24
        }, {
            iconPath: a.data.imgurl + "bwm_01.png",
            id: 1,
            latitude: wx.getStorageSync("current_order").target_adds_location.lat,
            longitude: wx.getStorageSync("current_order").target_adds_location.lng,
            width: 75,
            height: 22
        }, {
            iconPath: a.data.imgurl + "target_icon.png",
            id: 2,
            latitude: wx.getStorageSync("current_order").start_adds_location.lat,
            longitude: wx.getStorageSync("current_order").start_adds_location.lng,
            width: 14,
            height: 24
        }, {
            iconPath: a.data.imgurl + "bwm_02.png",
            id: 3,
            latitude: wx.getStorageSync("current_order").start_adds_location.lat,
            longitude: wx.getStorageSync("current_order").start_adds_location.lng,
            width: 75,
            height: 22
        } ]
    })) : 4 === n.class_id ? (this.get_polyline(1), console.log("这是一个小车型"), this.setData({
        markers: [ {
            iconPath: a.data.imgurl + "start_icon.png",
            id: 0,
            latitude: wx.getStorageSync("current_order").start_adds_location.lat,
            longitude: wx.getStorageSync("current_order").start_adds_location.lng,
            width: 14,
            height: 24
        }, {
            iconPath: a.data.imgurl + "dj_start.png",
            id: 1,
            latitude: wx.getStorageSync("current_order").start_adds_location.lat,
            longitude: wx.getStorageSync("current_order").start_adds_location.lng,
            width: 75,
            height: 22
        }, {
            iconPath: a.data.imgurl + "target_icon.png",
            id: 2,
            latitude: wx.getStorageSync("current_order").target_adds_location.lat,
            longitude: wx.getStorageSync("current_order").target_adds_location.lng,
            width: 14,
            height: 24
        }, {
            iconPath: a.data.imgurl + "dj_end.png",
            id: 3,
            latitude: wx.getStorageSync("current_order").target_adds_location.lat,
            longitude: wx.getStorageSync("current_order").target_adds_location.lng,
            width: 75,
            height: 22
        } ]
    })) : 7 === n.class_id ? (this.get_distance(n.start_adds_location, n.target_adds_location, function(t) {
        console.log(t, t.distance.elements[0].distance, (t.distance.elements[0].distance / 1e3).toFixed(3)), 
        a.setData({
            distance: (t.distance.elements[0].distance / 1e3).toFixed(3)
        });
    }), this.get_polyline(1), this.setData({
        markers: [ {
            iconPath: a.data.imgurl + "start_icon.png",
            id: 0,
            latitude: wx.getStorageSync("current_order").start_adds_location.lat,
            longitude: wx.getStorageSync("current_order").start_adds_location.lng,
            width: 14,
            height: 24
        }, {
            iconPath: a.data.imgurl + "bwm_01.png",
            id: 1,
            latitude: wx.getStorageSync("current_order").start_adds_location.lat,
            longitude: wx.getStorageSync("current_order").start_adds_location.lng,
            width: 75,
            height: 22
        }, {
            iconPath: a.data.imgurl + "target_icon.png",
            id: 2,
            latitude: wx.getStorageSync("current_order").target_adds_location.lat,
            longitude: wx.getStorageSync("current_order").target_adds_location.lng,
            width: 14,
            height: 24
        }, {
            iconPath: a.data.imgurl + "bwm_02.png",
            id: 3,
            latitude: wx.getStorageSync("current_order").target_adds_location.lat,
            longitude: wx.getStorageSync("current_order").target_adds_location.lng,
            width: 75,
            height: 22
        } ]
    })) : (this.get_distance(n.start_adds_location, n.target_adds_location, function(t) {
        console.log(t, t.distance.elements[0].distance, (t.distance.elements[0].distance / 1e3).toFixed(3)), 
        a.setData({
            distance: (t.distance.elements[0].distance / 1e3).toFixed(3)
        });
    }), this.get_polyline(1), this.setData({
        markers: [ {
            iconPath: a.data.imgurl + "start_icon.png",
            id: 0,
            latitude: wx.getStorageSync("current_order").start_adds_location.lat,
            longitude: wx.getStorageSync("current_order").start_adds_location.lng,
            width: 14,
            height: 24
        }, {
            iconPath: a.data.imgurl + "start_location.png",
            id: 1,
            latitude: wx.getStorageSync("current_order").start_adds_location.lat,
            longitude: wx.getStorageSync("current_order").start_adds_location.lng,
            width: 75,
            height: 22
        }, {
            iconPath: a.data.imgurl + "target_icon.png",
            id: 2,
            latitude: wx.getStorageSync("current_order").target_adds_location.lat,
            longitude: wx.getStorageSync("current_order").target_adds_location.lng,
            width: 14,
            height: 24
        }, {
            iconPath: a.data.imgurl + "target_location.png",
            id: 3,
            latitude: wx.getStorageSync("current_order").target_adds_location.lat,
            longitude: wx.getStorageSync("current_order").target_adds_location.lng,
            width: 75,
            height: 22
        } ]
    }));
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
}), _defineProperty(_Page, "start_address", function() {}), _defineProperty(_Page, "end_address", function() {}), 
_defineProperty(_Page, "callPhone", function() {
    wx.makePhoneCall({
        phoneNumber: this.data.order.phone
    });
}), _defineProperty(_Page, "onHide", function() {}), _defineProperty(_Page, "onUnload", function() {}), 
_defineProperty(_Page, "onPullDownRefresh", function() {}), _defineProperty(_Page, "onReachBottom", function() {}), 
_defineProperty(_Page, "onShareAppMessage", function() {}), _Page));