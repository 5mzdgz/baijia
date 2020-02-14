// pages/recommend/recommend.js
import { Recommend } from './recommend-model.js';
let recommend = new Recommend();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showIcon: true,
    loadingHidden: true,
    items: [
      { sexid: 1, value: '男' },
      { sexid: 2, value: '女' },
    ],
    sex: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  radioChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      sex: e.detail.value
    })
  },
  saveRecommendTap: function(e) {
    console.log(e.detail)
    const obj = {
      customerName: e.detail.value.customerName,
      customerPhone: e.detail.value.customerPhone,
      sex: this.data.sex,
      recommendName: e.detail.value.recommendName,
      recommendPhone: e.detail.value.recommendPhone,
      orderTime: e.detail.value.orderTime,
      itemId: 2,
      descr: e.detail.value.descr,
    };
    recommend.recommendSave(obj, (data) => {
      console.log(data)
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