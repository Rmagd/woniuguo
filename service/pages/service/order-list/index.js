var api = require("../../../../api.js"), app = getApp();

Page({
    data: {
        currentItemId: "3",
        orderNumber: "",
        startTime: "",
        endTime: "",
        data: [],
        webRoot: app.webRoot,
        page: 0,
        finished_order: []
    },
    onLoad: function(e) {
        var t = this;
        t.list(), e.orderNumber && t.setData({
            orderNumber: e.orderNumber
        }), e.startTime && t.setData({
            startTime: e.startTime
        }), e.endTime && t.setData({
            endTime: e.endTime
        });
    },
    navto: function(e) {
        wx.setStorageSync("current_order", e.currentTarget.dataset.order), app.navTo("/service/pages/service/order-info/index?id=" + e.currentTarget.dataset.id);
    },
    changeSidebar: function() {
        this.openSidebar();
    },
    selectSwiper: function(e) {
        var t = e.currentTarget.dataset.listid;
        this.setData({
            currentItemId: t
        });
    },
    changeSwiper: function(e) {
        var t = e.detail.current + 1;
        this.setData({
            currentItemId: "list-" + t
        });
    },
    list: function() {
        var r = this, i = r.data.page + 1, n = r.data.finished_order;
        wx.showLoading({
            title: "加载中"
        }), app.request({
            url: api.runner_order.getRunnerOrderList,
            method: "post",
            data: {
                type: 2,
                page: i
            },
            mothod: "POST",
            success: function(e) {
                for (var t = e.data.data, a = 0; a < t.length; a++) n.push(t[a]);
                r.setData({
                    finished_order: n,
                    page: i
                }), wx.hideLoading();
            }
        });
    },
    onShow: function() {},
    onReachBottom: function() {
        var e = this, t = e.data.page++;
        e.setData({
            page: t
        }), e.list();
    }
});