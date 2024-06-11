import { LitElement, html } from 'lit';
import { msg, updateWhenLocaleChanges } from '@lit/localize';
 
class FooterApp extends LitElement {
    constructor() {
        super();
        updateWhenLocaleChanges(this);
      }
    render() {
        return html`
        <locale-picker class="d-block mb-3"></locale-picker>
        <p class="text-center text-white mb-0">
        ${msg(`Dibuat dengan ❤ oleh Sinta Siti Nuriah`)}
        </p>
    `;
  }
}
 
customElements.define('footer-app', FooterApp);