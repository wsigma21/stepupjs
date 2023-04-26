const rootElm = document.getElementById('areaSelector');

async function getPrefs() {
    const prefResponse = await fetch('./prefecture.json');
    return await prefResponse.json();
}

async function updatePref() {
    // prefecture.jsonから都道府県データをオブジェクトとして受け取る
    const prefs = await getPrefs();
    createPrefOptionsHtml(prefs);

}

function createPrefOptionsHtml(prefs) {
    const prefectureElm = document.getElementsByClassName('prefectures')[0];
    console.log("test", prefs)
    // console.log(prefectureElm);
}

updatePref();


// async function displayPrefs() {
//     const result = await getPrefs();
//     console.log(result);
// }

// displayPrefs();