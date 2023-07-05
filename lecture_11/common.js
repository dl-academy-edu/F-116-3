// Функция открытия/закрытия модального окна
function interactionModal(modal) {
    modal.classList.toggle('hidden');
}

// Ссылка на бек
const BASE_SERBER_PATH = 'https://academy.directlinedev.com';

function sendRequest({ url, method = 'GET', headers, body = null }) {
    return fetch(BASE_SERBER_PATH + url, {
        method,
        headers,
        body,
    });
}
function setErrorChecked(inputs, errorMessage) {
    const error = errorCreator(errorMessage);
    inputs[0].parentElement.parentElement
        .insertAdjacentElement('afterend', error);
    function handler() {
        error.remove();
        for (let input of [...inputs]) {
            input.removeEventListener('input', handler);
            input.classList.remove('is-invalid');
        }
    }
    for (let input of [...inputs]) {
        input.classList.add('is-invalid');

        input.addEventListener('input', handler, { once: true });
    }
}

function rerenderLinks() {
    const loginButton = document.querySelector('.j-login-button');
    const registerButton = document.querySelector('.j-register-button');
    // register-button_js || j-register-button || register-button--js
    const toProfileButton = document.querySelector('.j-to-profile');

    const isLogin = localStorage.getItem('token');

    if (isLogin) {
        // Токен присутствует
        loginButton.classList.add('hidden');
        registerButton.classList.add('hidden');
        toProfileButton.classList.remove('hidden');
    } else {
        // Токен отсутствует
        loginButton.classList.remove('hidden');
        registerButton.classList.remove('hidden');
        toProfileButton.classList.add('hidden');
    }
}

function setError(input, messageError) {
    if (input[0]) {
        setErrorChecked(input, messageError);
    } else {
        setErrorText(input, messageError);
    }
}

function setErrorText(input, errorMessage) {
    const error = errorCreator(errorMessage);
    input.classList.add('is-invalid');
    input.insertAdjacentElement('afterend', error);
    input.addEventListener('input', function () {
        error.remove();
        input.classList.remove('is-invalid');
    }, { once: true });
}

function errorCreator(message) {
    let messageError = document.createElement('div');
    messageError.classList.add('invalid-feedback');
    messageError.classList.add('invalid-feedback_js');
    messageError.innerText = message;
    return messageError;
}

function errorFormHandler(errors, form) {
    if (Object.keys(errors).length) {
        Object.keys(errors).forEach(key => {
            const messageError = errors[key];
            const input = form.elements[key];
            setError(input, messageError);
        })
        return;
    }
}

function clearErorrs(element) {
    const messages = element.querySelectorAll('.invalid-feedback_js');
    const invalids = element.querySelectorAll('.is-invalid');
    messages.forEach(message => message.remove());
    invalids.forEach(invalid => invalid.classList.remove('is-invalid'));
}