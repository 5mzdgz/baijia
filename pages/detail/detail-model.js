import { Base } from '../../utils/base.js';

class Detail extends Base {
  constructor() {
    super();
  }

  /**
   * 获取热门推荐
   */
  detailData(itemId, callback) {
    const param = {
      url: '/item/detail',
      type: 'post',
      data: {
        itemId
      },
      sCallback: function (data) {
        callback && callback(data.data);
      }
    }
    this.request(param)
  }

}

export { Detail }