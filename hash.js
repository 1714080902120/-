// 父类
var PerSon = function (data) {
  this.name = data.name;
  this.age = data.age;
  this.sex = data.sex;
};
// console.log(new PerSon({name:123,age:456,sex:789}));

// 构造函数
var Hash = function (arrSize) {
  this.limit = arrSize;
  this.stroge = [];
  this.count = 0;
};

//hash化，获取下标
Hash.prototype.getIndex = function (obj) {
  var index = 0,
  hashCode = 0,
  key = obj.name,
  length = key.length;
  for (var i = 0; i < length; i++) {
    //编码
    hashCode = 37 *hashCode + key.charCodeAt(i);
  }
  index = hashCode % this.limit;
  return index;
};

//插入
Hash.prototype.put = function (obj) {
  var index = this.getIndex(obj),
  position = this.stroge[index];
  //判断是否存在该数组，否则创建一个数组
  if (!position) {
    this.stroge[index] = [];
    this.count += 1;
    console.log("插入成功！");
    this.stroge[index].push(obj);
    //判断是否应该扩容
    if (this.count >= Math.floor(this.limit *0.75)) {
      var newSize = this.getPrime(this.limit * 2);
      this.resize(newSize);
    }
  } else {
  //遍历判断是否已经存在该对象, 有则返回
    for (var i = 0,length = position.length; i < length; i++) {
      if (position[i].name == obj.name) {
        console.log("该对象已经存在");
        return false;
      } else {
        console.log("插入成功！");
        this.stroge[index].push(obj);
      }
    }
  }
  console.log(this.stroge);
};

//修改
Hash.prototype.update = function (newObj) {
  var index = this.getIndex(newObj),
  key = newObj.name,
  position = this.stroge[index];
  //判断是否存在该对象
  if (!position) {
    console.log("修改失败，该对象不存在或者对象名字错误");
    return false;
  } else {
    for (var i = 0,length = position.length;i < length;i++) {
      if (position[i].name == key) {
        position[i] = newObj;
        console.log("修改成功！");
      } else {
        console.log("该对象不存在，修改失败/(ㄒoㄒ)/~~");
        return false;
      }
    }
  }
  console.log(this.stroge);
};

//删除
Hash.prototype.remove = function (person) {
  var index = this.getIndex(person),
  position = this.stroge[index];
  //判断是否存在
  if (!position) {
    console.log("删除失败，对象不存在或者名字输入错误/(ㄒoㄒ)/~~");
    return false;
  } else {
    for (var i = 0,length = position.length;i < length;i++) {
      if (position[i].name == person.name) {
        position.splice(i,1);
        console.log("删除成功！");
      }
    }
    if (!position) {
      this.count -= 1;
    }

  if (this.count >= 7 && this.count <= this.limit *0.25) {
    var newSize = this.getPrime(Math.floor(this.limit / 2));
    this.resize(newSize);
  }
  }
  console.log(this.stroge);
};

//获取数据 get 
Hash.prototype.get = function (person) {
  var index = this.getIndex(person),
  position = this.stroge[index];
  //判断是否存在
  if (!position) {
    console.log("该对象不存在或者名字输入错误！");
    return false;
  } else {
    for (var i = 0,length = position.length; i < length;i++) {
      if (position[i].name == person.name) {
        console.log("查找结果如下");
        return position[i];
      }
    }
  }
};

//获取当前数组元素个数
Hash.prototype.calc = function () {
  console.log(this.count + "个");
  return this.count;
};

//容量处理
Hash.prototype.resize = function (arrSize) {
  //先赋值给另一个
  var oldStroage = this.stroge;
  //重置
  this.stroge = [];
  this.count = 0;
  //重新确定数组长度
  this.limit = arrSize;
  console.log(this.limit);
  //取出数组中的元素
  for (var i = 0,length = oldStroage.length; i < length; i++) {
    if (!oldStroage[i]) {
      continue;
    } else {
      for (var j = 0,len = oldStroage[i].length; j < len; j++) {
        this.put(oldStroage[i][j]);
      }
    }
  }
};

//判断是否为质数的方法
Hash.prototype.isPrime = function (num) {
  var halfNum = parseInt(Math.sqrt(num));
  console.log(halfNum);
  for (var i = 2; i <= halfNum; i++) {
    if (num % i == 0) {
      return false;
    }
  }
  return true;
};

//获取质数
Hash.prototype.getPrime = function (num) {
  while (!this.isPrime(num)) {
    num++;
  }
  console.log(num);
  return num;
};

var Jack = new PerSon({name:"Jack",age:18,sex:"男"});
var Tom = new PerSon({name:"Tom",age:18,sex:"男"});
var Mary = new PerSon({name:"Mary",age:20,sex:"女"});
var Dan = new PerSon({name:"Dan",age:22,sex:"男"});
var Rose = new PerSon({name:"Rose",age:20,sex:"女"});
var Bob = new PerSon({name:"Bob",age:16,sex:"男"});
var Taylor = new PerSon({name:"Taylor",age:28,sex:"女"});
var arr = [Jack,Tom,Mary,Dan,Rose,Bob,Taylor];
var hash = new Hash(5);
for (var i = 0,length = arr.length; i < length; i++) {
  hash.put(arr[i]);
}