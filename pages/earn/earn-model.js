import { Base } from '../../utils/base.js';

class Earn extends Base {
  constructor() {
    super();
  }

  /**
   * 获取热门推荐
   */
  earnData(obj, callback) {
    const param = {
      url: '/item/commissionList',
      type: 'post',
      data: obj,
      sCallback: function (data) {
        callback && callback(data.data);
      }
    }
    this.request(param)
  }

}

export { Earn }