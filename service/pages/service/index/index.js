var api = require("../../../../api.js"), QQMapWX = require("../../../../qqmap-wx.js"), app = getApp(), innerAudioContext = wx.createInnerAudioContext();

Page({
    data: {
        currentItemId: "0",
        orderNumber: "",
        startTime: "",
        endTime: "",
        data: [],
        pageSize: 5,
        currentPageSize: 5,
        soundRecording: {
            tempPath: "",
            duration: "",
            isPlay: !1
        },
        webRoot: app.webRoot,
        class_id: [ "帮我买", "帮我送", "代排队", "代驾", "家政", "代办", "代取" ],
        wait_finished: [],
        finished_order: [],
        detele_order: []
    },
    onLoad: function(e) {
        this.setData({
            page: [ {
                page: 1
            }, {
                page: 1
            }, {
                page: 1
            } ],
            model: app.model
        });
    },
    selectSwiper: function(e) {
        var t = e.currentTarget.dataset.listid;
        this.initCurrentPageSize(), this.setData({
            currentItemId: t
        });
    },
    animationfinish: function(e) {
        console.log(e, "----animationfinish"), setTimeout(function() {
            wx.hideLoading();
        }, 500);
    },
    changeSwiper: function(e) {
        var t = e.detail.current;
        console.log(e.detail.source + "----" + t, "-----val"), wx.showLoading({
            title: "加载中",
            mask: !0
        }), "touch" == e.detail.source && this.setData({
            currentItemId: t
        }), this.initCurrentPageSize();
    },
    onShow: function() {
        wx.removeStorageSync("current_order");
        this.list();
    },
    list: function() {
        var t = this;
        console.log(t.data.currentPageSize), app.request({
            url: api.runner_order.getRunnerOrderList,
            data: {
                page: 0,
                type: 1,
                paginate: 10
            },
            method: "POST",
            success: function(e) {
                console.log("服务订单", e);
                t.setData({
                    wait_finished: e.data.data
                });
            }
        }), app.request({
            url: api.runner_order.getRunnerOrderList,
            data: {
                page: 0,
                type: 2,
                paginate: 0
            },
            method: "POST",
            success: function(e) {
                console.log("服务订单", e);
                t.setData({
                    finished_order: e.data.data
                });
            }
        }), app.request({
            url: api.runner_order.getRunnerOrderList,
            data: {
                page: 0,
                type: 3,
                paginate: 0
            },
            method: "POST",
            success: function(e) {
                console.log("服务订单", e);
                t.setData({
                    delete_order: e.data.data
                });
            }
        });
    },
    userinfo: function() {
        var t = this;
        app.request({
            url: api.default.userinfos,
            data: {
                uid: wx.getStorageSync("uid")
            },
            success: function(e) {
                1 == e.code ? (t.setData({
                    info: e.data
                }), -1 == e.data.status && wx.removeStorage({
                    key: "cash",
                    success: function(e) {
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
    navto: function(e) {
        wx.setStorageSync("current_order", e.currentTarget.dataset.order), app.navTo("/service/pages/service/order-info/index?id=" + e.currentTarget.dataset.id);
    },
    navToUrl: function(e) {
        var t = e.currentTarget.dataset.url;
        console.log(t), wx.navigateTo({
            url: t
        });
    },
    GiveOrder: function(t) {
        app.request({
            url: api.default.GiveOrder,
            data: {
                orderid: t.currentTarget.dataset.id,
                uid: wx.getStorageSync("uid"),
                bid: wx.getStorageSync("bid")
            },
            success: function(e) {
                console.log("订单详情", e.data), console.log(e), 1 == e.data ? (app.request({
                    url: api.user.mess,
                    data: {
                        bid: wx.getStorageSync("bid"),
                        order_no: t.currentTarget.dataset.order_no,
                        type: "order"
                    },
                    success: function(e) {
                        console.log(e);
                    }
                }), wx.showToast({
                    title: "恭喜，抢单成功啦！",
                    duration: 1e3,
                    success: function() {
                        setTimeout(function() {
                            wx.redirectTo({
                                url: "/service/pages/service/index/index"
                            });
                        }, 1500);
                    }
                })) : 0 == e.status ? wx.showToast({
                    title: "手慢啦,已被抢走！",
                    duration: 1e3,
                    success: function() {
                        setTimeout(function() {
                            wx.redirectTo({
                                url: "/service/pages/service/index/index"
                            });
                        }, 1500);
                    }
                }) : -1 == e.status && wx.showToast({
                    title: "您已满单！",
                    duration: 1e3,
                    success: function() {
                        setTimeout(function() {
                            wx.redirectTo({
                                url: "/service/pages/service/index/index"
                            });
                        }, 1500);
                    }
                });
            }
        });
    },
    OkOrder: function(e) {
        app.request({
            url: api.default.OkOrder,
            data: {
                orderid: e.currentTarget.dataset.id,
                bid: wx.getStorageSync("bid"),
                uid: wx.getStorageSync("uid")
            },
            success: function(e) {
                console.log("订单详情", e.data), 1 == e.data && wx.showToast({
                    title: "感谢您的付出，您将有丰厚的回报！",
                    duration: 1e3,
                    success: function() {
                        return setTimeout(function() {
                            wx.redirectTo({
                                url: "/service/pages/service/index/index"
                            });
                        }, 1e3), !1;
                    }
                });
            }
        });
    },
    refreshData: function(e) {
        var t = this.data.page, a = e.currentTarget.dataset.index, r = e.currentTarget.dataset.type;
        return t[a].page++, this.setData({
            page: t
        }), this.request(r, t[a].page), !1;
    },
    request: function(e, t) {
        var n = this;
        wx.showLoading({
            title: "加载中",
            mask: !0
        }), app.request({
            url: api.runner_order.getRunnerOrderList,
            method: "post",
            data: {
                type: e,
                page: t
            },
            success: function(e) {
                if (1 == r) {
                    for (var t = n.data.wait_finished, a = e.data.data, r = 0; r < a.length; r++) t.push(a[r]);
                    n.setData({
                        wait_finished: t
                    });
                } else if (2 == r) {
                    for (t = n.data.finished_order, a = e.data.data, r = 0; r < a.length; r++) t.push(a[r]);
                    n.setData({
                        finished_order: t
                    });
                } else {
                    for (t = n.data.delete_order, a = e.data.data, r = 0; r < a.length; r++) t.push(a[r]);
                    n.setData({
                        delete_order: t
                    });
                }
                wx.hideLoading();
            }
        });
    },
    sendRequestByCurrentPageSize: function(e) {
        e.currentItemId, e.currentPageSize;
    },
    initCurrentPageSize: function() {
        var e = this.data.pageSize;
        this.setData({
            currentPageSize: e
        });
    },
    previewPic: function(e) {
        var t = e.currentTarget.dataset.value;
        wx.previewImage({
            current: t.xphoto,
            urls: [ t.xphoto ]
        });
    },
    soundRecordingPlay: function(e) {
        var t = e.currentTarget.dataset.value, a = this;
        innerAudioContext.src = t.yinpin;
        var r = innerAudioContext.paused, n = a.data.soundRecording;
        r ? (innerAudioContext.play(), n.isPlay = !0, setTimeout(function() {
            var e = a.data.soundRecording;
            e.isPlay = !1, a.setData({
                soundRecording: e
            });
        }, 1e3 * n.duration)) : (innerAudioContext.stop(), n.isPlay = !1), a.setData({
            soundRecording: n
        });
    }
});