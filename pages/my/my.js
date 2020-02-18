// pages/my/my.js
import { My } from './my-model.js';
import { Config } from '../../utils/config.js'
let my = new My();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showIcon: false,
    loadingHidden: true,
    items: [
      { id: 1, name: '我要推荐', imgUrl: '/images/common/my_recommend.png' },
      { id: 2, name: '我的客户', imgUrl: '/images/common/customer.png' },
      { id: 3, name: '我的佣金', imgUrl: '/images/common/my_commission.png' },
      { id: 4, name: '活动规则', imgUrl: '/images/common/activitiy.png' }
    ],
    loginUser: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  freeTell: function() {
    wx.makePhoneCall({
      phoneNumber: '0775-4582880',
    })
  },
  goLoginTap: function() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  nickNameTap: function() {
    wx.navigateTo({
      url: './nickname/nickname?nickName=' + this.data.loginUser.nickName + '&userId=' + this.data.loginUser.userId,
    })
  },
  changeHead: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        console.log(res)
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
        console.log(res)
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
  downlogin: function() {
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
            url: '../login/login',
          })
        }
      }
    })
  },
  /**
   * 页面跳转
   */
  setItemClick: function(e) {
    const index = e.currentTarget.dataset.index;
    
    if (index === 0) {
      wx.switchTab({
        url: '/pages/recommend/recommend',
      })
    }

    if (index === 1) {
      wx.navigateTo({
        url: './commission/commission?flag=1',
      })
    }

    if (index === 2) {
      wx.navigateTo({
        url: './commission/commission?flag=2',
      })
    }

    if (index === 3) {
      wx.navigateTo({
        url: './cluse/cluse',
      })
    }
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
        this.setData({
          loginUser: data.loginUser,
          loginToken: loginToken
        })
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