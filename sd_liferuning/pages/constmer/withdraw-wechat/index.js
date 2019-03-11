var api = require("../../../../api.js"), app = getApp();

Page({
    data: {
        money: 0,
        balance: 0,
        webRoot: app.webRoot
    },
    onShow: function() {
        var t = this;
        wx.getStorage({
            key: "menu_template",
            success: function(a) {
                console.log(a.data), t.setData({
                    balance: a.data.max_withdraw
                });
            }
        });
    },
    changeInputData: function(a) {
        var t = a.currentTarget.dataset.name, e = a.detail.value;
        "money" == t && this.setData({
            money: e
        });
    },
    sendRequest: function() {
        var a = this.data.money;
        if (this.data.balance < a || "" == a) return wx.showToast({
            title: "请正确填写金额",
            icon: "none"
        }), !1;
        app.request({
            url: api.withdraw.wx,
            data: {
                price: a
            },
            success: function(a) {
                wx.showToast({
                    title: a.msg,
                    icon: "none",
                    mask: !0
                }), setTimeout(function() {
                    wx.navigateBack({
                        delta: 1
                    });
                }, 1500);
            }
        });
    },
    onLoad: function() {
        this.setData({});
    }
});