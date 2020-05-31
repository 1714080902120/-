//字典封装
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

//队列封装
var Queue = function () {
  this.items = [];
};

//进队
Queue.prototype.enqueue = function (hum){
  return this.items.push(hum);
};

//若对方是一个数组,拼合
Queue.prototype.concat = function (arr) {
  this.items = this.items.concat(arr);
};

//出队
Queue.prototype.dequeue = function (){
  return this.items.shift();
};

//查询
Queue.prototype.peek = function (arr,hum){
  return arr.indexOf(hum);
};

//查看是否为空
Queue.prototype.isEmpty = function () {
  return this.items.length == 0 ? false : true;
};


//转换为字符串
Queue.prototype.toString = function (arr){
  var length=arr.length-1;
  for(var i=0;i<length;i++){
    arr[i] = arr[i] + ""; 
  }
  return arr;
};



//构造函数 使用链式法
function Graph(data) {
  //顶点
  this.vertexes = [];
  //边
  this.edges = new Dictionary();
  //颜色

  this.color = {};
}

//添加顶点
Graph.prototype.addVertex = function (v) {
  //创建的一个新点 把该点放入到顶点集里
  this.vertexes.push(v);
  //边字典中也要添加关于该点的数据
  this.edges.set({key:v,value:[]});
};

//添加边的方法
Graph.prototype.addEdges = function (v,arr) {
  //找到该点的存放地址
  //遍历一波
  for (var i = 0,length = arr.length; i < length; i++) {
    this.edges.get(v).push(arr[i]);
    this.edges.get(arr[i]).push(v);
  }
};

//toString()
Graph.prototype.toString  = function () {
  for (var i = 0,length = this.vertexes.length; i < length; i++) {
    console.log(this.vertexes[i] + "->" + this.edges.get(this.vertexes[i]));
  }
};

//初始化每个顶点的颜色状态为白色
Graph.prototype.initialColor = function () {
  for (var i = 0, length = this.vertexes.length; i < length; i++) {
    this.color[this.vertexes[i]] = "white";
  }
};

//广度搜索 BFS
Graph.prototype.breadthFirstSearch = function (initV) {
  //先初始化所有点
  this.initialColor();
  //创建一个队列存放被探索的节点
  var queue = new Queue(),
  currentPoint = initV;
  //先将点A放入
  queue.enqueue(currentPoint);
  //判断
  while (queue.isEmpty()) {
    //获取该点对应的邻点数组
    var edge = this.edges.get(currentPoint);
    //遍历一遍每个点相邻的点，如果该点颜色不为白色不放入，否则放入队列中，同时改变颜色为灰色
    for (var i = 0, length = edge.length; i < length; i++) {
      if (this.color[edge[i]] == "white") {
        this.color[edge[i]] = "gray";
        //放入队列中
        queue.enqueue(edge[i]);
      }
    }
    //遍历完后该点出队，同时颜色变为黑色
    queue.dequeue(currentPoint);
    this.color[currentPoint] = 'black';
    currentPoint = queue.items[0];
  }
  console.log(this.color);
};

//深度搜索 DFS
Graph.prototype.deepthFirstSearch = function (initV) {
  //初始化颜色
  this.initialColor();
  this.dfs(initV);
  console.log(this.color);
};

// DFS递归操作
Graph.prototype.dfs = function (initV) {
  var edge = this.edges.get(initV);
  this.color[initV] = 'black';
  console.log(initV);
  //遍历每个相邻点，看颜色是否为黑
  for (var i = 0, length = edge.length; i < length; i++) {
    if (this.color[edge[i]] == 'white') {
      //改变初始点
      this.dfs(edge[i]);
    }
  }
};

//测试
var myVertexes = ["A","B","C","D","E","F","G","H","I"];

var graph = new Graph();

for (var i = 0,length = myVertexes.length; i < length; i++) {
  graph.addVertex(myVertexes[i]);
}

graph.addEdges("A",["B","C","D"]);
graph.addEdges("C",["D","G"]);
graph.addEdges("D",["G","H"]);
graph.addEdges("B",["E","F"]);
graph.addEdges("E",["I"]);
graph.toString();
// graph.breadthFirstSearch('A');
// graph.deepthFirstSearch('A');