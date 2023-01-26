var displayArea = document.getElementById('display');
var timer = null;

var startElm = document.getElementsByClassName('startButton')[0];
var logElm = document.querySelector('.log');
startElm.addEventListener('click', function(){
    console.log('start:', timer); 
    var seconds = 0;
    if (timer === null) { // すでにstartされている場合は何もしない
        timer = setInterval(function(){
            seconds++;
            displayArea.innerText = seconds;
            console.log(seconds);
        }, 1000);

        var message = '開始';
        addMessage(message);
    };
});

var stopElm = document.getElementsByClassName('stopButton')[0];
stopElm.addEventListener('click', function(){
    if (timer !== null) { // カウントアップ中のみ停止可能
        console.log('stop:', timer);
        clearInterval(timer);
        timer = null;

        var message = '終了';
        addMessage(message);
    }
});

function addMessage(message) {
    var messageElm = document.createElement('div');
    messageElm.innerText = message;
    logElm.appendChild(messageElm);
};