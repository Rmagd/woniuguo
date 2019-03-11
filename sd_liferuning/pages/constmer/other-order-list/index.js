var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, api = require("../../../../api.js"), QQMapWX = require("../../../../qqmap-wx.js"), app = getApp();

Page({
    data: {
        driving: !1,
        housekeeping: !1,
        currentOrderType: 0,
        currentItemId: 0,
        orderNumber: "",
        startTime: "",
        endTime: "",
        data: [],
        pageSize: 5,
        currentPageSize: 5,
        webRoot: app.webRoot,
        type: {
            one_type: 0,
            two_type: 0,
            page: 1
        },
        class_type: {
            class: 1,
            class_two: 1,
            page: [ 1, 1, 1, 1 ]
        },
        nav: !1
    },
    onLoad: function(t) {
        this.setData({
            currentItemId: t.currentItemId ? t.currentItemId : 0
        }), app.pageOnLoad(this);
        var e = this;
        e.setData({
            icons: wx.getStorageSync("site") + "/addons/sd_liferuning/tp/public/uploads/background"
        }), t.orderNumber && e.setData({
            orderNumber: t.orderNumber
        }), t.startTime && e.setData({
            startTime: t.startTime
        }), t.endTime && e.setData({
            endTime: t.endTime
        });
    },
    navToPage: function(t) {
        var e = t.currentTarget.dataset.url + "?id=" + t.currentTarget.dataset.id + "&cid=" + t.currentTarget.id;
        this.isLogin() ? wx.navigateTo({
            url: e
        }) : this.gotoLogin();
    },
    navToUserPage: function(t) {
        this.isLogin() ? wx.navigateTo({
            url: "/sd_liferuning/pages/constmer/user/index"
        }) : this.gotoLogin();
    },
    naveClick: function(t) {
        app.navigatorClick(t, this);
    },
    onShow: function() {
        var t = this, e = wx.getStorageSync("index"), a = !1, r = !1, s = !1, i = e.index_template.mainConfig.ingressGroups.ingress;
        i.forEach(function(t, e) {
            t.children.forEach(function(t, e) {
                "/sd_liferuning/pages/constmer/driving/index" == t.linkedUrl ? r = !0 : "/sd_liferuning/pages/constmer/housekeeping/index" == t.linkedUrl ? s = !0 : a = !0;
            });
        }), t.setData({
            buy: a,
            driving: r,
            housekeeping: s
        }), console.log(i, "-*---pageConfig"), console.log(t.data.class_type.class, "------that.data.class_type.class"), 
        t.orderdata(t.data.class_type.class);
    },
    orderdata: function(t) {
        var e = this, a = t;
        app.request({
            url: api.order.getUserOrderList,
            method: "post",
            data: {
                class_id: a,
                type: 1
            },
            success: function(t) {
                e.setData({
                    data_one: t.data.data
                });
            }
        }), app.request({
            url: api.order.getUserOrderList,
            method: "post",
            data: {
                class_id: a,
                type: 2
            },
            success: function(t) {
                e.setData({
                    data_two: t.data.data
                });
            }
        }), app.request({
            url: api.order.getUserOrderList,
            method: "post",
            data: {
                class_id: a,
                type: 3
            },
            success: function(t) {
                e.setData({
                    data_three: t.data.data
                });
            }
        }), app.request({
            url: api.order.getUserOrderList,
            method: "post",
            data: {
                class_id: a,
                type: 4
            },
            success: function(t) {
                e.setData({
                    data_four: t.data.data
                });
            }
        });
    },
    orderlist: function(t, o, e) {
        var d = this;
        t = parseInt(t), o = parseInt(o);
        wx.showLoading({
            title: "加载中",
            mask: !0
        }), app.request({
            url: api.order.getUserOrderList,
            method: "post",
            data: {
                class_id: t + 1,
                type: o + 1,
                page: e
            },
            success: function(t) {
                var e = t.data.data;
                if (0 == o) {
                    for (var a = d.data.data_one, r = 0; r < e.length; r++) a.push(e[r]);
                    d.setData({
                        data_one: a
                    });
                }
                if (1 == o) {
                    var s = d.data.data_two;
                    for (r = 0; r < e.length; r++) s.push(e[r]);
                    d.setData({
                        data_two: s
                    });
                }
                if (2 == o) {
                    var i = d.data.data_three;
                    for (r = 0; r < e.length; r++) i.push(e[r]);
                    d.setData({
                        data_three: i
                    });
                }
                if (3 == o) {
                    var n = d.data.data_four;
                    for (r = 0; r < e.length; r++) n.push(e[r]);
                    d.setData({
                        data_four: n
                    });
                }
                wx.hideLoading();
            }
        });
    },
    save_order_data: function(t) {
        app.navTo("/sd_liferuning/pages/constmer/order-info/index?orderid=" + t.currentTarget.dataset.id);
    },
    selectCurrentOrderType: function(t) {
        var e = t.currentTarget.dataset.type, a = this.data.class_type;
        a.class = parseInt(e) + 1, a.page = [ 1, 1, 1, 1 ], console.log(e, "---"), console.log(void 0 === e ? "undefined" : _typeof(e)), 
        this.orderdata(parseInt(e) + 1);
        var r = this.data.type;
        r.page = 1, r.one_type = e, this.setData({
            class_type: a,
            currentOrderType: e,
            type: r
        });
    },
    changeSidebar: function() {
        this.openSidebar();
    },
    selectSwiper: function(t) {
        console.log("点击二级导航");
        var e = t.currentTarget.dataset.listid, a = this.data.type;
        a.page = 1, a.two_type = e, this.setData({
            currentItemId: e
        });
    },
    animationfinish: function(t) {
        console.log(t, "----animationfinish"), setTimeout(function() {
            wx.hideLoading();
        }, 500);
    },
    changeSwiper: function(t) {
        var e = this.data.nav, a = t.detail.current;
        wx.showLoading({
            title: "加载中",
            mask: !0
        }), console.log(a, "滑动-------", e), this.data.type.page = 1, "touch" == t.detail.source && this.setData({
            currentItemId: a
        }), this.initCurrentPageSize();
    },
    refreshData: function(t) {
        var e = t.currentTarget.dataset.index, a = this.data.class_type, r = this.data.currentOrderType;
        return a.page[e]++, this.setData({
            class_type: a
        }), console.log(a), this.orderlist(r, e, a.page[e]), !1;
    },
    sendRequestByCurrentPageSize: function(t) {
        var e = t.currentItemId, a = t.currentPageSize, r = this, s = e, i = a;
        app.request({
            url: api.default.orderlist,
            data: {
                status: s,
                uid: wx.getStorageSync("uid"),
                limit: i
            },
            success: function(t) {
                r.setData({
                    data: t.data
                }), wx.hideLoading();
            },
            fail: function() {
                wx.hideLoading();
            }
        });
    },
    initCurrentPageSize: function() {
        var t = this.data.pageSize;
        this.setData({
            currentPageSize: t
        });
    }
});