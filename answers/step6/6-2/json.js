
// Object -> JSON
const jsonStr = JSON.stringify({
    name: "田中太郎",
    age: 25,
    interest: ["プログラミング", "料理", "読書"]
});

console.log(jsonStr);

// JSON -> Object
const obj = JSON.parse(jsonStr);
console.log(obj);
console.log(obj.age);