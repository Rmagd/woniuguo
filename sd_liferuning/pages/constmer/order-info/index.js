var _Page;

function _defineProperty(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e;
}

var set, api = require("../../../../api.js"), QQMapWX = require("../../../../qqmap-wx.js"), app = getApp(), innerAudioContext = wx.createInnerAudioContext();

innerAudioContext.src = "", innerAudioContext.obeyMuteSwitch = !1, Page((_defineProperty(_Page = {
    data: {
        imgurl: app.imgurl,
        orderStatus: 1,
        orderText: "已取单",
        soundRecording: {
            tempPath: "",
            duration: "",
            isPlay: !1,
            current_order: {},
            data: {}
        },
        vtype: !0
    },
    onLoad: function(e) {
        var t = this;
        t.setData({
            icons: wx.getStorageSync("site") + "/addons/sd_liferuning/tp/public/uploads/background"
        }), innerAudioContext.onPause(function() {
            t.setData({
                vtype: !0
            });
        }), innerAudioContext.onEnded(function() {
            console.log("结束"), t.setData({
                vtype: !0
            });
        }), this.get_data(e.orderid);
    },
    get_data: function(e) {
        var n = this;
        wx.showLoading({
            title: ""
        }), app.request({
            url: api.order.getUserOrderOne,
            data: {
                oid: e
            },
            method: "POST",
            success: function(e) {
                if (1 == e.code) {
                    var t = e.data;
                    1 != t.order_status && 2 != t.order_status && 3 != t.order_status || (t.order_status = 1), 
                    "" != t.voice && (innerAudioContext.src = t.voice), t.pics && (t.pics = t.pics.split(","), 
                    console.log(t.pics)), n.setData({
                        data: t
                    }), wx.setStorageSync("current_order", e.data), wx.hideLoading();
                } else wx.showToast({
                    title: "页面数据加载失败",
                    icon: "error"
                });
            }
        });
    },
    go_to_ordergoing: function() {
        wx.navigateTo({
            url: "../order-going/index"
        });
    },
    onUnload: function() {
        innerAudioContext.stop();
    },
    callPhone: function() {
        wx.makePhoneCall({
            phoneNumber: this.data.phoneNumber
        });
    },
    toPhone: function(e) {
        wx.makePhoneCall({
            phoneNumber: e.currentTarget.dataset.phone
        });
    },
    again_order: function() {
        wx.redirectTo({
            url: "../index/index"
        });
    },
    feedback_order: function(e) {
        app.navTo("/sd_liferuning/pages/constmer/evaluate/index?id=" + e.currentTarget.dataset.id);
    },
    cancelOrder: function(t) {
        wx.showModal({
            title: "提示",
            content: "您是否取消订单,红包不予退款",
            success: function(e) {
                1 == e.confirm && app.request({
                    url: api.order.orderDel,
                    data: {
                        oid: t.currentTarget.dataset.id
                    },
                    method: "POST",
                    success: function(e) {
                        1 == e.code && wx.showToast({
                            title: "订单取消成功",
                            duration: 1500,
                            success: function() {
                                setTimeout(function() {
                                    wx.navigateBack({
                                        delta: 1
                                    });
                                }, 1500);
                            }
                        });
                    }
                });
            }
        });
    },
    okOrder: function(e) {
        wx.showLoading({});
        var t = this.data.data;
        if (1 == t.class_id || 2 == t.class_id) var n = "确认送达成功"; else n = "确认订单完成";
        app.request({
            url: api.order.userconfirm,
            data: {
                oid: e.currentTarget.dataset.id
            },
            method: "POST",
            success: function(e) {
                1 == e.code ? wx.showToast({
                    title: n,
                    duration: 1500,
                    success: function() {
                        setTimeout(function() {
                            wx.navigateBack({
                                delta: 1
                            });
                        }, 1500);
                    }
                }) : wx.showToast({
                    title: e.msg,
                    icon: "none"
                });
            }
        });
    },
    confirmOrder: function(t) {
        var e = this.data.data;
        if (1 == e.class_id || 2 == e.class_id) var n = "确认送达成功"; else n = "确认订单完成";
        wx.showModal({
            title: "提示",
            content: "您是否确认订单完成",
            success: function(e) {
                1 == e.confirm && app.request({
                    url: api.order.userconfirm,
                    data: {
                        oid: t.currentTarget.dataset.id
                    },
                    method: "POST",
                    success: function(e) {
                        1 == e.code ? (wx.showToast({
                            title: n,
                            icon: "none",
                            mask: !0
                        }), setTimeout(function() {
                            wx.navigateBack({
                                delta: 1
                            });
                        }, 1500)) : wx.showToast({
                            title: e.msg,
                            icon: "none"
                        });
                    }
                });
            }
        });
    },
    previewPic: function() {
        var e = [];
        e.push(this.data.data.pic), wx.previewImage({
            current: e[0],
            urls: e
        });
    },
    previewPics: function(e) {
        var t = this.data.data.pics;
        wx.previewImage({
            current: t[e.currentTarget.dataset.index],
            urls: t
        });
    },
    soundRecordingPlay: function(e) {
        var t = this.data.vtype;
        console.log("-*--" + t), t ? innerAudioContext.play() : innerAudioContext.pause(), 
        this.setData({
            vtype: !t
        });
    },
    onShow: function() {
        var e = wx.getStorageSync("index").is_confirm_code;
        this.setData({
            code: e
        });
    }
}, "onUnload", function() {
    innerAudioContext.stop(), clearInterval(set);
}), _defineProperty(_Page, "onHide", function() {
    innerAudioContext.stop(), clearInterval(set);
}), _Page));