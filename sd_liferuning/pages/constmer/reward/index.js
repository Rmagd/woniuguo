var _createClass = function() {
    function i(e, a) {
        for (var t = 0; t < a.length; t++) {
            var i = a[t];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(e, a, t) {
        return a && i(e.prototype, a), t && i(e, t), e;
    };
}();

function _defineProperty(e, a, t) {
    return a in e ? Object.defineProperty(e, a, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[a] = t, e;
}

function _classCallCheck(e, a) {
    if (!(e instanceof a)) throw new TypeError("Cannot call a class as a function");
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
            var e = void 0, a = this._dayTag;
            for (e = 0; e < 14; e++) 0 < e && ++a, 13 < a && (a = 0), this._weekArr.push({
                id: e,
                name: this.switchWeek(a)
            });
        }
    }, {
        key: "createTodayTimeArr",
        value: function(e, a, t) {
            if (e) {
                var i = void 0;
                for (i = a; i < 24; i++) i == a ? t < 30 && e.push({
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
                var a = void 0;
                for (a = 0; a < 24; a++) e.push({
                    name: a + ":00"
                }), e.push({
                    name: a + ":30"
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

var recorderManager = wx.getRecorderManager(), innerAudioContext = wx.createInnerAudioContext(), api = require("../../../../api.js"), QQMapWX = require("../../../../qqmap-wx.js"), app = getApp();

Page({
    data: {
        timeArr: null,
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
        time: "",
        price: 0,
        reward: 0,
        coupon: 0,
        lastPrice: 0,
        detail_info: "",
        addressId: "",
        wareText: "",
        didianprice: 0,
        timeprice: 0,
        inputAddressText: "",
        isReadProtocol: !0,
        isBargaining: !1,
        isOpenPreference: !1,
        isOpenIntegralDeduction: !1,
        show: !1,
        yinpin: "",
        cancelWithMask: !0,
        pictrueTempPath: "",
        data: "",
        soundRecording: {
            tempPath: "",
            duration: "",
            isPlay: !1
        },
        actions: [ {
            name: "微信支付",
            subname: "使用微信官方支付方式",
            className: "action-class",
            loading: !1
        }, {
            name: "余额支付",
            subname: "使用平台账户余额支付",
            className: "action-class",
            loading: !1
        } ],
        cancelText: "取消"
    },
    couponurl: function() {
        var a = this;
        app.request({
            url: api.Coupon.coupon,
            data: {
                uid: wx.getStorageSync("uid")
            },
            success: function(e) {
                console.log(e), a.setData({
                    couponArr: e.data
                });
            }
        });
    },
    naveClick: function(e) {
        app.navigatorClick(e, this);
    },
    onLoad: function(e) {
        app.pageOnLoad(this);
        var a = this;
        a.setData({
            icons: wx.getStorageSync("site") + "/addons/sd_liferuning/tp/public/uploads/background",
            cid: e.cid
        }), e.addressId ? a.setData({
            time: e.time,
            price: e.price,
            reward: e.reward,
            coupon: e.coupon,
            lastPrice: e.lastPrice,
            addressId: e.addressId,
            inputAddressText: e.inputAddressText,
            wareText: e.wareText,
            cid: e.cid
        }) : a.setData({
            wareText: e.wareText
        });
        var t = this, i = [];
        app.request({
            url: api.default.timelist,
            data: {
                time: 0
            },
            success: function(e) {
                i[0] = dateFactory._weekArr, i[1] = e.data, t.setData({
                    timeArr: i
                });
            }
        });
        var n = e.id;
        app.request({
            url: api.default.classBq,
            data: {
                bid: wx.getStorageSync("bid"),
                id: n
            },
            success: function(e) {
                console.log(e), "" == e.data ? wx.navigateTo({
                    url: "/sd_liferuning/pages/constmer/index/index"
                }) : "" != e.data.biaoqian ? a.setData({
                    wareText: e.data.name,
                    biaoqian: e.data.biaoqian
                }) : a.setData({
                    wareText: e.data.name,
                    biaoqian: []
                });
            }
        });
    },
    onShow: function(e) {
        var t = this;
        t.couponurl(), app.request({
            url: api.default.mrAddress,
            data: {
                bid: wx.getStorageSync("bid"),
                uid: wx.getStorageSync("uid")
            },
            success: function(e) {
                console.log("地址", e), "" == e.data ? wx.navigateTo({
                    url: "/sd_liferuning/pages/constmer/address-list/index"
                }) : t.setData({
                    detail_info: e.data.adress,
                    username: e.data.name,
                    phone: e.data.phone,
                    uaid: e.data.uaid
                });
            }
        }), app.request({
            url: api.default.Insprice,
            data: {
                bid: wx.getStorageSync("bid")
            },
            success: function(e) {
                null != e.data.insprice ? t.setData({
                    ins: e.data.insprice
                }) : t.setData({
                    ins: 0
                }), t.countPrice();
            }
        }), app.request({
            url: api.user.rewardmoney,
            data: "",
            method: "post",
            success: function(e) {
                console.log("rerere", e.data);
                var a = e.data;
                t.setData({
                    data: a
                });
            }
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
                    var a = i.data.wd, t = i.data.jd;
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
                                    mudaddswd: a,
                                    mudaddsjd: t,
                                    bid: wx.getStorageSync("uid")
                                },
                                success: function(e) {
                                    var a = i.data.didianprice;
                                    console.log(a), console.log("金额", e), i.setData({
                                        didianprice: e.data,
                                        price: i.data.price - a + e.data
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
        var a = this, t = e.currentTarget.dataset.type, i = e.detail.value;
        if ("time" == t) {
            a.setData({
                time: {
                    week: a.data.timeArr[0][i[0]],
                    hour: a.data.timeArr[1][i[1]]
                }
            });
            a = this;
            app.request({
                url: api.default.time_price,
                data: {
                    wid: a.data.timeArr[0][i[0]].name,
                    hid: a.data.timeArr[1][i[1]].name
                },
                success: function(e) {
                    a.data.timeprice;
                    console.log(e), a.setData({
                        timeprice: e.data
                    }), a.countPrice();
                }
            });
        }
        "reward" == t && a.setData({
            reward: a.data.rewardArr[i].price
        }), "coupon" == t && a.setData({
            coupon: a.data.couponArr[i].price,
            useid: a.data.couponArr[i].id
        }), a.countPrice();
    },
    bindColumnChange: function(e) {
        var a = this, t = a.data.timeArr, i = e.detail.column, n = e.detail.value;
        0 == i && app.request({
            url: api.default.timelist,
            data: {
                time: n
            },
            success: function(e) {
                t[1] = e.data, a.setData({
                    timeArr: t
                });
            }
        });
    },
    countPrice: function() {
        var e = this, a = Number(e.data.price) + Number(e.data.timeprice) + Number(e.data.ins) + Number(e.data.reward) - Number(e.data.coupon);
        a < .01 && (a = .01), e.setData({
            lastPrice: a
        });
    },
    changeInputData: function(e) {
        var a = e.currentTarget.dataset.name, t = e.detail.value;
        "wareText" == a && this.setData({
            wareText: t
        }), "inputAddressText" == a && this.setData({
            inputAddressText: t
        });
    },
    xphoto: function() {
        var t = this;
        t.data.xphoto;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                var a = e.tempFilePaths;
                wx.saveFile({
                    tempFilePath: a[0],
                    success: function(e) {
                        var a = e.savedFilePath;
                        wx.uploadFile({
                            url: api.default.uploadfile,
                            filePath: a,
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            name: "image",
                            success: function(e) {
                                var a = JSON.parse(e.data);
                                if (console.log("图片:", a), 1 == a.code) {
                                    t.setData({
                                        pictrueTempPath: a.src
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
        var a = e.currentTarget.id;
        wx.navigateTo({
            url: "/sd_liferuning/pages/constmer/choose-pic/index?src=" + a
        });
    },
    formSubmit: function(e) {
        console.log(e);
        var a = this.data.pictrueTempPath, t = this.data.yinpin;
        ("" != e.detail.value.goodsname || "" != a || "" != t) && e.detail.value.mudadds && e.detail.value.myadds && "NaN" != e.detail.value.mytimes ? (console.log(a), 
        console.log(t), e.detail.value.xphoto = a, e.detail.value.yinpin = t, console.log("e.detail.value", e.detail.value), 
        this.setData({
            formData: e.detail.value,
            formId: e.detail.formId
        }), this.openActionsheet()) : wx.showToast({
            title: "信息不完善，无法下单。"
        });
    },
    addWareItem: function(e) {
        var a = e.currentTarget.dataset.tag, t = this.data.wareText;
        this.setData({
            wareText: t + ", " + a
        }), console.log(a);
    },
    isRead: function(e) {
        var a = this.data.isReadProtocol;
        this.setData({
            isReadProtocol: !a
        });
    },
    radioChanged: function(e) {
        var a = e.detail.value;
        "bargaining" == e.currentTarget.dataset.name && this.setData({
            bargaining: a
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
        var a, t = this, i = e.detail.index;
        switch (this.setData((_defineProperty(a = {}, "actions[" + i + "].loading", !0), 
        _defineProperty(a, "actionType", i), a)), i) {
          case 0:
            this.wechatPay();
            break;

          case 1:
            this.balancePay();
        }
        setTimeout(function() {
            var e;
            t.setData((_defineProperty(e = {}, "show", !1), _defineProperty(e, "actions[" + i + "].loading", !1), 
            e));
        }, 100);
    },
    wechatPay: function() {
        var t = this, e = t.data.formData;
        console.log("表单数据=>", e), console.log("微信支付"), app.request({
            url: api.default.insertorder,
            data: {
                distype: e.distype,
                goodsname: e.goodsname,
                mudadds: e.mudadds,
                myadds: e.myadds,
                times: e.mytimes,
                price: .01,
                uid: wx.getStorageSync("uid"),
                redbao: e.redbao,
                xphoto: e.xphoto,
                yinpin: e.yinpin,
                tip: e.tip,
                bid: wx.getStorageSync("bid"),
                ins: e.ins,
                message: e.message,
                type: 8,
                username: e.username,
                phone: e.phone
            },
            success: function(e) {
                e.data && app.request({
                    url: api.default.orderpay,
                    data: {
                        order_no: e.data,
                        title: "超人跑腿支付",
                        uid: wx.getStorageSync("uid")
                    },
                    success: function(a) {
                        console.log("支付参数", a.data.weixin), wx.requestPayment({
                            timeStamp: a.data.weixin.timeStamp,
                            nonceStr: a.data.weixin.nonceStr,
                            package: a.data.weixin.package,
                            signType: "MD5",
                            paySign: a.data.weixin.paySign,
                            success: function(e) {
                                console.log("支付成功", e), t.data.useid && app.request({
                                    url: api.Coupon.status,
                                    data: {
                                        useid: t.data.useid
                                    },
                                    success: function(e) {
                                        console.log(e);
                                    }
                                }), app.request({
                                    url: api.user.mess,
                                    data: {
                                        bid: wx.getStorageSync("bid"),
                                        openid: wx.getStorageSync("openid"),
                                        order_no: a.data.weixin.order_no,
                                        type: "apply"
                                    },
                                    success: function(e) {
                                        console.log(e);
                                    }
                                }), wx.redirectTo({
                                    url: "/sd_liferuning/pages/constmer/order-list/index"
                                });
                            },
                            complete: function(e) {}
                        });
                    }
                });
            }
        });
    },
    balancePay: function() {
        var e = this.data.formData, a = this.data.formId;
        console.log("表单数据=>", e), app.request({
            url: api.default.insertorder,
            data: {
                distype: e.distype,
                goodsname: e.goodsname,
                mudadds: e.mudadds,
                myadds: e.myadds,
                times: e.mytimes,
                price: e.price,
                uid: wx.getStorageSync("uid"),
                redbao: e.redbao,
                xphoto: e.xphoto,
                yinpin: e.yinpin,
                tip: e.tip,
                bid: wx.getStorageSync("bid"),
                ins: e.ins,
                message: e.message,
                type: this.data.cid,
                username: e.username,
                phone: e.phone
            },
            success: function(e) {
                1 == e.code && app.request({
                    url: api.order.pricePay,
                    method: "post",
                    data: {
                        uid: wx.getStorageSync("uid"),
                        order_no: e.data,
                        openid: wx.getStorageSync("openid"),
                        formId: a
                    },
                    success: function(e) {
                        1 == e.code ? wx.showToast({
                            title: e.msg,
                            duration: 1e3,
                            success: function() {
                                setTimeout(function() {
                                    wx.redirectTo({
                                        url: "/sd_liferuning/pages/constmer/order-list/index"
                                    });
                                }, 1e3);
                            }
                        }) : wx.showToast({
                            title: e.msg
                        });
                    }
                });
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
        var n = this;
        recorderManager.stop(), recorderManager.onStop(function(e) {
            var a = e.tempFilePath, t = Math.ceil(e.duration / 1e3);
            innerAudioContext.src = a, n.setData({
                soundRecording: {
                    tempPath: a,
                    duration: t,
                    isPlay: !1
                }
            });
            var i = n.data.soundRecording.tempPath;
            i && (console.log("tempPath", i), wx.uploadFile({
                url: api.order.uploadimg,
                filePath: i,
                name: "file",
                success: function(e) {
                    console.log("resres", e);
                    var a = e.data;
                    n.setData({
                        yinpin: a
                    });
                }
            }));
        });
    },
    soundRecordingPlay: function() {
        var a = this, e = innerAudioContext.paused, t = a.data.soundRecording;
        e ? (innerAudioContext.play(), t.isPlay = !0, setTimeout(function() {
            var e = a.data.soundRecording;
            e.isPlay = !1, a.setData({
                soundRecording: e
            });
        }, 1e3 * t.duration)) : (innerAudioContext.stop(), t.isPlay = !1), a.setData({
            soundRecording: t
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
        var t = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                var a = e.tempFilePaths;
                t.setData({
                    pictrueTempPath: a[0]
                });
            }
        });
    },
    handleStepperChange: function(e) {
        var a = e.detail, t = e.target.dataset.componentId;
        this.setData(_defineProperty({}, t + ".stepper", a));
    },
    isBargaining: function(e) {
        var a = this.data.isBargaining;
        this.setData({
            isBargaining: !a
        });
    },
    isOpenPreference: function() {
        var e = this.data.isOpenPreference;
        this.setData({
            isOpenPreference: !e
        });
    },
    weightSliderChange: function(e) {
        var a = e.detail.value;
        this.setData({
            weight: a
        });
    },
    isOpenIntegralDeduction: function() {
        var e = this.data.isOpenIntegralDeduction;
        this.setData({
            isOpenIntegralDeduction: !e
        });
    }
});