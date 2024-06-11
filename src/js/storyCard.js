import { html, css, LitElement } from 'lit';
import axios from 'axios';
import Swal from 'sweetalert2';

class StoryCard extends LitElement {
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
    .card-image {
      width: 100%;
      height: 200px; /* Set a fixed height for all images */
      overflow: hidden; /* Hide overflow to ensure images fit within the specified height */
    }
    .card-image img {
      width: 100%;
      height: 100%;
      object-fit: cover; /* Cover the area without distortion */
    }
    .card-body {
      padding: 16px;
    }
    .card-body .title {
      margin: 0;
      font-size: 1.2em;
      font-weight: bold;
      cursor: pointer; /* Change cursor to pointer */
    }
    .card-body p {
      margin: 8px 0;
    }
    .title{
      text-align: center;
    }
  `;

  constructor() {
    super();
    this.story = {};
  }

  handleStoryClick() {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Unauthorized',
        text: 'Token tidak ditemukan. Silahkan login terlebih dahulu!.',
        confirmButtonText: 'OK'
      })
      .then(() => {
        // Redirect ke halaman login
        window.location.href = './loginStory.html';
      });
      return;
    }

    axios.get(`https://story-api.dicoding.dev/v1/stories/${this.story.id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      const storyDetail = response.data;
      this.showStoryModal(storyDetail);
    })
    .catch(error => {
      console.error('Error fetching story detail:', error);
    });
  }

  showStoryModal(storyDetail) {
    const modal = document.createElement('div');
    modal.innerHTML = `
      <div class="modal">
        <div class="modal-content">
          <span class="close">&times;</span>
          <h1 class="title-modal">Detail Story</h1>
          <img class="img-modal" src="${storyDetail.story.photoUrl}" alt="${storyDetail.story.name}" style="width:100%">
          <h2 class="name-modal">Name : ${storyDetail.story.name}</h2>
          <p class="detail-modal">Detail: ${storyDetail.story.description}</p>
          <p><small>Tanggal upload : ${new Date(storyDetail.story.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const closeModal = () => {
      modal.remove();
    };

    modal.querySelector('.close').addEventListener('click', closeModal);
  }

  render() {
    return html`
      <div class="card">
        <div class="card-image">
          <img src="${this.story.photoUrl}" alt="${this.story.name}" />
        </div>
        <div class="card-body">
          <h3 class="title" @click="${this.handleStoryClick}">${this.story.name}</h3>
          <p>${this.story.description}</p>
        </div>
      </div>
    `;
  }
}

customElements.define('story-card', StoryCard);
