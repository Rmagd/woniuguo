var app = getApp(), api = require("../../../../api.js");

Page({
    data: {
        data: [ {} ]
    },
    onLoad: function(a) {
        var t = this;
        app.request({
            url: api.runner.withdrawList,
            method: "post",
            data: {},
            success: function(a) {
                console.log(a), t.setData({
                    data: a.data.data
                });
            }
        });
    }
});