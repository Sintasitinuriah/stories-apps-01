import { html, css, LitElement } from 'lit';
import axios from 'axios';
import './storyCard';

class StoryList extends LitElement {
  static properties = {
    stories: { type: Array },
    loading: { type: Boolean }
  };

  static styles = css`
    .story-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      justify-content: center;
      gap: 16px;
    }

    .spinner {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    .spinner div {
      display: inline-block;
      width: 80px;
      height: 80px;
    }

    .spinner div:after {
      content: " ";
      display: block;
      width: 64px;
      height: 64px;
      margin: 8px;
      border-radius: 50%;
      border: 6px solid #000;
      border-color: #000 transparent #000 transparent;
      animation: spinner 1.2s linear infinite;
    }

    @keyframes spinner {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `;

  constructor() {
    super();
    this.stories = [];
    this.loading = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchStories();
  }

  async fetchStories() {
    this.loading = true;
    try {
      // Ambil token dari localStorage
      const token = localStorage.getItem('auth_token');
      
      if (!token) {
        throw new Error('Token tidak ditemukan. Silakan login terlebih dahulu.');
      }

      console.log("Token dibaca:", token); // Cek apakah token terbaca

      // Konfigurasi permintaan axios dengan header Authorization
      const response = await axios.get('https://story-api.dicoding.dev/v1/stories', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      this.stories = response.data.listStory;
    } catch (error) {
      console.error('Failed to fetch stories:', error);
    } finally {
      this.loading = false;
    }
  }

  render() {
    return html`
      ${this.loading
        ? html`<div class="spinner"><div></div></div>`
        : html`
          <div class="story-list">
            ${this.stories.map(story => html`<story-card .story=${story}></story-card>`)}
          </div>`
      }
    `;
  }
}

customElements.define('story-list', StoryList);
