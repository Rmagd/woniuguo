var app = getApp(), api = require("../../../../api.js");

Page({
    data: {
        webRoot: app.webRoot
    },
    onShow: function() {
        this.mylist();
    },
    mylist: function() {
        var a = this;
        app.request({
            url: api.wallet.bankList,
            data: {
                type: 1
            },
            method: "post",
            success: function(t) {
                console.log(t, "999999999999999999999"), a.setData({
                    data: t.data
                });
            }
        });
    },
    bankSetup: function(t) {
        var a = this, e = t.currentTarget.dataset.id;
        app.request({
            url: api.wallet.set_default,
            method: "post",
            data: {
                id: e
            },
            success: function(t) {
                1 == t.code ? wx.showModal({
                    title: "提示",
                    content: "设置成功",
                    showCancel: !1,
                    success: function() {
                        a.mylist();
                    }
                }) : wx.showModal({
                    title: "提示",
                    content: "设置失败",
                    showCancel: !1
                });
            }
        });
    },
    onLoad: function() {
        this.setData({
            icons: wx.getStorageSync("site") + "/addons/sd_liferuning/tp/public/uploads/background"
        });
    },
    del: function(t) {
        var a = this, e = t.currentTarget.dataset.id;
        wx.showModal({
            title: "提示",
            content: "您确定删除吗",
            success: function(t) {
                1 == t.confirm && app.request({
                    url: api.wallet.delete,
                    data: {
                        id: e
                    },
                    success: function(t) {
                        a.mylist();
                    }
                });
            }
        });
    }
});