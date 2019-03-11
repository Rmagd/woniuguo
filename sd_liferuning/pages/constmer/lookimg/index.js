var app = getApp();

Page({
    data: {},
    onLoad: function(n) {},
    onReady: function() {},
    onShow: function() {
        var n = app.lookimg.split(",");
        this.setData({
            arrimg: n
        }), console.log(n);
    },
    lookimg: function(n) {
        var o = this.data.arrimg;
        wx.previewImage({
            current: o[n.currentTarget.dataset.index],
            urls: o
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});