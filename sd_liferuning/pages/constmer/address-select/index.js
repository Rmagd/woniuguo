Page({
    data: {
        data: [ {
            phone: 123456789,
            address: "某某路150米",
            tag: "其他"
        }, {
            phone: 123456789,
            address: "某某路150米",
            tag: "其他"
        }, {
            phone: 123456789,
            address: "某某路150米",
            tag: "其他"
        }, {
            phone: 123456789,
            address: "某某路150米",
            tag: "其他"
        }, {
            phone: 123456789,
            address: "某某路150米",
            tag: "其他"
        }, {
            phone: 123456789,
            address: "某某路150米",
            tag: "其他"
        }, {
            phone: 123456789,
            address: "某某路150米",
            tag: "其他"
        }, {
            phone: 123456789,
            address: "某某路150米",
            tag: "其他"
        }, {
            phone: 123456789,
            address: "某某路150米",
            tag: "其他"
        } ],
        time: null,
        price: null,
        reward: null,
        coupon: null,
        lastPrice: null,
        addressId: null,
        carry: "",
        weight: "",
        worth: "",
        wareText: "",
        inputAddressText: ""
    },
    onLoad: function(e) {
        "largess" == e.pagetype ? this.setData({
            pagetype: e.pagetype,
            time: e.time,
            price: e.price,
            reward: e.reward,
            coupon: e.coupon,
            lastPrice: e.lastPrice,
            addressId: e.addressId,
            carry: e.carry,
            weight: e.weight,
            worth: e.worth,
            inputAddressText: e.inputAddressText
        }) : this.setData({
            pagetype: e.pagetype,
            time: e.time,
            price: e.price,
            reward: e.reward,
            coupon: e.coupon,
            lastPrice: e.lastPrice,
            addressId: e.addressId,
            wareText: e.wareText,
            inputAddressText: e.inputAddressText
        });
    },
    checkItem: function(e) {
        var a = e.currentTarget.dataset.id, t = this;
        t.setData({
            addressId: a
        }), "largess" == t.data.pagetype ? wx.redirectTo({
            url: "/sd_liferuning/pages/constmer/largess/index?time=" + t.data.time + "&&price=" + t.data.price + "&&reward=" + t.data.reward + "&&coupon=" + t.data.coupon + "&&lastPrice=" + t.data.lastPrice + "&&addressId=" + t.data.addressId + "&&carry=" + t.data.carry + "&&weight=" + t.data.weight + "&&worth=" + t.data.worth + "&&inputAddressText=" + t.data.inputAddressText
        }) : wx.redirectTo({
            url: "/sd_liferuning/pages/constmer/buy/index?time=" + t.data.time + "&&price=" + t.data.price + "&&reward=" + t.data.reward + "&&coupon=" + t.data.coupon + "&&lastPrice=" + t.data.lastPrice + "&&addressId=" + t.data.addressId + "&&inputAddressText=" + t.data.inputAddressText + "&&wareText=" + t.data.wareText
        });
    }
});