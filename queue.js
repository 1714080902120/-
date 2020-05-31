var items=[];


var Queue = function () {

};

//进队
Queue.prototype.enqueue = function (hum){
  return items.push(hum);
};

//出队
Queue.prototype.dequeue = function (){
  return items.shift();
};

//查询
Queue.prototype.peek = function (arr,hum){
  return arr.indexOf(hum);
};

//查看是否为空
Queue.prototype.isSize = function (arr){
  return arr.length;
};

//转换为字符串
Queue.prototype.toString = function (arr){
  var length=arr.length-1;
  for(var i=0;i<length;i++){
    arr[i] = arr[i] + ""; 
  }
  return arr;
};

var q = new Queue();
// console.log(q.enqueue(1));
// console.log(q.enqueue(2));
// console.log(q.enqueue(3));
// console.log(q.enqueue(4));

// console.log(q.dequeue());
// console.log(q.peek(items,2));
// console.log(q.isSize(items));

//击鼓传花
var peopleList = ["Tom","Jack","Bob","Mary"];
function passGame (num,nameList){
  //人数入队
  for(var j = 0,length = nameList.length;j<length;j++){
    q.enqueue(nameList[j]);
  }
  //大循环 判断淘汰者及循环次数
  while (q.isSize(items) > 1){
    //内循环去除淘汰者
    for(var i = 0;i<num;i++){
      //未被淘汰的返回对列尾
      q.enqueue(q.dequeue());
    }
    //淘汰者
    q.dequeue();
    
  }
  //返回胜利者
  return items[0];
}

var p = passGame(2,peopleList);
console.log(p);