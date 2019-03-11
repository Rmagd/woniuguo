var app = getApp(), api = require("../../../api.js");

function countdown(t) {
    var e = t.data.countdown_time;
    if (0 != e) setTimeout(function() {
        t.setData({
            countdown_time: e - 1
        }), countdown(t);
    }, 1e3); else t.setData({
        showtime1: !0,
        showtime2: !1,
        reg_hqyzm: "重新获取",
        countdown_time: 60
    });
}

Page({
    data: {
        bindcolor: !1,
        phone: "",
        yzm: "",
        yhmima: "",
        showtime1: !0,
        showtime2: !1,
        reg_hqyzm: "获取验证码",
        countdown_time: 60,
        webRoot: app.webRoot,
        winWidth: 0,
        winHeight: 0,
        currentTab: 0
    },
    reset: function() {
        wx.navigateTo({
            url: "../reset/reset"
        });
    },
    reg_yanzhengma_huoqu: function() {
        var t = this.data.phone;
        if (0 == t.length) return wx.showToast({
            title: "手机号不能为空",
            icon: "none"
        }), !1;
        if (t.length < 11) return wx.showToast({
            title: "手机号长度有误！",
            icon: "none"
        }), !1;
        if (!/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(19[8-9]{1})|(17[0-9]{1}))+\d{8})$/.test(t)) return wx.showToast({
            title: "手机号有误！",
            icon: "none"
        }), !1;
        this.setData({
            showtime1: !1,
            showtime2: !0
        });
        var e = this;
        app.request({
            url: api.user.send_sms,
            method: "post",
            data: {
                phone: t
            },
            success: function(t) {
                console.log("验证码", t), 0 != t.code ? (0 < t.code && wx.showToast({
                    title: "发送成功",
                    icon: "success"
                }), e.setData({
                    yzm: t.code
                })) : wx.showToast({
                    title: "网络错误，错误码1005",
                    icon: "loading",
                    duration: 2e3
                });
            }
        }), countdown(this);
    },
    onLoad: function() {
        this.setData({
            icons: wx.getStorageSync("site") + "/addons/sd_liferuning/tp/public/uploads/background"
        }), app.pageOnLoad(this);
    },
    showok: function(t) {
        if (console.log("shuru", t.detail.value.yz), console.log("fa", this.data.yzm), "" == t.detail.value.yz) return wx.showToast({
            title: "请输入验证码",
            icon: "none"
        }), !1;
        app.request({
            url: api.user.binding_phone,
            method: "post",
            data: {
                phone: this.data.phone,
                code: this.data.yhmima
            },
            success: function(t) {
                console.log(t), 1 == t.code ? wx.showToast({
                    title: "绑定成功",
                    duration: 2e3,
                    success: function() {
                        setTimeout(function() {
                            wx.setStorageSync("phone", t.phone), wx.redirectTo({
                                url: "/sd_liferuning/pages/constmer/index/index"
                            });
                        }, 2e3);
                    }
                }) : wx.showToast({
                    title: t.msg,
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    blur1: function(t) {
        this.setData({
            phone: t.detail.value
        });
    },
    blur2: function(t) {
        this.setData({
            yhmima: t.detail.value
        });
        var e = this.data.yhname, o = this.data.yhmima;
        "" == e || "" == o ? this.setData({
            bindcolor: !1
        }) : this.setData({
            bindcolor: !0
        });
    },
    onShareAppMessage: function() {}
});