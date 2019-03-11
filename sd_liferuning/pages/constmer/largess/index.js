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
            }), this._hourArr.push({
                id: e,
                hourArr: 0 == e ? this._todayTimeArr : this._defaultTimeArr
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

var api = require("../../../../api.js"), QQMapWX = require("../../../../qqmap-wx.js"), app = getApp(), ArrayUtils = require("../../../../utils/ArrayUtils.js"), demo = new QQMapWX({
    key: "Z6RBZ-6H4CU-AV6V5-2OTIO-Q2CLZ-VMF5T"
}), config = require("../../../../config.js");

Page({
    data: {
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
        form_disabled: !1,
        txtmaxlength: 40,
        time: "",
        time_price: 0,
        vipprice: "",
        price: 0,
        reward: 0,
        coupon: 0,
        lastPrice: 0,
        weight_price: "",
        integral: 0,
        yinpin: "",
        clickpay: !0,
        Imagecollection: [],
        detail_info: "",
        full_money: "",
        addressId: "",
        wareText: "",
        didianprice: 0,
        timeprice: 0,
        inputAddressText: "",
        isReadProtocol: !0,
        weighprice: 0,
        isBargaining: !1,
        bargaining: 0,
        isOpenPreference: !1,
        isOpenIntegralDeduction: !1,
        show: !1,
        cancelWithMask: !0,
        pictrueTempPath: "",
        weight: 0,
        soundRecording: {
            tempPath: "",
            duration: "",
            isPlay: !1
        },
        actions: config.actions,
        cancelText: "取消",
        multiImage: [],
        time_index: {
            column: 0,
            value: 0
        }
    },
    couponurl: function() {
        var t = this;
        app.request({
            url: api.Coupon.coupon,
            data: {
                uid: wx.getStorageSync("uid")
            },
            success: function(e) {
                console.log(e), t.setData({
                    couponArr: e.data
                });
            }
        });
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
        var i = this;
        if (wx.removeStorageSync("cost"), e.tags) {
            var t = e.tags.split(",");
            this.setData({
                tags: t
            });
        }
        if (e.module) {
            var a = wx.getStorageSync("module_order");
            console.log(a, "----"), i.setData({
                detail_infose: a.address
            }), demo.geocoder({
                address: a.address,
                success: function(e) {
                    app.request({
                        url: api.order.getGiveRules,
                        metho: "post",
                        data: {
                            address: a.address,
                            latitude: e.result.location.lat,
                            longitude: e.result.location.lng
                        },
                        success: function(e) {
                            console.log(e);
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
                                types: 0,
                                detail_infos: t.target.address
                            }), i.countPrice();
                        }
                    }), console.log(e);
                },
                fail: function(e) {
                    console.log(e, "eror"), wx.showToast({
                        title: "订单地址无法定位",
                        icon: "none"
                    });
                },
                complete: function(e) {
                    console.log(e);
                }
            }), i.setData({
                wareText: a.goods_name,
                take_name: a.name,
                take_phone: a.mobile,
                form_disabled: !0,
                txtlength: a.goods_name.length
            });
        } else e.addressId ? i.setData({
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
        }) : i.setData({
            wareText: e.wareText ? e.wareText : "",
            txtlength: e.wareText.length
        });
        app.location(i), app.order_template(this);
    },
    onShow: function() {
        var t = this;
        t.data.typeid;
        1 == app.defaultadd && (t.setData({
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
                console.log("地址", e), "" == e.data ? (app.navtoaddress(), app.address_type = !1) : t.setData({
                    detail_info: e.data.address_name,
                    username: e.data.name,
                    phone: e.data.phone,
                    uaid: e.data.uid
                });
            }
        });
    },
    GetAddress: function() {
        var i = this;
        return app.adddetails(), app.address_type ? !i.data.form_disabled && (console.log("正常执行"), 
        void wx.chooseLocation({
            success: function(e) {
                i.setData({
                    detail_infose: e.name
                }), app.request({
                    url: api.order.getGiveRules,
                    metho: "post",
                    data: {
                        address: e.address + e.name,
                        latitude: e.latitude,
                        longitude: e.longitude
                    },
                    success: function(e) {
                        console.log(e);
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
                            types: 0,
                            detail_infos: t.target.address
                        }), i.countPrice();
                    }
                });
            }
        })) : (console.log("进入"), !1);
    },
    pickerSelector: function(e) {
        var t = this, a = e.currentTarget.dataset.type, i = e.detail.value, o = t.data.time_index;
        "time" == a && "time" == a && app.request({
            url: api.order.surcharge,
            method: "post",
            data: {
                pid: t.data.pid,
                time: t.data.timeArr[1][o.value].stamp
            },
            success: function(e) {
                if (1 != e.code) return wx.showToast({
                    title: "时间选择错误",
                    icon: "none",
                    duration: 1e3
                }), !1;
                t.setData({
                    time_price: e.data.price,
                    expect_time: t.data.timeArr[1][o.value].stamp,
                    time: {
                        week: t.data.timeArr[0][i[0]],
                        hour: t.data.timeArr[1][i[1]]
                    }
                }), t.countPrice();
            }
        }), "reward" == a && t.setData({
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
        var t = this.data.pageConfig.time, a = this.data.timeArr, i = (e.detail.column, 
        e.detail.value), o = this.data.time_index;
        0 == e.detail.column && (a[1] = t[i].time), o.column = e.detail.column, o.value = i, 
        this.setData({
            timeArr: a,
            time_index: o
        });
    },
    countPrice: function(e) {
        var t = this;
        if (null == t.data.order) return !1;
        var a = t.data.types, i = t.data.order.base_price, o = t.data.order.discount_price, n = t.data.stepper.stepper, r = t.data.coupon, s = t.data.order.reduce_price, c = t.data.isOpenIntegralDeduction, d = t.data.order.weight.base_weight, u = t.data.order.weight.base_price, l = t.data.order.weight.add_price, p = t.data.order.secure_price, g = t.data.weight, m = 0, h = 0, f = t.data.time_price;
        g <= d ? (console.log("没超过起步价格不作处理"), m = 0) : m = (g - d) * l, 0 === a ? (console.log("折扣价"), 
        console.log(c, "折扣状态"), c ? (t.setData({
            discount: t.data.order.discount + "折"
        }), h = Number(i) - Number(o) + Number(n) - Number(s) + Number(m) + Number(f) + Number(p) + Number(u)) : (t.setData({
            discount: t.data.order.discount + "折"
        }), h = Number(i) - Number(o) + Number(n) + Number(m) + Number(f) + Number(p) + Number(u))) : (console.log("优惠价"), 
        console.log(c, "折扣状态"), c ? (t.setData({
            discount: "无折扣"
        }), h = Number(i) + Number(n) - Number(r) - Number(s) + Number(m) + Number(f) + Number(p) + Number(u)) : (t.setData({
            discount: "无折扣"
        }), h = Number(i) + Number(n) - Number(r) + Number(m) + Number(f) + Number(p) + Number(u)));
        var _ = {
            lastPrice: h || 0,
            base_price: i || 0,
            discount: a ? t.data.order.discount : 0,
            secure_price: p || 0,
            reduce_price: c ? s : 0,
            coupon: r || 0,
            stepper: n || 0,
            type: 2
        };
        wx.setStorageSync("cost", _), t.setData({
            lastPrice: h.toFixed(2)
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
        console.log(e), console.log(this.data.Imagecollection, "img");
        var t = this, a = t.data.pictrueTempPath, i = t.data.yinpin;
        if (!e.detail.value.voice && !e.detail.value.goods) return wx.showToast({
            title: "请输入信息",
            icon: "none",
            mask: !0
        }), !1;
        if (console.log(e.detail.value.address, "e.detail.value.detail_infos"), !e.detail.value.address) return wx.showToast({
            title: "请选择收货地址",
            icon: "none"
        }), !1;
        if (!e.detail.value.take_name) return wx.showToast({
            title: "请填写收货人姓名",
            icon: "none"
        }), !1;
        if (!e.detail.value.take_phone) return wx.showToast({
            title: "请填写收货人电话",
            icon: "none"
        }), !1;
        return /^[1][3,4,5,7,8][0-9]{9}$/.test(e.detail.value.take_phone) ? 1 != t.data.pageConfig.mainConfig.templet2.timeConfig.enabled || e.detail.value.expect_time ? t.data.isReadProtocol ? void (("" != e.detail.value.goodsname || "" != a || "" != i) && e.detail.value.mudadds && e.detail.value.myadds && "NaN" != e.detail.value.mytimes ? (console.log(a), 
        console.log(i), e.detail.value.xphoto = a, e.detail.value.yinpin = i, console.log("e.detail.value", e.detail.value), 
        t.setData({
            formData: e.detail.value,
            formId: e.detail.formId
        }), t.openActionsheet()) : wx.showToast({
            title: "信息不完善，无法下单。",
            icon: "none"
        })) : (wx.showToast({
            title: "未同意协议，无法下单。",
            icon: "none",
            duration: 1e3
        }), !1) : (wx.showToast({
            title: "配送时间未选择，无法下单。",
            icon: "none"
        }), !1) : (wx.showToast({
            title: "手机号码格式错误",
            icon: "none"
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
        var e = this, t = e.data.formData, a = (e.data.Imagecollection.join(","), e.data.type_status);
        if (a) ; else ;
        app.request({
            url: api.payment.givepay,
            method: "post",
            data: {
                address: t.address,
                houses: t.houses,
                remark: t.remark,
                pic: t.pic,
                voice: t.voice,
                goods: "" == t.goods ? "语音下单" : t.goods,
                expect_time: t.expect_time,
                reward_price: t.reward_price,
                coupon_id: t.coupon_id,
                integral: t.integral,
                bargaining: t.bargaining,
                pay_type: 1,
                pics: e.data.Imagecollection,
                weight: t.weight ? t.weight : 0,
                longitude: e.data.order.target.location.lng,
                latitude: e.data.order.target.location.lat,
                voice_time: e.data.soundRecording.duration,
                take_name: t.take_name,
                take_phone: t.take_phone,
                laiyuan_id: e.data.form_disabled ? wx.getStorageSync("module_order").laiyuan_id : 0,
                old_order_no: e.data.form_disabled ? wx.getStorageSync("module_order").order_no : 0,
                pid: e.data.pid,
                run_now: 0 == t.expect_time ? 1 : 0
            },
            success: function(e) {
                if (0 == e.code) return wx.showToast({
                    title: e.msg,
                    icon: "none"
                }), !1;
                wx.requestPayment({
                    timeStamp: e.data.timeStamp,
                    nonceStr: e.data.nonceStr,
                    package: e.data.package,
                    signType: e.data.signType,
                    paySign: e.data.paySign,
                    success: function() {
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
                            icon: "none",
                            duration: 1500
                        });
                    }
                });
            }
        });
    },
    balancePay: function() {
        var t = this, a = t.data.formData, e = (t.data.formId, t.data.type_status);
        t.data.Imagecollection.join(",");
        if (e) ; else ;
        wx.showModal({
            title: "余额支付",
            content: "是否支付" + t.data.lastPrice + "元",
            success: function(e) {
                e.confirm ? (wx.showLoading({
                    title: "正在支付"
                }), app.request({
                    url: api.payment.givepay,
                    method: "post",
                    data: {
                        address: a.address,
                        houses: a.houses,
                        remark: a.remark,
                        pic: a.pic,
                        voice: a.voice,
                        goods: "" == a.goods ? "语音下单" : a.goods,
                        expect_time: a.expect_time,
                        reward_price: a.reward_price,
                        coupon_id: a.coupon_id,
                        integral: a.integral,
                        bargaining: a.bargaining,
                        pay_type: 2,
                        pics: t.data.Imagecollection,
                        weight: a.weight ? a.weight : 0,
                        form_id: t.data.formId,
                        longitude: t.data.order.target.location.lng,
                        latitude: t.data.order.target.location.lat,
                        voice_time: t.data.soundRecording.duration,
                        take_name: a.take_name,
                        take_phone: a.take_phone,
                        laiyuan_id: t.data.form_disabled ? wx.getStorageSync("module_order").laiyuan_id : 0,
                        old_order_no: t.data.form_disabled ? wx.getStorageSync("module_order").order_no : 0,
                        pid: t.data.pid,
                        run_now: 0 == a.expect_time ? 1 : 0
                    },
                    success: function(e) {
                        return wx.hideLoading(), console.log(e), 0 == e.code ? wx.showToast({
                            title: e.msg,
                            icon: "none"
                        }) : wx.showToast({
                            title: "支付成功",
                            icon: "success",
                            success: function() {
                                app.sendSocketMessage_104(1), setTimeout(function() {
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
                    console.log("resres", e);
                    e.data;
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
    weightSliderChanging: function(e) {
        var t = e.detail.value;
        this.setData({
            weight: t
        });
    },
    weightSliderChange: function(e) {
        var t = e.detail.value;
        this.setData({
            weight: t
        }), this.countPrice();
    },
    multiUploadImage: function() {
        var a = this, i = a.data.multiImage, o = a.data.Imagecollection, n = app.siteInfo.acid;
        if (8 < i.length) return wx.showToast({
            title: "上传图片超过9张",
            icon: "none"
        }), !1;
        console.log(8 - i.length, "9 - _multiImage.length"), wx.chooseImage({
            count: 8 - i.length,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                wx.showLoading({
                    title: "正在上传"
                }), e.tempFilePaths.forEach(function(e, t) {
                    i.push(e), console.log("", e), wx.uploadFile({
                        url: api.order.upload + "&_acid=" + n + "&access_token=" + wx.getStorageSync("access_token"),
                        filePath: e,
                        header: {
                            "content-type": "application/x-www-form-urlencoded"
                        },
                        name: "file",
                        success: function(e) {
                            e = JSON.parse(e.data);
                            setTimeout(function() {
                                wx.hideLoading();
                            }, 1500), 1 == e.code ? o.push(e.data) : wx.showModal({
                                title: "提示",
                                content: "图片上传失败",
                                showCancel: !1
                            });
                        },
                        fail: function(e) {}
                    }), a.setData({
                        multiImage: i,
                        Imagecollection: o
                    });
                });
            }
        });
    },
    multiImageDeleteByIndex: function(e) {
        var t = e.currentTarget.dataset.index, a = this.data.multiImage, i = ArrayUtils.deleteByIndex({
            dataArr: a,
            index: t
        }), o = this.data.Imagecollection;
        o.splice(t, 1), console.log(o, "Imagecollection"), this.setData({
            multiImage: i,
            Imagecollection: o
        });
    },
    isOpenIntegralDeduction: function() {
        var e = this.data.isOpenIntegralDeduction, t = this.data.order;
        e ? (this.setData({
            integral: 0,
            jf: "",
            isOpenIntegralDeduction: !e
        }), console.log("关闭")) : this.setData({
            integral: 0,
            jf: "（剩余积分：" + t.integral + "，抵扣积分：" + t.reduce_integral + "）",
            isOpenIntegralDeduction: !e
        }), this.countPrice();
    },
    onHide: function() {},
    onUnload: function() {
        app.default = 0;
    }
});