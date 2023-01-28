var startButton = document.getElementsByClassName('startButton')[0];
var stopButton = document.getElementsByClassName('stopButton')[0];
var logElm = document.querySelector('.log');

// 初期状態ではスタートボタンのみ有効
changeButtonActive(true, false);

var options = {
    color: 'red',
    backgroundColor: 'black'
};

stopWatch(options);
// stopWatch();

function changeButtonActive(start, stop) {
    startButton.disabled = !start;
    stopButton.disabled = !stop;
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

    startButton.addEventListener('click', function(){
        // ストップボタンのみ有効
        changeButtonActive(false, true);
        console.log('start:', timer); 
        var seconds = 0;
        if (timer === null) { // すでにstartされている場合は何もしない
            timer = setInterval(function(){
                seconds++;
                displayElm.innerText = seconds;
                console.log(seconds);
            }, 1000);

            var message = '開始';
            addMessage(message);
        };
    });

    stopButton.addEventListener('click', function(){
        if (timer !== null) { // カウントアップ中のみ停止可能
            // スタートボタンのみ有効
            changeButtonActive(true, false);
            console.log('stop:', timer);
            clearInterval(timer);
            timer = null;

            var message = '終了';
            addMessage(message);
        }
    });
}