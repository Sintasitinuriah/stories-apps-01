import axios from 'axios';
import Swal from 'sweetalert2';

function handleFileChange(event) {
    const fileInput = document.getElementById('fileInput');
    const imagePreview = document.getElementById('imagePreview');
    const invalidFeedback = document.getElementById('fileValidationText');
    const invalidFeedbackTextArea = document.getElementById('textValidationText');

    if (fileInput.files.length > 0 && !fileInput.files[0].type.match('image.*')) {
        invalidFeedback.style.display = 'block';
        imagePreview.style.display = 'none';
    } else {
        invalidFeedback.style.display = 'none';
        imagePreview.src = URL.createObjectURL(fileInput.files[0]);
        imagePreview.style.display = 'block';
    }
}

function submitForm(event) {
    event.preventDefault(); // Prevent default form submission

    const fileInput = document.getElementById('fileInput');
    const textAreaComponent = document.querySelector('input-text-area');
    const imageDescription = textAreaComponent.value; // Mengambil nilai langsung dari properti value
    const invalidFeedback = document.getElementById('fileValidationText');
    const invalidFeedbackTextArea = document.getElementById('textValidationText');

    let isValid = true;

    if (!fileInput.files.length || !fileInput.files[0].type.match('image.*')) {
        invalidFeedback.style.display = 'block';
        isValid = false;
    } else {
        invalidFeedback.style.display = 'none';
    }

    if (!imageDescription) {
        invalidFeedbackTextArea.style.display = 'block';
        isValid = false;
    } else {
        invalidFeedbackTextArea.style.display = 'none';
    }

    if (isValid) {
        const token = localStorage.getItem('auth_token');
        if (!token) {
            alert('No authentication token found. Please log in first.');
            return;
        }

        const formData = new FormData();
        formData.append('photo', fileInput.files[0]);
        formData.append('description', imageDescription);

        axios.post('https://story-api.dicoding.dev/v1/stories', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log('File uploaded successfully:', response.data);
            Swal.fire({
                icon: 'success',
                title: 'Data berhasil ditambahkan',
                text: 'Anda akan diarahkan ke halaman Dashboard',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.href = 'dashboard.html';
            });
        })
        .catch(error => {
            console.error('Error uploading file:', error);
            Swal.fire({
                icon: 'error',
                title: 'Data gagal ditamabahkan',
                text: 'Silahkan periksa kembali data Anda!.'
            });
        });
    }
}


document.addEventListener('DOMContentLoaded', function () {
    const fileInput = document.getElementById('fileInput');
    const uploadForm = document.getElementById('uploadForm');

    if (fileInput) {
        fileInput.addEventListener('change', handleFileChange);
    }

    if (uploadForm) {
        uploadForm.addEventListener('submit', submitForm);
    }
});
