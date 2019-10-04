import { LitElement, html, css } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';

import '../page-main.js';

export class AcchackMedicinsight extends LitElement {
  static get properties() {
    return {
      title: {
        type: String,
      },
      page: {
        type: String,
      },
    };
  }

  constructor() {
    super();
    this.page = 'main';
  }

  static get styles() {
    return css`
      :host {
      }
      h1 {
        margin: 16px;

        font-weight: normal;
      }
    `;
  }

  _renderPage() {
    switch (this.page) {
      case 'main':
        return html`
          <page-main></page-main>
        `;
      default:
        return html`
          <p>Page not found try going to <a href="#main">Main</a></p>
        `;
    }
  }

  __clickPageLink(ev) {
    ev.preventDefault();
    this.page = ev.target.hash.substring(1);
  }

  __addActiveIf(page) {
    return classMap({
      active: this.page === page,
    });
  }

  render() {
    return html`
      <header>
        <h1>Medic<b>insight</b></h1>
      </header>

      <main>
        ${this._renderPage()}
      </main>
    `;
  }
}
