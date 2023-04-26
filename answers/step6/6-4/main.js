const rootElm = document.getElementById('areaSelector');

async function getPrefs() {
    const prefResponse = await fetch('./prefecture.json');
    const prefs = prefResponse.json()
    return await prefs;
}

async function updatePref() {
    // prefecture.jsonから都道府県データをオブジェクトとして受け取る
    const prefs = await getPrefs();
    createPrefOptionsHtml(prefs);

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
    prefectureElm.innerHTML = optionStrs.join('');
}

updatePref();

