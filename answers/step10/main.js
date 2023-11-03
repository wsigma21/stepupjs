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
    const levelArray = Object.keys(this.quizData);
    console.log("levelArray=", levelArray);
    let optionStrs = [];
    for (let i = 0; i < levelArray.length; i++) {
      optionStrs.push(`<option name="level" value="${levelArray[i]}">
        レベル${i+1}
      </option>
      `)
    }
    const html = `
      <select class="levelSelector">
        ${optionStrs.join('')}
      </select>
    `;
    const parentElm = document.createElement('div');
    parentElm.innerHTML = html;
    this.rootElm.appendChild(parentElm);
  }
}

const appElement = document.getElementById('app');
const wordQuiz = new WordQuiz(appElement);
wordQuiz.init();