// Аутентификация
(function () {
    const modalLogin = document.querySelector('.j-modal-login');
    const btnLoginModalOpen = document.querySelector('.j-login-button');
    const btnLoginModalClose = document.querySelector('.j-close-modal-login');
    const loginForm = document.forms.loginForm;

    btnLoginModalOpen.addEventListener('click', () => {
        interactionModal(modalLogin);
    })

    btnLoginModalClose.addEventListener('click', () => {
        interactionModal(modalLogin);
    })

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let data = {};

        // validation step

        data.email = loginForm.elements.email.value;
        data.password = loginForm.elements.password.value;

        sendRequest({
            method: 'POST',
            url: '/api/users/login',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(async res => {
                const response = await res.json();
                if (response.success) {
                    console.log('Вы успешно вошли');
                    console.log(res);
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('userId', response.data.userId);
                    interactionModal(modalLogin);
                    setTimeout(() => {
                        location.pathname = 'lecture_11/profile';
                    }, 2000);
                } else {
                    throw response
                }
            })
            .catch((err) => {
                if (err._message) {
                    alert(err._message);
                }
            })
    })
})();

(function () {
    const openModalBtn = document.querySelector('.j-register-button');
    const modal = document.querySelector('.j-modal-register');
    const closeModalBtn = document.querySelector('.j-close-modal-register');
    const loader = document.querySelector('.loader_js');
    const regForm = document.forms.registerForm;

    regForm.addEventListener('submit', (e) => {
        e.preventDefault();
        loader.classList.remove('hidden');
        let data = {};
        data.email = registerForm.email.value;
        data.name = registerForm.name.value;
        data.surname = registerForm.surname.value;
        data.password = registerForm.password.value;
        data.location = registerForm.location.value;
        data.age = +registerForm.age.value;

        sendRequest({
            method: 'POST',
            url: '/api/users',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(async res => {
                const response = await res.json();
                if (response.success) {
                    alert('Пользователь успешно создан.' + response.data.id + ':' + response.data.email);
                } else {
                    throw response;
                }
            })
            .catch(err => {
                console.log(err);
                if (err?.errors) {
                    for (let error in err.errors) {
                        alert(err.errors[error]);
                    }
                }
            })
            .finally(() => {
                loader.classList.add('hidden');
                interactionModal(modal);
            })
    })

    openModalBtn.addEventListener('click', () => {
        interactionModal(modal);
    })

    closeModalBtn.addEventListener('click', () => {
        interactionModal(modal);
    })
})();