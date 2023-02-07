class PhotoViewer {
    init() {
        const rootElm = document.getElementById('photoViewer');
        const frameElm = rootElm.querySelector('.frame');
        const image = 'https://fakeimg.pl/250x150/81DAF5';

        frameElm.innerHTML = `
            <div class="currentImage">
                <img src="${image}" />
            </div>
        `;
    }
}
new PhotoViewer().init();