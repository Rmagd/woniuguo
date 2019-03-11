var api = require("../../../../api.js"), app = getApp();

Page({
    data: {
        money: 0,
        balance: 0
    },
    onShow: function() {
        var a = this;
        wx.getStorage({
            key: "menu_template",
            success: function(t) {
                console.log(t.data), a.setData({
                    balance: t.data.max_withdraw
                });
            }
        });
    },
    changeInputData: function(t) {
        var a = t.currentTarget.dataset.name, e = t.detail.value;
        "money" == a && this.setData({
            money: e
        });
    },
    sendRequest: function() {
        var t = this.data.money, a = this.data.balance;
        return "" == t ? (wx.showToast({
            title: "请正确填写金额",
            icon: "none"
        }), !1) : a < t ? (wx.showToast({
            title: "金额大于可提现金额",
            icon: "none"
        }), !1) : t < 1 ? (wx.showToast({
            title: "提现金额至少1元",
            icon: "none"
        }), !1) : void app.request({
            url: api.runner_withdraw.wx,
            method: "post",
            data: {
                price: t
            },
            success: function(t) {
                wx.showToast({
                    title: t.msg,
                    icon: "none"
                }), setTimeout(function() {
                    wx.navigateBack({
                        delta: 1
                    });
                }, 1500);
            }
        });
    },
    onLoad: function(t) {}
});