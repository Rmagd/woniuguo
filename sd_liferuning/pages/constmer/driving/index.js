var _createClass = function() {
    function i(e, t) {
        for (var a = 0; a < t.length; a++) {
            var i = t[a];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(e, t, a) {
        return t && i(e.prototype, t), a && i(e, a), e;
    };
}();

function _defineProperty(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var DateFactory = function() {
    function e() {
        _classCallCheck(this, e), this._date = new Date(), this._year = this._date.getFullYear(), 
        this._month = this._date.getMonth() + 1, this._day = this._date.getDate(), this._hours = this._date.getHours(), 
        this._minutes = this._date.getMinutes(), this._dayTag = this._date.getDay();
    }
    return _createClass(e, [ {
        key: "init",
        value: function() {
            this._todayTimeArr = [], this._defaultTimeArr = [], this._timeArr = [], this._weekArr = [], 
            this._hourArr = [], this.createTodayTimeArr(this._todayTimeArr, this._hours, this._minutes), 
            this.createDefaultTimeArr(this._defaultTimeArr);
            var e = void 0, t = this._dayTag;
            for (e = 0; e < 14; e++) 0 < e && ++t, 13 < t && (t = 0), this._weekArr.push({
                id: e,
                name: this.switchWeek(t)
            });
        }
    }, {
        key: "createTodayTimeArr",
        value: function(e, t, a) {
            if (e) {
                var i = void 0;
                for (i = t; i < 24; i++) i == t ? a < 30 && e.push({
                    name: i + ":30"
                }) : (e.push({
                    name: i + ":00"
                }), e.push({
                    name: i + ":30"
                }));
            }
        }
    }, {
        key: "createDefaultTimeArr",
        value: function(e) {
            if (e) {
                var t = void 0;
                for (t = 0; t < 24; t++) e.push({
                    name: t + ":00"
                }), e.push({
                    name: t + ":30"
                });
            }
        }
    }, {
        key: "switchWeek",
        value: function(e) {
            switch (6 < e ? e - 7 : e) {
              case 0:
                return "星期天";

              case 1:
                return "星期一";

              case 2:
                return "星期二";

              case 3:
                return "星期三";

              case 4:
                return "星期四";

              case 5:
                return "星期五";

              case 6:
                return "星期六";
            }
            return -1;
        }
    } ]), e;
}(), dateFactory = new DateFactory();

dateFactory.init();

var recorderManager = wx.getRecorderManager(), innerAudioContext = wx.createInnerAudioContext();

innerAudioContext.obeyMuteSwitch = !1;

var api = require("../../../../api.js"), QQMapWX = require("../../../../qqmap-wx.js"), app = getApp(), config = require("../../../../config.js");

Page({
    data: {
        order: void 0,
        webRoot: app.webRoot,
        timeArr: [ [], [] ],
        cid: "",
        detail_infos: "",
        rewardArr: [ {
            price: 0,
            text: "0元"
        }, {
            price: 1,
            text: "1元"
        }, {
            price: 2,
            text: "2元"
        }, {
            price: 3,
            text: "3元"
        }, {
            price: 4,
            text: "4元"
        }, {
            price: 5,
            text: "6元"
        }, {
            price: 10,
            text: "10元"
        }, {
            price: 15,
            text: "15元"
        }, {
            price: 20,
            text: "20元"
        } ],
        couponArr: [ {
            price: 0,
            text: ""
        } ],
        stepper: {
            stepper: 0
        },
        txtmaxlength: 40,
        time: "",
        price: 0,
        reward: 0,
        coupon: 0,
        lastPrice: 0,
        vipprice: "",
        detail_info: "",
        clickpay: !0,
        addressId: "",
        wareText: "",
        didianprice: 0,
        timeprice: 0,
        inputAddressText: "",
        isReadProtocol: !0,
        isBargaining: 0,
        isOpenPreference: !1,
        isOpenIntegralDeduction: !1,
        full_money: "",
        integral: 0,
        show: !1,
        cancelWithMask: !0,
        yinpin: "",
        proxy_id: 0,
        pictrueTempPath: "",
        soundRecording: {
            tempPath: "",
            duration: "",
            isPlay: !1
        },
        actions: config.actions,
        cancelText: "取消",
        time_index: {
            column: 0,
            value: 0
        },
        bargaining: 0
    },
    xphoto: function() {
        var a = this, i = (a.data.xphoto, app.siteInfo.acid);
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                var t = e.tempFilePaths;
                wx.saveFile({
                    tempFilePath: t[0],
                    success: function(e) {
                        var t = e.savedFilePath;
                        wx.uploadFile({
                            url: api.order.upload + "&_acid=" + i + "&access_token=" + wx.getStorageSync("access_token"),
                            filePath: t,
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            name: "file",
                            success: function(e) {
                                var t = JSON.parse(e.data);
                                if (console.log("图片:", t), 1 == t.code) {
                                    a.setData({
                                        pictrueTempPath: t.data
                                    });
                                } else wx.showModal({
                                    title: "提示",
                                    content: "图片上传失败",
                                    showCancel: !1
                                });
                            },
                            fail: function(e) {
                                console.log("res fail", e);
                            }
                        });
                    }
                });
            }
        });
    },
    xphotos: function(e) {
        console.log("eee", e);
        var t = e.currentTarget.id;
        wx.navigateTo({
            url: "/sd_liferuning/pages/constmer/choose-pic/index?src=" + t
        });
    },
    onLoad: function(e) {
        var t = this, a = this;
        if (app.location(t), app.order_template(a), wx.removeStorageSync("cost"), e.tags) {
            var i = e.tags.split(",");
            a.setData({
                tags: i
            });
        }
        if (t.setData({
            icons: wx.getStorageSync("site") + "/addons/sd_liferuning/tp/public/uploads/background"
        }), "非会员用户" == wx.getStorageSync("huiyuan") && t.setData({
            huiyuan: 1
        }), e.addressId ? t.setData({
            time: e.time,
            price: e.price,
            reward: e.reward,
            coupon: e.coupon,
            lastPrice: e.lastPrice,
            addressId: e.addressId,
            inputAddressText: e.inputAddressText,
            wareText: e.wareText,
            txtlength: e.wareText.length,
            cid: e.cid
        }) : t.setData({
            wareText: e.wareText ? e.wareText : "",
            txtlength: e.wareText.length
        }), e.tags) {
            var o = e.tags.split(",");
            a.setData({
                tags: o
            });
        }
    },
    onShow: function(e) {
        var t = this;
        1 == app.defaultadd && (t.setData({
            detail_infose: ""
        }), app.defaultadd = 0), app.request({
            url: api.address.details,
            method: "post",
            data: {
                default: 1
            },
            success: function(e) {
                console.log("地址----", e.data), "" == e.data ? (app.navtoaddress(), app.address_type = !1) : t.setData({
                    detail_info: e.data.address_name,
                    username: e.data.name,
                    phone: e.data.phone,
                    uaid: e.data.uid
                });
            }
        });
        var a = app.pageOperate;
        a && 1 == a && this.setData({
            pictrueTempPath: ""
        });
    },
    GetAddress: function() {
        var t = this;
        if (app.adddetails(), !app.address_type) return !1;
        wx.chooseLocation({
            success: function(e) {
                console.log(e), t.setData({
                    detail_infose: e.name,
                    hasLocation: !0,
                    location: {
                        longitude: e.longitude,
                        latitude: e.latitude
                    },
                    detail_infos: e.address + e.name,
                    wd: e.latitude,
                    jd: e.longitude
                });
            }
        });
    },
    GetAddresss: function() {
        var i = this;
        if ("" == i.data.detail_infos) return wx.showToast({
            title: "请选择起始位置",
            icon: "none"
        }), !1;
        i.data.wd, i.data.jd;
        wx.chooseLocation({
            success: function(e) {
                i.setData({
                    detail_infosse: e.name,
                    hasLocation: !0,
                    detail_infoss: e.address + e.name,
                    locations: {
                        longitude: e.longitude,
                        latitude: e.latitude
                    }
                }), app.request({
                    url: api.order.getDriveRules,
                    metho: "post",
                    data: {
                        start_adds: i.data.detail_infos,
                        target_adds: i.data.detail_infoss,
                        start_adds_latitude: i.data.location.latitude,
                        start_adds_longitude: i.data.location.longitude,
                        target_adds_latitude: i.data.locations.latitude,
                        target_adds_longitude: i.data.locations.longitude
                    },
                    success: function(e) {
                        var t = e.data;
                        if (0 === t.discount ? i.setData({
                            discount: "无折扣"
                        }) : i.setData({
                            discount: t.discount + "折"
                        }), t.coupon) {
                            for (var a = 0; a < t.coupon.length; a++) t.coupon[a].text = "满" + t.coupon[a].min_price + "元减" + t.coupon[a].price + "元";
                            t.coupon.push({
                                id: "0",
                                text: "不使用优惠券",
                                min_price: "0",
                                price: "0"
                            }), i.setData({
                                couponArr: t.coupon
                            });
                        }
                        i.setData({
                            order: t,
                            types: 0
                        }), i.countPrice(), console.log("金额", e), i.setData({});
                    }
                });
            }
        });
    },
    pickerSelector: function(e) {
        var t = this, a = e.currentTarget.dataset.type, i = e.detail.value, o = t.data.time_index;
        "time" == a && (console.log(o, "----------"), t.setData({
            time: {
                week: t.data.timeArr[0][i[0]],
                hour: t.data.timeArr[1][i[1]]
            },
            expect_time: t.data.timeArr[1][i[1]].stamp
        }), console.log(t.data.expect_time)), "reward" == a && t.setData({
            reward: t.data.rewardArr[i].price
        }), "coupon" == a && ("0" == t.data.couponArr[i].id ? t.setData({
            coupon: t.data.couponArr[i].price,
            full_money: t.data.couponArr[i].min_price,
            useid: t.data.couponArr[i].id,
            types: 0
        }) : t.setData({
            coupon: t.data.couponArr[i].price,
            full_money: t.data.couponArr[i].min_price,
            useid: t.data.couponArr[i].id,
            types: 1
        })), t.countPrice();
    },
    bindColumnChange: function(e) {
        var t = this.data.pageConfig.time, a = this.data.timeArr, i = e.detail.column, o = e.detail.value, n = this.data.time_index;
        console.log("修改的列为", e.detail.column, "，值为", e.detail.value), 0 == i && (a[1] = t[o].time), 
        n.column = i, n.value = o, this.setData({
            timeArr: a,
            time_index: n
        });
    },
    countPrice: function() {
        var e = this;
        if (null == e.data.order) return !1;
        var t = e.data.types, a = e.data.order.base_price, i = e.data.order.discount_price, o = e.data.stepper.stepper, n = e.data.coupon, r = e.data.order.reduce_price, s = e.data.isOpenIntegralDeduction, d = e.data.order.secure_price, c = 0;
        console.log(t, "coupon------"), 0 === t ? (console.log("折扣价"), console.log(s, "折扣状态"), 
        s ? (e.setData({
            discount: e.data.order.discount + "折"
        }), c = Number(a) - Number(i) + Number(o) - Number(r) + Number(0) + Number(d)) : (e.setData({
            discount: e.data.order.discount + "折"
        }), c = Number(a) - Number(i) + Number(o) + Number(0) + Number(d))) : (console.log("优惠价"), 
        console.log(s, "折扣状态"), console.log(Number(a) + "---" + Number(o) + "---" + Number(n) + "---" + Number(r) + "---" + Number(0) + "---" + Number(d)), 
        s ? (e.setData({
            discount: "无折扣"
        }), c = Number(a) + Number(o) - Number(n) - Number(r) + Number(0) + Number(d)) : (e.setData({
            discount: "无折扣"
        }), c = Number(a) + Number(o) - Number(n) + Number(0) + Number(d)));
        var u = {
            lastPrice: c || 0,
            base_price: a || 0,
            discount: t ? e.data.order.discount : 0,
            secure_price: d || 0,
            reduce_price: s ? r : 0,
            coupon: n || 0,
            stepper: o || 0,
            type: 4
        };
        wx.setStorageSync("cost", u), e.setData({
            lastPrice: c.toFixed(2)
        });
    },
    changeInputData: function(e) {
        console.log("地址", e);
        var t = e.currentTarget.dataset.name, a = e.detail.value, i = this.data.txtmaxlength;
        "wareText" == t && (console.log(a.length), a.length > i ? this.setData({
            wareText: a
        }) : this.setData({
            wareText: a,
            txtlength: a.length
        })), "inputAddressText" == t && this.setData({
            inputAddressText: a
        });
    },
    formSubmit: function(e) {
        console.log(e.detail.value);
        var t = this;
        t.data.pictrueTempPath, t.data.yinpin;
        return e.detail.value.voice || e.detail.value.goods ? "" == e.detail.value.start_adds || "" == e.detail.value.target_adds ? (wx.showToast({
            title: "地址未选择，无法下单。",
            icon: "none",
            duration: 1e3
        }), !1) : 1 == t.data.pageConfig.mainConfig.templet6.timeConfig.enabled && "" == e.detail.value.expect_time ? (wx.showToast({
            title: "时间未选择，无法下单。",
            icon: "none"
        }), !1) : t.data.isReadProtocol ? (t.setData({
            formData: e.detail.value,
            formId: e.detail.formId
        }), void t.openActionsheet()) : (wx.showToast({
            title: "未同意协议，无法下单。",
            icon: "none",
            duration: 1e3
        }), !1) : (wx.showToast({
            title: "请输入信息",
            icon: "none",
            mask: !0
        }), !1);
    },
    addWareItem: function(e) {
        var t = e.currentTarget.dataset.tag, a = this.data.wareText, i = "" == a.trim() ? t : a + ", " + t;
        i.length > this.data.txtmaxlength || this.setData({
            wareText: i,
            txtlength: i.length
        });
    },
    isRead: function(e) {
        var t = this.data.isReadProtocol;
        this.setData({
            isReadProtocol: !t
        });
    },
    radioChanged: function(e) {
        var t = e.detail.value;
        "bargaining" == e.currentTarget.dataset.name && this.setData({
            bargaining: t
        });
    },
    openActionsheet: function() {
        this.setData({
            show: !0
        });
    },
    closeActionSheet: function() {
        this.setData({
            show: !1
        });
    },
    clickAction: function(e) {
        var t, a = this, i = e.detail.index;
        switch (this.setData((_defineProperty(t = {}, "actions[" + i + "].loading", !0), 
        _defineProperty(t, "actionType", i), _defineProperty(t, "clickpay", !0), t)), i) {
          case 0:
            this.wechatPay();
            break;

          case 1:
            this.balancePay();
        }
        setTimeout(function() {
            var e;
            a.setData((_defineProperty(e = {}, "show", !1), _defineProperty(e, "actions[" + i + "].loading", !1), 
            e));
        }, 100);
    },
    wechatPay: function() {
        var t = this, e = t.data.formData;
        console.log("表单数据=>", e), console.log("微信支付"), app.request({
            url: api.payment.DrivePay,
            method: "post",
            data: {
                remark: e.remark,
                pic: e.pic,
                voice: e.voice,
                goods: "" == e.goods ? "语音下单" : e.goods,
                expect_time: e.expect_time,
                reward_price: e.reward_price,
                coupon_id: e.coupon_id ? e.coupon_id : 0,
                integral: e.integral,
                bargaining: e.bargaining,
                pay_type: 1,
                start_adds: e.start_adds,
                target_adds: e.target_adds,
                start_adds_latitude: this.data.location.latitude,
                start_adds_longitude: this.data.location.longitude,
                target_adds_latitude: this.data.locations.latitude,
                target_adds_longitude: this.data.locations.longitude,
                voice_time: t.data.soundRecording.duration,
                laiyuan_id: 0,
                old_order_no: 0,
                pid: t.data.pid,
                run_now: 0 == e.expect_time ? 1 : 0
            },
            success: function(e) {
                1 == e.code ? wx.requestPayment({
                    timeStamp: e.data.timeStamp,
                    nonceStr: e.data.nonceStr,
                    package: e.data.package,
                    signType: "MD5",
                    paySign: e.data.paySign,
                    success: function(e) {
                        wx.showToast({
                            title: "支付成功",
                            icon: "success",
                            duration: 1e3,
                            success: function() {
                                app.sendSocketMessage_104(2), setTimeout(function() {
                                    wx.reLaunch({
                                        url: "/sd_liferuning/pages/constmer/order-list/index"
                                    });
                                }, 1e3);
                            }
                        });
                    },
                    fail: function() {
                        wx.showToast({
                            title: "支付失败",
                            icon: "none",
                            duration: 1500
                        });
                    },
                    complete: function(e) {
                        t.setData({
                            clickpay: !0
                        });
                    }
                }) : wx.showToast({
                    title: res.msg,
                    icon: "none"
                });
            }
        });
    },
    balancePay: function() {
        var t = this, a = this, i = t.data.formData, o = t.data.formId;
        console.log("表单数据=>", i), wx.showModal({
            title: "余额支付",
            content: "是否支付" + t.data.lastPrice + "元",
            success: function(e) {
                e.confirm ? (wx.showLoading({
                    title: "正在支付"
                }), app.request({
                    url: api.payment.DrivePay,
                    method: "post",
                    data: {
                        remark: i.remark,
                        pic: i.pic,
                        voice: i.voice,
                        goods: "" == i.goods ? "语音下单" : i.goods,
                        expect_time: i.expect_time,
                        reward_price: i.reward_price,
                        coupon_id: i.coupon_id ? i.coupon_id : 0,
                        integral: i.integral,
                        bargaining: i.bargaining,
                        pay_type: 2,
                        start_adds: i.start_adds,
                        target_adds: i.target_adds,
                        form_id: o,
                        start_adds_latitude: a.data.location.latitude,
                        start_adds_longitude: a.data.location.longitude,
                        target_adds_latitude: a.data.locations.latitude,
                        target_adds_longitude: a.data.locations.longitude,
                        voice_time: t.data.soundRecording.duration,
                        laiyuan_id: 0,
                        old_order_no: 0,
                        pid: t.data.pid,
                        run_now: 0 == i.expect_time ? 1 : 0
                    },
                    success: function(e) {
                        return wx.hideLoading(), console.log(e), 0 == e.code ? wx.showToast({
                            title: e.msg,
                            icon: "none"
                        }) : wx.showToast({
                            title: "支付成功",
                            icon: "success",
                            success: function() {
                                app.sendSocketMessage_104(2), setTimeout(function() {
                                    wx.reLaunch({
                                        url: "/sd_liferuning/pages/constmer/order-list/index"
                                    });
                                }, 1500);
                            }
                        }), !1;
                    },
                    fail: function(e) {
                        t.setData({
                            clickpay: !0
                        });
                    }
                })) : e.cancel;
            }
        }), console.log("余额支付");
    },
    soundRecordingStart: function() {
        recorderManager.start({
            duration: 6e4,
            sampleRate: 44100,
            numberOfChannels: 1,
            encodeBitRate: 192e3,
            format: "mp3",
            frameSize: 50
        });
    },
    soundRecordingEnd: function() {
        var o = this, n = app.siteInfo.acid;
        recorderManager.stop(), recorderManager.onStop(function(e) {
            var t = e.tempFilePath, a = Math.ceil(e.duration / 1e3);
            innerAudioContext.src = t, o.setData({
                soundRecording: {
                    tempPath: t,
                    duration: a,
                    isPlay: !1
                }
            });
            var i = o.data.soundRecording.tempPath;
            i && (console.log("tempPath", i), wx.uploadFile({
                url: api.order.upload + "&_acid=" + n + "&access_token=" + wx.getStorageSync("access_token"),
                filePath: i,
                name: "file",
                success: function(e) {
                    o.setData({
                        yinpin: JSON.parse(e.data)
                    });
                }
            }));
        });
    },
    soundRecordingPlay: function() {
        var t = this, e = innerAudioContext.paused, a = t.data.soundRecording;
        e ? (innerAudioContext.play(), a.isPlay = !0, setTimeout(function() {
            var e = t.data.soundRecording;
            e.isPlay = !1, t.setData({
                soundRecording: e
            });
        }, 1e3 * a.duration)) : (innerAudioContext.stop(), a.isPlay = !1), t.setData({
            soundRecording: a
        });
    },
    soundRecordingRemove: function() {
        innerAudioContext.stop(), this.setData({
            soundRecording: {
                tempPath: "",
                duration: "",
                isPlay: !1
            }
        });
    },
    handleStepperChange: function(e) {
        var t = e.detail, a = e.target.dataset.componentId;
        this.setData(_defineProperty({}, a + ".stepper", t)), this.countPrice();
    },
    isBargaining: function(e) {
        var t = this.data.isBargaining;
        this.setData({
            isBargaining: !t,
            bargaining: t ? 0 : 1
        });
    },
    isOpenPreference: function() {
        var t = this, e = this.data.isOpenPreference;
        0 == e ? wx.request({
            url: api.member.rebate,
            data: {
                uid: wx.getStorageSync("uid"),
                bid: wx.getStorageSync("bid")
            },
            method: "get",
            success: function(e) {
                t.setData({
                    vipprice: e.data.data.zhekou
                });
            }
        }) : t.setData({
            vipprice: 0
        }), this.setData({
            isOpenPreference: !e
        });
    },
    isOpenIntegralDeduction: function() {
        var e = this.data.isOpenIntegralDeduction, t = this.data.order;
        e ? (this.setData({
            integral: 0,
            jf: "",
            isOpenIntegralDeduction: !e
        }), console.log("关闭")) : this.setData({
            integral: 1,
            jf: "（剩余积分：" + t.integral + "，抵扣积分：" + t.reduce_integral + "）",
            isOpenIntegralDeduction: !e
        }), this.countPrice();
    },
    onUnload: function() {
        app.default = 0;
    }
});