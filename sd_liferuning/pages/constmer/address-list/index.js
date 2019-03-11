var api = require("../../../../api.js"), app = getApp();

Page({
    data: {
        list: []
    },
    navToEdit: function(t) {
        wx.navigateTo({
            url: "/sd_liferuning/pages/constmer/address-insert/index?id=" + t.currentTarget.dataset.id
        });
    },
    onLoad: function(t) {
        this.setData({
            url: t.url ? t.url : ""
        });
    },
    onShow: function() {
        var s = this;
        app.defaultadd = 1, app.request({
            url: api.address.index,
            method: "post",
            success: function(t) {
                for (var a = t.data, e = 0; e < a.length; e++) 1 == a[e].is_default ? a[e].default = "success" : a[e].default = "circle", 
                a[e].address = a[e].address + a[e].address_name;
                s.setData({
                    list: t.data
                });
            }
        });
    },
    onUnload: function() {},
    radio: function(t) {
        var e = this, s = t.currentTarget.dataset.index, d = e.data.list;
        app.request({
            url: api.address.set_default,
            method: "POST",
            data: {
                id: s
            },
            success: function(t) {
                if (1 == t.code) {
                    for (var a = 0; a < d.length; a++) d[a].id == s ? d[a].default = "success" : d[a].default = "circle";
                    e.setData({
                        list: d
                    }), wx.showToast({
                        title: "设置成功",
                        icon: "success"
                    }), wx.navigateBack({});
                }
            }
        });
    },
    dellist: function(t) {
        var a = this, e = t.currentTarget.dataset.id, s = t.currentTarget.dataset.index, d = a.data.list;
        wx.showModal({
            title: "提示",
            content: "是否删除该地址",
            success: function(t) {
                t.confirm && app.request({
                    url: api.address.delete,
                    method: "POST",
                    data: {
                        id: e
                    },
                    success: function(t) {
                        1 == t.code && (d.splice(s, 1), a.setData({
                            list: d
                        }));
                    }
                });
            }
        });
    }
});