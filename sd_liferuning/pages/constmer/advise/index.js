var api = require("../../../../api.js"), app = getApp();

Page({
    data: {
        imgurl: app.imgurl,
        userAdvise: {
            value: "",
            cursor: 0
        },
        message: "",
        id: "",
        display: "none",
        display_1: "none",
        display_2: "none",
        display_3: "none",
        display_4: "none",
        display_5: "none",
        xingshow: !1
    },
    onLoad: function(a) {
        console.log(a.id, "-----"), a.id && this.setData({
            id: a.id,
            xingshow: !0
        });
    },
    show_this: function(a) {
        var t = this;
        1 == a.target.dataset.num && (this.setData({
            display_1: "block"
        }), t.setData({
            xing: a.target.dataset.num
        })), 2 == a.target.dataset.num && (this.setData({
            display_1: "block",
            display_2: "block"
        }), t.setData({
            xing: a.target.dataset.num
        })), 3 == a.target.dataset.num && (this.setData({
            display_1: "block",
            display_2: "block",
            display_3: "block"
        }), t.setData({
            xing: a.target.dataset.num
        })), 4 == a.target.dataset.num && (this.setData({
            display_1: "block",
            display_2: "block",
            display_3: "block",
            display_4: "block"
        }), t.setData({
            xing: a.target.dataset.num
        })), 5 == a.target.dataset.num && (this.setData({
            display_1: "block",
            display_2: "block",
            display_3: "block",
            display_4: "block",
            display_5: "block"
        }), t.setData({
            xing: a.target.dataset.num
        })), console.log(a.target.dataset.num);
    },
    hide_this: function(a) {
        var t = this;
        5 == a.target.dataset.num && (this.setData({
            display_1: "block",
            display_2: "block",
            display_3: "block",
            display_4: "block",
            display_5: "block"
        }), t.setData({
            xing: a.target.dataset.num
        })), 4 == a.target.dataset.num && (this.setData({
            display_5: "none"
        }), t.setData({
            xing: a.target.dataset.num
        })), 3 == a.target.dataset.num && (this.setData({
            display_4: "none",
            display_5: "none"
        }), t.setData({
            xing: a.target.dataset.num
        })), 2 == a.target.dataset.num && (this.setData({
            display_3: "none",
            display_4: "none",
            display_5: "none"
        }), t.setData({
            xing: a.target.dataset.num
        })), 1 == a.target.dataset.num && (this.setData({
            display_2: "none",
            display_3: "none",
            display_4: "none",
            display_5: "none"
        }), t.setData({
            xing: a.target.dataset.num
        }));
    },
    userInput: function(a) {
        var t = a.detail.value, e = a.detail.cursor;
        this.setData({
            userAdvise: {
                value: t,
                cursor: e
            }
        });
    },
    message: function() {
        var a = this, t = a.data.userAdvise.value;
        return t ? t.length < 5 ? (wx.showToast({
            title: "反馈意见不能小于5个字",
            icon: "none",
            duration: 1e3
        }), !1) : void (a.data.id ? app.request({
            url: api.user.feedback,
            data: {
                msg: a.data.userAdvise.value
            },
            success: function(a) {
                1 === a.code ? (wx.showToast({
                    title: "反馈成功",
                    icon: "succes",
                    duration: 1e3,
                    mask: !0
                }), setTimeout(function() {
                    wx.hideLoading(), wx.navigateBack({
                        delta: 1
                    });
                }, 1e3)) : wx.showToast({
                    title: "失败",
                    icon: "none",
                    duration: 1e3,
                    mask: !1
                });
            }
        }) : app.request({
            url: api.user.feedback,
            data: {
                msg: a.data.userAdvise.value
            },
            success: function(a) {
                1 === a.code ? (wx.showToast({
                    title: "反馈成功",
                    icon: "succes",
                    duration: 1e3,
                    mask: !0
                }), setTimeout(function() {
                    wx.hideLoading(), wx.navigateBack({
                        delta: 1
                    });
                }, 1e3)) : wx.showToast({
                    title: "失败",
                    icon: "none",
                    duration: 1e3,
                    mask: !1
                });
            }
        })) : (wx.showToast({
            title: "反馈意见不能为空",
            icon: "none",
            duration: 1e3
        }), !1);
    }
});