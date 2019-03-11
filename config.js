var imgurl = "https://choarenpaotui.oss-cn-beijing.aliyuncs.com/paotuixcx/images/";

module.exports = {
    actions: [ {
        name: "微信支付",
        subname: "使用微信官方支付方式",
        img: imgurl + "wx_payment.png",
        className: "action-class",
        loading: !1
    }, {
        name: "余额支付",
        subname: "使用平台账户余额支付",
        img: imgurl + "yue_payment.png",
        className: "action-class",
        loading: !1
    } ],
    extract: [ 
  //  {
  //       name: "提现到支付宝",
  //       subname: "提现到支付宝余额中",
  //       img: imgurl + "icon_1.png",
  //       className: "action-class",
  //       loading: !1
  //   },
  {
        name: "提现到余额",
        subname: "提现到微信余额中",
        img: imgurl + "icon_2.png",
        className: "action-class",
        loading: !1
    } ]
};