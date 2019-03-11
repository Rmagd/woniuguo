var api = require("../../../../api.js"), QQMapWX = require("../../../../qqmap-wx.js"), app = getApp();

Page({
    data: {
        currentItemId: "1",
        dataArr: [ {} ]
    },
    onLoad: function(e) {
        this.setData({
            head: wx.getStorageSync("user").avatar_url,
            icons: wx.getStorageSync("site") + "/addons/sd_liferuning/tp/public/uploads/background"
        });
    },
    onShow: function() {
        var t = this;
        app.request({
            url: api.order.HeJiangOrder,
            method: "post",
            success: function(e) {
                console.log("订单", e), 0 == e.code ? wx.showToast({
                    title: e.msg,
                    icon: "none"
                }) : t.setData({
                    dataArr: e
                });
            }
        });
    },
    selectSwiper: function(e) {
        var t = e.currentTarget.dataset.listid;
        console.log(t), this.setData({
            currentItemId: t
        });
    },
    changeSwiper: function(e) {
        var t = e.detail.currentItemId;
        this.setData({
            currentItemId: t
        });
    },
    refreshData: function(e) {
        var a = this, n = e.currentTarget.dataset.id, t = a.data.dataArr;
        t.forEach(function(e, t) {
            if (e.id == n) {
                var r = a.sendRequest(n);
                -1 != r && (e.wareArr = e.wareArr.concat(r));
            }
        }), a.setData({
            dataArr: t
        });
    },
    pushOrder: function(e) {
        e.currentTarget.dataset.id;
        var t = e.currentTarget.dataset.index;
        wx.removeStorageSync("module_order"), wx.setStorageSync("module_order", this.data.dataArr[0].wareArr[t]), 
        wx.navigateTo({
            url: "/sd_liferuning/pages/constmer/largess/index?module=1"
        });
    },
    sendRequest: function(e) {
        return [];
    }
});