function _defineProperty(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var config = require("../../../../config.js"), api = require("../../../../api.js"), app = getApp();

Page({
    data: {
        actions: config.extract,
        cancelText: "取消",
        webRoot: app.webRoot,
        page: 1,
        money_state: {}
    },
    onLoad: function() {
        this.setData({
            icons: wx.getStorageSync("site") + "/addons/sd_liferuning/tp/public/uploads/background"
        });
    },
    onShow: function() {
        var t = this;
        t.setData({
            site: wx.getStorageSync("site")
        }), app.request({
            url: api.wallet.user,
            method: "post",
            data: {
                count: 6,
                page: t.data.page
            },
            success: function(e) {
                console.log(e), t.setData({
                    page: t.data.page + 1,
                    datas: e.data.list.data,
                    money: e.data.price,
                    price: e.data.expend
                });
            }
        }), app.request({
            url: api.runner.check,
            method: "post",
            success: function(e) {
                console.log(e), t.setData({
                    money_state: e.data
                });
            }
        });
    }
});