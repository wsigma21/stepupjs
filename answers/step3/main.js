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
        this.renderImageUrls();
        this.updatePhoto();
    }

    renderImageUrls() {
        const imagesElm = this.rootElm.querySelector('.images');
        // for (let i = 0; i < this.images.length; i++) {
        for (const image of this.images) {
            let liElm = document.createElement('li');
            let aTag = document.createElement('a');
            aTag.href = image;
            aTag.innerText = image;
            liElm.appendChild(aTag);
            imagesElm.appendChild(liElm);
        }
        
    }

    updatePhoto() {
        const frameElm = this.rootElm.querySelector('.frame');
        const imageIndex = this.currentIndex % this.images.length;
        const image = this.images[imageIndex];
        frameElm.innerHTML = `
            <div class="currentImage">
                <p>${imageIndex + 1}枚目</p>
                <img src="${image}" />
            </div>
        `;
        this.startTimer();
    }

    startTimer() {
        if(this.timerKey) {
            clearTimeout(this.timerKey);
        }
        this.timerKey = setTimeout(() => {
            this.next();
        }, 3000);
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