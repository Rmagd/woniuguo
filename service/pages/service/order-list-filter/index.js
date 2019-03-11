Page({
    data: {
        orderNumber: "",
        startTime: "",
        endTime: ""
    },
    inputChange: function(e) {
        var t = e.detail.value;
        this.setData({
            orderNumber: t
        });
    },
    bindPickerChange: function(e) {
        var t = e.currentTarget.dataset.name, a = e.detail.value;
        "startTime" == t ? this.setData({
            startTime: a
        }) : "endTime" == t && this.setData({
            endTime: a
        });
    },
    reset: function() {
        this.setData({
            orderNumber: "",
            startTime: "",
            endTime: ""
        });
    },
    confirm: function() {
        var e = this;
        wx.redirectTo({
            url: "/pages/service/order-list/index?orderNumber=" + e.data.orderNumber + "&startTime=" + e.data.startTime + "&endTime=" + e.data.endTime
        });
    }
});