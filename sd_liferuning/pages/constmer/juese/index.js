var app = getApp(), api = require("../../../../api.js");

Page({
    data: {
        list: [ {
            headimg: "/public/WeChat/default/user/u_01.png",
            title: "服务人员",
            text: "加入服务人员时时刻刻收入到手",
            color: "#1fad1f",
            bgimg: "/public/WeChat/default/user/ub_01.png",
            type: 1
        }
        // }, {
        //     headimg: "/public/WeChat/default/user/u_02.png",
        //     title: "代驾司机",
        //     text: "包车接送需要您的加入",
        //     color: "#039adf",
        //     bgimg: "/public/WeChat/default/user/ub_02.png",
        //     type: 2
        // }, {
        //     headimg: "/public/WeChat/default/user/u_03.png",
        //     title: "家政人员",
        //     text: "勤劳双手服务千万家",
        //     color: "#f36b56",
        //     bgimg: "/public/WeChat/default/user/ub_03.png",
        //     type: 3
        // } 
        ],
        webRoot: app.webRoot
    },
    navTo: function(t) {
        app.request({
            url: api.apply.editinfo,
            method: "post",
            data: {
                type: t.currentTarget.dataset.type
            },
            success: function(e) {
                1 == e.code ? app.navTo("../../../../service/pages/service/userauth-pay/index?type=" + t.currentTarget.dataset.type) : wx.showToast({
                    title: e.msg,
                    icon: "none",
                    mask: !0
                });
            }
        });
    },
    onLoad: function(e) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});