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
    dData: {},
    subkey: '66IBZ-RQRKV-25IPI-UMF6H-S2XSJ-KCFRO',
    page: 1,
    pageSize: 10,
    projectdyc: [],
    memberArr: [],
    // height: 0, // scroll-wrap 的高度，这个高度是固定的
    // inner_height: 0, // inner-wrap 的高度，这个高度是动态的
    // scroll_top: 0, // 滚动到位置。
    // start_scroll: 0, // 滚动前的位置。
    // touch_down: 0 // 触摸时候的 Y 的位置
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self = this;
    // wx.createSelectorQuery().select('#scroll-wrap').boundingClientRect(function (rect) {
    //   self.setData({
    //     height: rect.height
    //   });
    // }).exec();
    this.data.id = options.id;
    this.getCurrentLL();
    this.getDetailData(this.data.id);
    this.getProjectData(1, this.data.pageSize, this.data.id);
    this.getMemberArr();
    let invte_user_code = decodeURIComponent(options.user_code);
    if (invte_user_code) {
      wx.setStorageSync('invte_user_code', invte_user_code);
    }
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
   * 获取动态
   */
  getProjectData: function (page, pageSize, itemId) {
    detail.projectData(page, pageSize, itemId, (data) => {
      let projectdyc = this.data.projectdyc;
      if(page > 1) {
        if (data.records.length > 0) {
          data.records.forEach(item =>{
            projectdyc.push(item)
          })
        }
      } else {
        projectdyc = data.records
      }
      this.setData({
        projectdyc: projectdyc
      })
    })
  },
  bindscrolltolower: function() {
    this.data.page++;
    this.getProjectData(this.data.page, this.data.pageSize, this.data.id);
  },
  // start: 触摸开始
  start_fn: function(e) {
    let self = this;
    let touch_down = e.touches[0].clientY;
    this.setData({
      touch_down: touch_down
    });
    // 获取 inner-wrap 的高度
    wx.createSelectorQuery().select('#inner-wrap').boundingClientRect(function (rect) {
      self.setData({
        inner_height: rect.height
      });
    }).exec();
    // 获取 scroll-wrap 的高度和当前的 scrollTop 位置
    wx.createSelectorQuery().select('#scroll-wrap').fields({
      scrollOffset: true,
      size: true
    }, function (rect) {
      self.setData({
        start_scroll: rect.scrollTop,
        height: rect.height
      })
    }).exec();
  },
  // start： 触摸结束
  end_fn(e) {
    let current_y = e.changedTouches[0].clientY;
    let self = this;
    let { start_scroll, inner_height, height, touch_down } = this.data;
    /**
     * 1、下拉刷新
     * 2、上拉加载
     */
    if (current_y > touch_down && current_y - touch_down > 20 && start_scroll == 0) {
    // 下拉刷新 的请求和逻辑处理等

    } else if (current_y < touch_down && touch_down - current_y >= 20 && inner_height - height == start_scroll) {
    // 上拉加载 的请求和逻辑处理等
    }
  },
  /**
   * 获取人员
   */
  getMemberArr: function() {
    detail.memberData((data) => {
      this.setData({
        memberArr: data.records
      })
    })
  },
  /**
   * 打电话
   */
  freeTap: function(e) {
    let item = e.currentTarget.dataset.item;
    wx.makePhoneCall({
      phoneNumber: item.phone,
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
      key: this.data.subkey
    });
    // this.mapCtx = wx.createMapContext('myMap');
    // 腾讯地图调用接口  
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {
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
      },
      complete: function (res) {
      }
    });
  },
  clickShow: function () {
    this.showBottom.showModal()
  },
  cancelPopuTap: function() {
    this.showBottom.hideModal();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.showBottom = this.selectComponent('#showBottom');

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
      path = '/pages/detail/detail?user_code=' + user_code;
    } else {
      path = '/pages/detail/detail';
    }
    return {
      title: '佰家房产超市',
      path: path,
      imageUrl: 'https://baijia-1301025608.cos.ap-shanghai.myqcloud.com/dbd702fd793044ca9a622e9ce98992b4.jpg'
    }
  }
})