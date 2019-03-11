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

var config = require("../../../../config.js"), api = require("../../../../api.js"), QQMapWX = require("../../../../qqmap-wx.js"), app = getApp();

Page({
    data: {
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
        clickpay: !0,
        stepper: {
            stepper: 0
        },
        imgurl: app.imgurl,
        addclick_type: 1,
        txtmaxlength: 40,
        time: "",
        time_price: 0,
        price: 0,
        reward: 0,
        coupon: 0,
        lastPrice: 0,
        vipprice: "",
        full_money: "",
        detail_info: "",
        addressId: "",
        wareText: "",
        didianprice: 0,
        timeprice: 0,
        inputAddressText: "",
        isReadProtocol: !0,
        isBargaining: !1,
        bargaining: 0,
        isOpenPreference: !1,
        isOpenIntegralDeduction: !1,
        integral: 0,
        show: !1,
        time_index: {
            column: 0,
            value: 0
        },
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
        webRoot: app.webRoot,
        order: void 0
    },
    addclick: function(e) {
        var t = this;
        if (e.currentTarget.dataset.type == t.data.addclick_type) return !1;
        1 == e.currentTarget.dataset.type ? (t.setData({
            addclick_type: e.currentTarget.dataset.type,
            expect_time: "",
            time: ""
        }), t.GetAddress(1)) : t.setData({
            detail_infose: "",
            addclick_type: e.currentTarget.dataset.type,
            expect_time: "",
            time: ""
        });
    },
    couponurl: function() {
        var t = this;
        app.request({
            url: api.Coupon.coupon,
            data: {
                uid: wx.getStorageSync("uid")
            },
            success: function(e) {
                console.log("11111111111", e), t.setData({
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
        var t = e.currentTarget.id;
        wx.navigateTo({
            url: "/sd_liferuning/pages/constmer/choose-pic/index?src=" + t
        });
    },
    onLoad: function(e) {
        if (app.location(this), app.order_template(this), wx.removeStorageSync("cost"), 
        e.tags) {
            var t = e.tags.split(",");
            this.setData({
                tags: t
            });
        }
        e.addressId ? this.setData({
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
        }) : (console.log(e.wareText + "-----" + e.wareText.length), this.setData({
            wareText: e.wareText ? e.wareText : "",
            txtlength: e.wareText.length
        }));
    },
    onShow: function(e) {
        var t = this;
        1 == app.defaultadd && (t.setData({
            detail_infose: "",
            addclick_type: 0,
            expect_time: "",
            time: ""
        }), app.defaultadd = 0), app.request({
            url: api.address.details,
            method: "post",
            data: {
                default: 1
            },
            success: function(e) {
                console.log("地址----", e.data), "" == e.data ? (app.navtoaddress(), app.address_type = !1) : (app.address_type = !0, 
                t.setData({
                    detail_info: e.data.address_name,
                    username: e.data.name,
                    phone: e.data.phone,
                    uaid: e.data.uid,
                    Address: e.data
                }), 1 == t.data.addclick_type && t.GetAddress(1));
            }
        });
        var a = app.pageOperate;
        a && 1 == a && this.setData({
            pictrueTempPath: ""
        });
    },
    GetAddress: function(e) {
        var i, o = this;
        if (app.adddetails(), console.log(app.address_type, "----app.address_type"), !app.address_type) return !1;
        if (1 == e) {
            var t = o.data.Address;
            return console.log(t, "------Address"), app.request({
                url: api.order.getDeliverRules,
                method: "post",
                data: {
                    address: t.address + t.address_name + t.address_remarks,
                    latitude: t.latitude,
                    longitude: t.longitude
                },
                success: function(e) {
                    console.log(e);
                    var t = e.data;
                    if (0 === t.discount ? o.setData({
                        discount: "无折扣"
                    }) : o.setData({
                        discount: t.discount + "折"
                    }), t.coupon) {
                        for (var a = 0; a < t.coupon.length; a++) t.coupon[a].text = "满" + t.coupon[a].min_price + "元减" + t.coupon[a].price + "元";
                        t.coupon.push({
                            id: "0",
                            text: "不使用优惠券",
                            min_price: "0",
                            price: "0"
                        }), o.setData({
                            couponArr: t.coupon
                        });
                    }
                    o.setData({
                        order: t,
                        types: 0,
                        detail_infos: t.target.address
                    }), o.countPrice(), console.log(o.data.detail_infose, "----detail_infose"), console.log(o.data.detail_infos, "----detail_infos");
                }
            }), !1;
        }
        wx.chooseLocation({
            success: function(e) {
                console.log(e, "----res"), i = {
                    lat: e.latitude,
                    lon: e.longitude
                }, o.setData({
                    detail_infose: e.name
                }), app.request({
                    url: api.order.getDeliverRules,
                    metho: "post",
                    data: {
                        address: e.address + e.name,
                        latitude: e.latitude,
                        longitude: e.longitude
                    },
                    success: function(e) {
                        console.log(e);
                        var t = e.data;
                        if (0 === t.discount ? o.setData({
                            discount: "无折扣"
                        }) : o.setData({
                            discount: t.discount + "折"
                        }), t.coupon) {
                            for (var a = 0; a < t.coupon.length; a++) t.coupon[a].text = "满" + t.coupon[a].min_price + "元减" + t.coupon[a].price + "元";
                            t.coupon.push({
                                id: "0",
                                text: "不使用优惠券",
                                min_price: "0",
                                price: "0"
                            }), o.setData({
                                couponArr: t.coupon
                            });
                        }
                        o.setData({
                            order: t,
                            types: 0,
                            detail_infos: t.target.address,
                            degree: i
                        }), o.countPrice(), console.log(o.data.detail_infose, "----detail_infose"), console.log(o.data.detail_infos, "----detail_infos");
                    }
                });
            }
        });
    },
    AddressPrice: function() {
        var a = this;
        null != a.data.detail_infos && new QQMapWX({
            key: "EKJBZ-72L3P-FHXDL-VSLEP-JEAGJ-JTFSD"
        }).geocoder({
            address: a.data.detail_info,
            success: function(e) {
                app.request({
                    url: api.default.addprice,
                    metho: "post",
                    data: {
                        myaddsjd: e.result.location.lng,
                        myaddswd: e.result.location.lat,
                        mudaddswd: a.data.wd,
                        mudaddsjd: a.data.jd,
                        bid: wx.getStorageSync("bid")
                    },
                    success: function(e) {
                        var t = a.data.didianprice;
                        console.log(t), console.log("金额", e), a.setData({
                            didianprice: e.data.price,
                            price: a.data.price - t + e.data.price,
                            proxy_id: e.data.proxy_id ? e.data.proxy_id : 0
                        }), a.countPrice();
                    }
                });
            }
        });
    },
    pickerSelector: function(e) {
        var t = this, a = e.currentTarget.dataset.type, i = e.detail.value, o = t.data.time_index;
        "time" == a && (console.log(o, "----------"), app.request({
            url: api.order.surcharge_purchase,
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
        })), "reward" == a && t.setData({
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
        })), console.log(t.data.couponArr[i], "that.data.couponArr[val]"), t.countPrice();
    },
    bindColumnChange: function(e) {
        var t = this.data.pageConfig.time, a = this.data.timeArr, i = e.detail.column, o = e.detail.value, r = this.data.time_index;
        console.log("修改的列为", e.detail.column, "，值为", e.detail.value), 0 == i && (a[1] = t[o].time), 
        r.column = i, r.value = o, this.setData({
            timeArr: a,
            time_index: r
        });
    },
    countPrice: function(e) {
        try {
            var t = this, a = t.data.types;
            if (null == t.data.order) return !1;
            var i = t.data.order.base_price, o = t.data.order.discount_price, r = t.data.stepper.stepper, n = t.data.coupon, s = t.data.order.reduce_price, d = t.data.order.secure_price, c = t.data.isOpenIntegralDeduction, u = t.data.time_price, l = 0;
            0 === a ? (console.log("折扣价"), console.log(c, "折扣状态"), c ? (t.setData({
                discount: t.data.order.discount + "折"
            }), l = Number(i) - Number(o) + Number(r) - Number(s) + Number(d) + Number(u)) : (t.setData({
                discount: t.data.order.discount + "折"
            }), l = Number(i) - Number(o) + Number(r) + Number(d) + Number(u))) : (console.log("优惠价"), 
            console.log(c, "折扣状态"), c ? (t.setData({
                discount: "无折扣"
            }), l = Number(i) + Number(r) - Number(n) - Number(s) + Number(d) + Number(u)) : (t.setData({
                discount: "无折扣"
            }), l = Number(i) + Number(r) - Number(n) + Number(d) + Number(u)));
            var p = {
                lastPrice: l || 0,
                base_price: i || 0,
                discount: a ? t.data.order.discount : 0,
                secure_price: d || 0,
                reduce_price: c ? s : 0,
                coupon: n || 0,
                stepper: r || 0,
                type: 1
            };
            wx.setStorageSync("cost", p), t.setData({
                lastPrice: l.toFixed(2)
            });
        } catch (e) {
            console.log(e, "----error");
        }
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
        var t = this, a = t.data.pictrueTempPath, i = t.data.yinpin;
        return e.detail.value.voice || e.detail.value.goods ? 0 == t.data.addclick_type && "" == e.detail.value.mudadds ? (wx.showToast({
            title: "请选择购买地址",
            icon: "none",
            mask: !0
        }), !1) : 1 != t.data.pageConfig.mainConfig.templet1.timeConfig.enabled || e.detail.value.expect_time ? t.data.isReadProtocol ? void (("" != e.detail.value.goodsname || "" != a || "" != i) && e.detail.value.myadds && "NaN" != e.detail.value.mytimes ? (console.log(a), 
        console.log(i), console.log("e.detail.value", e.detail.value), t.setData({
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
            icon: "none",
            mask: !0
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
        var e = this, t = e.data.formData, a = this.data.formData;
        console.log("表单数据=>", t), console.log("微信支付", api.payment), app.request({
            url: api.payment.deliver,
            method: "post",
            data: {
                pay_type: 1,
                address: a.address,
                houses: a.houses ? a.houses : "",
                remark: a.remark,
                pic: a.pic,
                voice: a.voice,
                goods: "" == a.goods ? "语音下单" : a.goods,
                expect_time: a.expect_time ? a.expect_time : 0,
                reward_price: a.reward_price,
                coupon_id: a.coupon_id ? a.coupon_id : 0,
                integral: a.integral ? a.integral : 0,
                bargaining: a.bargaining ? a.bargaining : 0,
                longitude: 0 == e.data.addclick_type ? e.data.order.target.location.lng : e.data.Address.longitude,
                latitude: 0 == e.data.addclick_type ? e.data.order.target.location.lat : e.data.Address.latitude,
                voice_time: e.data.soundRecording.duration,
                laiyuan_id: 0,
                old_order_no: 0,
                pid: e.data.pid,
                run_now: 0 == a.expect_time ? 1 : 0
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
                            duration: 1e3,
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
        var t = this, a = t.data.formData;
        t.data.formId;
        console.log("表单数据=>", a), wx.showModal({
            title: "余额支付",
            content: "是否支付" + t.data.lastPrice + "元",
            success: function(e) {
                e.confirm ? (wx.showLoading({
                    title: "正在支付"
                }), app.request({
                    url: api.payment.deliver,
                    method: "post",
                    data: {
                        pay_type: 2,
                        address: a.address,
                        houses: a.houses ? a.houses : "",
                        remark: a.remark,
                        pic: a.pic,
                        voice: a.voice,
                        goods: "" == a.goods ? "语音下单" : a.goods,
                        expect_time: a.expect_time ? a.expect_time : 0,
                        reward_price: a.reward_price,
                        coupon_id: a.coupon_id ? a.coupon_id : 0,
                        integral: a.integral ? a.integral : 0,
                        bargaining: a.bargaining ? a.bargaining : 0,
                        form_id: t.data.formId,
                        longitude: 0 == t.data.addclick_type ? t.data.order.target.location.lng : t.data.Address.longitude,
                        latitude: 0 == t.data.addclick_type ? t.data.order.target.location.lat : t.data.Address.latitude,
                        voice_time: t.data.soundRecording.duration,
                        laiyuan_id: 0,
                        old_order_no: 0,
                        pid: t.data.pid,
                        run_now: 0 == a.expect_time ? 1 : 0
                    },
                    success: function(e) {
                        wx.hideLoading(), console.log(e), 0 == e.code ? wx.showToast({
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
                        }), t.setData({
                            clickpay: !0
                        });
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
        var o = this, r = app.siteInfo.acid;
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
                url: api.order.upload + "&_acid=" + r + "&access_token=" + wx.getStorageSync("access_token"),
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
    onError: function(e) {
        console.log(e, "err");
    },
    onUnload: function() {
        app.default = 0;
    }
});