var api = require("../../../../api.js"), app = getApp();

Page({
    data: {
        levelArr: [],
        data: "",
        icons: "",
        getMoney: [ {
            title: "￥/月",
            id: 1
        }, {
            title: "￥/季度",
            id: 3
        }, {
            title: "￥/年",
            id: 12
        } ],
        current_money_index: 0,
        current_data: 0,
        current_id: "",
        current: 1
    },
    onLoad: function(e) {
        for (var t = this, a = t.data.getMoney, n = 0; n < a.length; n++) a[n].title = a[n].id * e.num + a[n].title;
        t.setData({
            getMoney: a
        }), t.setData({
            icons: wx.getStorageSync("site") + "/addons/sd_liferuning/tp/public/uploads/background"
        });
        for (var r = [], c = 1; c < 6; c++) r.push({
            defaultImg: t.data.icons + "/resource/common/image/customer/member-center/level" + c + ".png",
            activeImg: t.data.icons + "/resource/common/image/customer/member-center/level" + c + "_1.png",
            needScore: 400 * c
        });
        t.setData({
            levelArr: r,
            currentScore: 1200,
            progressPercent: 60,
            mark: 387.5
        });
    },
    selectGetMoney: function(e) {
        console.log("this is money id", e.currentTarget.dataset.id), this.setData({
            current: e.currentTarget.dataset.id
        }), this.setData({
            current_money: this.data.getMoney[e.currentTarget.dataset.selected],
            current_money_index: e.currentTarget.dataset.selected,
            current_id: e.currentTarget.dataset.id
        });
    },
    onShow: function(e) {
        wx.getStorageSync("uid");
    },
    pay: function() {
        var e = this.data.current;
        app.request({
            url: api.payment.payVip,
            method: "post",
            data: {
                month: e
            },
            success: function(e) {
                wx.requestPayment({
                    timeStamp: e.data.timeStamp,
                    nonceStr: e.data.nonceStr,
                    package: e.data.package,
                    signType: e.data.signType,
                    paySign: e.data.paySign,
                    success: function(e) {
                        wx.showToast({
                            title: "支付成功",
                            icon: "success",
                            success: function() {
                                setTimeout(function() {
                                    wx.navigateBack({
                                        delta: 1
                                    });
                                }, 1e3);
                            }
                        });
                    },
                    fail: function() {
                        wx.showToast({
                            title: "支付失败",
                            icon: "none"
                        });
                    }
                });
            }
        });
    }
});