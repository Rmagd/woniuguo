var app = getApp(), api = require("../../../../api.js");

Page({
    data: {
        imgurl: app.imgurl,
        show: !0,
        formindex: 0,
        inputdisabled: !1,
        name: "",
        identity: "",
        phone: "",
        card_front: "",
        card_back: "",
        license_front: "",
        license_back: "",
        health_front: "",
        certificate: "",
        settime: "",
        time: 60,
        yhmima: "",
        myschool:"",
      school: [
        "华南理工大学",
        "广东工业大学",
        "广州美术学院",
        "广州大学",
        "中山大学",
        "华南师范大学",
        "星海音乐学院",
        "广东药科大学",
        "广州中医药大学",
        "广东外语外贸大学"]
    },
    onLoad: function(t) {
        var a = this;
        this.setData({
            formindex: t.index
        }), app.request({
            url: api.apply.getInfo,
            method: "post",
            data: {},
            success: function(t) {
                a.setData({
                    name: t.data.name,
                    phone: t.data.phone,
                    inputdisabled: "" != t.data.phone,
                    identity: t.data.identity,
                    card_back: t.data.card_back,
                    card_front: t.data.card_front,
                    myschool: a.data.school[t.data.school],
                    health_front: t.data.health_front,
                    license_back: t.data.license_back,
                    license_front: t.data.license_front
                }), console.log(t.data.school);
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    settime: function() {
        var t = this, a = t.data.time;
        0 == a ? (t.setData({
            time: 60,
            show: !0
        }), clearInterval(t.data.settime)) : t.setData({
            time: a - 1
        });
    },
    Change: function() {
        var a = this;
        if ("" == a.data.yhmima) return wx.showToast({
            title: "请输入验证码",
            icon: "none"
        }), !1;
        app.request({
            url: api.user.userPhoneChange,
            method: "post",
            data: {
                code: a.data.yhmima
            },
            success: function(t) {
                1 == t.code ? (wx.showToast({
                    title: t.msg,
                    icon: "none",
                    mask: !0
                }), clearInterval(a.data.settime), a.setData({
                    phone: "",
                    inputdisabled: !1,
                    yhmima: "",
                    time: 60,
                    show: !0
                })) : wx.showToast({
                    title: t.msg,
                    icon: "none",
                    mask: !0
                });
            }
        });
    },
    btn: function() {
        var a = this, t = a.data.phone;
        if (0 == a.phone()) return !1;
        app.request({
            url: api.user.send_sms,
            method: "post",
            data: {
                phone: t
            },
            success: function(t) {
                if (console.log("验证码", t), 0 == t.code) return wx.showToast({
                    title: "1分钟后重新发送",
                    icon: "none",
                    mask: !1
                }), !1;
                0 < t.code && (wx.showToast({
                    title: "发送成功",
                    icon: "none",
                    mask: !1
                }), a.setData({
                    settime: setInterval(function() {
                        a.settime();
                    }, 1e3),
                    show: !1
                }));
            }
        });
    },
    blur: function(t) {
        "phone" == t.currentTarget.dataset.name ? this.setData({
            phone: t.detail.value
        }) : this.setData({
            yhmima: t.detail.value
        });
    },
    subbtn: function() {
        var t = this, a = t.data.formindex;
        if (console.log(t.data.identity), "" != t.data.identity) {
            if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(t.data.identity)) return wx.showToast({
                title: "身份证格式错误",
                icon: "none",
                mask: !0
            }), !1;
        }
        if (1 == a) {
            if (0 == t.phone()) return !1;
            var e = t.data.phone, n = t.data.yhmima;
            if ("" == e) return wx.showToast({
                title: "请输入手机号",
                icon: "none"
            }), !1;
            if ("" == n) return wx.showToast({
                title: "请输入验证码",
                icon: "none"
            }), !1;
            app.request({
                url: api.user.binding_phone,
                method: "post",
                data: {
                    phone: t.data.phone,
                    code: t.data.yhmima
                },
                success: function(t) {
                    console.log(t), 1 == t.code ? wx.showToast({
                        title: "绑定成功",
                        mask: !1,
                        success: function() {
                            setTimeout(function() {
                                wx.navigateBack({
                                    delta: 1
                                });
                            }, 1500);
                        }
                    }) : wx.showToast({
                        title: t.msg,
                        icon: "none",
                        mask: !1
                    });
                }
            });
        } else app.request({
            url: api.apply.editinfo,
            method: "post",
            data: {
                name: t.data.name,
                identity: t.data.identity,
                card_front: t.data.card_front,
                card_back: t.data.card_back,
                license_front: t.data.license_front,
                license_back: t.data.license_back,
                health_front: t.data.health_front
            },
            mothod: "POST",
            success: function(t) {
                1 == t.code ? (wx.showToast({
                    title: t.msg,
                    icon: "none",
                    mask: !0
                }), setTimeout(function() {
                    wx.navigateBack({
                        delta: 1
                    });
                }, 1500)) : wx.showToast({
                    title: t.msg,
                    icon: "none",
                    mask: !0
                });
            }
        });
    },
    changeInputData: function(t) {
        var a = this, e = t.currentTarget.dataset.name, n = t.detail.value;
        "name" == e && a.setData({
            name: n
        }), "identity" == e && a.setData({
            identity: n
        }), "carcodes" == e && a.setData({
            carcodes: n
        });
    },
    upimg: function(t) {
        var e = this, n = t.currentTarget.dataset.type, o = app.siteInfo.acid;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(t) {
                var a = t.tempFilePaths;
                wx.saveFile({
                    tempFilePath: a[0],
                    success: function(t) {
                        var a = t.savedFilePath;
                        console.log(a), wx.uploadFile({
                            url: api.apply.upload + "&_acid=" + o + "&access_token=" + wx.getStorageSync("access_token"),
                            filePath: a,
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            name: "file",
                            success: function(t) {
                                var a = JSON.parse(t.data);
                                if (1 == a.code) switch (n) {
                                  case "0":
                                    e.setData({
                                        card_front: a.data
                                    });
                                    break;

                                  case "1":
                                    e.setData({
                                        card_back: a.data
                                    });
                                    break;

                                  case "2":
                                    e.setData({
                                        license_front: a.data
                                    });
                                    break;

                                  case "3":
                                    e.setData({
                                        license_back: a.data
                                    });
                                    break;

                                  case "4":
                                    e.setData({
                                        health_front: a.data
                                    });
                                    break;

                                  case "5":
                                    e.setData({
                                        certificate: a.data
                                    });
                                } else wx.showModal({
                                    title: "提示",
                                    content: "图片上传失败",
                                    showCancel: !1
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    phone: function() {
        var t = this.data.phone;
        return 0 == t.length ? (wx.showToast({
            title: "手机号不能为空",
            icon: "none",
            mask: !1
        }), !1) : t.length < 11 ? (wx.showToast({
            title: "手机号长度有误！",
            icon: "none",
            mask: !1
        }), !1) : /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(19[8-9]{1})|(17[0-9]{1}))+\d{8})$/.test(t) ? void 0 : (wx.showToast({
            title: "手机号有误！",
            icon: "none",
            mask: !1
        }), !1);
    },
    onHide: function() {
        clearInterval(this.data.settime);
    },
    onUnload: function() {
        clearInterval(this.data.settime);
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});