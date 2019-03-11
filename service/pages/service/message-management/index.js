var api = require("../../../../api.js"), app = getApp();

Page({
    data: {
        data: [],
        page: 1
    },
    onShow: function() {
        this.list();
    },
    list: function() {
        var s = this, a = s.data.page;
        wx.showLoading(), app.request({
            url: api.runner.getNews,
            method: "post",
            data: {
                page: a
            },
            success: function(a) {
                console.log(a);
                for (var t = s.data.data, e = (a = a.data.data, 0); e < a.length; e++) t.push(a[e]);
                s.setData({
                    data: t
                }), wx.hideLoading();
            }
        });
    },
    onReachBottom: function(a) {
        console.log(a);
        var t = this.data.page;
        t++, this.setData({
            page: t
        }), this.list();
    }
});