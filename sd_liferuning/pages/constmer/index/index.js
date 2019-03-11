var api = require("../../../../api.js"), QQMapWX = require("../../../../qqmap-wx.js"), app = getApp();

function scrollIconGroupAction(t) {
    var e = t.page;
    setTimeout(function() {
        e.setData({
            currentScrollIcon: 3 <= e.data.currentScrollIcon++ ? 1 : e.data.currentScrollIcon
        }), scrollIconGroupAction({
            page: e
        });
    }, 3e3);
}

function getAuthor() {
    wx.getLocation({
        type: "wgs84",
        success: function(t) {
            t.latitude, t.longitude, t.speed, t.accuracy;
        }
    }), wx.getSetting({
        success: function(t) {
            t.authSetting["scope.userLocation"] || openSetting();
        }
    });
}

function openSetting() {
    wx.openSetting({
        success: function(t) {
            t.authSetting["scope.userLocation"] || showRemind();
        },
        fail: function(t) {
            t.authSetting["scope.userLocation"] || showRemind();
        }
    });
}

Page({
    data: {
        imgurl: app.imgurl,
        panel: 0,
        carryIndex: 0,
        weight: 1,
        worth: 10,
        wareText: "",
        authStatus: !0,
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        iphoneModule: !1,
        currentScrollIcon: 1,
        webRoot: app.webRoot,
        markers: [],
        scrolltype: "left",
        school:1
    },
    bindscroll: function(t) {
        t.detail.scrollWidth;
        110 < t.detail.scrollLeft ? this.setData({
            scrolltype: "right"
        }) : this.setData({
            scrolltype: "left"
        });
    },
    bannerurl: function(t) {
        var e = t.currentTarget.dataset.url;
        "wxapp" == t.currentTarget.dataset.type ? wx.navigateToMiniProgram({
            appId: e,
            path: "",
            extraData: {},
            success: function(t) {}
        }) : wx.navigateTo({
            url: e
        });
    },
    onReady: function() {
        var t = wx.getSystemInfoSync(), e = t.model.split(" ")[0];
        t.system.split(".")[0].split(" ")[1];
        "iPhone" == e && this.setData({
            iphoneModule: !0,
            panel: 0
        }), scrollIconGroupAction({
            page: this
        }), this.getLocaltion();
    },
    telClick: function(t) {
        wx.makePhoneCall({
            phoneNumber: t.currentTarget.dataset.tel
        });
    },
    switchPanel: function(t) {
        var e = t.currentTarget.dataset.panel;
        this.setData({
            panel: e
        });
    },
    changeInputData: function(t) {
        var e = t.currentTarget.dataset.name, a = t.detail.value;
        "wareText" == e && this.setData({
            wareText: a
        });
    },
    checkCarryItem: function(t) {
        var e = t.currentTarget.dataset.index;
        this.setData({
            carryIndex: e
        });
    },
    pickerSelector: function(t) {
        var e = this, a = t.currentTarget.dataset.type, n = t.detail.value;
        "weight" == a && e.setData({
            weight: e.data.weightArr[n]
        }), "worth" == a && e.setData({
            worth: e.data.worthArr[n]
        });
    },
    navToPage: function(t) {
        var e = t.currentTarget.dataset.pagetype, a = this.findPageByPageType(e) + "?id=" + t.currentTarget.dataset.id + "&cid=" + t.currentTarget.id;
        this.isLogin() ? wx.navigateTo({
            url: a
        }) : this.gotoLogin();
    },
    findPageByPageType: function(a) {
        var t = this.data.pageUrlArr, n = null;
        return t.forEach(function(t, e) {
            a == t.id && (n = t.pageUrl);
        }), n;
    },
    navToUserPage: function(t) {
        this.isLogin() ? wx.navigateTo({
            url: "/sd_liferuning/pages/constmer/user/index"
        }) : this.gotoLogin();
    },
    naveClick: function(t) {
        app.navigatorClick(t, this);
    },
    setSearch: function(t) {
        this.setData({
            search: t.detail.value
        });
    },
    searchAct: function() {
        var t = this.data.pageConfig.mainConfig.searchConfig.searchLinkedUrl, e = this.data.search ? this.data.search : "";
        wx.navigateTo({
            url: t + "?wareText=" + e
        });
    },
    onShow: function() {
        this.loadpage();
    },
    onLoad: function(t) {
        app.pageOnLoad(this), wx.getStorageSync("access_token") && app.request({
            url: api.user.loginGrow,
            method: "POST",
            success: function(t) {}
        });
    },
    loadpage: function() {
        var i = this;
        if (wx.getStorageSync("index")) {
            var t = wx.getStorageSync("index"), e = t.index_template;
            wx.setNavigationBarTitle({
                title: e.titleConfig.pageTitle
            }), wx.setNavigationBarColor({
                frontColor: e.titleConfig.fontColor.toLocaleLowerCase(),
                backgroundColor: e.titleConfig.navigationBgColor,
                animation: {
                    duration: 400,
                    timingFunc: "easeIn"
                }
            }), i.setData({
                indexdata: t,
                notice: t.article,
                pageConfig: e,
                authorize: t.authorize,
                forward: t.forward,
                name: e.titleConfig.pageTitle
            });
            
        }
        app.request({
            method: "POST",
            url: api.default.getIndexData,
            success: function(t) {
                var e = t.data.index_template;
                wx.setStorageSync("index", t.data), wx.setNavigationBarTitle({
                    title: e.titleConfig.pageTitle
                }), wx.setNavigationBarColor({
                    frontColor: e.titleConfig.fontColor.toLocaleLowerCase(),
                    backgroundColor: e.titleConfig.navigationBgColor,
                    animation: {
                        duration: 400,
                        timingFunc: "easeIn"
                    }
                });
                var a = [], n = t.data.location;
                for (var o in n) {
                    o = n[o];
                    a[a.length] = {
                        id: a.length,
                        latitude: parseFloat(o.latitude),
                        longitude: parseFloat(o.longitude),
                        iconPath: o.iconPath,
                        width: parseInt(o.width),
                        height: parseInt(o.height)
                    };
                }
                i.setData({
                    notice: t.data.article,
                    pageConfig: e,
                    authorize: t.data.authorize,
                    forward: t.data.forward,
                    name: e.titleConfig.pageTitle,
                    markers: a
                });
              console.log(i.data.pageConfig);
            }
        }), wx.getStorage({
            key: "access_token",
            fail: function(t) {
                i.setData({
                    authStatus: !1
                });
            }
        });
    },
    onShareAppMessage: function(t) {
        var e = wx.getStorageSync("index").forward_title;
        return setTimeout(function() {
            app.request({
                url: api.coupon.forward,
                method: "POST",
                success: function(t) {
                    1 == t.code && wx.showToast({
                        title: "领取成功",
                        icon: "success",
                        duration: 2e3
                    });
                }
            });
        }, 2e3), {
            title: e || "您的好友" + wx.getStorageSync("user").nickname + "邀您加入" + this.data.name,
            imageUrl: this.data.forward ? this.data.forward : this.data.authorize,
            desc: "发现一个很好的应用",
            path: "sd_liferuning/pages/constmer/index/index",
            success: function(t) {}
        };
    },
    isLogin: function() {
        return !0;
    },
    gotoLogin: function() {
        wx.redirectTo({
            url: "/sd_liferuning/pages/login/index"
        });
    },
    getUserInfo: function(t) {
        var e = this, a = t.detail;
        if (!a.iv) return wx.showModal({
            title: "提示",
            content: "请点击同意,请重试",
            showCancel: !1
        }), !1;
        wx.showLoading({
            title: "请稍后"
        }), wx.login({
            success: function(t) {
                t = t.code;
                app.request({
                    url: api.user.login,
                    method: "post",
                    data: {
                        code: t,
                        iv: a.iv,
                        encryptedData: a.encryptedData,
                        school:e.data.school
                    },
                    success: function(t) {
                        1 == t.code ? (wx.setStorageSync("access_token", t.data.access_token),
                          wx.setStorageSync("user", t.data), 
                          wx.setStorageSync('school', e.data.school),
                        e.setData({
                          
                            authStatus: !0
                        }), wx.hideLoading()) : (wx.hideLoading(), wx.showToast({
                            title: "请重试",
                            icon: "none"
                        }));
                    }
                });
            }
        });
    },
  radioChange:function(e){
    this.setData({
      school:e.detail.value
    });
  },
    closePanel: function() {
        this.setData({
            authStatus: !0
        });      
    },
    getLocaltion: function() {
        var e = this;
        wx.getLocation({
            type: "wgs84",
            success: function(t) {
                e.setData({
                    mapData: t
                });
            }
        });
    }
});