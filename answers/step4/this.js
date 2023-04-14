// オブジェクトが関数を所有している場合
const obj1 = {
    name: 'これはobj1です',
    test: function() {
        // このthisは、関数が呼び出された時にその所有者となっているオブジェクト（つまりここではobj1）を参照している。
        console.log(this); 
        console.log(this === obj1); 
    }
};

console.log(obj1); //{name: 'これはobj1です', test: f}
obj1.test(); // {name: 'これはobj1です', test: f} , // true

console.log("------------------------------")

const obj2 = {
    name: 'これはobj2です',
};

obj1.test.call(obj2); // obj1.testのthisをobj2として呼び出す

console.log("------------------------------")

obj2.test = obj1.test; // obj2に、obj1の関数の参照を代入
obj2.test(); //{name: 'これはobj2です', test: f}, // false // 呼び出された時の所有者はobj2だから。


console.log("=============================")
// クラスが関数を所有している場合
class MyClass {
    constructor() {
        this.name = 'これはMyClassです';
    }

    test() {
        console.log(this);
        console.log(this === instance1); 
    }
}

const instance1 = new MyClass();

console.log(instance1); // {name: 'これはMyClassです'}

instance1.test();  // {name: 'これはMyClassです'}, // true

console.log("=============================")
// グローバルオブジェクトのthis

// 何も関数に囲まれていないグローバルスコープのthisはグローバルオブジェクト
console.log(this === window); // true

function globalTest() {
    console.log(this === window); // true
}

// オブジェクトに所有されていないのでthisはwindow
globalTest();

console.log("bind =============================")
const module = {
  x: 42,
  getX: function() {
    return this.x;
  }
};

const unboundGetX = module.getX;
console.log(unboundGetX()); // The function gets invoked at the global scope
// Expected output: undefined

const boundGetX = unboundGetX.bind(module);
console.log(boundGetX());
// Expected output: 42
