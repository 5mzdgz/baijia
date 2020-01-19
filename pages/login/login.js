// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showIcon: true,
    loadingHidden: true,
    current: 0,
    isPhone: false,
    loginNav: ['登录','注册'],
    code: ''
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
  bindGetUserInfo(res) {
    var that = this;
    console.log(res)
    if (res.detail.userInfo) {
      //console.log("点击了同意授权");
      wx.login({
        success: function (e) {
          console.log(e);
          if (e.code) {
            that.setData({
              code: e.code
            })
          } else {
            // console.log("授权失败");
          }
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
    // console.log(e);

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
        // console.log(res);
        wx.request({
          url: 'http://192.168.1.30:8989/user/wxlogin',
          method: 'POST',
          data: {
            code: that.data.code,
            encryptedData: e.detail.encryptedData,
            iv: e.detail.iv,
            rawData: e.detail.rawData,
            signature: e.detail.signature
          },
          success: function (res) {
            console.log(res)
          },
          fail: res => {

            wx.showToast({
              icon: "none",
              title: '服务器繁忙',
            })
          },
          complete: res => {
            wx.hideLoading();
          }
        })
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
  // getPhoneNumber: function (e) {
  //   var that = this;
  //   wx.login({
  //     success: res => {
  //       wx.request({
  //         url: 'http://192.168.1.30:8989/user/wxlogin',
  //         method: 'POST',
  //         data: {
  //           code: e.code,
  //           encryptedData: res.detail.encryptedData,
  //           iv: res.detail.iv,
  //           rawData: res.detail.rawData,
  //           signature: res.detail.signature
  //         },
  //         success: function (res) {
  //           console.log(res)
  //         }
  //       })
  //     }
  //   })
  // },
  /**
   * 切换登录，注册
   */
  checkedNav: function(e) {
    const index = e.currentTarget.dataset.index;
    if (index) {
      this.setData({
        current: e.currentTarget.dataset.index,
        isPhone: true
      })
    } else {
      this.setData({
        current: e.currentTarget.dataset.index,
        isPhone: false
      })
    }
  },
  /**
   * 提交
   */
  saveTap: function(e) {

  },
  /**
   * 显示手机登录
   */
  isPhoneTap: function() {
    this.setData({
      isPhone: true
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