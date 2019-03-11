var api = require("../../../../api.js"), app = getApp();

Page({
    data: {
        levelArr: [],
        data: "",
        icons: "",
        getMoney: [ {
            title: "¥30/月",
            id: "0001"
        }, {
            title: "¥30/季度",
            id: "0001"
        }, {
            title: "¥30/年",
            id: "0001"
        } ],
        current_money_index: 0,
        current_data: 0,
        current_id: ""
    },
    onLoad: function() {
        var e = this;
        e.setData({
            icons: wx.getStorageSync("site") + "/addons/sd_liferuning/tp/public/uploads/background"
        });
        for (var t = [], r = 1; r < 6; r++) t.push({
            defaultImg: e.data.icons + "/resource/common/image/customer/member-center/level" + r + ".png",
            activeImg: e.data.icons + "/resource/common/image/customer/member-center/level" + r + "_1.png",
            needScore: 400 * r
        });
        e.setData({
            levelArr: t,
            currentScore: 1200,
            progressPercent: 60,
            mark: 387.5
        });
    },
    selectGetMoney: function(e) {
        console.log("this is money id", e.currentTarget.dataset.id), this.setData({
            current_money: this.data.getMoney[e.currentTarget.dataset.selected],
            current_money_index: e.currentTarget.dataset.selected,
            current_id: e.currentTarget.dataset.id
        });
    },
    onShow: function(e) {
        wx.getStorageSync("uid");
    }
});