export const displayCategories = (data, parentEl, heading) => {
    clearItems(parentEl);
    let markup = `<h2 class="form__heading">${heading}</h2>`;
    data.forEach(el => {
        markup += `
                <div class="form__group">
                    <label>Naziv:</label>
                    <input type="text" disabled value="${el.name}">
                    <a class='form__button btn__deleteCategory' id="${el._id}" href='#'>Izbrisi</a>
                </div>`
    });
    parentEl.insertAdjacentHTML('beforeend', markup);
}

export const displayUsers = (data, parentEl, heading) => {
    clearItems(parentEl);
    let markup = `<h2 class="form__heading">${heading}</h2>`;
    data.forEach(el => {
        markup += `
                <div class="form__group">
                    <label>Ime:</label>
                    <input type="text" disabled value="${el.name}">
                    <label>Email:</label>
                    <input type="text" disabled value="${el.email}">
                    <label>ID:</label>
                    <input type="text" disabled value="${el._id}">
                    <a class='form__button btn__deleteUser' id="${el._id}" href='#'>Izbrisi</a>
                </div>`
    });
    parentEl.insertAdjacentHTML('beforeend', markup);
}

export const deleteItemFromUI = (elementID) => {
    const el = document.getElementById(elementID);
    el.parentNode.parentNode.removeChild(el.parentNode);
}

export const userInfo = (data, parentEl) => {
    clearItems(parentEl);
    let markup = `
                    <div class="form__group">
                        <label>Ime:</label>
                        <input type="text" id="update__userName" value="${data.name}">
                    </div>
                    <div class="form__group">
                        <label>Email:</label>
                        <input type="text" id="update__userEmail" value="${data.email}">
                    </div>
                    <div class="form__group">
                        <label>Uloga:</label>
                        <input type="text" id="update__userRole" value="${data.role}">
                    </div>
                    <a href="#" class="form__button" id="btn__updateUser">Sacuvaj</a>
                `;
    parentEl.insertAdjacentHTML('beforeend', markup);
}

export const clearItems = (parentEl) => {
    parentEl.innerHTML = '';
}

export const clearFields = (niz) => {
    niz.forEach(el => {
        el.value = ''
    });
}