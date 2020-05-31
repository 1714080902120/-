//Tree 构造函数
function BinarySearchTree () {
  //根节点
  this.root  = null;

}

//节点的构造函数
var Node = function (data) {
  this.left = null;
  this.right = null;
  this.value = data;
  this.key = data.key;
};

//插入
BinarySearchTree.prototype.insert = function (data) {
  var newNode = new Node(data);
  //判断该树是否为空
  if (this.root == null) {
    this.root = newNode;
  } else {
    this.insertNode(this.root, newNode);
  }

};

//插入节点的方法
BinarySearchTree.prototype.insertNode = function (node, newNode) {
  //判断是左边还是右边
  if (node.key > newNode.key) {
    if (node.left == null) {
      node.left = newNode;
      return true;
    } else {
      //递归处理,直到该节点为空
      this.insertNode(node.left, newNode);
    }
  } else if (node.key < newNode.key) {
    if (node.key < newNode.key) {
      if (node.right == null) {
        node.right = newNode;
        return true;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  } else return false;
};

//先序遍历
BinarySearchTree.prototype.preOrderTraversal = function () {
  this.preOrderTraversalNode(this.root);
};

//遍历节点的函数
BinarySearchTree.prototype.preOrderTraversalNode = function (node) {
  if (node != null) {
    console.log(node.key);
    //递归判断左子节点是否为空
    this.preOrderTraversalNode(node.left);
    //空则返回 遍历右子节点
    this.preOrderTraversalNode(node.right);
  } else return ;
};

//中序遍历
BinarySearchTree.prototype.midOderTraversal = function () {
  this.midOderTraversalNode(this.root);
};

//中序遍历节点
BinarySearchTree.prototype.midOderTraversalNode = function (node) {
  if (node != null) {
    //先找到最左边的子节点
    this.midOderTraversalNode(node.left);
    console.log(node.key);
    //退出遍历 找右子节点
    this.midOderTraversalNode(node.right);
    // console.log(node.key);
  }
};

//后序遍历
BinarySearchTree.prototype.postOrderTraversal = function () {
  this.postOrderTraversalNode(this.root);
};
//后序遍历节点
BinarySearchTree.prototype.postOrderTraversalNode = function (node) {
  if (node != null) {
    
    //先遍历左子节点
    this.postOrderTraversalNode(node.left);
    //然后遍历右子节点
    this.postOrderTraversalNode(node.right);
    //当两个节点都遍历完后输出该节点
    console.log(node.key);
  }
};

//最值搜索
BinarySearchTree.prototype.greatValue = function (selection) {
  var current = this.root;
  node = this.root;
  while (node != null) {
    current = node;
    if (selection) {
      node = node.left;
    } else {
      node = node.right;
    }
  }
  return current;
};

//查找特定的值
BinarySearchTree.prototype.search = function (key) {
  var node = this.root;
  while (node != null) {
    if (node.key == key) {
      return node;
    } else if (node.key < key) {
      node = node.right;
    } else {
      node = node.left;
    }
  }
  console.log("未找到对应的值");
  return false;
};

//删除子节点
BinarySearchTree.prototype.remove = function (key) {
  var currentNode = this.root,
  preNode = this.root;
  //判断传入的值是否为根节点
  if (key == this.root.key) {
    //后继
    var minMax = this.backWord(key);
    //将根节点的属性赋给该点
    minMax.left = this.root.left;
    minMax.right = this.root.right;
    //把改点作为根节点
    this.root = minMax;
    return true;
  }
  while (currentNode != null) {
    if (key > currentNode.key) {
      preNode = currentNode;
      currentNode = currentNode.right;
    } else if (key < currentNode.key) {
      preNode = currentNode;
      currentNode = currentNode.left;
    } else {
      //这里开始做判断
      //叶节点
      if (currentNode.left == null && currentNode.right == null) {
        if (currentNode == preNode.left) {
          preNode.left = null;
        } else {
          preNode.right = null;
        }
      } else if (currentNode.left && currentNode.right == null) {
        //判断相对于先前的位置
        if (currentNode == preNode.left) {
          preNode.left = currentNode.left;
        } else {
          preNode.right = currentNode.left;
        }
      } else if (currentNode.right && currentNode.left == null) {
        //判断相对于先前的位置
        if (currentNode == preNode.left) {
          preNode.left = currentNode.right;
        } else {
          preNode.right = currentNode.right;
        }
      } else {
        //判断相对于先前的位置
        //找到前驱或者后继
        //使用前驱
        //将原先该节点的属性赋值给找到的点
        var forWordNode = this.forWord(currentNode.key);
        forWordNode.left = currentNode.left;
        forWordNode.right = currentNode.right;
        if (currentNode == preNode.left) {
          preNode.left = forWordNode;
        } else {
          preNode.right = forWordNode;
        }
      }
      return true;
    }
  }
  console.log("未找到该值");
  return false;
};

//前驱 左子树的最大值
BinarySearchTree.prototype.forWord = function (key) {
  var current = this.search(key).left;
  while (current.right != null) {
    current = current.right;
  }
  //当子节点不为null的时候
  if (current.left != null) {
    this.remove(current.key);
  }
  //删除该节点
  this.remove(current.key);
  return current;
};

//后继 右子树的最小值
BinarySearchTree.prototype.backWord = function (key) {
  var current = this.search(key).right;
  while (current.left != null) {
    current = current.left;
  }
  //如果该节点原本有子节点，删除该点
  if (current.right != null) {
    this.remove(current.key);
  }
  //删除该返回的点
  this.remove(current.key);
  return current;
};

//测试
var tree = new BinarySearchTree();
tree.insert({key:11});
tree.insert({key:7});
tree.insert({key:15});
tree.insert({key:5});
tree.insert({key:3});
tree.insert({key:6});
tree.insert({key:9});
tree.insert({key:8});
tree.insert({key:10});
tree.insert({key:13});
tree.insert({key:12});
tree.insert({key:14});
tree.insert({key:20});
tree.insert({key:18});
tree.insert({key:25});

// tree.preOrderTraversal();
// tree.midOderTraversal();
// tree.postOrderTraversal();
// console.log(tree.greatValue(false));
// console.log(tree.search(5));
tree.remove(15);
tree.preOrderTraversal();