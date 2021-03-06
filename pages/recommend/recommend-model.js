import { Base } from '../../utils/base.js';

class Recommend extends Base {
  constructor() {
    super();
  }

  /**
   * 获取热门推荐
   */
  recommendSave(obj, callback) {
    const param = {
      url: '/recommend/add',
      type: 'post',
      data: obj,
      sCallback: function (data) {
        callback && callback(data);
      }
    }
    this.request(param);
  }

}

export { Recommend }