Page({
    data: {
        money: "0.00",
        price: "0.00",
        vipprice: "0.00",
        integral: "0.00",
        lastPrice: "0.00"
    },
    onLoad: function(t) {
        var e = this, o = wx.getStorageSync("cost");
        return console.log(o), e.setData({
            cost: o
        }), !1;
    },
    onReady: function() {}
});