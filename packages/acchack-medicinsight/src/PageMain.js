import { html, css, LitElement } from 'lit-element';

import horizonData from '../../../utils/processJSON.js';

import '../checkbox-selector.js';

export class PageMain extends LitElement {
  static get styles() {
    return css`
      checkbox-selector {
        margin: 4px;
      }
    `;
  }

  static get properties() {
    return {
      domains: {
        type: Array,
      },
      domainsSelected: {
        type: Array,
      },
      company: {
        type: Array,
      },
      companySelected: {
        type: Array,
      },
      data: {
        type: Array,
      },
      dataView: {
        type: Array,
      },
    };
  }

  constructor() {
    super();

    this.data = horizonData.slice(0, 10);
    this.domains = this.loadDomains();
    this.domainsSelected = [];
    this.company = PageMain.getFabrikant(this.loadCompanies());
    this.companySelected = [];
    this.dataView = this._updateDataView();
  }

  static getFabrikant(set) {
    const _selectFabrikant = item => item.Fabrikant;
    return set.map(_selectFabrikant);
  }

  loadDomains() {
    const _isEmpty = value => value !== '';
    const _isDistinct = (value, index, self) => self.indexOf(value) === index;
    const _selectDomain = item => item.Domein;
    return this.data
      .map(_selectDomain)
      .filter(_isEmpty)
      .filter(_isDistinct)
      .sort();
  }

  loadCompanies() {
    const _isEmpty = value => value !== '';
    const _isDistinct = (value, index, self) => self.indexOf(value) === index;

    return this.data
      .filter(_isEmpty)
      .filter(_isDistinct)
      .sort();
  }

  _updateDomain(event) {
    this.domainsSelected = event.detail;
    // console.log(this.domainsSelected, this.domainsSelected.indexOf());
    this.dataView = this._updateDataView();

    if (this.domainsSelected.length > 0) {
      const _isSelectedDomain = value =>
        // console.log(value, this.domainsSelected);
        this.domainsSelected.indexOf(value.Domein) !== -1;

      this.company = PageMain.getFabrikant(this.loadCompanies().filter(_isSelectedDomain));
    } else {
      this.company = PageMain.getFabrikant(this.loadCompanies());
    }
  }

  _updateCompany(event) {
    this.domainsSelected = event.detail;
    this._updateDataView();
  }

  _updateDataView() {
    return this.data;
  }

  render() {
    return html`
      <checkbox-selector
        .values="${this.domains}"
        .selected="${this.domainsSelected}"
        title="Domain"
        @update="${this._updateDomain}"
      ></checkbox-selector>
      <checkbox-selector
        .values="${this.company}"
        .selected="${this.companySelected}"
        title="Company"
        @update="${this._updateCompany}"
      ></checkbox-selector>

      <!-- Magic here with domains and company -->
      ${this.dataView.map(
        (item, index) =>
          html`
            <p>${index + 1}. ${item.Stofnaam}</p>
          `,
      )}
    `;
  }
}
