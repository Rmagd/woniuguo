var api = require("../../../../api.js"), app = getApp();

Page({
    data: {
        region: [],
        tagArr: [],
        tag: 0,
        person: "",
        phone: "",
        address: "",
        address_remarks: "",
        multiIndex: [ 0, 0, 0 ]
    },
    onLoad: function(a) {
        var t = this;
        t.setData({
            limit: 0
        }), a.id && app.request({
            url: api.address.details,
            method: "POST",
            data: {
                id: a.id
            },
            success: function(a) {
                console.log(a, "addslist");
                var e = a.data;
                t.setData({
                    person: e.name,
                    id: e.id,
                    phone: e.phone,
                    address: {
                        address: e.address,
                        name: e.address_name,
                        latitude: e.latitude,
                        longitude: e.longitude
                    },
                    address_remarks: e.address_remarks
                });
            }
        });
    },
    address: function() {
        var e = this;
        wx.chooseLocation({
            success: function(a) {
                e.setData({
                    address: a
                }), console.log(a);
            }
        });
    },
    bindRegionChange: function(a) {
        this.setData({
            region: a.detail.value
        });
    },
    bindMultiPickerChange: function(a) {
        var e = a.detail.value, t = this.data.multiArray;
        this.setData({
            region: [ t[0][e[0]], t[1][e[1]], t[2][e[1]] ]
        });
    },
    bindMultiPickerColumnChange: function(a) {
        var e = this, t = {
            multiArray: this.data.multiArray,
            multiIndex: this.data.multiIndex
        };
        switch (t.multiIndex[a.detail.column] = a.detail.value, a.detail.column) {
          case 0:
            for (var s = 0; s <= e.data.areaList[0].length - 1; s++) s == a.detail.value && (t.multiArray[1] = e.data.areaList[1][s], 
            t.multiArray[2] = e.data.areaList[2][s][0]);
            t.multiIndex[1] = 0, t.multiIndex[2] = 0;
            break;

          case 1:
            for (var n = 0; n <= e.data.areaList[1].length - 1; n++) n == a.detail.value && (t.multiArray[2] = e.data.areaList[2][this.data.multiIndex[0]][n]);
            t.multiIndex[2] = 0;
        }
        this.setData(t);
    },
    checkTag: function(a) {
        var e = a.currentTarget.dataset.index;
        this.setData({
            tag: e
        });
    },
    changeInputData: function(a) {
        var e = this, t = a.currentTarget.dataset.name, s = a.detail.value;
        "person" == t && e.setData({
            person: s
        }), "identifyingCode" == t && e.setData({
            identifyingCode: s
        }), "phone" == t && e.setData({
            phone: s
        }), "address_remarks" == t && e.setData({
            address_remarks: s
        });
    },
    sendRequest: function() {
        var a = this, e = a.data.address, t = a.data.phone, s = a.data.person, n = a.data.address_remarks;
        return "" == s ? (wx.showToast({
            title: "请填写姓名",
            icon: "none"
        }), !1) : "" == t ? (wx.showToast({
            title: "请填写电话号码",
            icon: "none"
        }), !1) : "" == e ? (wx.showToast({
            title: "请填写地区",
            icon: "none"
        }), !1) : "" == n ? (wx.showToast({
            title: "请填写详细地址",
            icon: "none"
        }), !1) : void app.request({
            url: api.address.add,
            method: "POST",
            data: {
                address: e.address,
                address_name: e.name,
                name: s,
                phone: t,
                address_remarks: n,
                latitude: e.latitude,
                longitude: e.longitude
            },
            success: function(a) {
                console.log(a), 1 == a.code ? wx.showToast({
                    title: a.msg,
                    success: function() {
                        setTimeout(function() {
                            wx.navigateBack({
                                delta: 1
                            });
                        }, 1e3);
                    }
                }) : wx.showToast({
                    title: a.msg,
                    success: function() {}
                });
            }
        });
    },
    UpsendRequest: function(a) {
        var e = this, t = a.currentTarget.dataset.id, s = e.data.address, n = e.data.phone, d = e.data.person, i = e.data.address_remarks;
        return "" == d ? (wx.showToast({
            title: "请填写姓名",
            icon: "none"
        }), !1) : "" == n ? (wx.showToast({
            title: "请填写电话号码",
            icon: "none"
        }), !1) : "" == s ? (wx.showToast({
            title: "请填写地区",
            icon: "none"
        }), !1) : void app.request({
            url: api.address.update,
            method: "POST",
            data: {
                id: t,
                address: s.address,
                address_name: s.name,
                name: d,
                phone: n,
                address_remarks: i,
                latitude: s.latitude,
                longitude: s.longitude
            },
            success: function(a) {
                1 == a.code ? wx.showToast({
                    title: "修改成功",
                    icon: "success",
                    duration: 1e3,
                    success: function() {
                        setTimeout(function() {
                            wx.navigateBack({});
                        }, 1e3);
                    }
                }) : wx.showToast({
                    title: "修改失败",
                    icon: "none"
                });
            }
        });
    },
    validate: function() {
        var a = this;
        return !a.data.person || a.data.person.length <= 0 ? (wx.showToast({
            title: "收货人不得为空",
            icon: "none",
            mask: !0
        }), !1) : new RegExp("^[1][3,5,8][0-9]{9}$").test(a.data.phone) ? a.data.region.length <= 0 ? (wx.showToast({
            title: "请选择地区",
            icon: "none",
            mask: !0
        }), !1) : !(!a.data.address || a.data.address.length <= 0) || (wx.showToast({
            title: "地址不得为空",
            icon: "none",
            mask: !0
        }), !1) : (wx.showToast({
            title: "手机号不正确",
            icon: "none",
            mask: !0
        }), !1);
    },
    adds: function() {
        var t = this;
        wx.chooseAddress({
            success: function(a) {
                var e = Array();
                e.push(a.provinceName), e.push(a.cityName), e.push(a.countyName), t.setData({
                    person: a.userName,
                    address: a.detailInfo,
                    phone: a.telNumber,
                    region: e
                });
            }
        });
    }
});