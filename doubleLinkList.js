//双向链表构造函数
var doubleList =function () {
  this.length = 0;
  this.head = null;
  this.tail = null;
};

//节点构造函数
var Node = function (data) {
  this.prev =null;
  this.next = null;
  this.data = data;
};
//append 增加
doubleList.prototype.append = function (data) {
  //创建一个新节点
  var newNode = new Node(data);
  //先判断是否只有一个节点
  if (this.length == 0) {
    this.head = newNode;
    this.tail = newNode;
  } else {
    newNode.prev = this.tail;
    this.tail.next = newNode;
    this.tail = newNode;
  }
  //长度加1
  this.length += 1;
};

//字符串实现
doubleList.prototype.toString = function (key) {
  if (!key) {
    return this.backwordString();
  } else {
    return this.forwordString();
  }
};
//顺序字符串
doubleList.prototype.backwordString = function () {
  var current = this.tail;
  var str = "";
  while (current) {
    str += current.data + " ";
    current = current.prev;
  }
  return str;
};
//逆序字符串
doubleList.prototype.forwordString = function () {
  var current = this.head;
  var str = '';
  while (current) {
    str += current.data +" ";
    current = current.next;
  }
  return str;
};
//insert插入
doubleList.prototype.insert = function (data,position) {
  var newNode = new Node(data);
  //判断越界
  if (position > this.length || position < 0) {
    return "错误的定位";
  } 
  var current = this.head;
  var previous = null;
  if (this.length == 0) {
    this.head = newNode;
    this.tail = newNode;
  } else {
  if (position == 0) {
    newNode.next = this.head;
    this.head.prev = newNode;
    this.head = newNode;
  } else if (position == this.length) {
    newNode.prev = this.tail;
    this.tail.next = newNode;
    this.tail = newNode;
  } else {
    for (var i = 0; i < position; i++) {
      previous = current;
      current = current.next;
    }
    previous.next =newNode;
    newNode.prev = previous;
    current.prev = newNode;
    newNode.next = current;
  }
  this.length += 1;
  }
};
//Get 获取元素的数据
doubleList.prototype.get = function (position) {
  if (position >= this.length || position < 0) {
    return "数值超出链表长度";
  }
  var current = null;
  var length = this.length / 2;
  var index = position > (length) ? 0 : this.length - 1;
  if (index == 0) {
    current = this.head;
    while (index++ < position) {
      current = current.next;
    }
    return current.data;
  } else {
    current = this.tail;
    while (index-- > position) {
      current = current.prev;
    }
    return current.data;
  }
};
//indexOf 查询元素对应的索引值
doubleList.prototype.indexOf = function (data) {
  var current = this.head,
  length = this.length;
  for (var i = 0;i < length; i++) {
    if (current.data == data) {
      return i;
    }
    current = current.next;
  }
  return "该元素不存在";
};
//update 更新
doubleList.prototype.update = function (newData,position) {
  if (position >= this.length || position < 0) {
    console.log("null");
    return "数值超出链表长度";
  }
  var current = null;
  var length = this.length / 2;
  var index = position > (length) ? 0 : this.length - 1;
  if (index == 0) {
    current = this.head;
    while (index++ < position) {
      current = current.next;
    }
  } else {
    current = this.tail;
    while (index-- > position) {
      current = current.prev;
    }
  }
  current.data = newData;
};
//remove 删除
doubleList.prototype.remove = function (position) {
  if (position >= this.length || position < 0) {
    console.log("--null--");
    return "数值超出链表长度";
  }else {
  var current = this.head,
      previous = null,
      after = null;  
    if (this.length == 0) {
      return "null";
    } else {
        if (position == 0) {
          this.head.next.prev = null;
          this.head = this.head.next;
        } else if (position == this.length - 1) {
          current = this.tail;
          this.tail.prev.next = null;
          this.tail = this.tail.prev;
        } else {
          for (var i = 0;i < position;i++) {
            previous = current;
            current = current.next;
            after = current.next;
          }
          previous.next = after;
          after.prev = previous;
        }
        this.length -= 1;
        //返回删除的数值
        return current.data;
    }
  }
};
//removeAt 根据元素删除对应的节点
doubleList.prototype.removeAt = function (data) {
  var current = this.head;
  var length = this.length;
  var index = 0;
  for (var i= 0;i < length;i++) {
    if (current.data == data) {
      this.remove(i);
    }
    current = current.next;
  }
  return "没有对应元素存在";
};
//实例
var list = new doubleList();
list.append("abc");
list.append("efg");
list.append("hij");
list.append("lmn");
list.insert("aaa",0);
list.insert("bbb",4);
// console.log(list.get(list.indexOf("lmn")));
// list.update("ddd",6);
list.removeAt("lmn");
console.log(list.toString(true));
