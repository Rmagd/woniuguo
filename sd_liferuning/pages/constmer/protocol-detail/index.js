var app = getApp(), api = require("../../../../api.js"), WxParse = require("../../../../wxParse/wxParse.js");

Page({
    data: {},
    onLoad: function(e) {
        var a = this;
        app.request({
            url: api.article.details,
            method: "POST",
            data: {
                type: e.type
            },
            success: function(e) {
                console.log("xieyi", e), 1 === e.code && (a.setData({
                    info: e.data
                }), WxParse.wxParse("article", "html", e.data.content, a, 5));
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