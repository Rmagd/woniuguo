function _defineProperty(e, a, t) {
    return a in e ? Object.defineProperty(e, a, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[a] = t, e;
}

var config = require("../../../../config.js"), api = require("../../../../api.js"), app = getApp();

Page({
    data: {
        site: "",
        actions: config.extract,
        cancelText: "取消",
        webRoot: app.webRoot,
        page: 1
    },
    onLoad: function() {
        console.log("onLoad");
        var a = this;
        app.request({
            url: api.wallet.user,
            method: "post",
            data: {
                count: 10,
                page: a.data.page
            },
            success: function(e) {
                console.log(e), a.setData({
                    page: a.data.page + 1,
                    datas: e.data.list.data,
                    money: e.data.price,
                    price: e.data.expend
                });
            }
        });
    },
    onShow: function() {},
    
    onReachBottom: function() {
        var n = this;
        wx.showLoading({
            title: "玩命加载中"
        }), app.request({
            url: api.wallet.user,
            method: "post",
            data: {
                count: 10,
                page: n.data.page
            },
            success: function(e) {
                for (var a = n.data.datas, t = e.data.list.data, i = 0; i < t.length; i++) a.push(t[i]);
                wx.hideLoading(), n.setData({
                    page: n.data.page + 1,
                    datas: a,
                    money: e.data.price,
                    price: e.data.expend
                });
            }
        });
    }
});