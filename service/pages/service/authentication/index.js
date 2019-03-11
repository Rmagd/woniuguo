var api = require("../../../../api.js"), QQMapWX = require("../../../../qqmap-wx.js"), app = getApp();

Page({
    data: {
        userTypeArr: [ {
            id: 1,
            name: "跑腿人员"
        }, {
            id: 2,
            name: "代驾人员"
        }, {
            id: 3,
            name: "家政人员"
        } ],
        userType: "",
        name: "",
        idcard: "",
        cardImg: "",
        cardImgf: "",
        carcardImg: "",
        carcardImgf: "",
        carcodes: "",
        agent: !1
    },
    onLoad: function() {
        var t = this, a = app.plug;
        console.log(a), a.forEach(function(a, e) {
            1 == a.id && t.setData({
                agent: !0
            });
        });
    },
    userTypePickerChange: function(a) {
        var e = a.detail.value, t = this.data.userTypeArr[e];
        console.log(t, "currentItem"), this.setData({
            userType: t
        });
    },
    changeInputData: function(a) {
        var e = this, t = a.currentTarget.dataset.name, s = a.detail.value;
        "name" == t && e.setData({
            name: s
        }), "idcard" == t && e.setData({
            idcard: s
        }), "carcodes" == t && e.setData({
            carcodes: s
        }), "agentid" == t && e.setData({
            agentid: s
        });
    },
    sendRequest: function() {
        var a = this;
        a.validate() && app.request({
            url: api.apply.apply_runner,
            method: "post",
            data: {
                type: a.data.userType.id,
                name: a.data.name,
                identity: a.data.idcard,
                pid: a.data.agentid ? a.data.agentid : 0,
                card_front: a.data.cardImg,
                card_back: a.data.cardImgf,
                health_front: a.data.health_front ? a.data.health_front : "",
                license_front: a.data.license_front ? a.data.license_front : "",
                license_back: a.data.license_back ? a.data.license_back : ""
            },
            success: function(a) {
                1 == a.code ? (wx.setStorage({
                    key: "cash",
                    data: {
                        status: 2
                    }
                }), wx.showModal({
                    title: "提示",
                    showCancel: !1,
                    content: a.msg,
                    success: function() {
                        wx.redirectTo({
                            url: "../auth-success/index"
                        });
                    }
                })) : wx.showToast({
                    icon: "none",
                    mask: !1,
                    title: a.msg
                });
            }
        });
    },
    validate: function() {
        var a = this;
        if (!a.data.userType || void 0 === a.data.userType) return wx.showToast({
            title: "请选择服务人员分类",
            icon: "none",
            mask: !0
        }), !1;
        if (!a.data.name || a.data.name.length <= 0) return wx.showToast({
            title: "姓名不得为空",
            icon: "none",
            mask: !0
        }), !1;
        if (!a.data.idcard) return wx.showToast({
            title: "身份证号码不得为空",
            icon: "none",
            mask: !0
        }), !1;
        return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(a.data.idcard) ? !(!a.data.cardImg || "" == a.data.cardImg) || (wx.showToast({
            title: "请上传身份证照片",
            icon: "none",
            mask: !0
        }), !1) : (wx.showToast({
            title: "身份证格式错误",
            icon: "none",
            mask: !0
        }), !1);
    },
    chooseCard: function() {
        var t = this, s = app.siteInfo.acid;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                var e = a.tempFilePaths;
                wx.saveFile({
                    tempFilePath: e[0],
                    success: function(a) {
                        var e = a.savedFilePath;
                        wx.uploadFile({
                            url: api.runner.upload + "&_acid=" + s,
                            filePath: e,
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            name: "file",
                            success: function(a) {
                                var e = JSON.parse(a.data);
                                1 == e.code ? t.setData({
                                    cardImg: e.data
                                }) : wx.showModal({
                                    title: "提示",
                                    content: "图片上传失败",
                                    showCancel: !1
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    chooseCardf: function() {
        var t = this, s = app.siteInfo.acid;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                var e = a.tempFilePaths;
                wx.saveFile({
                    tempFilePath: e[0],
                    success: function(a) {
                        var e = a.savedFilePath;
                        wx.uploadFile({
                            url: api.runner.upload + "&_acid=" + s,
                            filePath: e,
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            name: "file",
                            success: function(a) {
                                var e = JSON.parse(a.data);
                                1 == e.code ? t.setData({
                                    cardImgf: e.data
                                }) : wx.showModal({
                                    title: "提示",
                                    content: "图片上传失败",
                                    showCancel: !1
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    chooseCarCard: function() {
        var t = this, s = app.siteInfo.acid;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                var e = a.tempFilePaths;
                wx.saveFile({
                    tempFilePath: e[0],
                    success: function(a) {
                        var e = a.savedFilePath;
                        console.log(e), wx.uploadFile({
                            url: api.runner.upload + "&_acid=" + s,
                            filePath: e,
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            name: "file",
                            success: function(a) {
                                var e = JSON.parse(a.data);
                                1 == e.code ? t.setData({
                                    carcardImg: e.src
                                }) : wx.showModal({
                                    title: "提示",
                                    content: "图片上传失败",
                                    showCancel: !1
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    chooseCarCards: function() {
        var t = this, s = app.siteInfo.acid;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                var e = a.tempFilePaths;
                wx.saveFile({
                    tempFilePath: e[0],
                    success: function(a) {
                        var e = a.savedFilePath;
                        console.log(e), wx.uploadFile({
                            url: api.runner.upload + "&_acid=" + s,
                            filePath: e,
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            name: "file",
                            success: function(a) {
                                var e = JSON.parse(a.data);
                                1 == e.code ? t.setData({
                                    carcardImgf: e.src
                                }) : wx.showModal({
                                    title: "提示",
                                    content: "图片上传失败",
                                    showCancel: !1
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    upimg: function(a) {
        var t = this, s = a.currentTarget.dataset.type, c = app.siteInfo.acid;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                var e = a.tempFilePaths;
                wx.saveFile({
                    tempFilePath: e[0],
                    success: function(a) {
                        var e = a.savedFilePath;
                        console.log(e), wx.uploadFile({
                            url: api.apply.upload + "&_acid=" + c + "&access_token=" + wx.getStorageSync("access_token"),
                            filePath: e,
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            name: "file",
                            success: function(a) {
                                var e = JSON.parse(a.data);
                                1 == e.code ? ("0" === s && t.setData({
                                    cardImg: e.data
                                }), "1" === s && t.setData({
                                    cardImgf: e.data
                                }), "2" === s && t.setData({
                                    license_front: e.data
                                }), "3" === s && t.setData({
                                    license_back: e.data
                                }), "4" === s && t.setData({
                                    health_front: e.data
                                })) : wx.showModal({
                                    title: "提示",
                                    content: "图片上传失败",
                                    showCancel: !1
                                });
                            }
                        });
                    }
                });
            }
        });
    }
});