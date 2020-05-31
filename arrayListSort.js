//构造函数
function ArrayList () {
  this.array = [];
}

//插入
ArrayList.prototype.insert = function (data) {
  return this.array.push(data);
};

//输出
ArrayList.prototype.toString = function () {
  console.log(this.array);
};

//交换两个数的方法
ArrayList.prototype.swap = function (a,b) {
  var temp = this.array[a];
  this.array[a] = this.array[b];
  this.array[b] = temp;
};

/* 冒泡排序:
真实比较次数：N * (N - 1) / 2,既O(N ^ 2);
交换次数:(N ^ 2) / 4 既O(N ^ 2)*/
ArrayList.prototype.bubblesSort = function () {
  //外层循环减少次数
  for (var i = this.array.length - 1; i >= 0; i--) {
    //内层循环判断
    for (var j = 0; j < i; j++) {
      if (this.array[j] > this.array[j + 1]) {
        this.swap(j,j + 1);
      }
    }
  }
  this.toString();
};

/* 选择排序:
真实比较次数：N * (N - 1) / 2,既O(N ^ 2);
最好情况：1次；
最坏情况：N - 1 次；
交换次数：N - 1 次；既O(N)*/
ArrayList.prototype.selectionSort = function () {
  //设置一个变量存放最小值
  var min = 0,
  //创建一个变量存放内层循环找到的最后一个值
  num = 0;
  //外层增加次数
  for (var i = 0, length = this.array.length - 1; i < length; i++) {
    min = this.array[i];
    num = i;
    //内层判断
    for (var j = i + 1; j <= length; j++) {
      if (min > this.array[j]) {
        min = this.array[j];
        num = j;
      }
    }
    if (i != num) {
      this.swap(i,num);
    }
  }
  this.toString();
};

/* 插入排序:
比较次数 && 平均速度：N * (N - 1) / 2 / 2;既 O(N ^ 2); */
ArrayList.prototype.insertionSort = function () {
  //先获取数组长度
  var length = this.array.length;
  //外层循环遍历元素
  for (var i = 1; i < length; i++) {
    // j保存i
    var j = i; 
    //内层循环判断当前的元素是否大于之前的数
    while (this.array[j] < this.array[j - 1] && j >= 1) {
      //若当前元素大于之前的元素就交换
      this.swap(j,j - 1);
      j--;
    }
  }
  this.toString();
};

/* 希尔排序:
最坏的情况下为O(N ^ 2)； */
ArrayList.prototype.shellSort = function () {
  var gap = Math.floor(this.array.length / 2); 
  this.toShellSort(gap);
  this.toString();
};

//希尔排序的递归
ArrayList.prototype.toShellSort = function (gap) {
  //获取数组长度
  var length = this.array.length;
  //判断增量是否为1，若是则停止，否则继续递归
  if (gap >= 1) {
    //外层循环判断位于第几个间隔
    for (var i = gap; i < length; i++) {
      //获取第一个元素
      var temp = this.array[i],
      //保存变量
      j = i;
      while (this.array[j - gap] > temp && j > gap - 1) {
        this.array[j] = this.array[j -gap];
        j -= gap;
      }

      //交换
      this.array[j] = temp;
    }
    //递归
    this.toShellSort(Math.floor(gap / 2));
  } else return ;
};

/* 快速排序:
平均效率：O(N * log(N)); 
*/
ArrayList.prototype.quickSort = function () {
  this.toQuickSort(0, this.array.length - 1);
  this.toString();
};

//快速排序递归
ArrayList.prototype.toQuickSort = function (left, right) {
  //递归结束条件
  if (left >= right) return ;
  //获取枢纽
  var median = this.median(left, right),
  //保存值
  i = left,
  j = right - 1;
  //循环判断i < j 
  while (i < j) {
    //判断i是否小于median
    if (this.array[i] > median) {
      //判断j是否大于median
      if (this.array[j] < median) {
        this.swap(j, i);
        i++;
      }
      j--;
    } else {
      i++;
    }
  }
  //交换枢纽位置
  this.swap(i, right - 1);
  //分而治之
  //左递归
  this.toQuickSort(left,i - 1);
  //右递归
  this.toQuickSort(i + 1,right);
};

//获取枢纽，同时交换三个值位置
ArrayList.prototype.median = function (left, right) {
  var center = Math.floor((left + right) / 2),
  newArr = [this.array[left],this.array[center],this.array[right]];
  newArr = newArr.sort(function (a, b) {
    return a - b;
  });
  this.array[left] = newArr[0];
  this.array[center] = newArr[1];
  this.array[right] = newArr[2];
  this.swap(center, right - 1);
  return this.array[right - 1];
};

//测试
var arrayList = new ArrayList();
for (var i = 0; i <= 20; i++) {
  var num = Math.floor(Math.random() * 30);
  arrayList.insert(num);
}

arrayList.toString();
arrayList.bubblesSort();
arrayList.selectionSort();
arrayList.insertionSort();
arrayList.shellSort();
arrayList.quickSort();
// arrayList.median(0,arrayList.array.length - 1);