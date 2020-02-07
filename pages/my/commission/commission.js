// pages/my/commission/commission.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showIcon: true,
    loadingHidden: true,
    viewData: {},
    commissionData: {
      myName: '我的佣金',
      imgUrl: '/images/common/my_commission.png',
      totalName: '佣金总额',
      noPayName: '待结算佣金',
      payName:'已结算佣金',
      totalCommission: 88888,
      noPayCommission: 88888,
      payCommission: 88888,
      util: '元'
    },
    customers: {
      myName: '我的客户',
      imgUrl: '/images/common/customer.png',
      totalName: '报备客户',
      noPayName: '到访客户',
      payName: '成交客户',
      totalCommission: 8,
      noPayCommission: 8,
      payCommission: 8,
      util: '组'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const flag = parseInt(options.flag);
    
    if (flag === 1) {
      this.setData({
        viewData: this.data.customers
      })
    } else {
      this.setData({
        viewData: this.data.commissionData
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