var api, util = require("./utils/utils.js"), innerAudioContext = wx.createInnerAudioContext();

innerAudioContext.obeyMuteSwitch = !1;

var SoundRecordingPlay = function(t) {
    var e = t.src, o = t.duration, n = e;
    n && o && (innerAudioContext.src = n, innerAudioContext.play());
};

function ListeningNotify() {
    console.log("ListeningNotify"), new SendRequestGetNotifyStatus(), setTimeout(ListeningNotify, 2e3);
}

function SendRequestGetNotifyStatus() {
    1 == wx.getStorageSync("cash").cashstatus && "" != wx.getStorageSync("site") && "" != wx.getStorageSync("uid") && wx.getLocation({
        success: function(t) {
            wx.request({
                url: wx.getStorageSync("site") + "/addons/sd_liferuning/tp/api.php/order/playMsg",
                data: {
                    uid: wx.getStorageSync("uid"),
                    bid: wx.getStorageSync("bid"),
                    latitude: t.latitude,
                    longitude: t.longitude
                },
                success: function(t) {
                    1 == t.data.code && new SoundRecordingPlay({
                        src: wx.getStorageSync("site") + "/addons/sd_liferuning/tp/public/static/remind.mp3",
                        duration: "14"
                    });
                }
            });
        }
    });
}

App({
    socket_time: "",
    address_num: 0,
    address_type: !0,
    is_on_launch: !0,
    lookimg: [],
    model: 0,
    plug: 0,
    imgurl: "https://choarenpaotui.oss-cn-beijing.aliyuncs.com/paotuixcx/images/",
    defaultadd: 0,
    onLaunch: function() {
        this.setApi(), api = this.api, this.getUserDataToken(), this.Model(), this.jiance()
    },
    sendSocketMessage_104: function(t) {
        var e = wx.getStorageSync("access_token");
        wx.sendSocketMessage({
            data: JSON.stringify({
                access_token: e,
                code: 104,
                type: t
            }),
            success: function(t) {},
            fail: function(t) {}
        });
    },
    GetSetting: function() {
        wx.getSetting({
            success: function(t) {
                console.log(t, "---GetSetting"), t.authSetting["scope.userLocation"] || wx.authorize({
                    scope: "scope.userLocation",
                    success: function() {
                        console.log("成功调用");
                    },
                    fail: function() {
                        console.log("失败");
                    }
                });
            }
        });
    },
    jiance: function() {
        var e = this;
        if (e.request({
            url: api.platform.plug,
            data: "",
            method: "POST",
            success: function(t) {
                1 == t.code ? e.plug = t.data : e.plug = 0;
            },
            fail: function() {}
        }), wx.canIUse("getUpdateManager")) {
            var o = wx.getUpdateManager();
            o.onCheckForUpdate(function(t) {
                t.hasUpdate && (o.onUpdateReady(function() {
                    wx.showModal({
                        title: "更新提示",
                        content: "新版本已经准备好，是否重启应用？",
                        success: function(t) {
                            t.confirm && o.applyUpdate();
                        }
                    });
                }), o.onUpdateFailed(function() {
                    wx.showModal({
                        title: "已经有新版本了哟~",
                        content: "新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~"
                    });
                }));
            });
        } else wx.showModal({
            title: "提示",
            content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
        });
    },
    Model: function() {
        "HUAWEI" == wx.getSystemInfoSync({}).brand && (this.model = 1);
    },
    navtoaddress: function() {
        var t = this;
        console.log(t.address_num, "----address_num"), 0 == t.address_num && t.navTo("/sd_liferuning/pages/constmer/address-list/index"), 
        t.address_num = t.address_num + 1;
    },
    Showmodal: function() {
        var e = this;
        wx.showModal({
            title: "提示",
            content: "请添加我的地址",
            showCancel: !0,
            confirmText: "添加",
            success: function(t) {
                t.confirm && e.navTo("/sd_liferuning/pages/constmer/address-list/index");
            }
        });
    },
    openTime: function() {
        var e = this;
        console.log("进入请求", wx.getStorageSync("access_token")), "" !== wx.getStorageSync("access_token") && setTimeout(function() {
            wx.getLocation({
                type: "gcj02",
                success: function(t) {
                    e.request({
                        url: api.user.collect,
                        data: {
                            lat: t.latitude,
                            lng: t.longitude
                        },
                        method: "POST",
                        success: function(t) {
                            e.openTime(), 1 == t.code && new SoundRecordingPlay({
                                src: "/we7/resource/video/alert.mp3",
                                duration: "14"
                            });
                        },
                        fail: function() {},
                        complete: function(t) {
                            404 == t.statusCode && console.log("请求失败404");
                        }
                    });
                },
                fail: function() {
                    e.request({
                        url: api.user.collect,
                        data: {
                            lat: 0,
                            lng: 0
                        },
                        method: "POST",
                        success: function(t) {
                            1 == t.code && new SoundRecordingPlay({
                                src: "/we7/resource/video/alert.mp3",
                                duration: "14"
                            });
                        }
                    });
                }
            });
        }, 2e4);
    },
    adddetails: function() {
        var e = this;
        e.request({
            url: api.address.details,
            method: "post",
            data: {
                default: 1
            },
            success: function(t) {
                return "" == t.data ? (e.Showmodal(), e.address_type = !1) : e.address_type = !0;
            }
        });
    },
    navTo: function(t) {
        wx.navigateTo({
            url: t
        });
    },
    location: function(e) {
        var o = this, n = 0;
        0 != o.plug && (o.plug.forEach(function(t, e) {
            1 == t.id && (n = t.id);
        }), e.setData({
            plugs: n
        }));
        wx.getLocation({
            type: "gcj02",
            success: function(t) {
                console.log(t, "----e"), o.request({
                    url: api.location.checkArea,
                    method: "post",
                    data: {
                        lat: t.latitude,
                        lng: t.longitude
                    },
                    success: function(t) {
                        t.data.pid ? e.setData({
                            pid: 1 == n ? t.data.pid : 0
                        }) : e.setData({
                            pid: 0
                        }), 1 != t.code && (wx.showToast({
                            title: t.msg,
                            icon: "none",
                            duration: 1500
                        }), setTimeout(function() {
                            wx.navigateBack({
                                delta: 1
                            });
                        }, 1500));
                    }
                });
            },
            fail: function(t) {
                wx.authorize({
                    scope: "scope.userLocation"
                });
            }
        });
    },
    getmenu: function() {
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: "#ff0000",
            animation: {
                duration: 400,
                timingFunc: "easeIn"
            }
        });
    },
    getUserDataToken: function() {
        wx.getStorageSync("utoken");
    },
    getMenu: function() {},
    request: function(o) {
        o.data || (o.data = {});
        var t = wx.getStorageSync("access_token");
        t && (o.data.access_token = t), o.data._uniacid = this.siteInfo.uniacid, o.data._acid = this.siteInfo.acid, 
        wx.request({
            url: o.url,
            header: o.header || {
                "content-type": "application/x-www-form-urlencoded"
            },
            data: o.data || {},
            method: o.method || "GET",
            dataType: o.dataType || "json",
            success: function(t) {
                -100 == t.data.code && wx.showModal({
                    title: "提示",
                    content: "小程序应用未注册，请联系开发者",
                    showCancel: !1
                }), -1 == t.data.code ? wx.showToast({
                    title: "access_token效验失败",
                    icon: "none"
                }) : o.success && o.success(t.data, t.statusCode);
            },
            fail: function(t) {
                console.warn("--- request fail >>>"), console.warn(t), console.warn("<<< request fail ---");
                var e = getApp();
                e.is_on_launch ? (e.is_on_launch = !1, console.log("网络请求出错")) : (console.log(地址请求出错), 
                o.fail && o.fail(t));
            },
            complete: function(t) {
                200 != t.statusCode && (console.log(o.url, "---66"), console.log("--- request http error >>>"), 
                console.log(t.statusCode), console.log(t.data), console.log("<<< request http error ---")), 
                o.complete && o.complete(t);
            }
        });
    },
    saveFormId: function(t) {
        this.request({
            url: api.user.save_form_id,
            data: {
                form_id: t
            }
        });
    },
    loginBindParent: function(t) {
        if ("" == wx.getStorageSync("access_token")) return !0;
        getApp().bindParent(t);
    },
    bindParent: function(t) {
        if ("undefined" != t.parent_id && 0 != t.parent_id) {
            console.log("Try To Bind Parent With User Id:" + t.parent_id);
            var e = wx.getStorageSync("user_info");
            0 < wx.getStorageSync("share_setting").level && 0 != t.parent_id && getApp().request({
                url: api.share.bind_parent,
                data: {
                    parent_id: t.parent_id
                },
                success: function(t) {
                    0 == t.code && (e.parent = t.data, wx.setStorageSync("user_info", e));
                }
            });
        }
    },
    shareSendCoupon: function(o) {
        wx.showLoading({
            mask: !0
        }), o.hideGetCoupon || (o.hideGetCoupon = function(t) {
            var e = t.currentTarget.dataset.url || !1;
            o.setData({
                get_coupon_list: null
            }), e && wx.navigateTo({
                url: e
            });
        }), this.request({
            url: api.coupon.share_send,
            success: function(t) {
                0 == t.code && o.setData({
                    get_coupon_list: t.data.list
                });
            },
            complete: function() {
                wx.hideLoading();
            }
        });
    },
    api: require("api.js"),
    setApi: function() {
        var n = this.siteInfo.siteroot;
        n = n.replace("app/index.php", ""), n += "addons/sd_135K/core/api.php?s=", this.api = function t(e) {
            for (var o in e) "string" == typeof e[o] ? e[o] = e[o].replace("{$_api_root}", n) : e[o] = t(e[o]);
            return e;
        }(this.api);
        var t = this.api.default.index, e = t.substr(0, t.indexOf("/api.php"));
        this.webRoot = e;
    },
    webRoot: null,
    siteInfo: require("siteinfo.js"),
    currentPage: null,
    pageOnLoad: function(t) {
        this.setPageNavbar(t);
    },
    pageShowToast: function(t) {
        console.log("--- pageToast ---");
        var e = this.currentPage, o = t.duration || 2500, n = t.title || "", a = (t.success, 
        t.fail, t.complete || null);
        e._toast_timer && clearTimeout(e._toast_timer), e.setData({
            _toast: {
                title: n
            }
        }), e._toast_timer = setTimeout(function() {
            var t = e.data._toast;
            t.hide = !0, e.setData({
                _toast: t
            }), "function" == typeof a && a();
        }, o);
    },
    setPageNavbar: function(a) {
        var t = wx.getStorageSync("nav");
        function e(t) {
            var e = !1, o = a.route || a.__route__ || null;
            for (var n in t.navbar) t.navbar[n].url === "/" + o ? e = t.navbar[n].active = !0 : t.navbar[n].active = !1;
            e && a.setData({
                nav: t.navbar,
                navigation: t
            });
        }
        t && e(t), this.request({
            url: api.default.nav_template,
            method: "POST",
            success: function(t) {
                1 == t.code && (e(t.data), wx.setStorageSync("nav", t.data));
            }
        });
    },
    navigatorClick: function(t, e) {
        var o = t.currentTarget.dataset.open_type;
        if (console.log(t), console.log(o), "navigate" == o && wx.navigateTo({
            url: t.currentTarget.dataset.url
        }), "redirect" == o) return !0;
        if ("wxapp" == o && wx.navigateToMiniProgram({
            appId: t.currentTarget.dataset.appid,
            path: "",
            extraData: {},
            success: function(t) {}
        }), "tel" == o) {
            var n = t.currentTarget.dataset.tel;
            wx.makePhoneCall({
                phoneNumber: n
            });
        }
        return !1;
    },
    order_template: function(n) {
        if (wx.getStorageSync("order_template")) {
            var a = wx.getStorageSync("order_template"), t = [], e = [];
            t[0] = a.time, t[1] = a.time[0].time, e[0] = a.time, e[1] = a.time[0].time, e[2] = a.time[0].time, 
            t[1] = [ {
                name: "立即派单",
                stamp: 0
            } ].concat(t[1]), t[0][0].time = [ {
                name: "立即派单",
                stamp: 0
            } ].concat(t[0][0].time), console.log(t), n.setData({
                timeArr: t,
                timeArrs: e
            }), wx.setNavigationBarColor({
                frontColor: a.titleConfig.fontColor.toLocaleLowerCase(),
                backgroundColor: a.titleConfig.navigationBgColor,
                animation: {
                    duration: 400,
                    timingFunc: "easeIn"
                }
            }), n.setData({
                pageConfig: a
            });
        } else wx.showLoading({
            title: "请稍后"
        });
        this.request({
            url: api.default.order_template,
            method: "POST",
            success: function(t) {
                var e = [], o = [];
                1 == t.code ? (a = t.data, wx.setNavigationBarTitle({
                    title: a.titleConfig.pageTitle
                }), wx.setNavigationBarColor({
                    frontColor: a.titleConfig.fontColor.toLocaleLowerCase(),
                    backgroundColor: a.titleConfig.navigationBgColor,
                    animation: {
                        duration: 400,
                        timingFunc: "easeIn"
                    }
                }), e[0] = t.data.time, e[1] = t.data.time[0].time, o[0] = t.data.time, o[1] = t.data.time[0].time, 
                o[2] = t.data.time[0].time, e[1] = [ {
                    name: "立即派单",
                    stamp: 0
                } ].concat(e[1]), e[0][0].time = [ {
                    name: "立即派单",
                    stamp: 0
                } ].concat(e[0][0].time), console.log(e, "-----timeArr"), console.log(o, "-----timeArrs"), 
                n.setData({
                    timeArr: e,
                    timeArrs: o
                }), n.setData({
                    pageConfig: a
                }), wx.hideLoading(), wx.setStorageSync("order_template", t.data)) : (wx.showToast({
                    title: "请求失败",
                    icon: "none"
                }), wx.hideLoading());
            }
        });
    }
});
