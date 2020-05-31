function Stack() {
  this.items = [];
}

Stack.prototype.Push = function (w){
  return this.items.push(w);
};

Stack.prototype.Pop = function () {
  return this.items.pop();
};

Stack.prototype.peek = function (i){
  return this.items.splice(i,0);
};

var stack=new Stack();

stack.Push('a');
stack.Push('b');
stack.Push('c');

console.log(items);