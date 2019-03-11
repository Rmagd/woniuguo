// sd_liferuning/pages/constmer/part-time-jobs-list/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    jobType: ['现场结', '日结', '次日结', '周结', '月结'],
    jobCount: ['元/小时', '元/天', '元/周', '元/月']
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var t = this;
      wx.request({
        method: 'get',
        url: 'https://wn.meripet.cn/addons/sd_135K/core/app/home/controller/pj/getJobs.php',
        success:function(re){
          if(re.data){
          t.setData({
            jobs:re.data
          })
          }else{
            t.setData({
              empty:'没有兼职信息!'
            })
          }
        },error:function(){

        }
      })
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