var app = getApp(), api = require("../../../../api.js");

Page({
    data: {
        bankArr: [],
        bank: "",
        bankaccount: "",
        bankname: ""
    },
    bindBankChange: function(a) {
        console.log(a), this.setData({
            bank: this.data.bankArr[a.detail.value]
        });
    },
    changeInputData: function(a) {
        var n = this, t = a.currentTarget.dataset.name, e = a.detail.value;
        "bank" == t && (console.log(e), n.setData({
            bank: e
        })), "bankName" == t && n.setData({
            bankname: e
        }), "bankAccount" == t && n.setData({
            bankaccount: e
        });
    },
    onShow: function() {
        var n = this;
        app.request({
            url: api.wallet.bankcard,
            method: "post",
            data: {},
            success: function(a) {
                n.setData({
                    bankArr: a.data
                });
            }
        });
    },
    sendRequest: function() {
        var a = this;
        a.validate() && app.request({
            url: api.wallet.bankadd,
            method: "post",
            data: {
                bankid: a.data.bank.id,
                name: a.data.bankname,
                bank_number: a.data.bankaccount,
                type: 1
            },
            success: function(a) {
                1 === a.code ? wx.showToast({
                    title: "添加成功",
                    duration: 1e3,
                    success: function(a) {
                        setTimeout(function() {
                            wx.redirectTo({
                                url: "../../../../sd_liferuning/pages/constmer/bankcard-success/index"
                            });
                        }, 1e3);
                    }
                }) : wx.showModal({
                    title: "提示",
                    content: "提交失败",
                    showCancel: !1
                });
            }
        });
    },
    validate: function() {
        var a = this;
        if (!a.data.bankname || "" == a.data.bankname) return wx.showToast({
            title: "开户人不得为空",
            icon: "none",
            mask: !0
        }), !1;
        if (!a.data.bank || "" == a.data.bank) return wx.showToast({
            title: "请选择开户行",
            icon: "none",
            mask: !0
        }), !1;
        if (!a.data.bankaccount || "" == a.data.bankaccount) return wx.showToast({
            title: "卡号不得为空",
            icon: "none",
            mask: !0
        }), !1;
        for (var n = a.data.bankaccount.substr(a.data.bankaccount.length - 1, 1), t = a.data.bankaccount.substr(0, a.data.bankaccount.length - 1), e = new Array(), s = t.length - 1; -1 < s; s--) e.push(t.substr(s, 1));
        for (var r = new Array(), o = new Array(), c = new Array(), u = 0; u < e.length; u++) (u + 1) % 2 == 1 ? 2 * parseInt(e[u]) < 9 ? r.push(2 * parseInt(e[u])) : o.push(2 * parseInt(e[u])) : c.push(e[u]);
        for (var i = new Array(), d = new Array(), p = 0; p < o.length; p++) i.push(parseInt(o[p]) % 10), 
        d.push(parseInt(o[p]) / 10);
        for (var b, k = 0, l = 0, h = 0, w = 0, f = 0; f < r.length; f++) k += parseInt(r[f]);
        for (var g = 0; g < c.length; g++) l += parseInt(c[g]);
        for (var m = 0; m < i.length; m++) h += parseInt(i[m]), w += parseInt(d[m]);
        return b = parseInt(k) + parseInt(l) + parseInt(h) + parseInt(w), n == 10 - (parseInt(b) % 10 == 0 ? 10 : parseInt(b) % 10) || (wx.showToast({
            title: "卡号格式错误",
            icon: "none"
        }), !1);
    }
});