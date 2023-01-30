class TextDecorator {
    // コンストラクタ。newされたときに呼ばれる
    // JavaScriptでは名前は必ずconstructor
    constructor(name) {
        console.log('コンストラクタが呼ばれました');
        this.name = name;
    }

    // メソッド
    decorate() {
        console.log(`decorateが呼ばれました: ${this.name}`);
        return `■■■　${this.name} ■■■`;
    }
}

const td = new TextDecorator('JS');
console.log(td.name);
const str = td.decorate(); // => decorateが呼ばれました: JS
console.log(str);
