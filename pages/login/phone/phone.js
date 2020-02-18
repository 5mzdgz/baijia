// pages/login/phone/phone.js
import { Phone } from './phone-model.js';
let phone = new Phone();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showIcon: true,
    loadingHidden: true,
    phone: '', //手机号
    codename: '获取验证码',
    disabled: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  getPhoneValue: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  //获取code
  getCode: function () {
    var ph = this.data.phone;
    
    var that = this;
    var myreg = /^1(3|4|5|6|7|8|9)\d{9}$/;
    if (this.data.phone == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (!myreg.test(ph)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else {
      var num = 61;
      var timer = setInterval(function () {
        num--;
        if (num <= 0) {
          clearInterval(timer);
          that.setData({
            codename: '重新发送',
            disabled: false
          })
        } else {
          that.setData({
            codename: num + "s",
            disabled: true
          })
        }
      }, 1000)
      phone.phoneCode(ph, (data) => {
        if (data.data != '发送成功') {
          wx.showToast({
            icon: 'none',
            title: '获取验证码失败',
          })
        }
      })
    }
  },
  //获取验证码
  getVerificationCode() {
    this.getCode();
  },

  phoneLoginTap: function(e) {
    let invte_user_code = wx.getStorageSync('invte_user_code');
    phone.phoneLogin(e.detail.value.phone, e.detail.value.code, invte_user_code, (data) => {
      const loginToken = JSON.parse(data.data).token;
      if (loginToken) {
        wx.setStorageSync('loginToken', loginToken);
        wx.navigateBack({//返回
          delta: 2
        })
      }
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