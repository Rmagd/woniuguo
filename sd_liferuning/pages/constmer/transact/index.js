var _data, _createClass = function() {
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

var config = require("../../../../config.js"), api = require("../../../../api.js"), QQMapWX = require("../../../../qqmap-wx.js"), app = getApp();

Page({
    data: (_data = {
        order: void 0,
        webRoot: app.webRoot,
        timeArr: [ [], [] ],
        cid: "",
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
        vipprice: "",
        price: 0,
        reward: 0,
        coupon: 0,
        lastPrice: 0,
        weight_price: "",
        full_money: "",
        integral: "",
        min_price: 0,
        yinpin: "",
        detail_info: "",
        addressId: "",
        wareText: "",
        didianprice: 0,
        timeprice: 0,
        inputAddressText: "",
        isReadProtocol: !0,
        weighprice: 0,
        isBargaining: !1,
        isOpenPreference: !1,
        isOpenIntegralDeduction: !1,
        show: !1,
        prices: 0,
        cancelWithMask: !0,
        pictrueTempPath: "",
        weight: 0,
        soundRecording: {
            tempPath: "",
            duration: "",
            isPlay: !1
        },
        actions: config.actions,
        cancelText: "取消"
    }, _defineProperty(_data, "integral", 0), _defineProperty(_data, "bargaining", 0), 
    _defineProperty(_data, "time_index", {
        column: "",
        value: ""
    }), _data),
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
        var t = this;
        app.location(t), app.order_template(this), wx.removeStorageSync("cost");
        var a = t.data.timeArr, i = t.data.pageConfig.time;
        if (a[0] = i, a[1] = i[0].time, t.setData({
            timeArr: a
        }), t.setData({
            icons: wx.getStorageSync("site") + "/addons/sd_liferuning/tp/public/uploads/background"
        }), "非会员用户" == wx.getStorageSync("huiyuan") && t.setData({
            huiyuan: 1
        }), e.cid && t.setData({
            cid: e.cid
        }), e.type_id && (t.setData({
            typeid: e.type_id
        }), t.setData({
            type_status: e.type
        })), t.data.typeid) {
            var r = t.data.typeid;
            t.data.type_status;
            t.setData({
                typeid: r
            });
        }
        if (e.addressId ? t.setData({
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
            var n = e.tags.split(",");
            this.setData({
                tags: n
            });
        }
    },
    onShow: function() {
        var i = this;
        1 == app.defaultadd && (i.setData({
            detail_infose: "",
            expect_time: "",
            time: ""
        }), app.defaultadd = 0), app.request({
            url: api.address.details,
            method: "post",
            data: {
                default: 1
            },
            success: function(e) {
                console.log("地址", e), "" == e.data ? (app.navtoaddress(), app.address_type = !1) : i.setData({
                    detail_info: e.data.address_name,
                    username: e.data.name,
                    phone: e.data.phone,
                    uaid: e.data.uid
                });
            }
        }), app.request({
            url: api.order.getAgencyRules,
            method: "post",
            data: {},
            success: function(e) {
                var t = e.data;
                if (1 == e.code) {
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
                    }), i.countPrice();
                }
                console.log("地址2：", e);
            }
        });
    },
    GetAddress: function() {
        var t = this;
        console.log("----------", t.data.detail_info), wx.chooseLocation({
            success: function(e) {
                t.setData({
                    hasLocation: !0,
                    location: {
                        longitude: e.longitude,
                        latitude: e.latitude
                    },
                    detail_infose: e.name,
                    detail_infos: e.address + e.name,
                    wd: e.latitude,
                    jd: e.longitude
                });
            }
        });
    },
    priceSliderChanging: function(e) {
        var t = e.detail.value;
        this.setData({
            prices: t
        });
    },
    priceSliderChange: function(e) {
        var t = e.detail.value;
        this.setData({
            prices: t,
            lastPrice: Number(t) + Number(this.data.price)
        }), console.log(t), console.log(this.data.price, "---_this.data.price"), this.countPrice();
    },
    pickerSelector: function(e) {
        var t = this, a = e.currentTarget.dataset.type, i = e.detail.value;
        "time" == a && (t.setData({
            time: {
                week: t.data.timeArr[0][i[0]],
                hour: t.data.timeArr[1][i[1]]
            },
            expect_time: t.data.timeArr[1][i[1]].stamp
        }), console.log(t.data.expect_time)), "reward" == a && t.setData({
            reward: t.data.rewardArr[i].price
        }), "coupon" == a && (Number(t.data.prices) < Number(t.data.couponArr[i].min_price) ? (wx.showToast({
            title: "此优惠券无法使用",
            icon: "none",
            duration: 1e3
        }), t.setData({
            coupon: 0,
            min_price: 0,
            useid: 0,
            types: 0
        })) : "0" == t.data.couponArr[i].id ? t.setData({
            coupon: t.data.couponArr[i].price,
            min_price: t.data.couponArr[i].min_price,
            useid: t.data.couponArr[i].id,
            types: 0
        }) : t.setData({
            coupon: t.data.couponArr[i].price,
            min_price: t.data.couponArr[i].min_price,
            useid: t.data.couponArr[i].id,
            types: 1
        })), t.countPrice();
    },
    bindColumnChange: function(e) {
        var t = this.data.pageConfig.time, a = this.data.timeArr, i = e.detail.column, r = e.detail.value, n = this.data.time_index;
        console.log("修改的列为", e.detail.column, "，值为", e.detail.value), 0 == i && (a[1] = t[r].time), 
        n.column = i, n.value = r, this.setData({
            timeArr: a,
            time_index: n
        });
    },
    countPrice: function() {
        var e = this;
        if (console.log(e.data.order, "------that.data.order"), null == e.data.order) return !1;
        var t = e.data.types, a = e.data.prices, i = e.data.order.discount, r = e.data.stepper.stepper, n = e.data.coupon, o = e.data.min_price, s = e.data.order.reduce_price, c = e.data.order.integral_max_price, d = e.data.order.secure_price, u = e.data.isOpenIntegralDeduction, p = 0;
        0 === t ? (console.log("折扣价"), console.log(u, "折扣状态"), u ? (Number(a) >= Number(c) ? p = Number(a) - Number(i) * Number(a) - Number(s) + Number(r) + Number(d) : (e.setData({
            integral: 0,
            jf: "",
            isOpenIntegralDeduction: !1
        }), p = Number(a) - Number(i) * Number(a) + Number(r) + Number(d)), e.setData({
            discount: e.data.order.discount + "折"
        })) : (e.setData({
            discount: e.data.order.discount + "折"
        }), p = Number(a) - Number(i) * Number(a) + Number(r) + Number(d))) : (console.log("优惠价"), 
        console.log(u, "折扣状态"), Number(a) < Number(o) ? (e.setData({
            coupon: 0,
            min_price: 0,
            useid: 0,
            types: 0
        }), u ? (Number(a) >= Number(c) ? p = Number(a) + Number(r) - Number(n) - Number(s) + Number(d) : (e.setData({
            integral: 0,
            jf: "",
            isOpenIntegralDeduction: !1
        }), p = Number(a) + Number(r) + Number(d)), e.setData({
            discount: "无折扣"
        })) : (e.setData({
            discount: "无折扣"
        }), p = Number(a) + Number(r) + Number(d))) : u ? (Number(a) >= Number(c) ? p = Number(a) + Number(r) - Number(n) - Number(s) + Number(d) : (e.setData({
            integral: 0,
            jf: "",
            isOpenIntegralDeduction: !1
        }), p = Number(a) + Number(r) - Number(n) + Number(d)), e.setData({
            discount: "无折扣"
        })) : (e.setData({
            discount: "无折扣"
        }), p = Number(a) + Number(r) - Number(n) + Number(d)));
        var l = {
            lastPrice: p || 0,
            base_price: a || 0,
            discount: t ? e.data.order.discount : 0,
            secure_price: d || 0,
            reduce_price: u ? s : 0,
            coupon: n || 0,
            stepper: r || 0,
            type: 6
        };
        wx.setStorageSync("cost", l), e.setData({
            lastPrice: p.toFixed(2)
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
    weight: function(e) {
        console.log(e.detail.value);
        var t = this;
        app.request({
            url: api.default.WeightPrice,
            data: {
                bid: wx.getStorageSync("bid"),
                weight: e.detail.value
            },
            success: function(e) {
                "" != e.data && (t.setData({
                    weighprice: e.data,
                    price: t.data.price + e.data - weighprice
                }), t.countPrice());
            }
        });
    },
    formSubmit: function(e) {
        return console.log(e.detail.value), e.detail.value.voice || e.detail.value.goods ? "" == e.detail.value.address ? (wx.showToast({
            title: "地址未选择",
            icon: "none",
            duration: 1500
        }), !1) : 1 == this.data.pageConfig.mainConfig.templet4.timeConfig.enabled && "" == e.detail.value.expect_time ? (wx.showToast({
            title: "请选择收货约时间",
            icon: "none",
            duration: 1500
        }), !1) : 0 == e.detail.value.prices ? (wx.showToast({
            title: "请选择代办费用",
            icon: "none",
            duration: 1500
        }), !1) : this.data.isReadProtocol ? (console.log(e.detail.formId, " e.detail.formId"), 
        this.setData({
            formData: e.detail.value,
            formId: e.detail.formId
        }), void this.openActionsheet()) : (wx.showToast({
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
        _defineProperty(t, "actionType", i), t)), i) {
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
        var t = this, e = t.data.formData, a = t.data.type_status;
        if (a) ; else ;
        app.request({
            url: api.payment.agencyPay,
            method: "post",
            data: {
                address: e.address + e.mudaddsinfos,
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
                price: t.data.prices,
                longitude: t.data.location.longitude,
                latitude: t.data.location.latitude,
                voice_time: t.data.soundRecording.duration,
                laiyuan_id: 0,
                old_order_no: 0,
                pid: t.data.pid,
                run_now: 0 == e.expect_time ? 1 : 0
            },
            success: function(e) {
                if (0 == e.code) return app.Showmodal(), !1;
                wx.requestPayment({
                    timeStamp: e.data.timeStamp,
                    nonceStr: e.data.nonceStr,
                    package: e.data.package,
                    signType: "MD5",
                    paySign: e.data.paySign,
                    success: function(e) {
                        wx.showToast({
                            title: "支付成功",
                            icon: "success",
                            success: function() {
                                app.sendSocketMessage_104(1), setTimeout(function() {
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
                            icon: "none"
                        });
                    },
                    complete: function(e) {
                        t.setData({
                            clickpay: !0
                        });
                    }
                });
            }
        });
    },
    balancePay: function() {
        var t = this, a = this, i = t.data.formData, r = t.data.formId, e = t.data.type_status;
        if (e) ; else ;
        wx.showModal({
            title: "余额支付",
            content: "是否支付" + t.data.lastPrice + "元",
            success: function(e) {
                e.confirm ? (wx.showLoading({
                    title: "正在支付"
                }), app.request({
                    url: api.payment.agencyPay,
                    method: "post",
                    data: {
                        address: i.address + i.mudaddsinfos,
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
                        price: a.data.prices,
                        form_id: r,
                        longitude: a.data.location.longitude,
                        latitude: a.data.location.latitude,
                        voice_time: t.data.soundRecording.duration,
                        laiyuan_id: 0,
                        old_order_no: 0,
                        pid: t.data.pid,
                        run_now: 0 == i.expect_time ? 1 : 0
                    },
                    success: function(e) {
                        if (wx.hideLoading(), console.log(e), 0 == e.code) {
                            if ("没有添加默认地址" == e.msg) return app.Showmodal(), !1;
                            wx.showToast({
                                title: e.msg,
                                icon: "none"
                            });
                        } else wx.showToast({
                            title: "支付成功",
                            icon: "success",
                            success: function() {
                                app.sendSocketMessage_104(1), setTimeout(function() {
                                    wx.reLaunch({
                                        url: "/sd_liferuning/pages/constmer/order-list/index"
                                    });
                                }, 1500);
                            }
                        });
                        a.setData({
                            clickpay: !0
                        });
                    },
                    fail: function(e) {
                        a.setData({
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
        var r = this, n = app.siteInfo.acid;
        recorderManager.stop(), recorderManager.onStop(function(e) {
            var t = e.tempFilePath, a = Math.ceil(e.duration / 1e3);
            innerAudioContext.src = t, r.setData({
                soundRecording: {
                    tempPath: t,
                    duration: a,
                    isPlay: !1
                }
            });
            var i = r.data.soundRecording.tempPath;
            i && (console.log("tempPath", i), wx.uploadFile({
                url: api.order.upload + "&_acid=" + n + "&access_token=" + wx.getStorageSync("access_token"),
                filePath: i,
                name: "file",
                success: function(e) {
                    r.setData({
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
    takePictrue: function() {
        var a = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                var t = e.tempFilePaths;
                a.setData({
                    pictrueTempPath: t[0]
                });
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
        var e = this, t = e.data.prices, a = this.data.isOpenIntegralDeduction, i = e.data.order;
        if (!(Number(t) > Number(e.data.order.integral_max_price))) return wx.showToast({
            title: "未达到使用积分抵扣价格",
            icon: "none",
            duration: 1e3
        }), e.setData({
            integral: 0,
            jf: "",
            isOpenIntegralDeduction: a
        }), !1;
        console.log("大于"), a ? (e.setData({
            integral: 0,
            jf: "",
            isOpenIntegralDeduction: !a
        }), console.log("关闭")) : e.setData({
            integral: 1,
            jf: "（剩余积分：" + i.integral + "，抵扣积分：" + i.reduce_integral + "）",
            isOpenIntegralDeduction: !a
        }), e.countPrice();
    },
    onUnload: function() {
        app.default = 0;
    }
});