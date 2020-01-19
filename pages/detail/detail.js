// pages/detail/detail.js
import { Detail } from './detail-model.js';
let QQMapWX = require('../../utils/qqmap-wx-jssdk/qqmap-wx-jssdk.min.js');
let qqmapsdk;
let detail = new Detail();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showIcon: true,
    loadingHidden: true,
    title: '房源详情',
    indicatorDots: true,
    bannerAutoplay: true,
    markers: [],
    scale: 15,
    circular: true,
    interval: 5000,
    duration: 500,
    current: 0,
    hcurrent: 0,
    slider: [],
    hslider: [],
    dData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.id = options.id
    // this.getCurrentLL()
    this.getDetailData(this.data.id)
  },
  // 顶部
  swiperBannerChange: function (e) {
    this.setData({
      current: e.detail.current,
    })
  },
  // 户型
  swiperChange: function (e) {
    this.setData({
      hcurrent: e.detail.current,
    })
  },
  /**
   * 获取详情信息
   */
  getDetailData: function(id) {
    detail.detailData(id, (data) => {
      // console.log(data)
      // 顶部轮播图
      let slider = data.itemImagesEntity.xgImages.split(',');
      // console.log(slider)
      // 户型轮播
      let hslider = data.itemImagesEntity.hxImages.split(',');
      this.setData({
        dData: data.itemBaseEntity,
        slider: slider,
        hslider: hslider,
        markers: [{
          id: 0,
          longitude: data.itemBaseEntity.longitude,
          latitude: data.itemBaseEntity.latitude,
          title: data.itemBaseEntity.itemAddress,
          iconPath: '/images/common/map_icon.png',
          width: 25,
          height: 25
        }]
      })
    })
  },
  /**
   * 预览图片
   */
  previewImage: function(e) {
    const current = e.target.dataset.src;
    wx.previewImage({
      current,
      urls: this.data.slider
    })
  },
  previewImageTwo: function (e) {
    const current = e.target.dataset.src;
    wx.previewImage({
      current,
      urls: this.data.hslider
    })
  },
  /**
   * 获取当前位置
   */
  getCurrentLL:function() {
    let self = this
    wx.getLocation({
      success: function (res) {
        console.log(res)
        self.setData({
          longitude: res.longitude,
          latitude: res.latitude
        })
        self.showAddress(res.longitude, res.latitude);
      },
      cancel: function (res) {
        alert('对不起,请允许获取您的地理位置');
        wx.closeWindow();
      },
      fail: function (res) {
        alert('系统检测到微信没有获取位置权限,请先开启再来哦')
      }
    })
  },
  /**
   * 地图图标
   */
  showAddress: function (longitude, latitude) {
    let self = this;
    // 实例化腾讯地图API核心类  
    qqmapsdk = new QQMapWX({
      key: '5MUBZ-PKSK3-BXL3V-36KSL-UNWCJ-32FL4'
    });
    // this.mapCtx = wx.createMapContext('myMap');
    // 腾讯地图调用接口  
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {
        console.log(res)
        self.setData({
          markers: [{
            id: 0,
            longitude: res.result.location.lng,
            latitude: res.result.location.lat,
            title: res.result.address,
            iconPath: '/images/common/map_icon.png',
            width: 25,
            height: 25
          }]
        })
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
      }
    });
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