import {
  html,
  css,
  LitElement
} from 'lit-element';

import horizonData from "../../../utils/horizonscan.js";

import '../checkbox-selector.js';

export class PageMain extends LitElement {
  static get styles() {
    return css `
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
        type: Object
      }
    };
  }

  constructor() {
    super()
    this.domains = ['Hank', 'Dussel'];
    this.domainsSelected = [];
    this.company = ['Lol', 'Lal'];
    this.companySelected = [];
    this.data = JSON.parse(horizonData);
  }

  render() {
    return html `
    <checkbox-selector .values="${this.domains}" .selected="${this.domainsSelected}" title="Domain"></checkbox-selector>
    <checkbox-selector .values="${this.company}" .selected="${this.companySelected}" title="Company"></checkbox-selector>

    <!-- Magic here with domains and company -->
        `;
  }
}