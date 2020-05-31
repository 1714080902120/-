//字典构造函数
function Dictionary () {
  this.items = {};
}

//插入
Dictionary.prototype.set = function (obj) {
  this.items[obj.key] = obj.value;
};

//删除
Dictionary.prototype.remove = function (key) {
  if (!this.has(key)) return false;
    delete this.items[key];
    return true;  
};

//查看是否存在该key
Dictionary.prototype.has  = function (key) {
  return this.items.hasOwnProperty(key);
};

//获取
Dictionary.prototype.get = function (key) {
  return this.has(key) ? this.items[key] : undefined;
};

//获取所有key
Dictionary.prototype.getKeys = function () {
  return Object.keys(this.items);
};

//清空
Dictionary.prototype.clear = function () {
  this.items = {};
};

//获取字典长度
Dictionary.prototype.isSize = function () {
  return Object.keys(this.items).length;
};