// pages/earn/earn.js
import { Earn } from './earn-model.js';
let earn = new Earn();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showIcon: true,
    loadingHidden: true,
    title: '赚取佣金',
    earnArr: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getEarnData();
    let invte_user_code = decodeURIComponent(options.user_code);
    if (invte_user_code) {
      wx.setStorageSync('invte_user_code', invte_user_code);
    }
  },
  getEarnData: function() {
    const obj = {
      page: 1,
      pageSize: 100
    }
    earn.earnData(obj, (data) => {
      this.setData({
        earnArr: data.records
      })
    })
  },
  goEarnTap: function() {
    wx.switchTab({
      url: '../recommend/recommend',
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
    let path;
    let loginToken = wx.getStorageSync('loginToken');
    let user_code = wx.getStorageSync('loginUser').userCode;
    if (loginToken) {
      path = '/pages/earn/earn?user_code=' + user_code;
    } else {
      path = '/pages/earn/earn';
    }
    return {
      title: '佰家房产超市',
      path: path,
      imageUrl: 'https://baijia-1301025608.cos.ap-shanghai.myqcloud.com/dbd702fd793044ca9a622e9ce98992b4.jpg'
    }
  }
})