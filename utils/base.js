import { Config } from './config.js';

class Base {
  constructor () {
    this.baseRestUrl = Config.restUrl
  }

  request(params, noRefetch) {
    var that = this,
      url = this.baseRestUrl + params.url;
    if (!params.type) {
      params.type = 'get';
    }
    /*不需要再次组装地址*/
    if (params.setUpUrl == false) {
      url = params.url;
    }
    wx.request({
      url: url,
      data: params.data,
      method: params.type,
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync('loginToken')
      },
      success: function (res) {
        // 判断以2（2xx)开头的状态码为正确
        // 异常不要返回到回调中，就在request中处理，记录日志并showToast一个统一的错误即可
        var code = res.data.code.toString();
        var startChar = code.charAt(0);
        if (startChar == '2' || startChar == '9') {
          params.sCallback && params.sCallback(res.data);
        } else {
          if (code == '401') {
            // if (!noRefetch) {
            //   that._refetch(params);
            // }
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }
          that._processError(res);
          params.eCallback && params.eCallback(res.data);
        }
      },
      fail: function (err) {
        //wx.hideNavigationBarLoading();
        that._processError(err);
        // params.eCallback && params.eCallback(err);
      }
    });
  }

  _processError(err) {
    console.log(err);
  }

  _refetch(param) {
    var token = new Token();
    token.getTokenFromServer((token) => {
      this.request(param, true);
    });
  }
}

export { Base };