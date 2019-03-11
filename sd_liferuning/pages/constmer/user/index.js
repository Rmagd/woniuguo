var api = require("../../../../api.js"), QQMapWX = require("../../../../qqmap-wx.js"), app = getApp();

Page({
    data: {
        phoneNumber: "",
        sharePosterPanel: !1,
        webRoot: app.webRoot,
        phone: "",
        webview: !1
    },
    navTo: function(e) {
        clearTimeout, app.navTo(e.currentTarget.dataset.url);
    },
    navToUser: function() {
        wx.navigateTo({
            url: "/sd_liferuning/pages/constmer/user-info/index"
        });
    },
    callPhone: function(e) {
        wx.makePhoneCall({
            phoneNumber: e.currentTarget.dataset.phone
        });
    },
    telClick: function(e) {
        wx.makePhoneCall({
            phoneNumber: e.currentTarget.dataset.tel
        });
    },
    naveClick: function(e) {
        app.navigatorClick(e, this);
    },
    onShow: function() {
        this.menu_template();
        var e = wx.getStorageSync("menu_template") ? wx.getStorageSync("menu_template") : "";
        wx.getStorageSync("menu_template") && this.setData({
            userConfig: e
        });
    },
    menu_template: function() {
        var n = this;
        app.request({
            url: api.default.menu_template,
            method: "POST",
            success: function(t) {
                app.request({
                    url: api.user.judge_type,
                    method: "POST",
                    success: function(e) {
                        for (var a in t.data.menus) "模块管理" == t.data.menus[a].name && 1 == e.code ? t.data.menus[a].url = "/service/pages/module-mananger/index/index" : "模块管理" == t.data.menus[a].name && 99 == e.code ? t.data.menus[a].url = "/service/pages/module-mananger/index/index" : "模块管理" == t.data.menus[a].name && 0 == e.code && (t.data.menus[a].url = "/service/pages/module-mananger/authentication/index");
                        1 == t.code ? (n.setData({
                            userConfig: t.data
                        }), wx.setStorageSync("menu_template", t.data)) : wx.showToast({
                            title: "请求失败",
                            icon: "none"
                        });
                    }
                });
            }
        });
    },
    check_phone: function(e) {
        var a = this, t = e.currentTarget.dataset.url;
        app.request({
            url: api.user.wx_official_openid,
            method: "POST",
            success: function(e) {
                1 == e.code ? a.setData({
                    weburl: e.data.url,
                    webview: !0
                }) : app.request({
                    url: api.apply.check,
                    method: "POST",
                    success: function(e) {
                        console.log(e), 2 === e.code ? app.navTo("/sd_liferuning/pages/constmer/juese/index") : 3 === e.code ? wx.showModal({
                            title: "提示",
                            content: e.msg,
                            showCancel: !1,
                            success: function(e) {}
                        }) : 4 === e.code ? wx.showModal({
                            title: "提示",
                            content: e.msg + "," + e.remarks,
                            showCancel: !0,
                            confirmText: "重新认证",
                            success: function(e) {
                                e.confirm && app.navTo("/sd_liferuning/pages/constmer/juese/index");
                            }
                        }) : 5 === e.code ? wx.showModal({
                            title: "提示",
                            content: e.msg + ",是否去缴纳保证金",
                            showCancel: !0,
                            confirmText: "去缴纳",
                            success: function(e) {
                                e.confirm && app.navTo("../../../../service/pages/service/userauth-pay/index");
                            }
                        }) : 6 === e.code ? wx.showModal({
                            title: "提示",
                            content: e.msg,
                            showCancel: !0,
                            confirmText: "确定",
                            success: function(e) {}
                        }) : wx.reLaunch({
                            url: t
                        });
                    }
                });
            }
        });
    },
    onLoad: function() {
        app.pageOnLoad(this), this.setData({
            userinfo: wx.getStorageSync("user"),
            schoolImg: 'https://wn.meripet.cn/addons/sd_135K/core/public/WeChat/schools/' + wx.getStorageSync("school") + '.png'
        });
        console.log(this.data.schoolImg);
    },
    openSharePosterPanel: function() {
        var a = this;
        a.data.sharePosterPanel;
        wx.showLoading({
            title: "请稍后",
            success: function() {
                app.request({
                    url: api.user.getQrcode,
                    method: "post",
                    data: {},
                    success: function(e) {
                        1 == e.code ? (wx.hideLoading(), console.log(e.data.img), a.setData({
                            sharePosterPanel: !0,
                            qrcode: e.data.img
                        })) : (wx.hideLoading(), wx.showToast({
                            title: "请重新点击生成",
                            duration: 1e3,
                            icon: "none"
                        }));
                    }
                });
            }
        });
    },
    closeSharePosterPanel: function() {
        this.data.sharePosterPanel;
        this.setData({
            sharePosterPanel: !1
        });
    },
    saveImage: function(e) {
        var t = this, a = e.currentTarget.dataset.url;
        wx.downloadFile({
            url: a,
            success: function(e) {
                if (200 === e.statusCode) {
                    var a = e.tempFilePath;
                    wx.saveImageToPhotosAlbum({
                        filePath: a,
                        success: function() {
                            wx.showToast({
                                icon: "none",
                                title: "保存成功"
                            });
                        },
                        complete: function() {
                            t.closeSharePosterPanel();
                        }
                    });
                }
            }
        });
    }
});