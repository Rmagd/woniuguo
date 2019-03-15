var set, api = require("../../../../api.js"), QQMapWX = require("../../../../qqmap-wx.js"), app = getApp(), innerAudioContext = wx.createInnerAudioContext();

innerAudioContext.src = "", innerAudioContext.obeyMuteSwitch = !1, Page({
    data: {
        imgurl: app.imgurl,
        user: wx.getStorageSync("user"),
        confirmCodeStatus: !1,
        shou: "",
        fa: "",
        distype: "",
        soundRecording: {
            tempPath: "",
            duration: "",
            isPlay: !1
        },
        order_status: [ "待付款", "代发货", "已发货", "待收货", "已完成", "用户取消" ],
        order: {},
        voicetype: 0,
        vtype: !0
    },
    onLoad: function(e) {
        var t = this;
        t.setData({
            icons: wx.getStorageSync("site") + "/addons/sd_liferuning/tp/public/uploads/background"
        }), innerAudioContext.onPause(function() {
            t.setData({
                voicetype: 1,
                vtype: !0
            });
        }), innerAudioContext.onEnded(function() {
            console.log("结束"), t.setData({
                voicetype: 2,
                vtype: !0
            });
        });
    },
    toPhone: function(e) {
        wx.makePhoneCall({
            phoneNumber: e.currentTarget.dataset.phone
        });
    },
    soundRecordingPlay: function(e) {
        var t = this.data.vtype;
        console.log("-*--" + t), t ? innerAudioContext.play() : innerAudioContext.pause(), 
        this.setData({
            vtype: !t
        });
    },
    previewPic: function(e) {
        var t = [];
        t.push(e.currentTarget.dataset.src), wx.previewImage({
            current: t[0],
            urls: t
        });
    },
    previewPics: function(e) {
        var t = this.data.order.pics;
        wx.previewImage({
            current: t[e.currentTarget.dataset.index],
            urls: t
        });
    },
    onShow: function() {
        var e = wx.getStorageSync("current_order");
        "" != e.voice && (innerAudioContext.src = e.voice), e.pics && (e.pics = e.pics.split(","), 
        console.log(e.pics)), this.setData({
            order: e
        });
    },
    into_polyline: function(e) {
        console.log(e.currentTarget.dataset.url), wx.redirectTo({
          url: e.currentTarget.dataset.url,
        })
    },
    onUnload: function() {
        innerAudioContext.stop(), clearInterval(set);
    },
    onHide: function() {
        innerAudioContext.stop(), clearInterval(set);
    }
});