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

var recorderManager = wx.getRecorderManager(), innerAudioContext = wx.createInnerAudioContext(), api = require("../../../../api.js"), QQMapWX = require("../../../../qqmap-wx.js"), app = getApp(), ArrayUtils = require("../../../../utils/ArrayUtils.js");

Page({
    data: {
        timeArr: dateFactory._timeArr,
        hourArr: dateFactory._hourArr,
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
        time: "",
        vipprice: "",
        price: 0,
        reward: 0,
        coupon: 0,
        lastPrice: 0,
        weight_price: "",
        integral: "",
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
        cancelText: "取消",
        multiImage: []
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
        var a = this;
        a.data.xphoto;
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
                            url: api.default.uploadfile,
                            filePath: t,
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            name: "image",
                            success: function(e) {
                                var t = JSON.parse(e.data);
                                if (console.log("图片:", t), 1 == t.code) {
                                    a.setData({
                                        pictrueTempPath: t.src
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
        app.request({
            method: "POST",
            url: api.default.orderGetPageConfig,
            data: {
                bid: wx.getStorageSync("bid")
            },
            success: function(e) {
                var t = e.status, a = JSON.parse(e.diy);
                t && (wx.setNavigationBarTitle({
                    title: a.titleConfig.pageTitle
                }), wx.setNavigationBarColor({
                    frontColor: a.titleConfig.fontColor.toLocaleLowerCase(),
                    backgroundColor: a.titleConfig.navigationBgColor,
                    animation: {
                        duration: 400,
                        timingFunc: "easeIn"
                    }
                }), i.setData({
                    pageConfig: a
                }));
            }
        });
        var t = this;
        if (t.setData({
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
            var a = t.data.typeid, r = t.data.type_status;
            t.setData({
                typeid: a
            }), app.request({
                url: api.default.TuiSongList,
                data: {
                    id: a,
                    type_status: r
                },
                success: function(e) {
                    console.log("+++++++", e), t.setData({
                        wareText: e.goods_name,
                        detail_info: e.adress,
                        username: e.name,
                        phone: e.mobile,
                        inputAddressText: e.address,
                        old_order_no: e.order_no
                    });
                }
            });
        }
        e.addressId ? t.setData({
            time: e.time,
            price: e.price,
            reward: e.reward,
            coupon: e.coupon,
            lastPrice: e.lastPrice,
            addressId: e.addressId,
            inputAddressText: e.inputAddressText,
            wareText: e.wareText,
            cid: e.cid
        }) : t.setData({
            wareText: e.wareText ? e.wareText : ""
        });
        var o = [];
        if (app.request({
            url: api.default.timelist,
            data: {
                time: 0
            },
            success: function(e) {
                o[0] = dateFactory._weekArr, o[1] = e.data, i.setData({
                    timeArr: o
                });
            }
        }), e.tags) {
            var n = e.tags.split(",");
            i.setData({
                tags: n
            });
        }
    },
    onShow: function() {
        var t = this;
        t.couponurl(), t.data.typeid || (app.request({
            url: api.default.mrAddress,
            data: {
                bid: wx.getStorageSync("bid"),
                uid: wx.getStorageSync("uid")
            },
            success: function(e) {
                console.log("地址2：", e), "" == e.data.adress ? wx.navigateTo({
                    url: "/sd_liferuning/pages/constmer/address-list/index"
                }) : t.setData({
                    detail_info: e.data.adress ? e.data.adress : ""
                });
            }
        }), app.request({
            url: api.default.mrAddress,
            data: {
                bid: wx.getStorageSync("bid"),
                uid: wx.getStorageSync("uid")
            },
            success: function(e) {
                console.log("地址", e), "" == e.data ? wx.navigateTo({
                    url: "/sd_liferuning/pages/constmer/address-list/index"
                }) : (t.setData({
                    detail_info: e.data.adress,
                    username: e.data.name,
                    phone: e.data.phone
                }), t.AddressPrice());
            }
        }));
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
                    detail_infos: e.address,
                    wd: e.latitude,
                    jd: e.longitude
                });
            },
            complete: function(e) {
                if ("" != t.data.detail_info && null != t.data.wd && null != t.data.jd && "" != t.data.detail_infos && "" != t.data.wd && "" != t.data.jd) {
                    t.data.wd, t.data.jd;
                    t.AddressPrice();
                }
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
                        if (console.log(t), console.log("金额", e), a.setData({
                            didianprice: e.data.price,
                            price: a.data.price - t + e.data.price,
                            proxy_id: e.data.proxy_id ? e.data.proxy_id : 0,
                            region_id: e.data.region_id ? e.data.region_id : 0
                        }), e.data.region_id) return console.log(e.data.region_id), !1;
                        a.countPrice();
                    }
                });
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
                    var t = a.data.timeprice;
                    console.log(t), a.setData({
                        timeprice: e.data
                    }), a.countPrice();
                }
            });
        }
        "reward" == t && a.setData({
            reward: a.data.rewardArr[i].price
        }), "coupon" == t && (a.setData({
            coupon: a.data.couponArr[i].price,
            full_money: a.data.couponArr[i].full_money,
            useid: a.data.couponArr[i].id
        }), a.data.lastPrice < a.data.full_money && wx.showToast({
            title: "未达到使用要求"
        })), a.countPrice();
    },
    bindColumnChange: function(e) {
        var t = this, a = t.data.timeArr, i = e.detail.column, r = e.detail.value;
        0 == i && app.request({
            url: api.default.timelist,
            data: {
                time: r
            },
            success: function(e) {
                a[1] = e.data, t.setData({
                    timeArr: a
                });
            }
        });
    },
    countPrice: function() {
        var e = this, t = Number(e.data.price) + Number(e.data.stepper.stepper) + Number(e.data.reward) + Number(e.data.weight_price) - Number(e.data.integral);
        t < e.data.full_money ? (t = Number(e.data.price) + Number(e.data.stepper.stepper) + Number(e.data.reward) + Number(e.data.weight_price) - Number(e.data.integral), 
        e.setData({
            coupon: 0
        })) : t = Number(e.data.price) + Number(e.data.stepper.stepper) + Number(e.data.reward) - Number(e.data.coupon) + Number(e.data.weight_price) - Number(e.data.integral), 
        t = t < .01 ? 0 : t, e.setData({
            lastPrice: t.toFixed(2)
        });
    },
    changeInputData: function(e) {
        var t = e.currentTarget.dataset.name, a = e.detail.value;
        "wareText" == t && this.setData({
            wareText: a
        }), "inputAddressText" == t && this.setData({
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
        console.log(e);
        var t = this, a = t.data.pictrueTempPath, i = t.data.yinpin;
        ("" != e.detail.value.goodsname || "" != a || "" != i) && e.detail.value.mudadds && e.detail.value.myadds && "NaN" != e.detail.value.mytimes && !0 === t.data.isReadProtocol ? (console.log(a), 
        console.log(i), e.detail.value.xphoto = a, e.detail.value.yinpin = i, console.log("e.detail.value", e.detail.value), 
        t.setData({
            formData: e.detail.value,
            formId: e.detail.formId
        }), t.openActionsheet()) : wx.showToast({
            title: "信息不完善，无法下单。"
        });
    },
    addWareItem: function(e) {
        var t = e.currentTarget.dataset.tag, a = this.data.wareText, i = "" == a.trim() ? t : a + ", " + t;
        this.setData({
            wareText: i
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
        _defineProperty(t, "actionType", i), _defineProperty(t, "clickpay", !1), t)), i) {
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
        var a = this, e = a.data.formData, t = a.data.Imagecollection.join(","), i = a.data.type_status;
        if (i) var r = i; else r = 0;
        app.request({
            url: api.default.insertorder,
            data: {
                goodsname: e.goodsname,
                mudadds: e.mudadds + e.mudaddsinfos,
                myadds: e.myadds,
                times: e.mytimes,
                price: e.price,
                order_type: r,
                old_order_no: e.old_order_no,
                xphoto: e.xphoto,
                yinpin: e.yinpin,
                uid: wx.getStorageSync("uid"),
                redbao: e.redbao,
                tip: e.tip,
                bid: wx.getStorageSync("bid"),
                type: "代取",
                ins: 0,
                distype: 0,
                message: e.message,
                username: e.username,
                phone: e.phone,
                proxy_id: a.data.proxy_id ? a.data.proxy_id : 0,
                imgurl: t,
                audiotime: this.data.soundRecording.duration
            },
            success: function(e) {
                if (e.data) {
                    var t = e.data;
                    app.request({
                        url: api.default.orderpay,
                        data: {
                            order_no: e.data,
                            title: "超人跑腿支付",
                            uid: wx.getStorageSync("uid")
                        },
                        success: function(e) {
                            a.setData({
                                clickpay: !0
                            }), console.log("支付参数", e.data.weixin), wx.requestPayment({
                                timeStamp: e.data.weixin.timeStamp,
                                nonceStr: e.data.weixin.nonceStr,
                                package: e.data.weixin.package,
                                signType: "MD5",
                                paySign: e.data.weixin.paySign,
                                success: function(e) {
                                    a.data.useid && app.request({
                                        url: api.Coupon.status,
                                        data: {
                                            useid: a.data.useid
                                        },
                                        success: function(e) {
                                            console.log(e);
                                        }
                                    }), app.request({
                                        url: api.user.mess,
                                        data: {
                                            bid: wx.getStorageSync("bid"),
                                            openid: wx.getStorageSync("openid"),
                                            order_no: t,
                                            type: "apply"
                                        },
                                        success: function(e) {
                                            console.log(e), wx.redirectTo({
                                                url: "/sd_liferuning/pages/constmer/order-list/index"
                                            });
                                        }
                                    });
                                },
                                complete: function(e) {
                                    a.setData({
                                        clickpay: !0
                                    });
                                }
                            });
                        }
                    });
                }
            }
        });
    },
    balancePay: function() {
        var e;
        wx.showLoading({
            title: "请稍后"
        });
        var t = this, a = t.data.formData, i = t.data.formId, r = t.data.type_status, o = t.data.Imagecollection.join(",");
        if (r) var n = r; else n = 0;
        app.request({
            url: api.default.insertorder,
            data: (e = {
                distype: a.distype,
                goodsname: a.goodsname,
                mudadds: a.mudadds + a.mudaddsinfos,
                myadds: a.myadds,
                times: a.mytimes,
                price: a.price,
                xphoto: a.xphoto,
                yinpin: a.yinpin,
                order_type: n,
                uid: wx.getStorageSync("uid"),
                redbao: a.redbao,
                tip: a.tip,
                bid: wx.getStorageSync("bid"),
                ins: a.ins,
                message: a.message,
                type: "代取",
                username: a.username,
                phone: a.phone
            }, _defineProperty(e, "order_type", n), _defineProperty(e, "old_order_no", a.old_order_no), 
            _defineProperty(e, "proxy_id", t.data.proxy_id ? t.data.proxy_id : 0), _defineProperty(e, "imgurl", o), 
            _defineProperty(e, "audiotime", this.data.soundRecording.duration), e),
            success: function(e) {
                t.setData({
                    clickpay: !0
                }), 1 == e.code && app.request({
                    url: api.order.pricePay,
                    method: "post",
                    data: {
                        uid: wx.getStorageSync("uid"),
                        order_no: e.data,
                        openid: wx.getStorageSync("openid"),
                        formId: i
                    },
                    success: function(e) {
                        wx.hideLoading(), 1 == e.code ? (t.data.useid && app.request({
                            url: api.Coupon.status,
                            data: {
                                useid: t.data.useid
                            },
                            success: function(e) {
                                console.log(e);
                            }
                        }), wx.showToast({
                            title: e.msg,
                            duration: 1e3,
                            success: function() {
                                setTimeout(function() {
                                    wx.redirectTo({
                                        url: "/sd_liferuning/pages/constmer/order-list/index"
                                    });
                                }, 1e3);
                            }
                        })) : wx.showToast({
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
        var r = this;
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
                url: api.order.uploadimg,
                filePath: i,
                name: "file",
                success: function(e) {
                    console.log("resres", e);
                    var t = e.data;
                    r.setData({
                        yinpin: t
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
            isBargaining: !t
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
    weightSliderChange: function(e) {
        var t = this, a = e.detail.value;
        t.setData({
            weight: a
        }), 0 == a ? (t.setData({
            weight_price: 0
        }), t.countPrice()) : wx.request({
            url: api.default.WeightPrice,
            data: {
                bid: wx.getStorageSync("bid"),
                weight: a,
                region_id: t.data.region_id ? t.data.region_id : 0
            },
            method: "get",
            success: function(e) {
                t.setData({
                    weight_price: e.data.data
                }), t.countPrice();
            }
        });
    },
    isOpenIntegralDeduction: function() {
        var t = this, e = this.data.isOpenIntegralDeduction;
        0 == e ? wx.request({
            url: api.member.integral,
            data: {
                uid: wx.getStorageSync("uid"),
                bid: wx.getStorageSync("bid")
            },
            method: "post",
            success: function(e) {
                t.setData({
                    integral: e.data.data.integral
                });
            }
        }) : t.setData({
            integral: 0
        }), this.setData({
            isOpenIntegralDeduction: !e
        });
    },
    multiUploadImage: function() {
        var a = this, i = a.data.multiImage, r = a.data.Imagecollection;
        wx.chooseImage({
            count: 9,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                wx.showLoading({
                    title: "正在上传"
                }), e.tempFilePaths.forEach(function(e, t) {
                    i.push(e), console.log("", e), wx.uploadFile({
                        url: api.default.OrderUploadsImg,
                        filePath: e,
                        header: {
                            "content-type": "application/x-www-form-urlencoded"
                        },
                        name: "image",
                        success: function(e) {
                            e = JSON.parse(e.data);
                            setTimeout(function() {
                                wx.hideLoading();
                            }, 1500), 1 == e.code ? r.push(e.url) : wx.showModal({
                                title: "提示",
                                content: "图片上传失败",
                                showCancel: !1
                            });
                        },
                        fail: function(e) {}
                    }), a.setData({
                        multiImage: i,
                        Imagecollection: r
                    });
                });
            }
        });
    },
    multiImageDeleteByIndex: function(e) {
        var t = e.currentTarget.dataset.index, a = this.data.multiImage, i = ArrayUtils.deleteByIndex({
            dataArr: a,
            index: t
        }), r = this.data.Imagecollection;
        r.splice(t, 1), console.log(r, "Imagecollection"), this.setData({
            multiImage: i,
            Imagecollection: r
        });
    }
});