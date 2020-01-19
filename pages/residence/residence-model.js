import { Base } from '../../utils/base.js';

class Residence extends Base {
  constructor() {
    super();
  }

  /**
   * 获取条件列表
   */
  searchData(callback) {
    const param = {
      url: '/search/get',
      
      sCallback: function (data) {
        callback && callback(data.data);
      }
    }
    this.request(param)
  }

  nameSaerch(obj, callback) {
    const param = {
      url: '/search/item',
      type: 'post',
      data: obj,
      sCallback: function (data) {
        callback && callback(data.data);
      }
    }
    this.request(param)
  }
}

export { Residence }