var List = function (){
  this.head = null;
  this.length = 0;
  this.Node = function (data){
    this.data=data;
    this.next=null;
  };
};


//增加
List.prototype.append = function (data) {
  //当列表为空时,列表指向下一个新节点
  var newNode = new this.Node(data);
  if (this.length == 0) {
    this.head = newNode;
  } else {
  //当列表不为零时，需创建一个新节点指向当前节点
    //循环找到最后一个节点
    var current = this.head;
    while(current.next){
      current = current.next;
    }
    //最后一个节点的next只指向新节点
    current.next = newNode;
  }
  //长度+1
  this.length += 1;
};

//toString data——> 字符串
List.prototype.toString = function () {
  var current = this.head;
  var nodeData = "";
  while (current) {
    nodeData += current.data +" ";
    current = current.next;

  }
  return nodeData;
};

//insert 插入
List.prototype.insert = function (position,data) {
  var newNode = new this.Node(data);
  var current = this.head;
  var privous = null;
  //判断位置是否大于length或者小于0
  if(position < 0 || position > this.length) {
    console.log("位置未找到");
  } else {
    //当position==0 时，改变列表头
    if(position == 0) {
      newNode.next = this.head;
      this.head = newNode;
    //当position!=length || 0 时，上一个节点的指针指向这个节点
    //该节点的指针指向下一个节点
    } else if (position < this.length && position > 0) {
      for(var i = 1;i <= position;i++) {
        privous = current;
        current = current.next;
      }
      

      privous.next = newNode;
      newNode.next = current;
    //当position == length 时，直接指向末尾 
    }else {
      while(current.next) {
        current = current.next;
      }
        current.next = newNode;
    }
  }
  this.length += 1;
};

//删除
List.prototype.delete = function (position) {
  //穿件一个变量来查找
  if (position > this.length || position < 0) {
    console.log("定位数值错误");
  } else {
    var current = this.head;
    var previous = null;
    for (var i = 0;i < position;i++) {
      previous = current;
      current = current.next;
    }
    previous.next = current.next;
    current = null;
    this.length -= 1;
  }
};

//改
List.prototype.update = function (newData,position) {
  var current = this.head;
  var index = 0;
  while (index++ < position) {
    current = current.next;
  }
  current.data = newData;
};

//Get 获取元素位置的数据
List.prototype.get = function (position) {
  var current = this.head;
  //先判断
  if (position >= this.length || position < 0) {
    return "定位错误";
  } else {
    var index = 0;
    while (index++ < position) {
      current = current.next;
    }
    return current.data + "";
  }
};

//查看元素对应的数据的位置
List.prototype.check = function (data) {
  var current = this.head;
  var length = 0;
  while (length < this.length) {
    if (current.data == data) {
      return length + "";
    }
    current = current.next;
    length += 1;
  }
  //如果该数据不存在则返回 
  return "不好意思，该元素不存在";
};

//测试append
var list = new List();
list.append("abc");
list.append("cba");
list.append("nba");
list.append("xba");
// list.insert(4,"ccc");
// list.delete(4);
// list.update("aaa",0);
// console.log(list.get(4));
console.log(list.check(list.get(2)));
console.log(list.toString());