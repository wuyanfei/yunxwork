const md5 = require('md5');
/**
 * 系统参数：
 * appKey、secret、timestamp、companyId
 * 应用级参数：
 * params，是一个object对象
 */
class Sign {
  constructor(obj) {
    this.params = obj;
  }

  sign() {
    // 把参数名字取出来排序
    const pmArr = [];
    if (!this.params.timestamp || !this.params.appKey || !this.params.secret || !this.companyId) {
      return null;
    }
    for (const key in this.params) {
      pmArr.push(key);
    }
    // 按字母顺序升序
    pmArr.sort((a, b) => {
      if (a > b) {
        return 1;
      }
      if (a < b) {
        return -1;
      }
      return 0;
    });
    let result = '';
    pmArr.forEach((pm) => {
      result += pm;
      result += this.params[pm];
    });
    result = this.params.appKey + result + this.params.appKey;
    return md5(result);
  }
}

module.exports = Sign;
