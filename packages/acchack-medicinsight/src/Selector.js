import {
    html,
    css,
    LitElement
} from 'lit-element';

export class Selector extends LitElement {
    static get styles() {
        return css `
      .list{
        display: flex;
        flex-direction: column;
      }
  
      .group{
        border: 1px solid black;
        border-radius: 4px;
        padding: 8px; 
      }
  
      .group h2 {
        font-size: 16px;
      }
  
  
      `;
    }

    static get properties() {
        return {
            values: {
                type: Array,
            },
            selected: {
                type: Array,
            },
            title: {
                type: String,
            }

        };
    }

    constructor() {
        super()
        this.values = [];
        this.selected = [];
    }

    _clickValue(e) {
        const {
            target: {
                value
            }
        } = e;
        if (this.selected.indexOf(value) === -1) {
            this.selected.push(value);
        } else {
            this.selected = this.selected.filter(item => item !== value)
        }

        console.log(`Selected ${this.title}: ${this.selected}`);

    }

    render() {
        return html `<div class="group">
            <h2>${this.title}</h2>
            <div class="list">
          ${this.values.map(element => 
            html `<label><input type="checkbox" value="${element}" name="${this.title}" @click="${this._clickValue}">${element}</label>`
          )}
          </div>
          </div>
          `;
    }
}