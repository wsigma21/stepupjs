/* eslint no-unused-vars: 0 */

class AreaSelector {

  constructor(rootElm) {
    this.rootElm = rootElm;
  }

  async init() {
    this.prefSelectorElm = this.rootElm.querySelector('.prefectures');
    this.citySelectorElm = this.rootElm.querySelector('.cities');
    await this.updatePref();
    await this.updateCity();
  }

  async getPrefs() {
    const prefResponse = await fetch('./prefectures.json');
    return await prefResponse.json();
  }

  async getCities(cityCode) {
    const cityResponse = await fetch(`./cities/${cityCode}.json`);
    return await cityResponse.json();
  }

  async updatePref() {
    const prefs = await this.getPrefs();
    this.createPrefOptionsHtml(prefs);
  } 

  async updateCity() {
    // const prefSelectorElm = this.rootElm.querySelector('.prefectures');
    const cities = await this.getCities(this.prefSelectorElm.value);
    this.createCityOptionsHtml(cities);
  }

  createOptionTags(arrays) {
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

  createPrefOptionsHtml(prefs) {
    const optionStrs = this.createOptionTags(prefs);
    // const prefSelectorElm = this.rootElm.querySelector('.prefectures');
    this.prefSelectorElm.innerHTML = optionStrs.join('');

    this.prefSelectorElm.addEventListener('change', (event) => {
      this.updateCity();
    });
  } 

  createCityOptionsHtml(cities) {
    const optionStrs = this.createOptionTags(cities);
    // const citySelectorElm = this.rootElm.querySelector('.cities');
    this.citySelectorElm.innerHTML = optionStrs.join('');
  }
}

const rootElm = document.getElementById('areaSelector');
const areaSelector = new AreaSelector(rootElm);
areaSelector.init();
