class AreaSelector {
    //rootElmにはオブジェクトが入る。空オブジェクトの表し方は{}で良い？
    constructor(rootElm = {}) {
        this.rootElm = rootElm;
        
    }

    init() {
        
    }

    async updatePref() {
        // prefecture.jsonから都道府県データをオブジェクトとして受け取る
        await getPrefs();
        console.log("updatePref this.prefs=",this.prefs)
        createPrefOptionsHtml(prefs);
    }

    async updateCities() {
        const prefSelectorElm = rootElm.querySelector('.prefectures');
        const cities = await getCities(prefSelectorElm.value);
        createCityOptionsHtml(cities);
    }

    async getPrefs() {
        const prefResponse = await fetch('./prefectures.json');
        this.prefs = prefResponse.json()
    }

    async getCities(code) {
        const citiesResponse = await fetch(`./cities/${code}.json`);
        this.cities = citiesResponse.json()
    }
}

async function initAreaSelector() {
    await updatePref();
    await updateCities();
}

async function updatePref() {
    // prefecture.jsonから都道府県データをオブジェクトとして受け取る
    const prefs = await getPrefs();
    createPrefOptionsHtml(prefs);
}

async function updateCities() {
    const prefSelectorElm = rootElm.querySelector('.prefectures');
    const cities = await getCities(prefSelectorElm.value);
    createCityOptionsHtml(cities);
}

function createPrefOptionsHtml(prefs) {
    const optionStrs = [];
    for (const pref of prefs) {
        optionStrs.push (`
            <option name="${pref.name}" value="${pref.code}">
                ${pref.name}
            </option>
        `);
    }
    const prefectureElm = rootElm.querySelector('.prefectures')
    // joinメソッドは、呼び出し元の配列を引数で与えた文字で区切りつつ連結（文字列化）する
    prefectureElm.innerHTML = optionStrs.join('');

    prefectureElm.addEventListener('change', (event) => { 
        updateCities();
    });
}

function createCityOptionsHtml(cities) {
    const optionStrs = [];
    for (const city of cities) {
        optionStrs.push (`
            <option name="${city.name}" value="${city.code}">
                ${city.name}
            </option>
        `);
    }
    const citySelectorElm = rootElm.querySelector('.cities')
    // joinメソッドは、呼び出し元の配列を引数で与えた文字で区切りつつ連結（文字列化）する
    citySelectorElm.innerHTML = optionStrs.join('');
}

initAreaSelector();

const areaSelector = new AreaSelector(document.getElementById("areaSelector"));
areaSelector.init();