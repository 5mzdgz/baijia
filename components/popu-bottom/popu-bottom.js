// components/popu-bottom.js
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    animationData: {},
    showPop: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 显示底部弹层
    showModal: function () {
      var _this = this;
      var animation = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease',
        delay: 0
      })
      _this.animation = animation
      animation.translateY(300).step()
      _this.setData({
        animationData: animation.export(),
        showPop: true
      })
      setTimeout(function () {
        animation.translateY(0).step()
        _this.setData({
          animationData: animation.export()
        })
      }.bind(_this), 50)
    },
    // 隐藏底部弹层
    hideModal: function () {
      var _this = this;
      // 隐藏遮罩层
      var animation = wx.createAnimation({
        duration: 500,
        timingFunction: "ease",
        delay: 0
      })
      _this.animation = animation
      animation.translateY(300).step()
      _this.setData({
        animationData: animation.export(),
      })
      setTimeout(function () {
        animation.translateY(0).step()
        _this.setData({
          animationData: animation.export(),
          showPop: false
        })
      }.bind(this), 200)
    }
  }
})
