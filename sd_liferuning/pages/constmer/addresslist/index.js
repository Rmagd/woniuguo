var app = getApp();

Page({
    data: {},
    onLoad: function(n) {},
    onReady: function() {},
    onShow: function() {
        var n = app.address_list;
        console.log(n), this.setData({
            address_list: n
        });
    },
    onclick: function(n) {
        app.addresslist_type = this.data.address_list.address[n.currentTarget.dataset.index], 
        wx.navigateBack({
            delta: 1
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});