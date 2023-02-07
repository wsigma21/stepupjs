class PhotoViewer {
    constructor(rootElm, images) {
        // 外部から「ビューアーの要素」「画像の配列」「何枚目を表示しているか」を渡せるように
        // インスタンス変数で持つ
        this.rootElm = rootElm;
        this.images = images;
        this.currentIndex = 0; // 初期値
    }

    init() {
        const nextButtonElm = this.rootElm.querySelector('.nextButton');
        nextButtonElm.addEventListener('click', () => {
            this.next();
        });

        const prevButtonElm = this.rootElm.querySelector('.prevButton');
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
                <img src="${image}" />
            </div>
        `;
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
];

new PhotoViewer(document.getElementById('photoViewer'), images).init();