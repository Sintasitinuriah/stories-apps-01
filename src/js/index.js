// Import our custom CSS
import '../sass/main.scss';

// Import components
import './storyCard';
import './storyList';
import './localPicker';
import './footerApp';
import './textAreainput';
import './story-list';
import './story-card';

// Import javascript file as needed
import './auth';
import './addStory';
import './addGuest';
// import './addNewStory';

(function () {
    const header = document.querySelector('header');
    const hamburgerButton = document.querySelector('#hamburger-btn');
    hamburgerButton.addEventListener('click', (event) => {
        document.querySelector('ul.nav-items').classList.toggle('active');
    });

    window.addEventListener('resize', (event) => {
        if (window.innerWidth > 768) {
            document.querySelector('ul.nav-items').classList.remove('active');
        }
    });

    document.addEventListener('scroll', (event) => {
        if (window.scrollY > 0) {
            header.querySelector('.navbar-wrapper').classList.add('scrolled');
        } else {
            header.querySelector('.navbar-wrapper').classList.remove('scrolled');
        }
    });

  //   window.handleFileChange = function(event) {
  //     const fileInput = document.getElementById('fileInput');
  //     const imagePreview = document.getElementById('imagePreview');
  //     const invalidFeedback = document.getElementById('fileValidationText');
  //     const invalidFeedbackTextArea = document.getElementById('textValidationText');
  
  //     if (fileInput.files.length > 0 && !fileInput.files[0].type.match('image.*')) {
  //         invalidFeedback.style.display = 'block';
  //         imagePreview.style.display = 'none';
  //     } else {
  //         invalidFeedback.style.display = 'none';
  //         imagePreview.src = URL.createObjectURL(fileInput.files[0]);
  //         imagePreview.style.display = 'block';
  //     }
  // }
  
  // document.getElementById('uploadForm').addEventListener('submit', function(event) {
  //     event.preventDefault(); // Prevent default form submission
  
  //     const fileInput = document.getElementById('fileInput');
  //     const textAreaComponent = document.querySelector('input-text-area');
  //     const imageDescription = textAreaComponent.value; // Mengambil nilai langsung dari properti value
  //     const invalidFeedback = document.getElementById('fileValidationText');
  //     const invalidFeedbackTextArea = document.getElementById('textValidationText');
  
  //     let isValid = true;
  
  //     if (!fileInput.files.length || !fileInput.files[0].type.match('image.*')) {
  //         invalidFeedback.style.display = 'block';
  //         isValid = false;
  //     } else {
  //         invalidFeedback.style.display = 'none';
  //     }
  
  //     if (!imageDescription) {
  //         invalidFeedbackTextArea.style.display = 'block';
  //         isValid = false;
  //     } else {
  //         invalidFeedbackTextArea.style.display = 'none';
  //     }
  
  //     if (isValid) {
  //         const token = localStorage.getItem('auth_token');
  //         if (!token) {
  //             alert('No authentication token found. Please log in first.');
  //             return;
  //         }
  
  //         const formData = new FormData();
  //         formData.append('photo', fileInput.files[0]);
  //         formData.append('description', imageDescription);
  
  //         axios.post('https://story-api.dicoding.dev/v1/stories', formData, {
  //             headers: {
  //                 'Content-Type': 'multipart/form-data',
  //                 'Authorization': `Bearer ${token}`
  //             }
  //         })
  //         .then(response => {
  //             console.log('File uploaded successfully:', response.data);
  //             Swal.fire({
  //                 icon: 'success',
  //                 title: 'Success',
  //                 text: 'File uploaded successfully!',
  //                 confirmButtonText: 'Go to Dashboard'
  //             }).then(() => {
  //                 window.location.href = 'dashboard.html';
  //             });
  //         })
  //         .catch(error => {
  //             console.error('Error uploading file:', error);
  //             Swal.fire({
  //                 icon: 'error',
  //                 title: 'Error',
  //                 text: 'Error uploading file. Please try again.'
  //             });
  //         });
  //     }
  // });     
})();
