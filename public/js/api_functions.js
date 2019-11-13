import axios from 'axios';
import { showAlert } from './alerts';
import { displayCategories, displayUsers, userInfo, phoneInfo, phoneDeleteInfo } from './itemFunctions';
import { clearFields, deleteItemFromUI, clearItems } from './itemFunctions';

// Login in user
export const login = async (email, password) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/radnici/login',
            data: {
                email,
                password
            }
        });
        if (res.data.status === 'success') {
            showAlert('loginSuccess', 'Uspesno ste se ulogovali!');
            window.setTimeout(() => {
                location.assign('/admin/panel');
            }, 1500);
        }
    } catch (err) {
        showAlert('loginFail', err.response.data.message);
    }
}

// logout user
export const logout = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: '/api/v1/radnici/logout',
        });
        if (res.data.status === 'success') {
            window.setTimeout(() => {
                location.assign('/admin/login');
            }, 1000);
        }
    } catch (err) {
        showAlert('loginFail', 'Doslo je do greske, probajte kasnije.');
    }
}

// Listing data from api
export const listItems = async (url, method, parentElement, heading) => {
    try {
        const res = await axios({
            method: method,
            url: url
        });
        if (url === '/api/v1/radnici') {
            displayUsers(res.data.data.radnici, parentElement, heading);
        } else if (url === '/api/v1/kategorije') {
            displayCategories(res.data.data.kategorije, parentElement, heading)
        }
    } catch (err) {
        showAlert('loginFail', err.response.data.message);
    }
}

// creating new category
export const api__createCategory = async (naziv, fields) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/kategorije',
            data: {
                name: naziv,
            }
        });
        if (res.data.status === 'success') {
            showAlert('loginSuccess', 'Kategorija uspesno dodata!');
            clearFields(fields);
        }
    } catch (err) {
        showAlert('loginFail', err.response.data.message);
    }
}

// Delete category
export const api__deleteCategory = async (categoryID) => {
    try {
        const res = await axios({
            method: 'DELETE',
            url: `/api/v1/kategorije/${categoryID}`
        });
        if (res.data.status === 'success') {
            showAlert('loginSuccess', 'Kategorija uspesno izbrisana!');
            deleteItemFromUI(categoryID);
        }
    } catch (err) {
        showAlert('loginFail', err.response.data.message);
    }
}

// creating new phone
export const api__createPhone = async (naziv, model, godina, mesec, kategorija, cenaPol, cenaNov, fields) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/telefoni',
            data: {
                name: naziv,
                model: model,
                year: godina,
                month: mesec,
                category: kategorija,
                pricePol: cenaPol,
                priceNov: cenaNov
            }
        });
        if (res.data.status === 'success') {
            showAlert('loginSuccess', 'Telefon uspesno dodat!');
            clearFields(fields);
        }
    } catch (err) {
        showAlert('loginFail', err.response.data.message);
    }
}

// find phone
export const api__findPhone = async (slug, parentEl, action) => {
    try {
        const res = await axios({
            method: 'GET',
            url: `/api/v1/telefoni/${slug}`,
        });
        if (res.data.status === 'success') {
            if (action === 'update') {
                phoneInfo(res.data.data.telefon[0], parentEl)
            } else if (action === 'delete') {
                phoneDeleteInfo(res.data.data.telefon[0], parentEl);
            }
        }
    } catch (err) {
        showAlert('loginFail', err.response.data.message);
    }
}

// update phone
export const api__updatePhone = async (parentEl, slug, name, model, year, month, category, pricePol, priceNov, fields) => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: `/api/v1/telefoni/${slug}`,
            data: {
                name,
                model,
                year,
                month,
                category,
                pricePol,
                priceNov
            }
        });
        if (res.data.status === 'success') {
            showAlert('loginSuccess', 'Telefon uspesno izmenjen!');
            clearFields(fields);
            clearItems(parentEl);
        }
    } catch (err) {
        showAlert('loginFail', err.response.data.message);
    }
};

// delete phone
export const api__deletePhone = async (slug, parentEl, fields) => {
    try {
        const res = await axios({
            method: 'DELETE',
            url: `/api/v1/telefoni/${slug}`
        });
        if (res.data.status === 'success') {
            showAlert('loginSuccess', 'Telefon uspesno obrisan!');
            clearFields(fields);
            clearItems(parentEl);
        }
    } catch (err) {
        showAlert('loginFail', err.response.data.message);
    }
}

// create new user
export const api__createUser = async (ime, email, sifra, uloga, fields) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/radnici',
            data: {
                name: ime,
                email: email,
                password: sifra,
                role: uloga
            }
        });
        if (res.data.status === 'success') {
            showAlert('loginSuccess', 'Radnik uspesno kreiran!');
            clearFields(fields);
        }
    } catch (err) {
        showAlert('loginFail', err.response.data.message);
    }
}

export const api__deleteUser = async (userID) => {
    try {
        const res = await axios({
            method: 'DELETE',
            url: `/api/v1/radnici/${userID}`
        });
        if (res.data.status === 'success') {
            showAlert('loginSuccess', 'Radnik je uspesno izbrisan!');
            deleteItemFromUI(userID);
        }
    } catch (err) {
        showAlert('loginFail', err.response.data.message);
    }
}

// find user and display his data
export const api__findUser = async (userId, infoParent) => {
    try {
        const res = await axios({
            method: 'GET',
            url: `/api/v1/radnici/${userId}`
        });
        if (res.data.status === 'success') {
            userInfo(res.data.data.radnik, infoParent)
        } else {
            console.log('prazan');
        }
    } catch (err) {
        showAlert('loginFail', err.response.data.message);
    }
}

// update user
export const api__updateUser = async (userId, userName, userEmail, userRole, parentEl) => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: `/api/v1/radnici/${userId}`,
            data: {
                name: userName,
                email: userEmail,
                role: userRole
            }
        });
        if (res.data.status === 'success') {
            showAlert('loginSuccess', 'Radnik uspesno izmenjen!');
            clearItems(parentEl);
        }
    } catch (err) {
        showAlert('loginFail', err.response.data.message);
    }
}
