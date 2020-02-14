// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showIcon: false,
    loadingHidden: true,
    items: [
      { id: 1, name: '我要推荐', imgUrl: '/images/common/my_recommend.png' },
      { id: 2, name: '我的客户', imgUrl: '/images/common/customer.png' },
      { id: 3, name: '我的佣金', imgUrl: '/images/common/my_commission.png' },
      { id: 4, name: '活动规则', imgUrl: '/images/common/activitiy.png' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const loginToken = wx.getStorageSync('loginToken');
    this.setData({
      loginToken: loginToken
    })
  },
  freeTell: function() {
    wx.makePhoneCall({
      phoneNumber: '0775-4582880',
    })
  },
  goLoginTap: function() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  goAboutTap: function() {
    wx.navigateTo({
      url: './about/about',
    })
  },
  /**
   * 页面跳转
   */
  setItemClick: function(e) {
    const index = e.currentTarget.dataset.index;
    
    if (index === 0) {
      wx.switchTab({
        url: '/pages/recommend/recommend',
      })
    }

    if (index === 1) {
      wx.navigateTo({
        url: './commission/commission?flag=1',
      })
    }

    if (index === 2) {
      wx.navigateTo({
        url: './commission/commission?flag=2',
      })
    }

    if (index === 3) {
      wx.navigateTo({
        url: './cluse/cluse',
      })
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