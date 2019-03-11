var api = require("../../../../api.js"), app = getApp();

Page({
    data: {
        imgurl: app.imgurl,
        phoneNumber: "",
        webRoot: app.webRoot,
        user: wx.getStorageSync("user"),
        phone: wx.getStorageSync("phone"),
        order_munber: {},
        userConfig: wx.getStorageSync("menu_template")
    },
    navToUser: function() {
        wx.navigateTo({
            url: "/service/pages/constmer/user-info/index"
        });
    },
    callPhone: function() {
        wx.makePhoneCall({
            phoneNumber: this.data.userConfig.phone
        });
    },
    onShow: function() {
        var n = this;
        n.setData({
            head: wx.getStorageSync("head"),
            nickname: wx.getStorageSync("nickname")
        }), app.request({
            url: api.runner.normal,
            method: "post",
            success: function(e) {
                1 == e.code ? n.setData({
                    order_munber: e.data
                }) : console.log("获取用户信息失败");
            }
        });
    },
    onLoad: function() {
        this.setData({
            icons: wx.getStorageSync("site") + "/addons/sd_liferuning/tp/public/uploads/background"
        });
    }
});