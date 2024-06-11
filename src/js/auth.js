import Swal from 'sweetalert2';
import axios from 'axios';

// Fungsi untuk login
function login() {
    // Ambil nilai dari form
    const email = document.getElementById('email_login').value;
    const password = document.getElementById('password_login').value;

    // Buat objek data untuk dikirim ke API
    const data = {
        email: email,
        password: password
    };

    // Kirim data ke API menggunakan Axios
    axios.post('https://story-api.dicoding.dev/v1/login', data)
        .then(function(response) {
            console.log("Response dari server:", response); // Periksa respons dari server

            // Simpan token di localStorage
            const token = response.data.loginResult.token;
            localStorage.setItem('auth_token', token);
            console.log("Token disimpan:", localStorage.getItem('auth_token')); // Cek apakah token disimpan

            // Tampilkan notifikasi sukses dengan SweetAlert
            Swal.fire({
                title: 'Login Berhasil!',
                text: 'Anda akan diarahkan ke halaman utama.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                // Redirect ke halaman utama
                window.location.href = './dashboard.html';
            });
        })
        .catch(function(error) {
            console.error("Error dalam permintaan:", error); // Periksa kesalahan permintaan
            // Ambil pesan error dari respons API
            let errorMessage = 'Terjadi kesalahan saat login.';
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            }

            // Tampilkan notifikasi error dengan SweetAlert
            Swal.fire({
                title: 'Login Gagal!',
                text: errorMessage,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        });
}
// Fungsi untuk signup
function signUp() {
    // Ambil nilai dari form
    const name = document.getElementById('name').value;
    const email = document.getElementById('email_signup').value;
    const password = document.getElementById('password_signup').value;

    // Buat objek data untuk dikirim ke API
    const data = {
        name: name,
        email: email,
        password: password
    };

    // Kirim data ke API menggunakan Axios
    axios.post('https://story-api.dicoding.dev/v1/register', data)
        .then(function(response) {
            // Tampilkan notifikasi sukses dengan SweetAlert
            Swal.fire({
                title: 'Pendaftaran Berhasil!',
                text: 'Anda akan diarahkan ke halaman login.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                // Redirect ke halaman login
                window.location.href = './loginStory.html';
            });
        })
        .catch(function(error) {
            // Ambil pesan error dari respons API
            let errorMessage = 'Terjadi kesalahan saat pendaftaran.';
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            }

            // Tampilkan notifikasi error dengan SweetAlert
            Swal.fire({
                title: 'Pendaftaran Gagal!',
                text: errorMessage,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        });
}

// Fungsi untuk logout
function logout() {
    // Hapus token dari localStorage
    localStorage.removeItem('auth_token');

    // Tampilkan notifikasi logout sukses dengan SweetAlert
    Swal.fire({
        title: 'Logout Berhasil!',
        text: 'Anda akan diarahkan ke halaman login.',
        icon: 'success',
        confirmButtonText: 'OK'
    }).then(() => {
        // Redirect ke halaman login
        window.location.href = './loginStory.html';
    });
}

// Fungsi untuk toggle password visibility
function togglePasswordVisibility(inputId, toggleId) {
    const passwordInput = document.getElementById(inputId);
    const toggle = document.getElementById(toggleId);
    
    if (passwordInput && toggle) {
        toggle.addEventListener('click', () => {
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                toggle.textContent = '🙈';
            } else {
                passwordInput.type = 'password';
                toggle.textContent = '👁️';
            }
        });
    }
}

// event listener untuk toggle password visibility
document.addEventListener('DOMContentLoaded', () => {
    togglePasswordVisibility('password_login', 'toggle-password-login');
    togglePasswordVisibility('password_signup', 'toggle-password-signup');
});

// event listener untuk tombol login jika ada
const loginButton = document.getElementById('btn-login');
if (loginButton) {
    loginButton.addEventListener('click', function(event) {
        event.preventDefault();
        login();
    });
}

// event listener untuk tombol signup jika ada
const signUpButton = document.getElementById('btn-signUp');
if (signUpButton) {
    signUpButton.addEventListener('click', function(event) {
        event.preventDefault();
        signUp();
    });
}

// event listener untuk tombol logout jika ada
const logoutLink = document.getElementById('logout');
if (logoutLink) {
    logoutLink.addEventListener('click', function(event) {
        event.preventDefault();
        logout();
    });
}