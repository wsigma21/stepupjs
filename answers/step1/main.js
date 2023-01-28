function stopWatch(options) {
    function addMessage(message) {
        var messageElm = document.createElement('div');
        var now = new Date();
        var time = now.getHours() + '時' + now.getMinutes() + '分' + now.getSeconds() + '秒';
        messageElm.innerText = time + ' ' + message;
        messageElm.classList = ['message'];
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

    var startElm = document.getElementsByClassName('startButton')[0];
    var logElm = document.querySelector('.log');
    startElm.addEventListener('click', function(){
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
}

var options = {
    color: 'blue',
    backgroundColor: 'black'
};

stopWatch(options);
// stopWatch();