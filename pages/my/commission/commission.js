// pages/my/commission/commission.js
import { My } from '../my-model.js';
import { Config } from '../../../utils/config.js'
let my = new My();
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
    const loginToken = wx.getStorageSync('loginToken');
    const loginUser = wx.getStorageSync('loginUser');
    this.setData({
      loginUser: loginUser,
      loginToken: loginToken
    })

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
  nickNameTap: function () {
    const loginUser = wx.getStorageSync('loginUser');
    wx.navigateTo({
      url: '../nickname/nickname?nickName=' + loginUser.nickName + '&userId=' + loginUser.userId,
    })
  },
  changeHead: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        that.updateImg(that, tempFilePaths)
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  updateImg: function (that, path) {
    let loginUser = this.data.loginUser;
    wx.showToast({
      icon: "loading",
      title: "正在上传"
    })
    wx.uploadFile({
      url: Config.restUrl + '/upload/userIcon',
      method: 'post',
      filePath: path[0],
      name: 'file',
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync('loginToken')
      },
      success: function (res) {
        if (res.statusCode != 200) {
          wx.showToast({
            icon: "loading",
            duration: 1000,
            title: "上传失败"
          })
        } else {
          const obj = {
            userId: loginUser.userId,
            icon: JSON.parse(res.data).date
          }
          my.avatarUrl(obj, (data) => {
            loginUser.icon = JSON.parse(res.data).date;
            //上传成功修改显示头像
            that.setData({
              loginUser: loginUser
            })
          })
        }
      },
      fail: function (e) {
        wx.showToast({
          icon: "loading",
          duration: 1000,
          title: "上传失败"
        })
      },
      complete: function () {
        wx.hideToast(); //隐藏Toast
      }
    })
  },
  downlogin: function () {
    wx.showModal({
      title: "温馨提示",
      content: "切换账号",
      showCancel: true,
      cancelText: "取消",
      cancelColor: "#000",
      confirmText: "确定",
      confirmColor: "#0f0",
      success: function (res) {
        if (res.confirm) {
          wx.removeStorageSync('loginToken');
          wx.navigateTo({
            url: '../../login/login',
          })
        }
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
    my.userData((data) => {
      wx.setStorageSync('loginUser', data.loginUser);
      this.setData({
        loginUser: data.loginUser,
      })
    })
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