var startButton = document.getElementsByClassName('startButton')[0];
var pauseButton = document.getElementsByClassName('pauseButton')[0];
var clearButton = document.getElementsByClassName('clearButton')[0];
var logElm = document.querySelector('.log');

// 初期状態ではスタートボタンのみ有効
changeButtonActive(true, false, false);

var options = {
    color: 'red',
    backgroundColor: 'black'
};

stopWatch(options);

function changeButtonActive(start, pause, clear) {
    startButton.disabled = !start;
    pauseButton.disabled = !pause;
    clearButton.disabled = !clear;
}

function stopWatch(options) {
    function addMessage(message) {
        var messageElm = document.createElement('div');
        var now = new Date();
        var time = now.getHours() + '時' + now.getMinutes() + '分' + now.getSeconds() + '秒';
        messageElm.innerText = time + ' ' + message;
        messageElm.classList = ['message'];
        // 最新のログを一番上に表示
        var theFirstChild = logElm.firstChild;
        logElm.insertBefore(messageElm, theFirstChild);
    };

    options = options || {};
    var color = options.color || 'lightblue';
    var backgroundColor = options.backgroundColor || 'black';
    var displayElm = document.getElementById('display');
    displayElm.style.color = color;
    displayElm.style.backgroundColor = backgroundColor;

    var timer = null;
    var seconds = 0;

    startButton.addEventListener('click', function(){
        // 起動中はポーズボタンのみ有効
        changeButtonActive(false, true, false);
        // console.log('start:', timer); 
        if (timer === null) { // すでにstartされている場合は何もしない
            var message = '開始';
        } else {
            var message = '再開';
            
        };
        timer = setInterval(function(){
            seconds++;
            displayElm.innerText = seconds;
            // console.log(seconds);
        }, 1000);
        addMessage(message);
    });

    pauseButton.addEventListener('click', function(){
        if (timer !== null) { // カウントアップ中のみ停止可能
            // 中断中はスタート・クリアボタン有効
            changeButtonActive(true, false, true);
            // console.log('pause:', timer);
            clearInterval(timer);

            var message = '中断';
            addMessage(message);
        }
    });

    clearButton.addEventListener('click', function(){
        if (timer !== null) { // 中断中・終了後のみ停止可能
            // クリア後はスタートボタンのみ有効
            changeButtonActive(true, false, false);
            clearInterval(timer);
            timer = null;
            seconds = 0;
            displayElm.innerText = seconds;
            // console.log('clear:', timer);

            var message = 'クリア';
            addMessage(message);
        }
    });
}