import axios from 'axios';
import { showAlert } from './alerts';
import { displayCategories, displayUsers, userInfo } from './itemFunctions';
import { clearFields, deleteItemFromUI, clearItems } from './itemFunctions';

// Login in user
export const login = async (email, password) => {
    try {
        const res = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:3000/api/v1/radnici/login',
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
            url: 'http://127.0.0.1:3000/api/v1/radnici/logout',
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
        if (url === 'http://127.0.0.1:3000/api/v1/radnici') {
            displayUsers(res.data.data.radnici, parentElement, heading);
        } else if (url === 'http://127.0.0.1:3000/api/v1/kategorije') {
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
            url: 'http://127.0.0.1:3000/api/v1/kategorije',
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
            url: `http://127.0.0.1:3000/api/v1/kategorije/${categoryID}`
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
export const api__createPhone = async (naziv, model, godina, kategorija, cenaPol, cenaNov, fields) => {
    try {
        const res = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:3000/api/v1/telefoni',
            data: {
                name: naziv,
                model: model,
                year: godina,
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

// create new user
export const api__createUser = async (ime, email, sifra, uloga, fields) => {
    try {
        const res = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:3000/api/v1/radnici',
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
            url: `http://127.0.0.1:3000/api/v1/radnici/${userID}`
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
            url: `http://127.0.0.1:3000/api/v1/radnici/${userId}`
        });
        if (res.data.status === 'success') {
            userInfo(res.data.data.radnik, infoParent)
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
            url: `http://127.0.0.1:3000/api/v1/radnici/${userId}`,
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
