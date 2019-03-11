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
        timeArrs: [ [], [], [] ],
        cid: ""
    }, _defineProperty(_data, "webRoot", app.webRoot), _defineProperty(_data, "rewardArr", [ {
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
    } ]), _defineProperty(_data, "couponArr", [ {
        price: 0,
        text: ""
    } ]), _defineProperty(_data, "stepper", {
        stepper: 0
    }), _defineProperty(_data, "txtmaxlength", 40), _defineProperty(_data, "time", ""), 
    _defineProperty(_data, "full_money", ""), _defineProperty(_data, "price", 0), _defineProperty(_data, "reward", 0), 
    _defineProperty(_data, "coupon", 0), _defineProperty(_data, "lastPrice", 0), _defineProperty(_data, "vipprice", ""), 
    _defineProperty(_data, "btis", 0), _defineProperty(_data, "detail_info", ""), _defineProperty(_data, "addressId", ""), 
    _defineProperty(_data, "wareText", ""), _defineProperty(_data, "didianprice", 0), 
    _defineProperty(_data, "timeprice", 0), _defineProperty(_data, "inputAddressText", ""), 
    _defineProperty(_data, "isReadProtocol", !0), _defineProperty(_data, "isBargaining", !1), 
    _defineProperty(_data, "isOpenPreference", !1), _defineProperty(_data, "isOpenIntegralDeduction", !1), 
    _defineProperty(_data, "integral", 0), _defineProperty(_data, "show", !1), _defineProperty(_data, "cancelWithMask", !0), 
    _defineProperty(_data, "yinpin", ""), _defineProperty(_data, "proxy_id", 0), _defineProperty(_data, "pictrueTempPath", ""), 
    _defineProperty(_data, "soundRecording", {
        tempPath: "",
        duration: "",
        isPlay: !1
    }), _defineProperty(_data, "actions", config.actions), _defineProperty(_data, "cancelText", "取消"), 
    _defineProperty(_data, "time_index", {
        column: "",
        value: ""
    }), _defineProperty(_data, "time_stamp", [ 0, 0, 0 ]), _defineProperty(_data, "bargaining", 0), 
    _data),
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
        wx.removeStorageSync("cost"), app.location(t), app.order_template(this);
        var a = t.data.timeArrs, i = t.data.pageConfig.time;
        if (a[0] = i, a[1] = i[0].time, a[2] = i[0].time, t.setData({
            timeArrs: a
        }), t.setData({
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
            var r = e.tags.split(",");
            this.setData({
                tags: r
            });
        }
    },
    onShow: function(e) {
        var t = this;
        1 == app.defaultadd && (t.setData({
            expect_time: "",
            time: ""
        }), app.defaultadd = 0), app.request({
            url: api.address.details,
            method: "post",
            data: {
                default: 1
            },
            success: function(e) {
                console.log("地址", e), "" == e.data ? (app.navtoaddress(), app.address_type = !1) : t.setData({
                    detail_info: e.data.address_name,
                    username: e.data.name,
                    phone: e.data.phone,
                    uid: e.data.uid
                });
            }
        });
        var a = app.pageOperate;
        a && 1 == a && this.setData({
            pictrueTempPath: ""
        });
    },
    GetAddress: function() {
        var i = this;
        wx.chooseLocation({
            success: function(e) {
                i.setData({
                    hasLocation: !0,
                    location: {
                        longitude: e.longitude,
                        latitude: e.latitude
                    },
                    detail_infos: e.address,
                    wd: e.latitude,
                    jd: e.longitude
                });
            },
            complete: function(e) {
                if ("" != i.data.detail_info && null != i.data.wd && null != i.data.jd && "" != i.data.detail_infos && "" != i.data.wd && "" != i.data.jd) {
                    var t = i.data.wd, a = i.data.jd;
                    new QQMapWX({
                        key: "EKJBZ-72L3P-FHXDL-VSLEP-JEAGJ-JTFSD"
                    }).geocoder({
                        address: i.data.detail_info,
                        success: function(e) {
                            app.request({
                                url: api.default.addprice,
                                metho: "post",
                                data: {
                                    myaddsjd: e.result.location.lng,
                                    myaddswd: e.result.location.lat,
                                    mudaddswd: t,
                                    mudaddsjd: a,
                                    bid: wx.getStorageSync("bid")
                                },
                                success: function(e) {
                                    var t = i.data.didianprice;
                                    console.log(t), console.log("金额", e), i.setData({
                                        didianprice: e.data.price,
                                        price: i.data.price - t + e.data.price,
                                        proxy_id: e.data.proxy_id ? e.data.proxy_id : 0
                                    }), i.countPrice();
                                }
                            });
                        }
                    });
                }
            }
        });
    },
    pickerSelector: function(e) {
        var i = this, t = e.currentTarget.dataset.type, a = i.data.time_stamp, r = e.detail.value;
        if ("time" == t) {
            if (app.adddetails(), !app.address_type) return !1;
            if (console.log(i.data.time_stamp, "---val"), console.log(i.data.timeArrs, "-----"), 
            console.log(i.data.timeArrs[1][a[1]].stamp, "----"), console.log(i.data.timeArrs[2][a[2]].stamp, "----"), 
            i.data.timeArrs[1][a[1]].stamp >= i.data.timeArrs[2][a[2]].stamp) return wx.showToast({
                icon: "none",
                title: "请至少间隔半个小时的服务时间"
            }), !1;
            i.setData({
                time: {
                    week: i.data.timeArrs[0][a[0]],
                    firstHour: i.data.timeArrs[1][a[1]],
                    lastHour: i.data.timeArrs[2][a[2]]
                },
                start_time: i.data.timeArrs[1][a[1]].stamp,
                end_time: i.data.timeArrs[2][a[2]].stamp
            }), console.log(i.data.time), app.request({
                url: api.order.getHomeWorkRules,
                method: "post",
                data: {
                    pid: i.data.pid,
                    start_time: i.data.start_time,
                    end_time: i.data.end_time
                },
                success: function(e) {
                    var t = e.data;
                    if (console.log(e), 1 != e.code) return wx.showToast({
                        title: e.msg,
                        icon: "none"
                    }), i.setData({
                        time: ""
                    }), !1;
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
            });
        }
        "reward" == t && i.setData({
            reward: i.data.rewardArr[r].price
        }), "coupon" == t && ("0" == i.data.couponArr[r].id ? i.setData({
            coupon: i.data.couponArr[r].price,
            full_money: i.data.couponArr[r].min_price,
            useid: i.data.couponArr[r].id,
            types: 0
        }) : i.setData({
            coupon: i.data.couponArr[r].price,
            full_money: i.data.couponArr[r].min_price,
            useid: i.data.couponArr[r].id,
            types: 1
        })), i.countPrice();
    },
    bindColumnChange: function(e) {
        var t = this.data.pageConfig.time, a = this.data.time_stamp, i = this.data.timeArrs, r = e.detail.column, o = e.detail.value, n = this.data.time_index;
        console.log("修改的列为", e.detail.column, "，值为", e.detail.value), 0 == r && (i[1] = t[o].time, 
        i[2] = t[o].time), a[r] = e.detail.value, n.column = r, n.value = o, console.log(n), 
        this.setData({
            timeArrs: i,
            time_index: n,
            time_stamp: a
        });
    },
    priceSliderChange: function(e) {
        var t = this, a = e.detail.value;
        if (!t.data.time) return wx.showToast({
            icon: "none",
            title: "请先选择时间"
        }), !1;
        var i = (t.data.time.lastHour.timechuo - t.data.time.firstHour.timechuo) / 3600;
        console.log(i), console.log(a), t.setData({
            price: a,
            btis: i
        }), t.countPrice();
    },
    countPrice: function() {
        var e = this;
        if (null == e.data.order) return !1;
        console.log(e.data.order, "--------------");
        var t = e.data.types, a = e.data.order.base_price ? e.data.order.base_price : 0, i = e.data.order.discount_price, r = e.data.stepper.stepper, o = e.data.coupon, n = e.data.order.reduce_price, s = e.data.order.secure_price, d = e.data.isOpenIntegralDeduction, c = 0;
        console.log(Number(a) + "---" + Number(r) + "---" + Number(o) + "---" + Number(n) + "---" + Number(0) + "---" + Number(s)), 
        0 === t ? (console.log("折扣价"), console.log(d, "折扣状态"), d ? (e.setData({
            discount: e.data.order.discount + "折"
        }), c = Number(a) - Number(i) + Number(r) - Number(n) + Number(s) + Number(0)) : (e.setData({
            discount: e.data.order.discount + "折"
        }), c = Number(a) - Number(i) + Number(r) + Number(s) + Number(0))) : (console.log("优惠价"), 
        console.log(d, "折扣状态"), d ? (e.setData({
            discount: "无折扣"
        }), c = Number(a) + Number(r) - Number(o) - Number(n) + Number(s) + Number(0)) : (e.setData({
            discount: "无折扣"
        }), c = Number(a) + Number(r) - Number(o) + Number(s) + Number(0)));
        var u = {
            lastPrice: c || 0,
            base_price: a || 0,
            discount: t ? e.data.order.discount : 0,
            secure_price: s || 0,
            reduce_price: d ? n : 0,
            coupon: o || 0,
            stepper: r || 0,
            type: 5
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
        return console.log("微信支付", api), console.log(e.detail.value), e.detail.value.voice || e.detail.value.goods ? 1 != this.data.pageConfig.mainConfig.templet5.timeConfig.enabled || "" != e.detail.value.start_time && "" != e.detail.value.end_time ? this.data.isReadProtocol ? (this.setData({
            formData: e.detail.value,
            formId: e.detail.formId
        }), void this.openActionsheet()) : (wx.showToast({
            title: "未同意协议，无法下单。",
            icon: "none",
            duration: 1e3
        }), !1) : (wx.showToast({
            title: "信息不完善，无法下单。",
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
        var e = this.data.formData;
        console.log("表单数据=>", e), app.request({
            url: api.payment.HomeWorkPay,
            method: "post",
            data: {
                remark: e.remark,
                pic: e.pic,
                voice: e.voice,
                goods: "" == e.goods ? "语音下单" : e.goods,
                reward_price: e.reward_price,
                coupon_id: e.coupon_id ? e.coupon_id : 0,
                integral: e.integral,
                bargaining: e.bargaining,
                pay_type: 1,
                start_time: e.start_time,
                end_time: e.end_time,
                voice_time: this.data.soundRecording.duration,
                laiyuan_id: 0,
                old_order_no: 0,
                pid: this.data.pid
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
                                app.sendSocketMessage_104(3), setTimeout(function() {
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
                    complete: function(e) {}
                }) : wx.showToast({
                    title: res.msg,
                    icon: "none"
                });
            }
        });
    },
    balancePay: function() {
        var t = this, a = t.data.formData, i = t.data.formId;
        console.log("表单数据=>", a), wx.showModal({
            title: "余额支付",
            content: "是否支付" + t.data.lastPrice + "元",
            success: function(e) {
                e.confirm ? (wx.showLoading({
                    title: "正在支付"
                }), app.request({
                    url: api.payment.HomeWorkPay,
                    method: "post",
                    data: {
                        remark: a.remark,
                        pic: a.pic,
                        voice: a.voice,
                        goods: "" == a.goods ? "语音下单" : a.goods,
                        reward_price: a.reward_price,
                        coupon_id: a.coupon_id ? a.coupon_id : 0,
                        integral: a.integral,
                        bargaining: a.bargaining,
                        pay_type: 2,
                        start_time: a.start_time,
                        end_time: a.end_time,
                        form_id: i,
                        voice_time: t.data.soundRecording.duration,
                        laiyuan_id: 0,
                        old_order_no: 0,
                        pid: t.data.pid
                    },
                    success: function(e) {
                        return wx.hideLoading(), console.log(e), 0 == e.code ? wx.showToast({
                            title: e.msg,
                            icon: "none"
                        }) : wx.showToast({
                            title: "支付成功",
                            icon: "success",
                            success: function() {
                                app.sendSocketMessage_104(3), setTimeout(function() {
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
        var r = this, o = app.siteInfo.acid;
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
                url: api.order.upload + "&_acid=" + o + "&access_token=" + wx.getStorageSync("access_token"),
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