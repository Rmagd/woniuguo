var api = require("../../../../api.js"), QQMapWX = require("../../../../qqmap-wx.js"), app = getApp();

Page({
    data: {
        phoneNumber: "",
        sharePosterPanel: !1,
        pic: ""
    },
    navToUser: function() {
        wx.navigateTo({
            url: "/sd_liferuning/pages/constmer/user-info/index"
        });
    },
    callPhone: function() {
        var a = this;
        app.request({
            url: api.default.getPhone,
            data: {
                bid: wx.getStorageSync("bid")
            },
            success: function(e) {
                a.setData({
                    phoneNumber: e.data.phone
                }), wx.makePhoneCall({
                    phoneNumber: a.data.phoneNumber
                });
            }
        });
    },
    naveClick: function(e) {
        app.navigatorClick(e, this);
    },
    onShow: function() {
        var e = this;
        e.setData({
            head: wx.getStorageSync("head"),
            nickname: wx.getStorageSync("nickname"),
            site: wx.getStorageSync("site")
        });
        var a = wx.getStorageSync("member");
        a ? e.setData(a) : wx.showLoading({
            title: "请稍后"
        }), e.member();
    },
    member: function() {
        var t = this, s = {};
        app.request({
            url: api.user.UserMember,
            data: {
                bid: wx.getStorageSync("bid")
            },
            success: function(a) {
                app.request({
                    url: api.order.Is_ShenHe,
                    data: {
                        uid: wx.getStorageSync("uid"),
                        bid: wx.getStorageSync("bid")
                    },
                    success: function(e) {
                        t.setData({
                            is_status: e.code
                        }), 0 == e.code ? (t.setData({
                            userConfig: e.data
                        }), s.userConfig = e.data) : 99 == e.code ? (t.setData({
                            userConfig: e.data
                        }), s.userConfig = e.data) : (s.is_status = e.code, t.setData({
                            userConfig: a.data
                        }), s.userConfig = a.data), wx.setStorageSync("member", s);
                    }
                });
            }
        }), app.request({
            url: api.user.membertag,
            data: {
                uid: wx.getStorageSync("uid"),
                bid: wx.getStorageSync("bid")
            },
            success: function(e) {
                t.setData({
                    tag: e.data
                }), s.tag = e.data, wx.setStorageSync("member", s);
            }
        }), app.request({
            url: api.member.show,
            data: {
                uid: wx.getStorageSync("uid")
            },
            method: "post",
            success: function(e) {
                var a = e.data;
                if (100 == e.code) ; else {
                    a = e.data;
                    t.setData({
                        pic: a
                    }), s.pic = e.data, wx.setStorageSync("member", s);
                }
            }
        }), wx.hideLoading();
    },
    onLoad: function() {
        app.pageOnLoad(this);
        this.setData({
            icons: wx.getStorageSync("site") + "/addons/sd_liferuning/tp/public/uploads/background"
        });
    },
    openSharePosterPanel: function() {
        var a = this;
        a.data.sharePosterPanel;
        wx.showLoading({
            title: "请稍后",
            success: function() {
                app.request({
                    url: api.user.qrcode,
                    data: {
                        uid: wx.getStorageSync("uid"),
                        bid: wx.getStorageSync("bid")
                    },
                    success: function(e) {
                        1 == e.code ? (wx.hideLoading(), a.setData({
                            sharePosterPanel: !0,
                            qrcode: e.src
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