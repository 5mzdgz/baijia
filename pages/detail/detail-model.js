import { Base } from '../../utils/base.js';

class Detail extends Base {
  constructor() {
    super();
  }

  /**
   * 获取详情
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

  /**
   * 获取动态
   */
  projectData(page, pageSize, itemId, callback) {
    const param = {
      url: '/item/dynamicList',
      type: 'post',
      data: {
        itemId,
        page,
        pageSize
      },
      sCallback: function (data) {
        callback && callback(data.data);
      }
    }
    this.request(param)
  }

  /**
   * 获取人员
   */
  memberData(callback) {
    const param = {
      url: '/user/userMsgList',
      type: 'post',
      data: {
        page: 1,
        pageSize: 50
      },
      sCallback: function (data) {
        callback && callback(data.data);
      }
    }
    this.request(param)
  }

}

export { Detail }