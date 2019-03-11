// sd_liferuning/pages/constmer/part-time-jobs-detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jobType:['现场结','日结','次日结','周结','月结'],
    jobCount:['元/小时','元/天','元/周','元/月'],
    hideBtn:true
  },
  enrollThis:function(){
    var t = this;

    wx.showModal({
      title: '提示',
      content: '您是否确认报名该兼职?',
      success: function (res) {
        if (res.confirm) {
    if (wx.getStorageSync('myuserid')) {
    var reqData={
      task:'enroll',
      userId: wx.getStorageSync('myuserid'),
      jobId: t.data.thisJobId
    };
    wx.request({
      method: 'POST',
      url: 'https://wn.meripet.cn/addons/sd_135K/core/app/home/controller/pj/getJobsDetail.php',
      header: {
        'content-type': "application/x-www-form-urlencoded;charset=UTF-8"
      },
      data: reqData,
      success: function (re) {
        if(re.data.code==404){
          wx.showModal({
            title: '提示',
            content: re.data.msg,
            showCancel: false,
            success: function () {}
          }) 
        }else{
          wx.showToast({
            title: '报名成功',
            icon: 'success',
            duration: 2000
          })
          t.setData({
            enrolled:1
          })
        }
      }, fail: function () {
        wx.showToast({
          title: '报名失败',
          icon: 'fail',
          duration: 2000
        })
      }
    })
    }else{
      wx.showModal({
        title: '提示',
        content: '请先填写基本信息',
        showCancel: false,
        success: function () {
          wx.redirectTo({
            url: '/sd_liferuning/pages/constmer/part-time-jobs-user/index',
          })
        }
      })   
    }
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var t = this;
    if(options.page == 'enrolled'){
      t.setData({
        hideBtn:false
      })
    }
    if (options.jobid) {
      t.setData({
        thisJobId: options.jobid
      })

      if (wx.getStorageSync('myuserid')) {
        var reqData = {
          task: 'detail',
          jobId: options.jobid,
          userId: wx.getStorageSync('myuserid')
        };
      }else{
        var reqData = {
          task: 'detail',
          jobId: options.jobid,
          userId: ''
        };
      }


      
      wx.request({
        method: 'POST',
        url: 'https://wn.meripet.cn/addons/sd_135K/core/app/home/controller/pj/getJobsDetail.php',
        header: {
          'content-type': "application/x-www-form-urlencoded;charset=UTF-8"
        },
        data: reqData,
        success: function (re) {
          t.setData({
            job: re.data[0]
          })
          if(re.data[0].enrolled){
            for (var i = 0; i < re.data[0].enrolled.length;i++){
              if (re.data[0].enrolled[i].jobid==options.jobid){
                t.setData({
                  enrolled:1
                })
              }
            }
          }
        }, fail: function () {

        }
      })
    } else {
      console.log("信息获取失败");
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})