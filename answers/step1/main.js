var displayArea = document.getElementById('display');
var timer = null;

var startElm = document.getElementsByClassName('startButton')[0];
startElm.addEventListener('click', function(){
    console.log('start:', timer); 
    var seconds = 0;
    if (timer === null) { // すでにstartされている場合は何もしない
        timer = setInterval(function(){
            seconds++;
            displayArea.innerText = seconds;
            console.log(seconds);
        }, 1000);
    };
});

var stopElm = document.getElementsByClassName('stopButton')[0];
stopElm.addEventListener('click', function(){
    if (timer !== null) { // カウントアップ中のみ停止可能
        console.log('stop:', timer);
        clearInterval(timer);
        timer = null;
    }
});