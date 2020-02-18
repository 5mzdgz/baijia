import { Base } from '../../../utils/base.js';

class Phone extends Base {
  constructor() {
    super();
  }

  /**
   * 获取热门推荐
   */
  phoneCode(phone, callback) {
    const param = {
      url: '/sms/sendLogin',
      type: 'post',
      data: {
        phone: phone
      },
      sCallback: function (data) {
        callback && callback(data);
      }
    }
    this.request(param);
  }

  /**
   * 手机登录
   */
  phoneLogin(phone, code, invte_user_code, callback) {
    const param = {
      url: '/sms/smsLogin',
      type: 'post',
      data: {
        phone: phone,
        code: code,
        user_code: invte_user_code
      },
      sCallback: function (data) {
        callback && callback(data);
      }
    }
    this.request(param)
  }

}

export { Phone }