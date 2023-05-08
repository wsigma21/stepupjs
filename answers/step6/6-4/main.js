const rootElm = document.getElementById('areaSelector');

async function getPrefs() {
    const prefResponse = await fetch('./prefectures.json');
    const prefs = prefResponse.json()
    return await prefs;
}

async function getCities(code) {
    const citiesResponse = await fetch(`./cities/${code}.json`);
    const cities = citiesResponse.json()
    return await cities;
}

async function updatePref() {
    // prefecture.jsonから都道府県データをオブジェクトとして受け取る
    const prefs = await getPrefs();
    createPrefOptionsHtml(prefs);
}

async function updateCities(city_code) {
    // let cities = [];
    // for (const code of city_code) {
    //     const city = await getCities(code);
    //     // console.log(city);

    //     //これだとキーが同じなせいで上書きされる。。
    //     // for文の外に　let cities = {};
    //     // Object.assign(cities, city);

    //     // そもそも連結する必要がなかった。。特定の都道府県の市町村だけ取得できるようにする。。
    //     cities.push(city);

    // }
    // console.log(cities);
    const cities = await getCities(city_code);
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
    const prefectureElm = rootElm.querySelector('.cities')
    // joinメソッドは、呼び出し元の配列を引数で与えた文字で区切りつつ連結（文字列化）する
    prefectureElm.innerHTML = optionStrs.join('');
}

updatePref();
// 最初だけprefCode指定して取得
updateCities("001");


// prefが選択された時にonChangeでprefCodeを受け取ってjsonを入手しoptionを作る
prefSelect = document.querySelector('.prefectures');
prefSelect.addEventListener('change', (event) => { 
    console.log(event.target.value);
    updateCities(event.target.value);
});
