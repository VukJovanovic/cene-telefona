
export const hideAlert = () => {
    const el = document.querySelector('.loginStyleMain');
    if (el) {
        el.parentElement.removeChild(el);
    }
}

export const showAlert = (type, message) => {
    hideAlert();
    const loginMessages = document.querySelector('.loginMessages');
    const markup = `<div class="loginStyleMain ${type}"><p>${message}</p></div>`
    loginMessages.insertAdjacentHTML('afterbegin', markup);
    window.setTimeout(hideAlert, 5000);
}
