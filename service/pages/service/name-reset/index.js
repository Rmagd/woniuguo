Page({
    data: {
        username: ""
    },
    inputChange: function(a) {
        var e = a.detail.value;
        this.setData({
            username: e
        });
    },
    confim: function() {}
});