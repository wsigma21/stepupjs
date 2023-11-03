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
   * @return {boolean}
   */
  isLastStep() {
    const questionNum = Object.keys(this.quizData[this.gameStatus.level]).length;
    return questionNum === this.gameStatus.step;
  }

  /**
   * `次の設問または結果画面に進む`
   */
  nextStep() {
    this.clearTimer();
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
   * `ゲームのスコアを計算する`
   * @return {int}
   */
  calcScore() {
    let correctNum = 0;
    const results = this.gameStatus.results;
    for (const result of results) {
      const correct = result.question.answer;
      const selected = result.selectedAnswer;
      if (correct === selected) {
        correctNum++;
      }
    }
    // console.log(`正解数:${correctNum}`);
    return Math.floor((correctNum / results.length) * 100);
  }

  /**
   * `ゲームのステータスの初期化を行う`
   */
  resetGame() {
    this.gameStatus.results = []; // プレイヤーの解答結果
    this.gameStatus.level = null; // 選択されたレベル
    this.gameStatus.step = 1; //現在表示している設問の番号
    this.gameStatus.timeLimit = 0; // 1問ごとの制限時間
    this.gameStatus.intervalKey = null; // setIntervalのキー
  }

  /**
   * `解答制限時間のタイマーをセットする`
   */
  setTimer() {
    if (this.gameStatus.intervalKey != null) {
      throw new Error('タイマーがまだ動いています');
    }
    this.gameStatus.timeLimit = 10;
    this.gameStatus.intervalKey = setInterval(() => {
      this.gameStatus.timeLimit--;
      // console.log(`解答時間は残り${this.gameStatus.timeLimit}秒です`);
      if (this.gameStatus.timeLimit === 0) {
        this.nextStep();
      } else {
        this.renderTimeLimitStr();
      }
    }, 1000);
  }

  /**
   * `解答制限時間のタイマーをクリアする`
   */
  clearTimer() {
    clearInterval(this.gameStatus.intervalKey);
    this.gameStatus.intervalKey = null;
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
    this.setTimer();

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
      <p id="sec">残り解答時間：${this.gameStatus.timeLimit}秒</p>
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
   * `解答制限時間を表示する`
   */
  renderTimeLimitStr() {
    const secElm = this.rootElm.querySelector('#sec');
    secElm.innerText = `残り解答時間：${this.gameStatus.timeLimit}秒`;
  }

  /**
   * 結果画面を表示する
   */
  displayResultView() {
    const score = this.calcScore();
    const html = `
      <p>ゲーム終了</p>
      <p>正解率:${score}%</p>
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