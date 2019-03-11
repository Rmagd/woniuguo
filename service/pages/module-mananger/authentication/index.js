var api = require("../../../../api.js"), QQMapWX = require("../../../../qqmap-wx.js"), app = getApp();

Page({
    data: {
        webRoot: app.webRoot,
        isShow: !1,
        moduleArr: [ {
            joint_id: 1,
            j_name: "AAA"
        }, {
            joint_id: 2,
            j_name: "BBB"
        }, {
            joint_id: 3,
            j_name: "CCC"
        } ]
    },
    formSubmit: function(e) {
        var a = e.detail.value;
        this.sendRequest(a);
    },
    onLoad: function() {
        this.setData({
            icons: wx.getStorageSync("site") + "/addons/sd_liferuning/tp/public/uploads/background"
        });
    },
    onShow: function() {
        var a = this;
        app.request({
            url: api.order.YesJoint,
            success: function(e) {
                a.setData({
                    moduleArr: e.mess,
                    moduleIndex: 0
                });
            }
        });
    },
    sendRequest: function(e) {
        var a = e.wechatID, t = e.appID, s = e.appName, i = e.j_name, n = e.userType, o = e.shopName;
        null == o && (o = ""), console.log("TODO 执行请求"), app.request({
            url: api.order.sumbit_ShenHe,
            method: "post",
            data: {
                name: s,
                appid: t,
                hjmall_id: a,
                is_zguanli: n,
                type: i,
                shop_name: o
            },
            success: function(e) {
                console.log(e), 1 == e.code ? wx.showToast({
                    title: "成功",
                    icon: "succes",
                    duration: 1e3,
                    mask: !0
                }) : wx.showToast({
                    title: "失败",
                    duration: 1e3,
                    mask: !0
                }), wx.navigateTo({
                    url: "/sd_liferuning/pages/constmer/user/index"
                });
            }
        });
    },
    userTypeBindChange: function(e) {
        var a = e.detail.value;
        this.setData({
            isShow: 0 == a
        });
    },
    bindModulePickerChange: function(e) {
        var a = e.detail.value;
        this.setData({
            moduleIndex: a
        });
    }
});