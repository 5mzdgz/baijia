// pages/recommend/recommend.js
import { Recommend } from './recommend-model.js';
import { My } from '../my/my-model.js';
let my = new My();
let recommend = new Recommend();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showIcon: true,
    loadingHidden: true,
    recommendPhone: '',
    items: [
      { sexid: 1, value: '男' },
      { sexid: 2, value: '女' },
    ],
    sex: null,
    cursor: 140,
    recommendArr: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let recommendPhone = wx.getStorageSync('loginUser').phone;
    this.setData({
      recommendPhone: recommendPhone
    })
  },
  goResidenceTap: function() {
    wx.navigateTo({
      url: '../residence/residence?flag=1',
    })
  },
  textNumTap: function(e) {
    this.setData({
      cursor: (140 - e.detail.cursor)
    })
  },
  radioChange: function (e) {
    this.setData({
      sex: e.detail.value
    })
  },
  saveRecommendTap: function(e) {
    if (!this.data.recommendArr.length) {
      wx.showToast({
        icon: 'none',
        title: '请选择意向楼盘',
      })
      return false;
    }
    const obj = {
      customerName: e.detail.value.customerName,
      customerPhone: e.detail.value.customerPhone,
      sex: this.data.sex,
      recommendName: e.detail.value.recommendName,
      recommendPhone: e.detail.value.recommendPhone,
      orderTime: e.detail.value.orderTime,
      itemId: this.data.recommendArr[0].itemId,
      descr: e.detail.value.descr,
    };

    for(let key in obj) {
      if (!obj[key]) {
        wx.showToast({
          icon: 'none',
          title: '请确保每一项都填写',
        })
        return false;
      }
    }

    recommend.recommendSave(obj, (data) => {
      wx.showModal({
        title: "",
        content: "推荐成功",
        showCancel: true,
        cancelText: "继续推荐",
        cancelColor: "#000",
        confirmText: "返回首页",
        confirmColor: "#0f0",
        success: function (res) {
          if (res.confirm) {
            wx.switchTab({
              url: '../home/home',
            })
          }
        }
      })
    })
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const loginToken = wx.getStorageSync('loginToken');
    if (loginToken) {
      my.userData((data) => {
        wx.setStorageSync('loginUser', data.loginUser);
      })
    } else {
      wx.navigateTo({
        url: '../login/login',
      })
    }
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