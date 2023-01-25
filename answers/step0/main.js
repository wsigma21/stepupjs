console.log('ファイルの読み込みを行います')
var element = document.getElementById('innerTest');
element.innerHTML = '<strong>Javascript</strong>で書きました！'

var buttonElement = document.getElementById('testButton');
testButton.addEventListener('click', function(){
    // alert('ボタンが押されました');
    var numberElm = document.getElementById('number');
    var num = parseInt(numberElm.value);
    // alert(num);
    console.log(num)
});

var fruits = ['りんご', 'みかん', 'かき', 'なし'];
var fruitsStr = '';
for (var i = 0; i < fruits.length; i++) {
    fruitsStr += '<li class="fruits">' +  fruits[i] + '</li>';
}
var arrayElement = document.getElementById('arrayTest');
arrayElement.innerHTML = fruitsStr;

// getElementsByClassNameにより、HTMLCollectionという配列のようなオブジェクトを取得できる。
var fruitsElement = document.getElementsByClassName('fruits');
for (var i=0; i < fruitsElement.length; i++) {
    console.log(fruitsElement[i].textContent)
}
console.log("===========================")
// 要素の最初の一つだけ取り出したい場合は以下
var fruitsElement = document.getElementsByClassName('fruits')[0];
console.log(fruitsElement.textContent)

console.log("===========================");

var colorObjects = {
    red : '赤',
    white : '白',
    brue : '青',
};
console.log("===========================");
console.log(colorObjects);
console.log("===========================");
for (var c in colorObjects) {
    console.log(`${c}:${colorObjects[c]}`);
}
