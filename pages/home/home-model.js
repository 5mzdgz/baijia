import { Base } from '../../utils/base.js';

class Home extends Base {
  constructor() {
    super();
  }

  /**
   * 获取热门推荐
   */
  recommendData(page, pageSize, callback) {
    const param = {
      url: '/item/list',
      type: 'post',
      data: {
        page: page,
        pageSize: pageSize
      },
      sCallback: function (data) {
        callback && callback(data.data.records);
      }
    }
    this.request(param)
  }

}

export { Home }