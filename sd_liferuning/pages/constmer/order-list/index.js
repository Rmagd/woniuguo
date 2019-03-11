var api = require("../../../../api.js"), QQMapWX = require("../../../../qqmap-wx.js"), app = getApp();

Page({
    data: {
        currentItemId: "0",
        orderNumber: "",
        startTime: "",
        endTime: "",
        data: [],
        pageSize: 5,
        currentPageSize: 5,
        webRoot: app.webRoot,
        wait_order: [],
        finished_order: [],
        delete_order: []
    },
    onLoad: function(e) {
        this.setData({
            currentItemId: e.currentItemId ? e.currentItemId : 0,
            page: [ {
                page: 1
            }, {
                page: 1
            }, {
                page: 1
            }, {
                page: 1
            } ],
            model: app.model
        }), app.pageOnLoad(this);
        var t = this;
        t.setData({
            icons: wx.getStorageSync("site") + "/addons/sd_liferuning/tp/public/uploads/background"
        }), e.orderNumber && t.setData({
            orderNumber: e.orderNumber
        }), e.startTime && t.setData({
            startTime: e.startTime
        }), e.endTime && t.setData({
            endTime: e.endTime
        });
    },
    navToPage: function(e) {
        var t = e.currentTarget.dataset.url + "?id=" + e.currentTarget.dataset.id + "&cid=" + e.currentTarget.id;
        this.isLogin() ? wx.navigateTo({
            url: t
        }) : this.gotoLogin();
    },
    navToUserPage: function(e) {
        this.isLogin() ? wx.navigateTo({
            url: "/sd_liferuning/pages/constmer/user/index"
        }) : this.gotoLogin();
    },
    save_order_data: function(e) {
        app.navTo("/sd_liferuning/pages/constmer/order-info/index?orderid=" + e.currentTarget.dataset.id);
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
        this.orderlist();
    },
    orderlist: function() {
        var t = this;
        app.request({
            url: api.order.getUserOrderList,
            method: "post",
            data: {
                type: 1
            },
            success: function(e) {
                t.setData({
                    wait_order: e.data.data
                });
            }
        }), app.request({
            url: api.order.getUserOrderList,
            method: "post",
            data: {
                type: 2
            },
            success: function(e) {
                t.setData({
                    finished_order: e.data.data
                });
            }
        }), app.request({
            url: api.order.getUserOrderList,
            method: "post",
            data: {
                type: 3
            },
            success: function(e) {
                t.setData({
                    complete: e.data.data
                });
            }
        }), app.request({
            url: api.order.getUserOrderList,
            method: "post",
            data: {
                type: 4
            },
            success: function(e) {
                t.setData({
                    delete_order: e.data.data
                });
            }
        });
    },
    changeSidebar: function() {
        this.openSidebar();
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
        wx.showLoading({
            title: "加载中",
            mask: !0
        }), "touch" == e.detail.source && this.setData({
            currentItemId: t
        }), this.initCurrentPageSize();
    },
    refreshData: function(e) {
        var t = this, a = t.data.page, r = e.currentTarget.dataset.index, i = e.currentTarget.dataset.type;
        return a[i].page++, t.setData({
            page: a
        }), t.request(i, a[i].page, r), !1;
    },
    request: function(e, t, i) {
        var n = this;
        wx.showLoading({
            title: "加载中",
            mask: !0
        }), app.request({
            url: api.order.getUserOrderList,
            method: "post",
            data: {
                type: i,
                page: t
            },
            success: function(e) {
                if (1 == i) {
                    for (var t = n.data.wait_order, a = e.data.data, r = 0; r < a.length; r++) t.push(a[r]);
                    n.setData({
                        wait_order: t
                    });
                } else if (2 == i) {
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
        var t = e.currentItemId, a = e.currentPageSize, r = this, i = t, n = a;
        app.request({
            url: api.default.orderlist,
            data: {
                status: i,
                uid: wx.getStorageSync("uid"),
                limit: n
            },
            success: function(e) {
                r.setData({
                    data: e.data
                }), wx.hideLoading();
            },
            fail: function() {
                wx.hideLoading();
            }
        });
    },
    initCurrentPageSize: function() {
        var e = this.data.pageSize;
        this.setData({
            currentPageSize: e
        });
    },
    onPullDownRefresh: function() {
        console.log("下拉刷新");
    }
});