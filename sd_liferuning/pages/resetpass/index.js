Page({
    data: {
        phoneNumber: null,
        identifyingCode: null,
        passWord: null,
        repassWord: null,
        btnType: 1,
        defaultWaitTime: 60,
        waitTime: null,
        defaultWaitText: "验证",
        waitInterval: null
    },
    onLoad: function(e) {},
    changeUserType: function(e) {
        console.log(e.currentTarget.dataset.usertype), this.setData({
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
    getIdentifyingCode: function() {
        var t = this, e = new RegExp("^[1][3,5,8][0-9]{9}$"), a = wx.getStorageSync("bid");
        if (!e.test(t.data.phoneNumber)) return wx.showToast({
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
                bid: a,
                phone: t.data.phoneNumber
            },
            success: function(e) {
                t.setData({
                    Smscode: e.code
                });
            }
        });
    },
    sendRequest: function() {
        var e = this;
        e.validate() && app.request({
            url: api.default.reset,
            method: "post",
            data: {
                phone: e.data.phoneNumber,
                password: e.data.passWord,
                type: e.data.userType,
                bid: wx.getStorageSync("bid")
            },
            success: function(e) {
                1 == e.code ? (wx.removeStorageSync("cash"), wx.removeStorageSync("phone"), wx.showToast({
                    title: e.msg,
                    duration: 2e3,
                    success: function() {
                        setTimeout(function() {
                            wx.navigateTo({
                                url: "../login/index"
                            });
                        }, 2e3);
                    }
                })) : wx.showToast({
                    title: e.msg,
                    icon: "none",
                    mask: !0
                });
            }
        });
    },
    validate: function() {
        var e = this;
        return new RegExp("^[1][3,5,8][0-9]{9}$").test(e.data.phoneNumber) ? (console.log(e.data.identifyingCode), 
        !e.data.identifyingCode || e.data.identifyingCode.length <= 0 ? (wx.showToast({
            title: "验证码不得为空",
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