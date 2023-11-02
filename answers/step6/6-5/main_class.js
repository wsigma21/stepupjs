/* eslint no-unused-vars: 0 */
const rootElm = document.getElementById('areaSelector');

async function initAreaSelector() {
  await updatePref();
  await updateCity();
}

async function getPrefs() {
  const prefResponse = await fetch('./prefectures.json');
  return await prefResponse.json();
}

async function getCities(cityCode) {
  const cityResponse = await fetch(`./cities/${cityCode}.json`);
  return await cityResponse.json();
}

async function updatePref() {
  const prefs = await getPrefs();
  createPrefOptionsHtml(prefs);
} 

async function updateCity() {
  const prefSelectorElm = rootElm.querySelector('.prefectures');
  const cities = await getCities(prefSelectorElm.value);
  createCityOptionsHtml(cities);
}

function createOptionTags(arrays) {
  const strs = [];
  for(const a of arrays) {
    strs.push(`
      <option name="${a.name}" value="${a.code}">
        ${a.name}
      </option>
    `);
  }
  return strs
}

function createPrefOptionsHtml(prefs) {
  const optionStrs = createOptionTags(prefs);
  const prefSelectorElm = rootElm.querySelector('.prefectures');
  prefSelectorElm.innerHTML = optionStrs.join('');

  prefSelectorElm.addEventListener('change', (event) => {
    updateCity();
  });
} 

function createCityOptionsHtml(cities) {
  const optionStrs = createOptionTags(cities);
  const citySelectorElm = rootElm.querySelector('.cities');
  citySelectorElm.innerHTML = optionStrs.join('');
}

initAreaSelector();