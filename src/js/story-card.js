import { html, css, LitElement } from 'lit';

class StoryCards extends LitElement {
  static properties = {
    story: { type: Object },
  };

  static styles = css`
    .card {
      border: 1px solid #ddd;
      border-radius: 4px;
      margin: 16px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      max-width: 300px;
    }
    .card-image img {
      width: 100%;
      min-width: 325px;
      height: auto;
    }
    .card-body {
      padding: 16px;
    }
    .card-body .title {
      margin: 0;
      font-size: 1.2em;
      font-weight: bold;
    }
    .card-body p {
      margin: 8px 0;
    }
  `;

  render() {
    return html`
      <div class="card">
        <div class="card-image">
          <img src="${this.story.photoUrl}" alt="${this.story.name}" />
        </div>
        <div class="card-body">
          <h3 class="title"><a href="#">${this.story.name}</a></h3>
          <p>${this.story.description}</p>
          <p><small>${new Date(this.story.createdAt).toLocaleDateString()}</small></p>
        </div>
      </div>
    `;
  }
}

customElements.define('card-story', StoryCards);
