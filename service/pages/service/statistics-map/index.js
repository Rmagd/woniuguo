var app = getApp(), api = require("../../../../api.js");

Page({
    data: {
        panel: "panel1",
        num_day: "",
        num_wee: "",
        num_month: "",
        num_total: "",
        price_day: "",
        price_week: "",
        price_month: "",
        price_total: "",
        arrweek: null,
        arrmonth: null,
        incomeweek: null,
        incomemonth: null
    },
    onLoad: function(e) {
        var d = this;
        wx.getStorageSync("uid");
        app.request({
            url: api.count.countOrder,
            method: "post",
            data: {},
            success: function(e) {
                console.log(e, "------");
                for (var a = e.data.data, t = [], n = 0; n < 7; n++) t.push({
                    time: a[n].time,
                    size: a[n].num
                });
                for (var r = [], o = 0; o < a.length; o++) r.push({
                    time: a[o].time,
                    size: a[o].num
                });
                for (var i = [], s = 0; s < 7; s++) i.push({
                    time: a[s].time,
                    size: a[s].price
                });
                for (var c = [], m = 0; m < a.length; m++) c.push({
                    time: a[m].time,
                    size: a[m].price
                });
                return d.setData({
                    num: e.data.num,
                    price: e.data.price,
                    arrweek: t.reverse(),
                    arrmonth: r.reverse(),
                    incomeweek: i.reverse(),
                    incomemonth: c.reverse()
                }), d.drawCanvas({
                    canvasId: "order-map1",
                    data: d.data.arrweek,
                    power: 100,
                    showText: !0
                }), d.drawCanvas({
                    canvasId: "order-map2",
                    data: d.data.arrmonth,
                    power: 100,
                    showText: !1
                }), d.drawCanvas({
                    canvasId: "income-map1",
                    data: d.data.incomeweek,
                    power: 150,
                    showText: !0
                }), d.drawCanvas({
                    canvasId: "income-map2",
                    data: d.data.incomemonth,
                    power: 150,
                    showText: !1
                }), !1;
            }
        });
    },
    switchPanel: function(e) {
        var a = e.currentTarget.dataset.panel;
        this.setData({
            panel: a
        });
    },
    drawCanvas: function(e) {
        var a = e.canvasId, t = e.data, n = e.power, r = e.showText, o = wx.getSystemInfoSync().windowWidth / 750 * 700, i = wx.getSystemInfoSync().windowWidth / 750 * 250, s = t.length, c = wx.createCanvasContext(a);
        c.setStrokeStyle("#ccc"), c.setFillStyle("#14B5FA"), c.setFontSize(8);
        for (var m = 5; 0 < m; m--) c.beginPath(), c.lineTo(0, i / 5 * m), c.lineTo(o, i / 5 * m), 
        c.stroke(), c.fillText(10 - 2 * m, 0, i / 5 * m);
        for (m = s; 0 <= m; m--) c.beginPath(), c.lineTo(o / s * m, 0), c.lineTo(o / s * m, i), 
        c.stroke(), r && m < t.length && c.fillText(t[m].time, o / s * m + o / s / 3, i - 5);
        c.setStrokeStyle("#f90"), c.beginPath();
        for (m = 0; m < s; m++) c.lineTo(o / s * (m + 1), i - i / n * t[m].size);
        c.stroke(), c.draw(), c.save();
    }
});