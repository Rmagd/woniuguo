var app = getApp(), api = require("../../../api.js");

Page({
    data: {
        userType: null,
        phoneNumber: null,
        identifyingCode: null,
        passWord: null,
        repassWord: null,
        btnType: 1,
        defaultWaitTime: 3,
        waitTime: null,
        defaultWaitText: "验证",
        waitInterval: null
    },
    onLoad: function(e) {
        this.setData({
            userType: e.userType
        });
    },
    changeUserType: function(e) {
        this.setData({
            userType: e.currentTarget.dataset.usertype
        });
    },
    changeInputData: function(e) {
        var t = this, a = e.currentTarget.dataset.name, n = e.detail.value;
        "phoneNumber" == a && t.setData({
            phoneNumber: n
        }), "identifyingCode" == a && t.setData({
            identifyingCode: n
        }), "passWord" == a && t.setData({
            passWord: n
        }), "repassWord" == a && t.setData({
            repassWord: n
        });
    },
    getIdentifyingCode: function(e) {
        var t = this;
        if (!new RegExp("^[1][3,5,7,6,8][0-9]{9}$").test(t.data.phoneNumber)) return wx.showToast({
            title: "手机号不正确",
            icon: "none",
            mask: !0
        }), !1;
        t.setData({
            btnType: 0,
            waitTime: t.data.defaultWaitTime,
            waitInterval: setInterval(function() {
                t.data.waitTime <= 0 && (clearInterval(t.data.waitInterval), t.setData({
                    btnType: 1
                })), t.setData({
                    waitTime: --t.data.waitTime
                });
            }, 1e3)
        }), app.request({
            url: api.default.checkcode,
            method: "post",
            data: {
                bid: wx.getStorageSync("bid"),
                phone: t.data.phoneNumber
            },
            success: function(e) {
                t.setData({
                    Smscode: e.code
                });
            }
        });
    },
    UserInfo: function(t) {
        wx.login({
            success: function(e) {
                wx.request({
                    url: api.default.user,
                    method: "POST",
                    data: {
                        bid: wx.getStorageSync("bid"),
                        utoken: "",
                        code: e.code,
                        encryptedData: t.encryptedData,
                        iv: t.iv
                    },
                    success: function(e) {
                        10 == e.data.success && (wx.setStorageSync("openid", e.data.openid), wx.request({
                            url: api.default.userid,
                            method: "POST",
                            data: {
                                openid: e.data.openid
                            },
                            success: function(e) {
                                wx.setStorageSync("uid", e.data.data), wx.setStorageSync("head", e.data.head), wx.setStorageSync("nickname", e.data.nickname);
                            }
                        }));
                    }
                });
            }
        });
    },
    sendRequest: function(e) {
        var t = this;
        t.UserInfo(e.detail), t.validate() && app.request({
            url: api.default.userreg,
            method: "post",
            data: {
                uid: wx.getStorageSync("uid"),
                phone: t.data.phoneNumber,
                password: t.data.passWord,
                type: this.data.userType,
                bid: wx.getStorageSync("bid")
            },
            success: function(e) {
                console.log(e), 1 == e.code ? wx.showToast({
                    title: e.msg,
                    duration: 2e3,
                    success: function() {
                        setTimeout(function() {
                            wx.navigateTo({
                                url: "../login/index"
                            });
                        }, 2e3);
                    }
                }) : wx.showToast({
                    title: e.msg,
                    icon: "none",
                    mask: !0
                });
            }
        });
    },
    validate: function() {
        var e = this;
        return new RegExp("^[1][3,5,7,6,8][0-9]{9}$").test(e.data.phoneNumber) ? (console.log(e.data.identifyingCode), 
        !e.data.identifyingCode || e.data.identifyingCode.length <= 0 ? (wx.showToast({
            title: "验证码不得为空",
            icon: "none",
            mask: !0
        }), !1) : e.data.identifyingCode != e.data.Smscode ? (wx.showToast({
            title: "验证码不正确",
            icon: "none",
            mask: !0
        }), !1) : !e.data.passWord || e.data.passWord.length <= 0 ? (wx.showToast({
            title: "密码不得为空",
            icon: "none",
            mask: !0
        }), !1) : e.data.repassWord == e.data.passWord || (wx.showToast({
            title: "确认密码有误",
            icon: "none",
            mask: !0
        }), !1)) : (wx.showToast({
            title: "手机号不正确",
            icon: "none",
            mask: !0
        }), !1);
    }
});