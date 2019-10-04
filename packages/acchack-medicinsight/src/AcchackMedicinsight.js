import { LitElement, html, css } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';

import './PageMain.js';

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
        <ul>
          <li>
            <a href="#main" class=${this.__addActiveIf('main')} @click=${this.__clickPageLink}
              >Main</a
            >
          </li>
        </ul>
      </header>

      <main>
        ${this._renderPage()}
      </main>
    `;
  }

  static get styles() {
    return [
      css`
        :host {
        }
      `,
    ];
  }
}
