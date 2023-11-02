/* eslint no-unused-vars: 0 */

class AreaSelector {

  constructor(rootElm) {
    this.rootElm = rootElm;
    this.prefectures = [];
    this.cities = [];
    this.prefCode = null;
  }

  async init() {
    await this.updatePref();
    await this.updateCity();
  }

  async getPrefs() {
    const prefResponse = await fetch('./prefectures.json');
    return await prefResponse.json();
  }

  async getCities(prefCode) {
    const cityResponse = await fetch(`./cities/${prefCode}.json`);
    return await cityResponse.json();
  }

  async updatePref() {
    // const prefs = await this.getPrefs();
    this.prefectures = await this.getPrefs();
    this.prefCode = this.prefectures[0].code;
    this.createPrefOptionsHtml();
  } 

  async updateCity() {
    // const prefSelectorElm = this.rootElm.querySelector('.prefectures');
    // const cities = await this.getCities(prefSelectorElm.value);
    this.cities = await this.getCities(this.prefCode);
    this.createCityOptionsHtml();
  }

  createOptionTags(records) {
    return records.map((record) => {
      return `
        <option name="${record.name}" value="${record.code}">
          ${record.name}
        </option>
      `;
    }).join('');
  }

  createPrefOptionsHtml() {
    const prefSelectorElm = this.rootElm.querySelector('.prefectures');
    prefSelectorElm.innerHTML = this.createOptionTags(this.prefectures);

    prefSelectorElm.addEventListener('change', (event) => {
      this.prefCode = event.target.value;
      // console.log("event.target.value=", event.target.value);
      this.updateCity();
    });
  } 

  createCityOptionsHtml() {
    const citySelectorElm = this.rootElm.querySelector('.cities');
    citySelectorElm.innerHTML = this.createOptionTags(this.cities);
  }
}

const rootElm = document.getElementById('areaSelector');
const areaSelector = new AreaSelector(rootElm);
areaSelector.init();
