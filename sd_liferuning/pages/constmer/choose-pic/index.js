var app = getApp();

Page({
    data: {
        src: ""
    },
    deletePic: function() {
        app.pageOperate = 1, wx.navigateBack({
            delta: 1
        });
    },
    goBack: function() {
        app.pageOperate = 0, wx.navigateBack({
            delta: 1
        });
    },
    onLoad: function(a) {
        console.log(a.src);
        this.setData({
            src: a.src
        });
    }
});