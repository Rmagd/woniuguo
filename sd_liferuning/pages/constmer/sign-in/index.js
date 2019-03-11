var api = require("../../../../api.js"), app = getApp(), date = new Date(), year = date.getFullYear(), month = date.getMonth() + 1, dateArr = {
    year: year,
    month: month
}, leapYear = function(t) {
    return t % 4 == 0 && t % 100 != 0 || t % 400 == 0;
}, countDayByMonth = function(t, r) {
    return 1 == r | 3 == r | 5 == r | 7 == r | 8 == r | 10 == r | 12 == r ? 31 : 4 == r | 6 == r | 9 == r | 11 == r ? 30 : 2 == r ? leapYear(t) ? 29 : 28 : void 0;
}, getDayByMonth = function(t, r) {
    return new Date(t + "-" + r + "-1").getDay();
}, currentMonth = countDayByMonth(year, month), monthArr = [], currentDay = getDayByMonth(year, month), i = void 0, tempArr = [];

for (i = 0; i < currentDay; i++) tempArr.push({
    name: ""
});

for (i = 0; i < currentMonth; i++) currentDay++, tempArr.push({
    name: year + "-" + month + "-" + (i + 1),
    value: i + 1,
    flag: !1
}), currentDay % 7 != 0 && i != currentMonth - 1 || (monthArr.push(tempArr), tempArr = []);

Page({
    data: {
        dateArr: dateArr,
        monthArr: monthArr,
        isSign: "",
        data: ""
    },
    onLoad: function() {
        this.setData({
            icons: wx.getStorageSync("site") + "/addons/sd_liferuning/tp/public/uploads/background"
        });
    },
    signIn: function() {
        var r = this;
        app.request({
            url: api.user.signGrow,
            methon: "post",
            data: {},
            method: "post",
            success: function(t) {
                return r.onShow(), console.log("rerere", t), !1;
            }
        });
    },
    onShow: function(t) {
        var n = this, a = (wx.getStorageSync("uid"), n.data.monthArr), e = [];
        app.request({
            url: api.user.signList,
            methon: "post",
            data: {},
            method: "post",
            success: function(t) {
                console.log("-----", t);
                var r = t.data;
                1 == r.is_sign && n.setData({
                    isSign: !0
                }), n.setData({
                    data: r
                }), e = r.data, a.forEach(function(t, r) {
                    t && t.forEach(function(n, t) {
                        e.forEach(function(t, r) {
                            n.name == t && (n.flag = !0);
                        });
                    });
                }), n.setData({
                    monthArr: a
                });
            }
        });
    }
});