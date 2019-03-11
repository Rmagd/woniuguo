var api = require("../../../../api.js"), app = getApp(), WxParse = require("../../../../wxParse/wxParse.js");

Page({
    data: {
        current_data: 0,
        current_money_index: 0,
        current_money: "",
        current_id: "",
        getMoney: null,
        xieyi: null
    },
    onLoad: function(e) {
        var n = this, a = null;
        console.log(a), app.request({
            url: api.apply.check,
            method: "post",
            data: {},
            success: function(t) {
                app.request({
                    url: api.apply.getInfo,
                    method: "post",
                    data: {},
                    success: function(e) {
                        a = 1 == e.data.type ? {
                            name: "《跑腿人员入驻协议》",
                            type: 4
                        } : 2 == e.data.type ? {
                            name: "《代驾人员入驻协议》",
                            type: 7
                        } : {
                            name: "《家政人员入驻协议》",
                            type: 6
                        }, n.setData({
                            type: t.code,
                            xieyi: a
                        });
                    }
                });
            }
        }), app.request({
            url: api.apply.deposit_price,
            method: "post",
            data: {},
            success: function(e) {
                if (1 == e.code) {
                    var t = e.data;
                    n.setData({
                        getMoney: e.data.data,
                        runner: e.data.runner,
                        current_money: t.data[0]
                    }), WxParse.wxParse("article", "html", t.data[0].des, n, 5);
                }
            }
        });
    },
    navTo: function(e) {
        app.navTo(e.currentTarget.dataset.url);
    },
    onShow: function() {},
    renzheng: function() {
        app.request({
            url: api.apply.infoRunnerApply,
            method: "post",
            data: {},
            success: function(e) {
                0 == e.code ? wx.showModal({
                    title: "提示",
                    content: e.msg,
                    showCancel: !0,
                    confirmText: "认证",
                    success: function(e) {
                        e.confirm && app.navTo("/sd_liferuning/pages/constmer/setup/index");
                    }
                }) : (wx.showToast({
                    title: "申请成功,等待后台人员审核",
                    icon: "none",
                    mask: !0
                }), setTimeout(function() {
                    wx.navigateBack({
                        delta: 2
                    });
                }, 1500)), console.log(e);
            }
        });
    },
    pay: function() {
        var e = this.data.current_money;
        app.request({
            url: api.payment.paypromiseMoney,
            data: {
                id: e.id
            },
            method: "post",
            success: function(e) {
                1 == e.code ? wx.requestPayment({
                    timeStamp: e.data.timeStamp,
                    nonceStr: e.data.nonceStr,
                    package: e.data.package,
                    signType: "MD5",
                    paySign: e.data.paySign,
                    success: function(e) {
                        console.log("current_id", e), app.request({
                            url: api.apply.check,
                            method: "POST",
                            success: function(e) {
                              
                                console.log("current_id", e), 1 === e.code && wx.navigateTo({
                                    url: "../get-order/index"
                                }), 3 === e.code ? app.navTo("../../../../service/pages/service/authentication/index") : 3 === e.code ? wx.showModal({
                                    title: "提示",
                                    content: e.msg,
                                    showCancel: !1,
                                    success: function(e) {}
                                }) : 4 === e.code ? wx.showModal({
                                    title: "提示",
                                    content: e.msg + "," + e.remarks,
                                    showCancel: !1,
                                    success: function(e) {}
                                }) : 5 === e.code ? wx.showModal({
                                    title: "提示",
                                    content: e.msg + ",是否去缴纳保证金",
                                    showCancel: !0,
                                    confirmText: "去缴纳",
                                    success: function(e) {
                                        e.confirm && app.navTo("../../../../service/pages/service/userauth-pay/index");
                                    }
                                }) : 6 === e.code ? wx.showModal({
                                    title: "提示",
                                    content: e.msg,
                                    showCancel: !0,
                                    confirmText: "确定",
                                    success: function(e) {}
                                }) : app.navTo(url);
                            }
                        });
                    },
                    fail: function() {}
                }) : 0 === e.code ? wx.showToast({
                    title: e.msg,
                    icon: "none"
                }) : wx.showModal({
                    title: "提示",
                    content: "支付失败"
                });
            }
        });
    },
    outpay: function() {
        wx.showModal({
            title: "提示",
            content: "您确定要退还押金？",
            success: function(e) {
                e.confirm && wx.showModal({
                    title: "提示",
                    showCancel:false,
                    content: "退款需要人工审核，请联系客服提供您的基本信息",
                    success: function(e) {
                        wx.makePhoneCall({
                          phoneNumber: wx.getStorageSync("phone")
                        });
                    }
                });
            }
        });
    },
    selectGetMoney: function(e) {
        var t = this;
        console.log("this is money id", e.currentTarget.dataset.id), t.setData({
            current_money: t.data.getMoney[e.currentTarget.dataset.selected],
            current_money_index: e.currentTarget.dataset.selected,
            current_id: e.currentTarget.dataset.id
        }), WxParse.wxParse("article", "html", t.data.getMoney[e.currentTarget.dataset.selected].des, t, 5);
    },
    onReady: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});