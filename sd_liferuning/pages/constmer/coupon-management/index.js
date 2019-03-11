var app = getApp(), api = require("../../../../api.js");

Page({
    data: {
        couponArr: [],
        webRoot: app.webRoot
    },
    onShow: function() {
        app.pageOnLoad(this);
        var t = this;
        t.setData({
            site: wx.getStorageSync("site")
        }), app.request({
            url: api.coupon.my_coupon,
            method: "post",
            data: {},
            success: function(a) {
                1 == a.code && t.setData({
                    couponArr: a.data
                });
            }
        });
    }
});