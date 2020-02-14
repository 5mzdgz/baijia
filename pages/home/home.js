// pages/home/home.js
import { Home } from './home-model.js';
let home = new Home();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showIcon: false,
    loadingHidden: true,
    indicatorDots: true,
    bannerAutoplay: true,
    circular: true,
    interval: 5000,
    duration: 500,
    current: 0,
    slider: [
      { imgUrl: '/images/home/home_banner.png' }
    ],
    buyArr: [
      { imgUrl: '/images/home/residence.png', name: '住宅', ename: 'RESIDENCE' },
      { imgUrl: '/images/home/shops.png', name: '商铺', ename: 'SHOPS' },
      { imgUrl: '/images/home/villa.png', name: '院墅', ename: 'COURTYARD' },
      { imgUrl: '/images/home/reward.png', name: '物业投资', ename: 'INTRODUCING REWARDS' },
      { imgUrl: '/images/common/earn_commission.png', name: '赚取佣金', ename: '' },
      { imgUrl: '/images/common/logo_1.png', name: '平台介绍', ename: '' },
    ],
    recommendArr: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRecommendData(1, 10);
  },
  swiperBannerChange: function (e) {
    this.setData({
      current: e.detail.current,
    })
  },
  /**
   * 住宅
   */
  residenceTap: function(e) {
    const index = e.currentTarget.dataset.index;
    if (index < 3) {
      wx.navigateTo({
        url: '../residence/residence',
      })
    }
    if (index === 4) {
      wx.navigateTo({
        url: '../earn/earn',
      })
    }
    if (index === 5) {
      wx.navigateTo({
        url: '../my/about/about',
      })
    }
  },
  /**
   * 详情页
   */
  detailTap: function (e) {
    const item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '../detail/detail?id=' + item.itemId,
    })
  },
  /**
   * 搜索页
   */
  searchTap: function() {
    wx.navigateTo({
      url: '../residence/residence',
    })
  },
  navitoTap: function() {
    wx.switchTab({
      url: '../recommend/recommend',
    })
  },
  /**
   * 获取热门推荐
   */
  getRecommendData: function(page, pageSize) {
    home.recommendData(page, pageSize, (data) => {
      this.setData({
        recommendArr: data
      })
    })
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