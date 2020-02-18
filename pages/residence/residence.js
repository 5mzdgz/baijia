import { Residence } from './residence-model.js';
let residence = new Residence();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showIcon: true,
    loadingHidden: true,
    noData: false,
    navTitle: '搜索',
    navArr: [
      { navName: '区域', checked: false, searchData: [] },
      { navName: '价格', checked: false, searchData: [] },
      { navName: '类型', checked: false, searchData: [] },
      { navName: '更多', checked: false, searchData: [] }
    ],
    searchData: {},
    selected: -1,
    obj: {
      page: 1,
      pageSize: 10
    },
    recommendArr: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSeacrhArr()
    if (options.flag) {
      let flag = parseInt(options.flag);
      this.data.flag = flag
    }
    if (options.type) {
      this.data.obj['type'] = options.type
      this.setData({
        navTitle: options.type
      })
    } else {
      this.data.obj['area'] = '不限';
    }
    this.getNameSaerchArr(this.data.obj);
  },
  /**
   * 查询
   */
  nameSaerchData: function(e) {
    this.setData({
      recommendArr: []
    })
    let obj = this.data.obj;
    obj['name'] = e.detail.value
    this.getNameSaerchArr(obj);
  },
  getNameSaerchArr: function (obj) {
    residence.nameSaerch(obj, (data) => {
      // console.log(data);
      let recommendArr = this.data.recommendArr;
      if (obj.page > 1) {
        if (data.records.length > 0) {
          data.records.forEach(item => {
            recommendArr.push(item);
          })
        } else {
          this.setData({
            noData: true
          })
        }
      } else {
        recommendArr = data.records
      }
      this.setData({
        recommendArr: recommendArr,
      })
    })
  },
  /**
   * 选择类型，小项
   */
  navItemTap: function(e) {
    this.setData({
      recommendArr: []
    })
    let navArr = this.data.navArr;
    let index = e.currentTarget.dataset.index;
    if (index === 0) {
      navArr[this.data.selected].checked = false
    } else {
      navArr[this.data.selected].checked = true
    }
    navArr[this.data.selected].searchData.forEach(item => {
      item.checked = false
    })
    navArr[this.data.selected].searchData[index].checked = true

    let area, type, price;
    let obj = this.data.obj;
    if (this.data.selected === 0) {
      obj['area'] = navArr[0].searchData[index].descr
    }
    if (this.data.selected === 1) {
      obj['price'] = navArr[1].searchData[index].descr
    }
    if (this.data.selected === 2) {
      obj['type'] = navArr[2].searchData[index].descr
    }
    // if (this.data.selected === 3) {
    //   type = navArr[3].searchData[index].descr
    // }
  
    this.getNameSaerchArr(obj);

    this.setData({
      navArr: navArr,
      selected: -1
    })
  },
  /**
   * 选择区域，价格，类型，更多
   */
  selectedTap: function(e) {
    let navArr = this.data.navArr;
    let index = e.currentTarget.dataset.index;

    this.setData({
      searchData: navArr[index].searchData,
      selected: index
    })
  },
  /**
   * 获取条件列表
   */
  getSeacrhArr: function() {
    residence.searchData((data) => {
      // console.log(data)
      let navArr = this.data.navArr
      data.forEach(item => {
        if (item.searchType === 1){
          navArr[0].searchData.push(item)
        }
        if (item.searchType === 2) {
          navArr[1].searchData.push(item)
        }
        if (item.searchType === 3) {
          navArr[2].searchData.push(item)
        }
        if (item.searchType === 4) {
          navArr[3].searchData.push(item)
        }
      })
      this.setData({
        navArr: navArr
      })
    })
  },
  /**
   * 隐藏
   */
  hidePopuTap: function() {
    this.setData({
      selected: -1
    })
  },

  /**
   * 详情页
   */
  detailTap: function (e) {
    let item = e.currentTarget.dataset.item;
    let recommendArr = []
    recommendArr.push(item);
   if (this.data.flag) {
     var pages = getCurrentPages();
     var prevPage = pages[pages.length - 2];
     prevPage.setData({
       recommendArr: recommendArr
     })
     //console.log(prevPage.data.cpList);
     // 获取地址id回传到确认订单页
     wx.navigateBack({
       delta: 1
     })
   } else {
     wx.navigateTo({
       url: '../detail/detail?id=' + item.itemId,
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
    this.getSeacrhArr();
    this.getNameSaerchArr(this.data.obj);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (!this.data.noData) {
      this.data.obj.page++;
      this.getNameSaerchArr(this.data.obj);
    } 
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})