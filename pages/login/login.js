// pages/login/login.js
import { Login } from './login-model.js';

let login = new Login();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showIcon: true,
    loadingHidden: true,
    current: 0,
    isPhone: false,
    session_key: '',
    noPhone: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {

        } else {
          // 用户没有授权
          // console.log("点击了拒绝授权")
        }
      }
    })
  },
  goLoginPhone: function() {
    wx.navigateTo({
      url: './phone/phone',
    })
  },
  cancelTap: function() {
    this.setData({
      noPhone: false
    })
  },
  bindGetUserInfo(res) {
    var that = this;
    if (res.detail.userInfo) {
      // console.log("点击了同意授权");
      wx.login({
        success: function (e) {
          login.getCode(res, e, (data) => {
            if (data.data.sessionKey) {
              that.setData({
                noPhone: true,
                session_key: data.data.sessionKey
              })
            } else {
              const  loginToken = JSON.parse(data.data).token;
              wx.setStorageSync('loginToken', loginToken);
              wx.switchTab({
                url: '../my/my',
              })
            }
          })
        }
      })
    } else {
      // console.log("点击了拒绝授权");
    }
  }, 
  /**
   * 登录
   */
  getPhoneNumber: function (e) {
    let that = this;

    if (e.detail.errMsg !== "getPhoneNumber:ok") {
      return;
    }

    wx.showLoading({
      mask: true,
    })

    // 检查登录态是否过期
    wx.checkSession({
      success(res) {
        // session_key 未过期，并且在本生命周期一直有效
        login.getPhone(e, that.data.session_key, (data) => {
          const loginToken = JSON.parse(data.data).token;
          wx.setStorageSync('loginToken', loginToken);
          wx.switchTab({
            url: '../my/my',
          })
        });
      },
      fail(err) {
        // session_key 已经失效，需要重新执行登录流程
        wx.login({
          success: res => {
            that.data.code = res.code
          }
        })
      }
    })
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