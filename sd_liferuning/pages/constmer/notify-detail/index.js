var api = require("../../../../api.js"), WxParse = require("../../../../wxParse/wxParse.js"), app = getApp();

Page({
    data: {},
    onLoad: function(n) {
        var a = this;
        app.request({
            url: api.article.details,
            data: {
                id: n.id,
                type: 1
            },
            method: "POST",
            success: function(n) {
                1 == n.code ? (a.setData({
                    info: n.data
                }), WxParse.wxParse("article", "html", n.data.content, a, 5)) : wx.showToast({
                    title: "获取失败",
                    icon: "none"
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});