var app = getApp(), api = require("../../../../api.js");

Page({
    data: {
        sexArr: [ {
            type: 0,
            value: "女"
        }, {
            type: 1,
            value: "男"
        } ],
        userSex: ""
    },
    userChangeSex: function(e) {
        var a = e.detail.value;
        this.setData({
            userSex: this.data.sexArr[a]
        });
    },
    onShow: function() {
        var a = this;
        app.request({
            url: api.default.userinfos,
            data: {
                uid: wx.getStorageSync("uid")
            },
            success: function(e) {
                1 == e.code ? a.setData({
                    info: e.data
                }) : wx.showModal({
                    title: "提示",
                    content: "获取用户信息失败"
                });
            }
        });
    }
});