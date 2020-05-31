function Set () {
  this.items = {};
}

// 查看该集合是否含有该元素
Set.prototype.has = function (value) {
  return this.items.hasOwnProperty(value);
};

//添加
Set.prototype.add = function (value) {
  if (this.has(value)) {
    console.log("该元素已经存在");
    return false;
  } else {
    this.items[value] = value;
  }
  return true;
};

//删除
Set.prototype.remove = function (value) {
  if (!this.has(value)) {
    console.log("不存在该元素");
    return false;
  } else {
    delete this.items[value];
  }
  return true;
};

//清除整个 clear
Set.prototype.clear = function () {
  this.items = {};
  return true;
};

//size长度
Set.prototype.size =function () {
  return Object.keys(this.items).length;
};

//获取所有元素
Set.prototype.get = function () {
  return Object.keys(this.items);
};

//并集
Set.prototype.union = function (otherSet) {
  var value  = this.get();
  var newSet = new Set();
  for (var i = 0,leng = value.length;i < leng;i++) {
    newSet.add(value[i]);
  }
  value = otherSet.get();
  for (var j = 0,length = value.length;j < length; j++) {
    newSet.add(value[j]);
  }
  return newSet;
};

//交集 intersection
Set.prototype.intersection = function (otherSet) {
  var newSet = new Set(),
  otherValue = otherSet.get();
    for (var i = 0,len = otherValue.length;i < len;i++) {
      if (this.has(otherValue[i])) {
        newSet.add(otherValue[i]);
      }
    
  }
  return newSet;
};
//差集 
Set.prototype.difference = function (otherSet) {
  var newSet = new Set();
  for (var i = 0,length = this.get().length;i < length;i++) {
    if (!otherSet.has(this.get()[i])) {
      newSet.add(this.get()[i]);
    }
  }
  return newSet;
};

//子集
Set.prototype.subSet = function (otherSet) {
  var value = this.get();
  for (var i = 0,length = value.length;i < length;i++) {
    if (!otherSet.has(value[i])) {
      return false;
    }
  }
  return true;
};

//补集
Set.prototype.complementary = function (ohterSet) {
  var all = this.union(ohterSet);
  var same = this.intersection(ohterSet).get();
  for (var i = 0,length = same.length;i < length; i++) {
    if (all.has(same[i])) {
      all.remove(same[i]);
    }
  }
  return all;
};

var A = new Set();
var B = new Set();
var C = new Set();
A.add("Tom");
A.add("Jack");
A.add("Mary");
B.add("Tom");
B.add("Bob");
B.add("Vue");
B.add("Jack");
C.add("Tom");
C.add("Jack");
// console.log(A.union(B));
// console.log(A.intersection(B));
// console.log(A.difference(B));
// console.log(A.subSet(B));
console.log(A.complementary(B));