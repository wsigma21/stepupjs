class WordQuiz{
  constructor(rootElm) {
    this.rootElm = rootElm;
    // ゲームのステータスの定義
    this.gameStatus = {};
    // 初期化
    this.resetGame();
  }
  
  async init() {
    await this.fetchQuizData();
    this.displayStartView();
  }

  /**
   * `クイズの中身をJSOnで取得する`
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
   * `最終問題かどうか判断する`
   * @returns {boolean}
   */
  isLastStep() {
    const questionNum = Object.keys(this.quizData[this.gameStatus.level]).length;
    return questionNum === this.gameStatus.step;
  }

  /**
   * `次の設問または結果画面に進む`
   */
  nextStep() {
    this.addResult();
    if (this.isLastStep()) {
      this.displayResultView();
    } else {
      this.gameStatus.step++;
      this.displayQuestionView();
    }
  }

  /**
   * `解答結果を保持する`
   */
  addResult() {
    const checkedElm = this.rootElm.querySelector('input[name="choice"]:checked');
    const answer = checkedElm ? checkedElm.value : '';
    const currentQuestion = this.quizData[this.gameStatus.level][`step${this.gameStatus.step}`];
    this.gameStatus.results.push({
      question: currentQuestion,
      selectedAnswer: answer,
    })
  }

  /**
   * `ゲームのステータスの初期化を行う`
   */
  resetGame() {
    this.gameStatus.results = []; // プレイヤーの解答結果
    this.gameStatus.level = null; // 選択されたレベル
    this.gameStatus.step = 1; //現在表示している設問の番号
  }

  /**
   * `スタート画面を表示する`
   */
  displayStartView() {
    const levelStrs = Object.keys(this.quizData);
    // 初期化
    this.gameStatus.level = levelStrs[0];
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

    const selectElm = parentElm.querySelector('.levelSelector')
    selectElm.addEventListener('change', (event) => {
      this.gameStatus.level = event.target.value;
    });

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
    // 試しに1問目を表示
    const stepKey = `step${this.gameStatus.step}`;
    const currentQuestion = this.quizData[this.gameStatus.level][stepKey];
    const choices = currentQuestion.choices;
    const question = currentQuestion.word;
    const choiceStrs = [];
    for (const choice of choices) {
      choiceStrs.push(`
        <label>
          <input type="radio" name="choice" value="${choice}">
          ${choice}
          </input>
        </label>
      `);
    }

    const html = `
      <p>${question}</p>
      <div>
        ${choiceStrs.join('')}
      </div>
      <div class="actions">
      <button id="nextBtn">解答する</button>
      </div>
    `

    const parentElm = document.createElement('div');
    parentElm.className = 'question';
    parentElm.innerHTML = html;
    this.replaceView(parentElm);
    
    const nextBtn = parentElm.querySelector('#nextBtn');
    nextBtn.addEventListener('click', () => {
      // this.displayResultView();
      this.nextStep();
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
      this.resetGame()
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