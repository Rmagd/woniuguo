var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, api = require("../../../../api.js"), QQMapWX = require("../../../../qqmap-wx.js"), app = getApp(), innerAudioContext = wx.createInnerAudioContext();

innerAudioContext.obeyMuteSwitch = !1, Page({
    data: {
        imgurl: app.imgurl,
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        authStatus: !0,
        webRoot: app.webRoot,
      class_id: ["帮买", "未知","代排队","未知","代写论文","代课","帮取","其他"],
      curSchool:'所有学校',
      sc:0,
      school: [
        "所有学校订单",
        "华南理工大学",
        "广东工业大学",
        "广州美术学院",
        "广州大学",
        "中山大学",
        "华南师范大学",
        "星海音乐学院",
        "广东药科大学",
        "广州中医药大学",
        "广东外语外贸大学"],
        data: [],
        voicenum: {
            num: "",
            type: !0
        },
        page: 1
    },
  bindPickerChange:function(e){
    this.setData({
      curSchool: this.data.school[e.detail.value],
      sc:e.detail.value
    });
    this.list();
    console.log(this.data.data);
  },
    onLoad: function(t) {
        var a = this;
        a.getLocaltion(), a.setData({
            model: app.model
        }), innerAudioContext.onEnded(function(t) {
            var e = a.data.voicenum;
            e.type = !0, a.setData({
                voicenum: e
            }), console.log("录音播放结束");
        });
    },
    onShow: function() {
        this.loadpage();
    },
    soundRecordingPlay: function(t) {
        var e = this.data.voicenum, a = t.currentTarget.dataset.index;
        console.log(e + "--" + a), console.log(void 0 === e ? "undefined" : _typeof(e)), 
        console.log(void 0 === a ? "undefined" : _typeof(a)), a !== e.num ? (console.log("0"), 
        innerAudioContext.src = t.currentTarget.dataset.src, innerAudioContext.play(), e.num = a, 
        e.type = !0) : (e.type ? (e.type = !1, innerAudioContext.play()) : (e.type = !0, 
        innerAudioContext.pause()), this.setData({
            voicenum: e
        }));
    },
    lookimg: function(t) {
        app.lookimg = this.data.data[t.currentTarget.dataset.index].pics, app.navTo("/sd_liferuning/pages/constmer/lookimg/index");
    },
    previewPic: function(t) {
        var e = [];
        e.push(t.currentTarget.dataset.src), wx.previewImage({
            current: e[0],
            urls: e
        });
    },
    list: function() {
        var e = this;
        console.log(e.data.currentPageSize), app.request({
            url: api.runner_order.orderToGet,
            data: {
                page: 1,
                paginate: 10
            },
            method: "POST",
            success: function(t) {
                console.log("服务订单", t);
                var a = t.data.data;
                a.forEach(function(t, e,sc) {
                    0 == Number(t.runner_profit) && (console.log(t), a.splice(e, 1));
                });
                if(e.data.sc==0){
                  e.setData({
                    data: a
                  });
                }else{
                 var slist=[]; 
                 for(var i=0;i<a.length;i++){
                  if(a[i].school==e.data.sc-1){
                    slist.push(a[i]);
                  }
                 }
                  e.setData({
                    data: slist
                  });
                }
            }
        });
    },
    add_list: function(t) {
        var o = this, n = this.data.data;
        console.log(o.data.currentPageSize), wx.showLoading({
            title: "加载中"
        }), app.request({
            url: api.runner_order.orderToGet,
            data: {
                page: this.data.page,
                paginate: 10
            },
            method: "POST",
            success: function(t) {
                console.log("服务订单", t);
                var e = t.data.data;
                if (0 < t.data.data.length) {
                    for (var a = 0; a < t.data.data.length; a++) n.push(e[a]);
                    o.setData({
                        data: n
                    });
                } else wx.showToast({
                    title: "已经没有数据了",
                    icon: "none"
                });
                wx.hideLoading({
                    title: "加载中"
                });
            }
        });
    },
    get_order_handler: function(e) {
        return wx.showModal({
            title: "提示",
            content: "是否接单",
            confirmText: "接单",
            success: function(t) {
                t.confirm && app.request({
                    url: api.runner_order.receipt,
                    data: {
                        oid: e.currentTarget.dataset.id
                    },
                    method: "POST",
                    success: function(t) {
                        console.log("服务订单", t), 1 === t.code ? wx.showToast({
                            title: t.msg,
                            success: function() {
                                setTimeout(function() {
                                    app.navTo("/service/pages/service/index/index");
                                }, 1e3);
                            }
                        }) : wx.showToast({
                            title: t.msg,
                            icon: "none"
                        });
                    }
                });
            }
        }), !1;
    },
    userinfo: function() {
        var e = this;
        app.request({
            url: api.default.userinfos,
            data: {
                uid: wx.getStorageSync("uid")
            },
            success: function(t) {
                1 == t.code ? (e.setData({
                    info: t.data
                }), -1 == t.data.status && wx.removeStorage({
                    key: "cash",
                    success: function(t) {
                        wx.showModal({
                            title: "提示",
                            content: "您已经被管理员封禁",
                            showCancel: !1,
                            success: function() {
                                wx.redirectTo({
                                    url: "../../login/index"
                                });
                            }
                        });
                    }
                })) : wx.showModal({
                    title: "提示",
                    content: "获取用户信息失败"
                });
            }
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
                var a = [], o = t.data.location;
                for (var n in o) {
                    n = o[n];
                    a[a.length] = {
                        id: a.length,
                        latitude: parseFloat(n.latitude),
                        longitude: parseFloat(n.longitude),
                        iconPath: n.iconPath,
                        width: parseInt(n.width),
                        height: parseInt(n.height)
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
            }
        }), wx.getStorage({
            key: "access_token",
            success: function() {
                i.list(i.data.page), i.yanzheng();
            },
            fail: function(t) {
                i.setData({
                    authStatus: !1
                });
            }
        });
    },
    onReachBottom: function(t) {
        var e = this.data.page;
        e++, this.setData({
            page: e
        }), this.add_list(this.data.page);
    },
    getUserInfo: function(t) {
        var e = this, a = this, o = t.detail;
        if (console.log(o, "-----detail"), !o.iv) return wx.showModal({
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
                        iv: o.iv,
                        encryptedData: o.encryptedData
                    },
                    success: function(t) {
                        1 == t.code ? (wx.setStorageSync("access_token", t.data.access_token), a.yanzheng(), 
                        a.list(a.data.page), app.openTime(), wx.setStorageSync("user", t.data), e.setData({
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
    },
    yanzheng: function() {
        app.request({
            url: api.apply.check,
            method: "POST",
            success: function(t) {
                console.log(t), 1 != t.code && wx.showModal({
                    title: "提示",
                    content: "请先认证为服务人员",
                    showCancel: !1,
                    confirmText: "确认",
                    success: function(t) {
                        t.confirm && wx.reLaunch({
                          url: "/sd_liferuning/pages/constmer/juese/index"
                        });
                    }
                });
            }
        });
    }
});