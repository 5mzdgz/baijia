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
   * 绑定手机号
   */
  phoneLogin(phone, code, callback) {
    const param = {
      url: '/sms/smsLogin',
      type: 'post',
      data: {
        phone: phone,
        code: code
      },
      sCallback: function (data) {
        callback && callback(data);
      }
    }
    this.request(param)
  }

}

export { Phone }