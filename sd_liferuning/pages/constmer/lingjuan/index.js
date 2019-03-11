var app = getApp(), api = require("../../../../api.js");

Page({
    data: {
        showList: !0,
        couponArr: [],
        webRoot: app.webRoot
    },
    onShow: function() {
        app.pageOnLoad(this);
        this.setData({
            site: wx.getStorageSync("site")
        }), this.getRedList();
    },
    getRedList: function() {
        var o = this;
        console.log(api.coupon.index), app.request({
            url: api.coupon.index,
            method: "post",
            data: {},
            success: function(t) {
                console.log("ling juan", t);
                for (var e = t.data, a = 0; a < e.length; a++) e[a].start_time = e[a].start_time.replace(/-/g, "."), 
                e[a].end_time = e[a].end_time.replace(/-/g, ".");
                1 == t.code ? o.setData({
                    couponArr: e
                }) : o.setData({
                    showList: !1
                });
            }
        });
    },
    receive: function(t) {
        var e = this, a = t.currentTarget.dataset.id, o = t.currentTarget.dataset.money;
        t.target.dataset.createtime, t.target.dataset.pasttime;
        app.request({
            url: api.coupon.receive,
            method: "post",
            data: {
                id: a
            },
            success: function(t) {
                1 == t.code ? (wx.showModal({
                    title: "提示",
                    content: "恭喜你获得" + o + "元红包",
                    showCancel: !1
                }), e.getRedList()) : wx.showModal({
                    title: "提示",
                    content: t.msg,
                    showCancel: !1
                });
            }
        });
    }
});