import { Base } from '../../utils/base.js';

class Login extends Base {
  constructor() {
    super();
  }

  /**
   * 获取热门推荐
   */
  getCode(res, e, callback) {
    const param = {
      url: '/user/wxlogin',
      type: 'post',
      data: {
        code: e.code,
        encryptedData: res.detail.encryptedData,
        iv: res.detail.iv,
        rawData: res.detail.rawData,
        signature: res.detail.signature
      },
      sCallback: function (data) {
        callback && callback(data);
      }
    }
    this.request(param);
  }

  /**
   * 绑定手机号
   */
  getPhone(e, sessionKey, invte_user_code, callback) {
    const param = {
      url: '/user/decrypt',
      type: 'post',
      data: {
        enCodeData: e.detail.encryptedData,
        iv: e.detail.iv,
        sessionKey: sessionKey,
        user_code: invte_user_code
      },
      sCallback: function (data) {
        callback && callback(data);
      }
    }
    this.request(param)
  }

}

export { Login }