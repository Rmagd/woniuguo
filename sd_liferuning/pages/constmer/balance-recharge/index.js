var api = require("../../../../api.js"), app = getApp();

Page({
    data: {
        money: 0
    },
    changeInputData: function(t) {
        var e = t.currentTarget.dataset.name, a = t.detail.value;
        "money" == e && this.setData({
            money: a
        });
    },
    onLoad: function() {
        this.setData({
            icons: wx.getStorageSync("site") + "/addons/sd_liferuning/tp/public/uploads/background"
        });
    },
    sendRequest: function() {
        if (!this.data.money) return wx.showToast({
            title: "请输入金额",
        }), !1;
        var t = this.data.money;
        app.request({
            url: api.payment.recharge,
            method: "post",
            data: {
                price: t
            },
            success: function(t) {
                if (console.log(t), 1 == t.code) {
                    var e = t.data;
                    wx.requestPayment({
                        timeStamp: e.timeStamp,
                        nonceStr: e.nonceStr,
                        package: e.package,
                        signType: e.signType,
                        paySign: e.paySign,
                        success: function(t) {
                            wx.showToast({
                                title: "充值成功",
                                duration: 1e3,
                                success: function() {
                                    setTimeout(function() {
                                        wx.navigateBack({
                                            delta: 1
                                        });
                                    }, 1e3);
                                }
                            });
                        },
                        fail: function() {
                            wx.showToast({
                                title: "支付失败",
                                icon: "none",
                                mask: !0
                            });
                        }
                    });
                } else wx.showToast({
                    title: "支付失败",
                    icon: "none",
                    mask: !0
                });
            }
        });
    }
});