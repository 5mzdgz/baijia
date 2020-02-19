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
    recommendArr: [],
    page: 1,
    pageSize: 10,
    noData: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRecommendData(1, 10);
    // 分享邀请
    let invte_user_code = decodeURIComponent(options.user_code);
    if (invte_user_code) {
      wx.setStorageSync('invte_user_code', invte_user_code);
    }
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
    const item = e.currentTarget.dataset.item;
    switch (item.name) {
      case '住宅':
        wx.navigateTo({
          url: '../residence/residence?type=' + item.name,
        })
        break;
      case '商铺':
        wx.navigateTo({
          url: '../residence/residence?type=' + item.name,
        })
      break;
      case '院墅':
        wx.navigateTo({
          url: '../residence/residence?type=' + item.name,
        })
        break;
      case '物业投资':
        wx.navigateTo({
          url: '../residence/residence?type=' + item.name,
        })
        break;
      case '赚取佣金':
        wx.navigateTo({
          url: '../earn/earn',
        })
        break;
      default:
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
      let recommendArr = this.data.recommendArr;
      if (page > 1) {
        if(data.length > 0) {
          data.forEach(item => {
            recommendArr.push(item)
          })
        } else {
          this.setData({
            noData: true
          })
        }
      } else {
        recommendArr = data
      }
      this.setData({
        recommendArr: recommendArr
      });
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
    this.setData({
      page: 1
    });
    this.getRecommendData(1, this.data.pageSize);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(!this.data.noData) {
      this.data.page++;
      this.getRecommendData(this.data.page, this.data.pageSize);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let path;
    let loginToken = wx.getStorageSync('loginToken');
    let user_code = wx.getStorageSync('loginUser').userCode;
    if (loginToken) {
      path = '/pages/home/home?user_code=' + user_code;
    } else {
      path = '/pages/home/home';
    }
    return {
      title: '佰家房产超市',
      path: path,
      imageUrl: 'https://baijia-1301025608.cos.ap-shanghai.myqcloud.com/dbd702fd793044ca9a622e9ce98992b4.jpg'
    }
  }
})