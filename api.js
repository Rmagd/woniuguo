function _defineProperty(e, o, r) {
    return o in e ? Object.defineProperty(e, o, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[o] = r, e;
}

var _api_root = "{$_api_root}", api = {
    default: {
        index: _api_root,
        nav_template: _api_root + "option/nav_template",
        getIndexData: _api_root + "option/getIndexData",
        menu_template: _api_root + "option/menu_template",
        order_template: _api_root + "option/order_template",
        userinfo: _api_root + "option/userinfo"
    },
    user: {
        judge_type: _api_root + "module_api/judgeType",
        login: _api_root + "user/login",
        getQrcode: _api_root + "user/getQrcode",
        feedback: _api_root + "user/feedback",
        check_phone: _api_root + "user/check_phone",
        send_sms: _api_root + "user/send_sms",
        binding_phone: _api_root + "user/binding_phone",
        loginGrow: _api_root + "user/loginGrow",
        signGrow: _api_root + "user/signGrow",
        wx_official_openid: _api_root + "user/wx_official_openid",
        getNews: _api_root + "user/getNews",
        vipInfo: _api_root + "user/vipInfo",
        signList: _api_root + "user/signList",
        collect: _api_root + "user/collect",
        userPhoneChange: _api_root + "user/userPhoneChange"
    },
    runner: {
        apply_runner: _api_root + "runner/apply_runner",
        upload: _api_root + "runner/upload",
        check: _api_root + "runner/check",
        normal: _api_root + "runner/normal",
        getNews: _api_root + "runner/getNews",
        refundPromiseMoney: _api_root + "runner/refundPromiseMoney",
        withdrawList: _api_root + "runner/withdrawList"
    },
    apply: {
        deposit_price: _api_root + "apply/deposit_price",
        check: _api_root + "apply/check",
        upload: _api_root + "apply/upload",
        apply_runner: _api_root + "apply/apply_runner",
        editinfo: _api_root + "apply/editinfo",
        getInfo: _api_root + "apply/getInfo",
        infoRunnerApply: _api_root + "apply/infoRunnerApply"
    },
    article: {
        details: _api_root + "article/details"
    },
    address: {
        index: _api_root + "address/index",
        add: _api_root + "address/add",
        set_default: _api_root + "address/set_default",
        delete: _api_root + "address/delete",
        details: _api_root + "address/details",
        update: _api_root + "address/update",
        get_rule: _api_root + "address/get_rule"
    },
    label: {
        index: _api_root + "label/index",
        add: _api_root + "label/add",
        delete: _api_root + "label/delete"
    },
    coupon: {
        index: _api_root + "coupon/index",
        receive: _api_root + "coupon/receive",
        my_coupon: _api_root + "coupon/my_coupon",
        forward: _api_root + "coupon/forward"
    },
    payment: {
        recharge: _api_root + "payment/recharge",
        deliver: _api_root + "payment/deliver",
        givepay: _api_root + "payment/givepay",
        linePay: _api_root + "payment/linePay",
        paypromiseMoney: _api_root + "payment/paypromiseMoney",
        DrivePay: _api_root + "payment/DrivePay",
        agencyPay: _api_root + "payment/agencyPay",
        HomeWorkPay: _api_root + "payment/HomeWorkPay",
        otherPay: _api_root + "payment/otherPay",
        payVip: _api_root + "payment/payVip",
        getGoodsPay: _api_root + "payment/getGoodsPay"
    },
    wallet: {
        user: _api_root + "wallet/user",
        index: _api_root + "coupon/index",
        receive: _api_root + "coupon/receive",
        my_coupon: _api_root + "coupon/my_coupon",
        bankcard: _api_root + "wallet/bankcard",
        bankList: _api_root + "wallet/bankList",
        bankadd: _api_root + "wallet/bankadd",
        delete: _api_root + "wallet/delete",
        set_default: _api_root + "wallet/set_default",
        details: _api_root + "wallet/details"
    },
    withdraw: {
        bank: _api_root + "withdraw/bank",
        alipay: _api_root + "withdraw/alipay",
        wx: _api_root + "withdraw/wx"
    },
    store: {
        getPromiseMoney: _api_root + "store/getPromiseMoney",
        getTime: _api_root + "store/getTime"
    },
    order: {
        HeJiangOrder: _api_root + "module_api/HeJiangOrder",
        sumbit_ShenHe: _api_root + "module_api/sumbitShenHe",
        YesJoint: _api_root + "module_api/yesJoint",
        upload: _api_root + "order/upload",
        getDeliverRules: _api_root + "order/getDeliverRules",
        getGiveRules: _api_root + "order/getGiveRules",
        surcharge: _api_root + "order/surcharge",
        getLineRules: _api_root + "order/getLineRules",
        linePay: _api_root + "order/linePay",
        getUserOrderList: _api_root + "order/getUserOrderList",
        getDriveRules: _api_root + "order/getDriveRules",
        getHomeWorkRules: _api_root + "order/getHomeWorkRules",
        getAgencyRules: _api_root + "order/getAgencyRules",
        getgoodsrules: _api_root + "order/getgoodsrules",
        orderDel: _api_root + "order/orderDel",
        orderDun: _api_root + "order/orderDun",
        getUserOrderOne: _api_root + "order/getUserOrderOne",
        userconfirm: _api_root + "order/userconfirm",
        feedback: _api_root + "order/feedback",
        surcharge_purchase: _api_root + "order/surcharge_purchase",
        surcharge_getgoods: _api_root + "order/surcharge_getgoods",
        surcharge_line: _api_root + "order/surcharge_line"
    },
    runner_order: {
        getRunnerOrderList: _api_root + "runner_order/getRunnerOrderList",
        receipt: _api_root + "runner_order/receipt",
        orderToGet: _api_root + "runner_order/orderToGet",
        isService: _api_root + "runner_order/isService",
        feedback: _api_root + "runner_order/feedback",
        getRunnerOrderOne: _api_root + "runner_order/getRunnerOrderOne"
    },
    runner_withdraw: _defineProperty({
        bank: _api_root + "runner_withdraw/bank",
        alipay: _api_root + "runner_withdraw/alipay",
        wx: _api_root + "runner_withdraw/wx"
    }, "alipay", _api_root + "runner_withdraw/alipay"),
    location: {
        checkArea: _api_root + "location/checkArea"
    },
    count: {
        countOrder: _api_root + "count/countOrder"
    },
    platform: {
        plug: _api_root + "platform/plug"
    }
};
 module.exports = api;