class StopWatch {
    // newの時に呼ばれ、optionsの内容をプロパティ（インスタンス変数）にセットするコンストラクタ
    constructor(options = {}) {
        // プロパティ（インスタンス変数） options
        this.options = options;
    }

    // initメソッド：DOM要素を初期化してイベントハンドラを仕掛ける
    init() {
        let {color, backgroundColor} = this.options;

        color = color || 'lightbrue';
        backgroundColor = backgroundColor || 'black';

        const displayElm = document.getElementById('display');
        displayElm.style.color = color;
        displayElm.style.backgroundColor = backgroundColor;

        // プロパティ（インスタンス変数）logElm
        this.logElm = document.querySelector('.log');

        // startButton, stopButtonはchangeButtonActiveメソッドでも使用するので、インスタンス変数にした
        this.startButton = document.getElementsByClassName('startButton')[0];
        this.stopButton = document.getElementsByClassName('stopButton')[0]

        // 初期状態ではスタートボタンのみ有効
        this.changeButtonActive(true, false);

        let timer = null;
        this.startButton.addEventListener('click', () => {
            // ストップボタンのみ有効
            this.changeButtonActive(false, true);
            let seconds = 0;
            if (timer === null) { // すでにstartされている場合は何もしない
                timer = setInterval(function(){
                    seconds++;
                    displayElm.innerText = seconds;
                    console.log(seconds);
                }, 1000);

                const message = '開始';
                this.addMessage(message);
            };
        });

        this.stopButton.addEventListener('click', () => {
            if (timer !== null) { // カウントアップ中のみ停止可能
                // スタートボタンのみ有効
                this.changeButtonActive(true, false);
                console.log('stop:', timer);
                clearInterval(timer);
                timer = null;
    
                const message = '終了';
                this.addMessage(message);
            }
        });
    }

    // stopWatchクラスのメソッド
    addMessage = (message) => {
        const messageElm = document.createElement('div');
        const now = new Date();
        const time = `${now.getHours()}時${now.getMinutes()}分${now.getSeconds()}秒`;
        messageElm.innerText = `${time} ${message}`;
        messageElm.classList.add('message');
        this.logElm.appendChild(messageElm);
    };

    changeButtonActive = (start, stop) => {
        this.startButton.disabled = !start;
        this.stopButton.disabled = !stop;
    }
}

const options = {
    color: 'red',
    backgroundColor: 'black'
};

const stopWatch = new StopWatch(options);
stopWatch.init();

