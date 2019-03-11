var api = require("../../../../api.js"), QQMapWX = require("../../../../qqmap-wx.js"), app = getApp();

Page({
    data: {
        imgurl: app.imgurl,
        orderid: "",
        display: "none",
        display_1: "none",
        display_2: "none",
        display_3: "none",
        display_4: "none",
        display_5: "none",
        content: "",
        xing: 0
    },
    onLoad: function(t) {
        this.setData({
            orderid: t.id
        });
    },
    onReady: function() {},
    onShow: function() {},
    text: function(t) {
        this.setData({
            content: t.detail.value
        });
    },
    subbtn: function() {
        var t = this, a = t.data.content;
        return 0 == t.data.xing ? (wx.showToast({
            title: "请给服务打星",
            icon: "none"
        }), !1) : "" == a ? (wx.showToast({
            title: "评价不可为空",
            icon: "none"
        }), !1) : void app.request({
            url: api.order.feedback,
            method: "POST",
            data: {
                oid: t.data.orderid,
                star: t.data.xing,
                msg: t.data.content
            },
            success: function(t) {
                1 == t.code ? wx.showToast({
                    title: "评价成功",
                    icon: "none",
                    success: function() {
                        setTimeout(function() {
                            wx.navigateBack({
                                delta: 1
                            });
                        }, 1500);
                    }
                }) : wx.showToast({
                    title: "已评价过",
                    icon: "none",
                    success: function() {}
                }), console.log(t);
            }
        });
    },
    show_this: function(t) {
        var a = this;
        1 == t.target.dataset.num && (this.setData({
            display_1: "block"
        }), a.setData({
            xing: t.target.dataset.num
        })), 2 == t.target.dataset.num && (this.setData({
            display_1: "block",
            display_2: "block"
        }), a.setData({
            xing: t.target.dataset.num
        })), 3 == t.target.dataset.num && (this.setData({
            display_1: "block",
            display_2: "block",
            display_3: "block"
        }), a.setData({
            xing: t.target.dataset.num
        })), 4 == t.target.dataset.num && (this.setData({
            display_1: "block",
            display_2: "block",
            display_3: "block",
            display_4: "block"
        }), a.setData({
            xing: t.target.dataset.num
        })), 5 == t.target.dataset.num && (this.setData({
            display_1: "block",
            display_2: "block",
            display_3: "block",
            display_4: "block",
            display_5: "block"
        }), a.setData({
            xing: t.target.dataset.num
        })), console.log(t.target.dataset.num);
    },
    hide_this: function(t) {
        var a = this;
        5 == t.target.dataset.num && (this.setData({
            display_1: "block",
            display_2: "block",
            display_3: "block",
            display_4: "block",
            display_5: "block"
        }), a.setData({
            xing: t.target.dataset.num
        })), 4 == t.target.dataset.num && (this.setData({
            display_5: "none"
        }), a.setData({
            xing: t.target.dataset.num
        })), 3 == t.target.dataset.num && (this.setData({
            display_4: "none",
            display_5: "none"
        }), a.setData({
            xing: t.target.dataset.num
        })), 2 == t.target.dataset.num && (this.setData({
            display_3: "none",
            display_4: "none",
            display_5: "none"
        }), a.setData({
            xing: t.target.dataset.num
        })), 1 == t.target.dataset.num && (this.setData({
            display_2: "none",
            display_3: "none",
            display_4: "none",
            display_5: "none"
        }), a.setData({
            xing: t.target.dataset.num
        }));
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});