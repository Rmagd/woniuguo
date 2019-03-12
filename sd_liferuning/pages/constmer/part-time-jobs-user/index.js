// sd_liferuning/pages/constmer/part-time-jobs-user/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    school: [
      "华南理工大学",
      "广东工业大学",
      "广州美术学院",
      "广州大学",
      "中山大学",
      "华南师范大学",
      "星海音乐学院",
      "广东药科大学",
      "广州中医药大学",
      "广东外语外贸大学"],
      height:140,
    preUrl: "https://wn.meripet.cn/addons/sd_135K/core/public/WeChat/resource/common/image/ptj",
    meColor: 'color:#20ad20'      
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var pages = getCurrentPages() //获取加载的页面
    var currentPage = pages[pages.length - 1] //获取当前页面的对象
    this.setData({
      currentPage: currentPage.route,//当前页面url
    })
    
    this.setData({
      userinfo: wx.getStorageSync("user"),
      schoolNum:wx.getStorageSync("school")
    });
    if (wx.getStorageSync('myuserid')){
      var reqData = {
        task:'getuser',
        userid: wx.getStorageSync('myuserid')
      };
      var t = this;
      wx.request({
        method: 'POST',
        url: 'https://wn.meripet.cn/addons/sd_135K/core/app/home/controller/pj/submitUser.php',
        header: {
          'content-type': "application/x-www-form-urlencoded;charset=UTF-8"
        },
        data: reqData,
        success: function (re) {
          t.setData({
            username:re.data[0].name,
            phone:re.data[0].phone,
            height: re.data[0].height,
          });
        }, fail: function () {

        }
      })
    }
  },
  usernameInput:function(e){
    this.setData({
      username:e.detail.value
    })
  },
  phoneInput:function(e){
    this.setData({
      phone: e.detail.value
    })
     },
  slider4change:function(e){
    this.setData({
      height:e.detail.value
    })
    console.log(this.data.height);
  },
  submitInfo:function(){
    var t = this;
    if (t.data.username == null || t.data.username == "" || t.data.phone == null || t.data.phone == ""){
        wx.showModal({
          title: '请填写完整信息',
          content: '姓名和手机必填哦！',
          showCancel:false,
          success: function (res) {
              console.log('点击确认回调');
          }
        })
    } else if (!(/^1[34578]\d{9}$/.test(t.data.phone))){
     wx.showToast({
       title: '请输入正确的手机号',
     })
     return;
      }else{
      if (wx.getStorageSync('myuserid')){
        var t = this;
        var reqData = {
          task:'updateuser',
          userid: wx.getStorageSync('myuserid'),
          school: this.data.schoolNum,
          name: this.data.username,
          phone: this.data.phone,
          gender: this.data.userinfo.sex,
          avatar: this.data.userinfo.avatar_url,
          height: this.data.height
        };
        var toast = '更新成功!';
      }else{
        var reqData = {
          task:'insertuser',
          school: this.data.schoolNum,
          name: this.data.username,
          phone: this.data.phone,
          gender: this.data.userinfo.sex,
          avatar: this.data.userinfo.avatar_url,
          height: this.data.height
        };
        var toast='保存成功!';
      }
       
      wx.request({
        method: 'POST',
        url: 'https://wn.meripet.cn/addons/sd_135K/core/app/home/controller/pj/submitUser.php',
        header: {
          'content-type': "application/x-www-form-urlencoded;charset=UTF-8"
        },
        data: reqData,
        success: function (re) {
          wx.setStorageSync('myuserid',re.data.userid);
          if(re.data.msg==200){
          wx.showModal({
            title: '成功',
            content: toast,
            showCancel:false,
            success: function () {
              wx.redirectTo({
                url: '/sd_liferuning/pages/constmer/part-time-jobs-list/index',
              })
            }
          })}else{
            wx.showToast({
              title: '失败!',
              icon:'none'
            })
          }     
        }, fail: function () {
          wx.showToast({
            title: '失败!',
            icon: 'none'
          })
        }
      })
      }
  },
  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})