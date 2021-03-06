import { html, css, LitElement } from 'lit-element';

import horizonData from '../../../utils/processJSON.js';

import '../checkbox-selector.js';

export class PageMain extends LitElement {
  static get styles() {
    return css`
      checkbox-selector {
        margin: 4px;
      }

      div {
        margin: 8px;
      }

      @media (max-width: 800px) {
        div {
          width: 100%;
        }

        :host {
          display: flex;
          flex-direction: column;
        }
      }

      @media (min-width: 801px) {
        div.filters {
          width: 25%;
        }
        div.list {
          width: 70%;
        }

        :host {
          display: flex;
          flex-direction: row;
        }
      }

      .list {
        border: 1px solid black;
        border-radius: 4px;
        padding: 8px;
      }

      .list h2 {
        font-size: 16px;
      }

      h3 {
        font-size: 14px;
      }

      .list div.child:nth-child(even) {
        background-color: white;
      }

      .list div.child {
        padding: 8px;
        margin: 4px;
        border-radius: 4px;
        font-size: 12px;
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
      euroFormatter: Function,
    };
  }

  constructor() {
    super();

    this.data = horizonData; // .slice(0, 10);
    this.domains = PageMain.loadDomains(this.data);
    this.domainsSelected = [];
    this.company = PageMain.loadCompanies(this.data);
    this.companySelected = [];
    this.dataView = this._updateDataView();
    this.euroFormatter = new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
    });
  }

  static loadDomains(data) {
    const _isEmpty = value => value !== '';
    const _isDistinct = (value, index, self) => self.indexOf(value) === index;
    const _selectDomain = item => item.Domein;
    return data
      .map(_selectDomain)
      .filter(_isEmpty)
      .filter(_isDistinct)
      .sort();
  }

  static loadCompanies(data) {
    const _isEmpty = value => value !== '';
    const _isDistinct = (value, index, self) => self.indexOf(value) === index;
    const _selectFabrikant = item => item.Fabrikant;
    return data
      .map(_selectFabrikant)
      .filter(_isDistinct)
      .filter(_isEmpty)
      .sort();
  }

  _updateDomain(event) {
    this.domainsSelected = event.detail;
    this.dataView = this._updateDataView();

    if (this.domainsSelected.length > 0) {
      const _isSelectedDomain = value =>
        // console.log(value, this.domainsSelected);
        this.domainsSelected.indexOf(value.Domein) !== -1;

      this.company = PageMain.loadCompanies(this.data.filter(_isSelectedDomain));
    } else {
      this.company = PageMain.loadCompanies(this.data);
    }
  }

  _updateCompany(event) {
    this.companySelected = event.detail;

    console.log(`Company is ${event.detail}`, this.companySelected);
    this.dataView = this._updateDataView();
  }

  _updateDataView() {
    return this.data
      .filter(
        value =>
          this.domainsSelected.length === 0 || this.domainsSelected.indexOf(value.Domein) !== -1,
      )
      .filter(
        value =>
          this.companySelected.length === 0 || this.companySelected.indexOf(value.Fabrikant) !== -1,
      );
  }

  static _minRange(input) {
    return input
      .filter(
        middel =>
          middel.TotaleKosten !== undefined &&
          middel.TotaleKosten !== null &&
          middel.TotaleKosten !== 0,
      )
      .reduce(
        (min, middel) => (middel.TotaleKosten < min ? middel.TotaleKosten : min),
        input[0].TotaleKosten,
      );
  }

  static _maxRange(input) {
    return input.reduce(
      (max, middel) => (middel.TotaleKosten > max ? middel.TotaleKosten : max),
      input[0].TotaleKosten,
    );
  }

  static _minRangePP(input) {
    return input
      .filter(
        middel =>
          middel.TotaleKosten !== undefined &&
          middel.TotaleKosten !== null &&
          middel.TotaleKosten !== 0,
      )
      .reduce(
        (min, middel) =>
          middel.TotaleKosten / middel.Patientvolume < min
            ? middel.TotaleKosten / middel.Patientvolume
            : min,
        input[0].TotaleKosten / input[0].Patientvolume,
      );
  }

  static _maxRangePP(input) {
    return input
      .filter(
        middel =>
          middel.TotaleKosten !== undefined &&
          middel.TotaleKosten !== null &&
          middel.TotaleKosten !== 0,
      )
      .reduce(
        (max, middel) =>
          middel.TotaleKosten / middel.Patientvolume > max
            ? middel.TotaleKosten / middel.Patientvolume
            : max,
        input[0].TotaleKosten / input[0].Patientvolume,
      );
  }

  render() {
    return html`
      <div class="filters">
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
      </div>

      <!-- Magic here with domains and company -->
      <div class="list">
        <div class="list">
          <h2>Summary</h2>
          <p>
            <b>Min-max</b>
            ${this.euroFormatter.format(PageMain._minRange(this.dataView))} -
            ${this.euroFormatter.format(PageMain._maxRange(this.dataView))}
          </p>
          <p>
            <b>Min-max pp</b>
            ${this.euroFormatter.format(PageMain._minRangePP(this.dataView))} -
            ${this.euroFormatter.format(PageMain._maxRangePP(this.dataView))}
          </p>
        </div>

        <div class="list">
          <h2>Medicin</h2>
          ${this.dataView.map(
            (item, index) =>
              html`
                <div class="child">
                  <h3>${index + 1}. ${item.Stofnaam} by ${item.Fabrikant}</h3>
                  <p><b>${item.Hoofdindicatie}</b> ${item.UitgebreideIndicatie}</p>
                  <p>Domain: ${item.Domein}</p>
                  <p>Expected: ${item.VerwachteRegistratie}</p>
                  <p>Total costs: ${item.TotaleKosten}</p>
                </div>
              `,
          )}
        </div>
      </div>
    `;
  }
}
