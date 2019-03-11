var app = getApp(), api = require("../../../../api.js");

Page({
    data: {
        summary: ""
    },
    changeInputData: function(t) {
        var a = t.currentTarget.dataset.name, e = t.detail.value;
        "summary" == a && this.setData({
            summary: e
        });
    },
    sendRequest: function() {
        var t = this.data.summary;
        app.request({
            url: api.user.content,
            method: "post",
            data: {
                cid: wx.getStorageSync("cash").cid,
                content: t
            },
            success: function(t) {
                1 == t.code ? wx.showToast({
                    title: t.msg
                }) : wx.showModal({
                    title: "提示",
                    showCancel: !1,
                    content: t.msg
                });
            }
        });
    },
    onShow: function() {
        var a = this;
        app.request({
            url: api.user.content,
            data: {
                cid: wx.getStorageSync("cash").cid
            },
            success: function(t) {
                a.setData({
                    content: t.content
                });
            }
        });
    }
});