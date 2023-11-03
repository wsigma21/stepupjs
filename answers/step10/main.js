class WordQuiz{
  constructor(rootElm) {
    this.rootElm = rootElm;
    // ゲームのステータス
    this.gameStatus = {
      level: null // 選択されたレベル
    };
  }
  
  async init() {
    await this.fetchQuizData();
    this.displayStartView();
  }

  /**
   * クイズの中身をJSOnで取得する
   */
  async fetchQuizData() {
    try {
      const response = await fetch('./quiz.json');
      this.quizData = await response.json();
    } catch(e) {
      this.rootElm.innerText = '問題の読み込みに失敗しました';
      console.error(e);
    }
  }

  /**
   * `スタート画面を表示する`
   */
  displayStartView() {
    const levelStrs = Object.keys(this.quizData);
    // console.log("levelStrs=", levelStrs);
    const optionStrs = [];
    for (let i = 0; i < levelStrs.length; i++) {
      optionStrs.push(`<option name="level" value="${levelStrs[i]}">
        レベル${i+1}
      </option>
      `)
    }
    const html = `
      <select class="levelSelector">
        ${optionStrs.join('')}
      </select>
      <button id='startBtn'>スタート</button>
    `;
    const parentElm = document.createElement('div');
    parentElm.innerHTML = html;

    const startBtnElm = parentElm.querySelector('#startBtn');
    startBtnElm.addEventListener('click', () => {
      this.displayQuestionView();
    });

    // this.rootElm.appendChild(parentElm);
    this.replaceView(parentElm);
  }

  /**
   * `出題画面を表示する`
   */
  displayQuestionView() {
    const html = `
      <p>ゲームを開始しました</p>
      <button id="retireBtn">ゲームを終了する</button>
    `;

    const parentElm = document.createElement('div');
    parentElm.className = 'question';
    parentElm.innerHTML = html;
    this.replaceView(parentElm);
    
    const retireBtnElm = parentElm.querySelector('#retireBtn');
    retireBtnElm.addEventListener('click', () => {
      this.displayResultView();
    });
    
  }

  /**
   * 結果画面を表示する
   */
  displayResultView() {
    const html = `
      <p>ゲーム終了</p>
      <button id='resetBtn'>開始画面に戻る</button>
    `;

    const parentElm = document.createElement('div');
    parentElm.className = 'results';
    parentElm.innerHTML = html;
    this.replaceView(parentElm);
    
    const resetBtnElm = parentElm.querySelector('#resetBtn');
    resetBtnElm.addEventListener('click', () => {
      this.displayStartView();
    });
    
  }

  /**
   * `表示内容を入れ替える`
   * @param {Object} elm 
   */
  replaceView(elm) {
    // 初期化
    this.rootElm.innerHTML = '';
    this.rootElm.appendChild(elm);
  }
}

const appElement = document.getElementById('app');
const wordQuiz = new WordQuiz(appElement);
wordQuiz.init();