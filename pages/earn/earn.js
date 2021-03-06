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

  }
})