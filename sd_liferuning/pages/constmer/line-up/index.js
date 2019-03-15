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

var config = require("../../../../config.js"), api = require("../../../../api.js"), QQMapWX = require("../../../../qqmap-wx.js"), app = getApp();

Page({
    data: {
        order: void 0,
        webRoot: app.webRoot,
        timeArr: [ [], [], [] ],
        status: 0,
        cid: "",
        tags:['帮挂号','食堂排队','帮领票'],
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
        huiyuan: "",
        full_money: "",
        time: "",
        price: 0,
        paiduiprice: 0,
        reward: 0,
        coupon: 0,
        lastPrice: 0,
        detail_info: "",
        addressId: "",
        clickpay: !0,
        wareText: "",
        didianprice: 0,
        timeprice: 0,
        inputAddressText: "",
        isReadProtocol: !0,
        selectionService: 0,
        proxy_id: 0,
        tages: [],
        service: [ {
            tid: 1,
            sname: "仅排队"
        }, {
            tid: 2,
            sname: "取物件"
        }, {
            tid: 3,
            sname: "取送物件"
        } ],
        isBargaining: 0,
        bargaining: 0,
        isOpenPreference: !1,
        isOpenIntegralDeduction: !1,
        integral: 0,
        show: !1,
        cancelWithMask: !0,
      pictrueTempPath: "",
      soundRecording: {
        tempPath: "",
        duration: "",
        isPlay: !1
      },
        actions: config.actions,
        cancelText: "取消",
        time_index: {
            column: "",
            value: ""
        },
        time_stamp: [ 0, 0, 0 ]
    },
    // 自家代码区域
  xphoto: function () {
    var a = this, i = (a.data.xphoto, app.siteInfo.acid);
    wx.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success: function (e) {
        var t = e.tempFilePaths;
        wx.saveFile({
          tempFilePath: t[0],
          success: function (e) {
            var t = e.savedFilePath;
            wx.uploadFile({
              url: api.order.upload + "&_acid=" + i + "&access_token=" + wx.getStorageSync("access_token"),
              filePath: t,
              header: {
                "content-type": "application/x-www-form-urlencoded"
              },
              name: "file",
              success: function (e) {
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
              fail: function (e) {
                console.log("res fail", e);
              }
            });
          }
        });
      }
    });
  },
  xphotos: function (e) {
    console.log("eee", e);
    var t = e.currentTarget.id;
    wx.navigateTo({
      url: "/sd_liferuning/pages/constmer/choose-pic/index?src=" + t
    });
  },
  // 自家代码区结束

    onLoad: function(e) {
      console.log(e);
        var t = this, a = this, i = e.tags;
      if (wx.removeStorageSync("cost"), e.tags) {
        var tag = e.tags.split(",");
        this.setData({
          tags: tag
        });
      } 
        app.location(a), app.order_template(t), a.setData({
            icons: wx.getStorageSync("site") + "/addons/sd_liferuning/tp/public/uploads/background"
        }), "非会员用户" == wx.getStorageSync("huiyuan") && a.setData({
            huiyuan: 1
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
            txtlength: 0
        });
        e.id;
    },
    onShow: function(e) {
        var t = this;
        app.request({
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
    },
    GetAddress: function() {
        var t = this;
        if (app.adddetails(), !app.address_type) return !1;
        wx.chooseLocation({
            success: function(e) {
                t.setData({
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
    pickerSelector: function(e) {
        var i = this, t = e.currentTarget.dataset.type, a = i.data.time_stamp, r = e.detail.value;
        if ("time" == t) {
            if (!i.data.detail_infos) return wx.showToast({
                icon: "none",
                title: "请选择排队地址"
            }), !1;
            if (i.data.timeArrs[1][a[1]].stamp >= i.data.timeArrs[2][a[2]].stamp) return wx.showToast({
                icon: "none",
                title: "请至少间隔半个小时的排队时间"
            }), !1;
            i.setData({
                time: {
                    week: i.data.timeArrs[0][a[0]],
                    firstHour: i.data.timeArrs[1][a[1]],
                    lastHour: i.data.timeArrs[2][a[2]]
                }
            }), console.log(i.data.time), app.request({
                url: api.order.getLineRules,
                method: "post",
                data: {
                    pid: i.data.pid,
                    start_time: i.data.time.firstHour.stamp,
                    end_time: i.data.time.lastHour.stamp
                },
                success: function(e) {
                    var t = e.data;
                    if (console.log(e), 1 != e.code) return wx.showToast({
                        title: e.msg,
                        icon: "none",
                        duration: 1500
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
        var t = this.data.time_stamp, a = this.data.pageConfig.time, i = this.data.timeArrs, r = e.detail.column, n = e.detail.value, o = this.data.time_index;
        console.log("修改的列为", e.detail.column, "，值为", e.detail.value), 0 == r && (i[1] = a[n].time, 
        i[2] = a[n].time), t[r] = e.detail.value, o.column = r, o.value = n, console.log(i, "----timeArrs"), 
        this.setData({
            timeArrs: i,
            time_index: o,
            time_stamp: t
        });
    },
    countPrice: function() {
        var e = this;
        if (null == e.data.order) return !1;
        var t = e.data.types, a = e.data.order.base_price, i = e.data.order.discount_price, r = e.data.stepper.stepper, n = e.data.coupon, o = e.data.order.reduce_price, s = e.data.order.secure_price, d = e.data.isOpenIntegralDeduction, c = e.data.order.surcharge, u = 0;
        0 === t ? (console.log("折扣价"), console.log(d, "折扣状态"), d ? (e.setData({
            discount: e.data.order.discount + "折"
        }), u = Number(a) - Number(i) + Number(r) - Number(o) + Number(s) + Number(0) + Number(c)) : (e.setData({
            discount: e.data.order.discount + "折"
        }), u = Number(a) - Number(i) + Number(r) + Number(s) + Number(0) + Number(c))) : (console.log("优惠价"), 
        console.log(d, "折扣状态"), d ? (e.setData({
            discount: "无折扣"
        }), u = Number(a) + Number(r) - Number(n) - Number(o) + Number(s) + Number(0) + Number(c)) : (e.setData({
            discount: "无折扣"
        }), u = Number(a) + Number(r) - Number(n) + Number(s) + Number(0) + Number(c)));
        var p = {
            lastPrice: u || 0,
            base_price: a || 0,
            discount: t ? e.data.order.discount : 0,
            secure_price: s || 0,
            reduce_price: d ? o : 0,
            coupon: n || 0,
            stepper: r || 0,
            type: 3
        };
        wx.setStorageSync("cost", p), e.setData({
            lastPrice: u.toFixed(2)
        });
    },
    // 原函数
    // changeInputData: function(e) {
    //     var t = e.currentTarget.dataset.name, a = e.detail.value;
    //     "wareText" == t && this.setData({
    //         wareText: a
    //     }), "inputAddressText" == t && this.setData({
    //         inputAddressText: a
    //     });
    // },
  changeInputData: function (e) {
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
        return console.log(e.detail.value), "" == e.detail.value.address ? (wx.showToast({
            title: "信息不完善，无法下单。",
            icon: "none",
            duration: 1e3
        }), !1) : 1 == this.data.pageConfig.mainConfig.templet3.timeConfig.enabled && "" == e.detail.value.start_time ? (wx.showToast({
            title: "配送时间未选择，无法下单。",
            icon: "none"
        }), !1) : this.data.isReadProtocol ? (this.setData({
            formData: e.detail.value,
            formId: e.detail.formId
        }), void this.openActionsheet()) : (wx.showToast({
            title: "未同意协议，无法下单。",
            icon: "none",
            duration: 1e3
        }), !1);
    },
    // 原函数
    // addWareItem: function(e) {
    //     var t = e.currentTarget.dataset.tag, a = this.data.wareText;
    //     this.setData({
    //         wareText: a + ", " + t
    //     });
    // },
  addWareItem: function (e) {
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
    selectionService: function(e) {
        var t = e.currentTarget.dataset.index;
        console.log(e), this.setData({
            selectionService: t,
            wareText: this.data.tags[t]
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
        console.log("微信支付"), app.request({
            url: api.payment.linePay,
            method: "post",
            data: {
                pic: e.pic,
                voice: e.voice,
                remark: e.remark,
                goods: e.goods,
                reward_price: e.reward_price,
                coupon_id: e.coupon_id ? e.coupon_id : 0,
                integral: e.integral,
                bargaining: e.bargaining,
                pay_type: 1,
                start_time: e.start_time,
                end_time: e.end_time,
                address: e.address + e.addresstxt,
                latitude: this.data.location.latitude,
                longitude: this.data.location.longitude,
                laiyuan_id: 0,
                old_order_no: 0,
                pid: t.data.pid
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
        var t = this, a = this, i = t.data.formData, r = t.data.formId;
        console.log("表单数据=>", i), wx.showModal({
            title: "余额支付",
            content: "是否支付" + t.data.lastPrice + "元",
            success: function(e) {
                e.confirm ? (wx.showLoading({
                    title: "正在支付"
                }), app.request({
                    url: api.payment.linePay,
                    method: "post",
                    data: {
                        pic: i.pic,
                        voice: i.voice,
                        remark: i.remark,
                        goods: i.goods,
                        reward_price: i.reward_price,
                        coupon_id: i.coupon_id ? i.coupon_id : 0,
                        integral: i.integral,
                        bargaining: i.bargaining,
                        pay_type: 2,
                        start_time: i.start_time,
                        end_time: i.end_time,
                        address: i.address + i.addresstxt,
                        form_id: r,
                        latitude: a.data.location.latitude,
                        longitude: a.data.location.longitude,
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
    // 后加代码开始
  soundRecordingStart: function () {
    recorderManager.start({
      duration: 6e4,
      sampleRate: 44100,
      numberOfChannels: 1,
      encodeBitRate: 192e3,
      format: "mp3",
      frameSize: 50
    });
  },
  soundRecordingEnd: function () {
    var r = this, n = app.siteInfo.acid;
    recorderManager.stop(), recorderManager.onStop(function (e) {
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
        success: function (e) {
          r.setData({
            yinpin: JSON.parse(e.data)
          });
        }
      }));
    });
  },
  soundRecordingPlay: function () {
    var t = this, e = innerAudioContext.paused, a = t.data.soundRecording;
    e ? (innerAudioContext.play(), a.isPlay = !0, setTimeout(function () {
      var e = t.data.soundRecording;
      e.isPlay = !1, t.setData({
        soundRecording: e
      });
    }, 1e3 * a.duration)) : (innerAudioContext.stop(), a.isPlay = !1), t.setData({
      soundRecording: a
    });
  },
  soundRecordingRemove: function () {
    innerAudioContext.stop(), this.setData({
      soundRecording: {
        tempPath: "",
        duration: "",
        isPlay: !1
      }
    });
  },
  takePictrue: function () {
    var a = this;
    wx.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success: function (e) {
        var t = e.tempFilePaths;
        a.setData({
          pictrueTempPath: t[0]
        });
      }
    });
  },
    // 后加代码结束
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