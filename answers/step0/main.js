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