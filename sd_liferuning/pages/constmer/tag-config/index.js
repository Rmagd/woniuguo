var api = require("../../../../api.js"), app = getApp();

Page({
    data: {
        tagArr: []
    },
    onShow: function() {
        this.tag();
    },
    tag: function() {
        var a = this;
        a.data.tagArr;
        app.request({
            url: api.label.index,
            method: "POST",
            success: function(t) {
                a.setData({
                    tagArr: [ {
                        title: "标签",
                        tagGroup: t.data
                    } ]
                }), wx.hideLoading();
            }
        });
    },
    chooseTag: function(t) {
        var a = this, e = (a.data.tagArr, t.currentTarget.dataset.id);
        t.currentTarget.dataset.select ? (wx.showLoading({}), app.request({
            url: api.label.delete,
            method: "POST",
            data: {
                id: e
            },
            success: function(t) {
                1 == t.code ? a.tag() : wx.showToast({
                    title: t.msg,
                    icon: "none"
                });
            }
        })) : (wx.showLoading({}), app.request({
            url: api.label.add,
            method: "POST",
            data: {
                id: e
            },
            success: function(t) {
                1 == t.code ? a.tag() : wx.showToast({
                    title: t.msg,
                    icon: "none"
                });
            }
        }));
    }
});