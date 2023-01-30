const startButton = document.getElementsByClassName('startButton')[0];
const stopButton = document.getElementsByClassName('stopButton')[0];
const logElm = document.querySelector('.log');

// 初期状態ではスタートボタンのみ有効
changeButtonActive(true, false);

const options = {
    color: 'red',
    backgroundColor: 'black'
};

stopWatch(options);
// stopWatch();

function changeButtonActive(start, stop) {
    startButton.disabled = !start;
    stopButton.disabled = !stop;
}

function stopWatch(options = {}){
    const addMessage = (message) => {
        const messageElm = document.createElement('div');
        const now = new Date();
        // const time = now.getHours() + '時' + now.getMinutes() + '分' + now.getSeconds() + '秒';
        const time = `${now.getHours()}時${now.getMinutes()}分${now.getSeconds()}秒`;
        messageElm.innerText = `${time} ${message}`;
        messageElm.classList.add('message');
        logElm.appendChild(messageElm);
    };

    // 引数が与えられない場合は空のオブジェクトで初期化するようにしたため、以下の1行は不要
    // options = options || {};

    let {color, backgroundColor} = options;
    // const color = options.color || 'lightblue';
    // const backgroundColor = options.backgroundColor || 'black';
    color = color || 'lightbrue';
    backgroundColor = backgroundColor || 'black';
    const displayElm = document.getElementById('display');
    displayElm.style.color = color;
    displayElm.style.backgroundColor = backgroundColor;

    var timer = null;

    startButton.addEventListener('click', () => {
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

            const message = '開始';
            addMessage(message);
        };
    });

    stopButton.addEventListener('click', () => {
        if (timer !== null) { // カウントアップ中のみ停止可能
            // スタートボタンのみ有効
            changeButtonActive(true, false);
            console.log('stop:', timer);
            clearInterval(timer);
            timer = null;

            const message = '終了';
            addMessage(message);
        }
    });
}