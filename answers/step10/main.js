class WordQuiz{
  constructor(rootElm) {
    this.rootElm = rootElm;
  }
  
  async init() {
    await this.fetchQuizData();
    this.displayStartView();
  }

  async fetchQuizData() {
    try {
      const response = await fetch('./quiz.json');
      this.quizData = await response.json();
    } catch(e) {
      this.rootElm.innerText = '問題の読み込みに失敗しました';
      console.error(e);
    }
  }

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

  displayQuestionView() {
    const html = `
      <p>ゲームを開始しました</p>
      <button id="retireBtn">ゲームを終了する</button>
    `;

    const parentElm = document.createElement('div');
    parentElm.className = 'question';
    parentElm.innerHTML = html;
    // this.rootElm.appendChild(parentElm);
    this.replaceView(parentElm);
    
    const retireBtn = document.querySelector('#retireBtn');
    retireBtn.addEventListener('click', () => {
      this.displayResultView();
    });

  }

  displayResultView() {
    const html = `
      <p>ゲーム終了</p>
      <button id='resetBtn'>開始画面に戻る</button>
    `;

    const parentElm = document.createElement('div');
    parentElm.className = 'results';
    parentElm.innerHTML = html;
    this.replaceView(parentElm);
    
    const resetBtn = document.querySelector('#resetBtn');
    resetBtn.addEventListener('click', () => {
      this.displayStartView();
    });

  }

  replaceView(elm) {
    // 初期化
    this.rootElm.innerHTML = '';
    this.rootElm.appendChild(elm);
  }
}

const appElement = document.getElementById('app');
const wordQuiz = new WordQuiz(appElement);
wordQuiz.init();