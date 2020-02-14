import { Base } from '../../utils/base.js';

class My extends Base {
  constructor() {
    super();
  }

  /**
   * 获取热门推荐
   */
  userData(callback) {
    const param = {
      url: '/user/userInfo',
      sCallback: function (data) {
        callback && callback(data.data);
      }
    }
    this.request(param)
  }

  avatarUrl(obj, callback) {
    const param = {
      url: '/user/update',
      type: 'post',
      data: obj,
      sCallback: function (data) {
        callback && callback(data.data);
      }
    }
    this.request(param)
  }

}

export { My }