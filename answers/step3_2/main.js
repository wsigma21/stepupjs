class PhotoViewer {
    // 初期値としてクラスの外から渡した方がいいものはコンストラクタで渡す
    // 渡すのは、ビューアーを作成する場所と表示する画像
    constructor(rootElm, images) {
        this.rootElm = rootElm;
        this.images = images;
        this.currentIndex = 0;
    }

    init() {
        const nextButtonElm = document.querySelector('.nextButton');
        nextButtonElm.addEventListener('click', () => {
            this.next();
        });
        const prevButtonElm = document.querySelector('.prevButton');
        prevButtonElm.addEventListener('click', () => {
            this.prev();
        });

        this.updatePhoto();
    }

    updatePhoto() {
        const frameElm = this.rootElm.querySelector('.frame');
        const image = this.images[this.currentIndex % this.images.length];

        frameElm.innerHTML = `
            <div class="currentImage">
                <img src=${image}>
            </div>
        `
    }

    next() {
        this.currentIndex++;
        this.updatePhoto();
    }

    prev() {
        this.currentIndex--;
        this.updatePhoto();
    }
}
const images = [
    "https://fakeimg.pl/250x150/81DAF5",
    "https://fakeimg.pl/250x150/F781F3",
    "https://fakeimg.pl/250x150/81F7D8",
]
new PhotoViewer(document.getElementById('photoViewer'),images).init();