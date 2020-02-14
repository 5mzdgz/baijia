import { Base } from '../../utils/base.js';

class Recommend extends Base {
  constructor() {
    super();
  }

  /**
   * 获取热门推荐
   */
  recommendSave(res, e, callback) {
    const param = {
      url: '/recommend/add',
      type: 'post',
      data: {
        
      },
      sCallback: function (data) {
        callback && callback(data);
      }
    }
    this.request(param);
  }

}

export { Recommend }