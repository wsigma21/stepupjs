class TextDecorator {
    // コンストラクタ。newされた時に必ず呼ばれる
    constructor(name) {
        console.log('コンストラクタが呼ばれました');
        // thisは「インスタンス化されたオブジェクト自身」を指す
        this.name = name;
    }
    // メソッド
    decorate() {
        console.log(`decorateが呼ばれました：${this.name}`)
        return `■■■ ${this.name} ■■■`
    }
}

const td = new TextDecorator('Neko'); // インスタンス化
console.log(td.name);
const returnName = td.decorate();
console.log(returnName);