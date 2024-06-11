import { LitElement, html, css } from 'lit';

class InputTextArea extends LitElement {
  static properties = {
    value: { type: String },
    placeholder: { type: String },
    required: { type: Boolean },
    errorMessage: { type: String },
    width: { type: String }
  };

  static styles = css`
    :host {
      display: block;
    }
    textarea {
      width: 100%;
      border: none;
      outline: none;
      box-shadow: none;
      resize: none;
      padding: 10px;
      font-size: 16px;
      border-radius: 8px;
      background-color: #f9f9f9;
      font-family: 'Times New Roman', Times, serif;
    }
    .error {
      display: none;
      color: red;
      font-size: 12px;
      margin-top: 4px;
      font-family: 'Times New Roman', Times, serif;
    }
  `;

  constructor() {
    super();
    this.value = '';
    this.placeholder = 'Enter text here...';
    this.required = false;
    this.errorMessage = 'This field is required.';
  }

  handleInput(event) {
    this.value = event.target.value;
    this.dispatchEvent(new CustomEvent('value-changed', {
      detail: { value: this.value }
    }));
  }

  render() {
    return html`
      <textarea 
        .value=${this.value}
        placeholder=${this.placeholder}
        @input=${this.handleInput}
        style="width: ${this.width};">
      </textarea>
          `;
  }
}

customElements.define('input-text-area', InputTextArea);
