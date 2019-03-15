var app = getApp(), api = api = require("../../../../api.js");

Page({
    data: {
        imgurl: app.imgurl,
        data: []
    },
    navTo: function(a) {
        app.navTo(a.currentTarget.dataset.url);
    },
    onLoad: function(a) {
        app.request({
          url: api.apply.check,
          method: "POST",
          success: function (t) {
            console.log(t);
          }
        });
    },
    onReady: function() {},
    onShow: function() {
        var n = this;
        app.request({
            url: api.apply.getInfo,
            method: "post",
            data: {},
            success: function(a) {
                n.setData({
                    information: a.data,
                    data: [ {
                        class: [ {
                            name: "实名认证",
                            type: "" != a.data.name && "" != a.data.identity & "" != a.data.card_front && "" != a.data.card_back ? 1 : 0,
                            index: 0
                        }, {
                            name: "手机绑定",
                            type: "" != a.data.phone ? 1 : 0,
                            index: 1
                        } ]
                    }, {
                        // class: [ {
                        //     name: "驾驶证照片",
                        //     type: "" != a.data.license_front && "" != a.data.license_back ? 1 : 0,
                        //     index: 2
                        // }, {
                        //     name: "健康证照片",
                        //     type: "" != a.data.health_front ? 1 : 0,
                        //     index: 3
                        // } ]
                    } ]
                });
            }
        });
    },
  renzheng: function () {
    app.request({
      url: api.apply.infoRunnerApply,
      method: "post",
      data: {},
      success: function (e) {
        0 == e.code ? wx.showToast({
          title: '已经是服务人员了哦！'
        }) : (wx.showToast({
          title: "申请成功,等待后台人员审核",
          icon: "none",
          mask: !0
        }), setTimeout(function () {
          wx.navigateBack({
            delta: 2
          });
        }, 1500)), console.log(e);
      }
    });
  },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});