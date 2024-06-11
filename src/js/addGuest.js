import axios from 'axios';
import Swal from 'sweetalert2';

document.addEventListener('DOMContentLoaded', function () {
    const fileInput = document.getElementById('fileInputGuest');
    const uploadForm = document.getElementById('uploadFormGuest');

    if (fileInput) {
        fileInput.addEventListener('change', handleFileChangeGuest);
    }

    if (uploadForm) {
        uploadForm.addEventListener('submit', addStoryWithoutAuthorization);
    }
});

function addStoryWithoutAuthorization(event) {
    event.preventDefault(); // Prevent default form submission

    const fileInput = document.getElementById('fileInputGuest');
    const textAreaComponent = document.querySelector('input-text-area');
    const imageDescription = textAreaComponent.value; // Mengambil nilai langsung dari properti value
    const invalidFeedback = document.getElementById('fileValidationTextGuest');
    const invalidFeedbackTextArea = document.getElementById('textValidationTextGuest');

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
        const formData = new FormData();
        formData.append('photo', fileInput.files[0]);
        formData.append('description', imageDescription);

        axios.post('https://story-api.dicoding.dev/v1/stories/guest', formData)
        .then(response => {
            console.log('File uploaded successfully:', response.data);
            Swal.fire({
                icon: 'success',
                title: 'Data berhasil ditambahkan',
                text: 'Anda akan diarahkan ke halaman Dashboard',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.href = 'index.html';
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

function handleFileChangeGuest(event) {
    const fileInput = document.getElementById('fileInputGuest');
    const imagePreview = document.getElementById('imagePreviewGuest');
    const invalidFeedback = document.getElementById('fileValidationTextGuest');
    const invalidFeedbackTextArea = document.getElementById('textValidationTextGuest');

    if (fileInput.files.length > 0 && !fileInput.files[0].type.match('image.*')) {
        invalidFeedback.style.display = 'block';
        imagePreview.style.display = 'none';
    } else {
        invalidFeedback.style.display = 'none';
        imagePreview.src = URL.createObjectURL(fileInput.files[0]);
        imagePreview.style.display = 'block';
    }
}
