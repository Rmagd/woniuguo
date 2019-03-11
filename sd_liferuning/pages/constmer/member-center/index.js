var api = require("../../../../api.js"), app = getApp();

Page({
    data: {
        imgurl: app.imgurl,
        levelArr: [],
        head: wx.getStorageSync("user").avatar_url,
        data: "",
        icons: "",
        juli: "",
        webRoot: app.webRoot
    },
    navTo: function(a) {
        var e = this;
        e.data.data;
        if (0 == e.data.data.expire_time) var t = e.data.data.expire_time; else {
            t = new Date(e.data.data.expire_time);
            var r = Date.parse(t);
        }
        app.request({
            url: api.store.getTime,
            data: {},
            method: "post",
            success: function(e) {
                0 == t ? app.navTo(a.currentTarget.dataset.url) : r >= 1e3 * e.data.time ? wx.showToast({
                    title: "会员未到期，无需再次购买",
                    icon: "none",
                    mask: !0
                }) : app.navTo(a.currentTarget.dataset.url);
            }
        });
    },
    onLoad: function() {
        this.setData({
            icons: wx.getStorageSync("site") + "/addons/sd_liferuning/tp/public/uploads/background"
        });
    },
    onShow: function() {
        var m = this;
        app.request({
            url: api.user.vipInfo,
            data: {},
            method: "post",
            success: function(e) {
                console.log("rererea", e.data);
                var a = e.data, t = [], r = "";
                1 == a.member_grade ? r = 1e3 : 2 == a.member_grade ? r = 2e3 : 3 == a.member_grade ? r = 3e3 : 4 == a.member_grade ? r = 4e3 : 5 == a.member_grade && (r = 5e3);
                for (var o = r - a.hyintegral, s = a.member_grow, n = .02 * s, i = 7 * n - 32.5, d = 1; d < 6; d++) t.push({
                    defaultImg: m.data.icons + "/resource/common/image/customer/member-center/level" + d + ".png",
                    activeImg: m.data.icons + "/resource/common/image/customer/member-center/level" + d + "_1.png",
                    needScore: 1e3 * (d - 1)
                });
                0 == o && (o = 1e3), e.data.juli = o, m.setData({
                    levelArr: t,
                    currentScore: s,
                    progressPercent: n,
                    mark: i,
                    data: e.data
                });
            }
        });
    }
});