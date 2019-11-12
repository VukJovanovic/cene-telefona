import '@babel/polyfill';
import { showAlert } from './alerts';
import { login, logout, listItems, api__deleteUser, api__createPhone, api__createCategory, api__deleteCategory, api__findPhone, api__createUser, api__findUser, api__updateUser } from './api_functions';

// admin login
const prijaviSe = document.querySelector('.prijaviSe')
// login form functionality
if (prijaviSe) {
    prijaviSe.addEventListener('click', function () {
        const email = document.querySelector('.inputEmail').value;
        const password = document.querySelector('.inputPassword').value;

        if (!email || !password) {
            showAlert('loginFail', 'Popunite oba polja!');
        } else {
            login(email, password);
        }
    });
}

// admin logout

const btn__logout = document.querySelector('.logout');
if (btn__logout) {
    btn__logout.addEventListener('click', function () {
        logout();
    });
}

// admin panel functions
const dodajKategoriju = document.querySelector('.dodajKategoriju');
const obrisiKategoriju = document.querySelector('.obrisiKategoriju');
const dodajTelefon = document.querySelector('.dodajTelefon');
const izmeniTelefon = document.querySelector('.izmeniTelefon');
const dodajRadnika = document.querySelector('.dodajRadnika');
const spisakRadnika = document.querySelector('.spisakRadnika');
const izmeniRadnika = document.querySelector('.izmeniRadnika');
const formDodajKategoriju = document.getElementById('formDodajKategoriju');
const formObrisiKategoriju = document.getElementById('formObrisiKategoriju');
const formDodajTelefon = document.getElementById('formDodajTelefon');
const formIzmeniTelefon = document.getElementById('formIzmeniTelefon');
const formDodajRadnika = document.getElementById('formDodajRadnika');
const formSpisakRadnika = document.getElementById('formSpisakRadnika');
const formIzmeniRadnika = document.getElementById('formIzmeniRadnika');


// ////////////////////// Category functions

// Showing form for adding new category
if (dodajKategoriju) {
    dodajKategoriju.addEventListener('click', function () {
        // hide other forms
        formObrisiKategoriju.style.display = 'none';
        formDodajTelefon.style.display = 'none';
        formDodajRadnika.style.display = 'none';
        formSpisakRadnika.style.display = 'none';
        formIzmeniRadnika.style.display = 'none';
        formIzmeniRadnika.style.display = 'none';
        formIzmeniTelefon.style.display = 'none';

        // display the form
        formDodajKategoriju.style.display = 'flex';
    });
}

// Creating new category
const btn__createCategory = document.getElementById('btn__createCategory');
if (btn__createCategory) {
    btn__createCategory.addEventListener('click', function () {

        const categoryName = document.getElementById('add__categoryName');

        const categoryInput = [categoryName]

        if (!categoryName.value) {
            showAlert('loginFail', 'Morate uneti naziv kategorije!');
        } else {
            api__createCategory(categoryName.value, categoryInput)
        }
    });
}

// Display all categories 
if (obrisiKategoriju) {
    obrisiKategoriju.addEventListener('click', function () {
        // hide other forms
        formDodajKategoriju.style.display = 'none';
        formDodajTelefon.style.display = 'none';
        formDodajRadnika.style.display = 'none';
        formSpisakRadnika.style.display = 'none';
        formIzmeniRadnika.style.display = 'none';
        formIzmeniTelefon.style.display = 'none';

        // get all categories from api
        formObrisiKategoriju.style.display = 'flex';
        listItems('http://127.0.0.1:3000/api/v1/kategorije', 'GET', formObrisiKategoriju, 'Obrisi Kategoriju');
    });
}


// Delete category
if (formObrisiKategoriju) {
    formObrisiKategoriju.addEventListener('click', function (e) {
        if (e.target.classList.contains('btn__deleteCategory')) {
            if (confirm('Da li ste sigurni da zelite da izbrisete ovu kategoriju?')) {
                let userID = e.target.id;
                api__deleteCategory(userID);
            }
            else {

            }
        }
    });
}

// ////////////////////////// Phone functions

// Showing form for adding new phone
if (dodajTelefon) {
    dodajTelefon.addEventListener('click', function () {
        // hide other forms
        formDodajKategoriju.style.display = 'none';
        formObrisiKategoriju.style.display = 'none';
        formDodajRadnika.style.display = 'none';
        formSpisakRadnika.style.display = 'none';
        formIzmeniRadnika.style.display = 'none';
        formIzmeniTelefon.style.display = 'none';

        // display the form
        formDodajTelefon.style.display = 'flex';
    });
}


// Adding new phone to the database
const btn__createPhone = document.getElementById('btn__createPhone');

if (btn__createPhone) {
    btn__createPhone.addEventListener('click', function () {
        const phoneName = document.getElementById('add__phoneName');
        const phoneModel = document.getElementById('add__phoneModel');
        const phoneYear = document.getElementById('add__phoneYear');
        const phoneCategory = document.getElementById('add__phoneCategory');
        const phonePricePol = document.getElementById('add__phonePricePol');
        const phonePriceNov = document.getElementById('add__phonePriceNov');

        const dodajTelefonInputFields = [phoneName, phoneModel, phoneYear, phoneCategory, phonePricePol, phonePriceNov]

        if (!phoneName.value || !phoneModel.value || !phoneYear.value || !phoneCategory.value || !phonePricePol.value || !phonePriceNov.value) {
            showAlert('loginFail', 'Popunite sva polja!');
        } else {
            api__createPhone(phoneName.value, phoneModel.value, phoneYear.value, phoneCategory.value, phonePricePol.value, phonePriceNov.value, dodajTelefonInputFields);
        }
    });
}

// Editing phone

if (izmeniTelefon) {
    izmeniTelefon.addEventListener('click', function () {
        // hide other forms
        formDodajKategoriju.style.display = 'none';
        formObrisiKategoriju.style.display = 'none';
        formDodajRadnika.style.display = 'none';
        formSpisakRadnika.style.display = 'none';
        formIzmeniRadnika.style.display = 'none';
        formDodajTelefon.style.display = 'none';

        // display the form
        formIzmeniTelefon.style.display = 'flex';
    });
}
const btn__updatePhone = document.getElementById('btn__findPhoneUpdate');
if (btn__updatePhone) {
    btn__updatePhone.addEventListener('click', function () {
        const updatePhoneSlug = document.getElementById('update_phoneSlug');
        const formParent = document.querySelector('.phoneUpdate__inputContainer');

        if (!updatePhoneSlug.value) {
            showAlert('loginFail', 'Popunite polje!');
        } else {
            api__findPhone(updatePhoneSlug.value, formParent);
        }
    });
}


// ///////////////////////////// User functions

// showing form for creating new user
if (dodajRadnika) {
    dodajRadnika.addEventListener('click', function () {
        formDodajKategoriju.style.display = 'none';
        formObrisiKategoriju.style.display = 'none';
        formDodajTelefon.style.display = 'none';
        formSpisakRadnika.style.display = 'none';
        formIzmeniRadnika.style.display = 'none';
        formIzmeniTelefon.style.display = 'none';

        formDodajRadnika.style.display = 'flex'
    });
}


// creating new user
const btn__createUser = document.getElementById('btn__createUser');

if (btn__createUser) {
    btn__createUser.addEventListener('click', function () {
        const userName = document.getElementById('add__userName');
        const userEmail = document.getElementById('add__userEmail');
        const userPassword = document.getElementById('add__userPassword');
        const userRole = document.getElementById('add__userRole');

        const userInputs = [userName, userEmail, userPassword, userRole];

        if (!userName.value || !userEmail.value || !userPassword || !userRole) {
            showAlert('loginFail', 'Popunite sva polja!');
        } else {
            api__createUser(userName.value, userEmail.value, userPassword.value, userRole.value, userInputs);
        }
    });
}

// Deleting user
if (formSpisakRadnika) {
    formSpisakRadnika.addEventListener('click', function (e) {
        if (e.target.classList.contains('btn__deleteUser')) {
            if (confirm('Da li ste sigurni da zelite da izbrisete ovog radnika?')) {
                let userID = e.target.id;
                api__deleteUser(userID);
            }
            else {

            }
        }
    });
}

// showing form for list of all users
if (spisakRadnika) {
    spisakRadnika.addEventListener('click', function () {
        formDodajKategoriju.style.display = 'none';
        formObrisiKategoriju.style.display = 'none';
        formDodajTelefon.style.display = 'none';
        formDodajRadnika.style.display = 'none';
        formIzmeniRadnika.style.display = 'none';
        formIzmeniTelefon.style.display = 'none';

        formSpisakRadnika.style.display = 'flex';
        listItems('http://127.0.0.1:3000/api/v1/radnici', 'GET', formSpisakRadnika, 'Spisak Radnika');
    })
}

// update user
if (izmeniRadnika) {
    izmeniRadnika.addEventListener('click', function () {
        formDodajKategoriju.style.display = 'none';
        formObrisiKategoriju.style.display = 'none';
        formDodajTelefon.style.display = 'none';
        formDodajRadnika.style.display = 'none';
        formSpisakRadnika.style.display = 'none';
        formIzmeniTelefon.style.display = 'none';

        formIzmeniRadnika.style.display = 'flex';
    });
}

const btn__findUser = document.getElementById('btn__findUser');

if (btn__findUser) {
    btn__findUser.addEventListener('click', function () {
        const userId = document.getElementById('update__userID')
        const userInfoEl = document.querySelector('.form__inputContainer');
        if (!userId.value) {
            showAlert('loginFail', 'Unesite ID korisnika!');
        } else {
            api__findUser(userId.value, userInfoEl);
        }
    });
}


if (formIzmeniRadnika) {
    formIzmeniRadnika.addEventListener('click', function (e) {
        if (e.target.id === 'btn__updateUser') {
            const userId = document.getElementById('update__userID');
            const userName = document.getElementById('update__userName');
            const userEmail = document.getElementById('update__userEmail');
            const userRole = document.getElementById('update__userRole');
            const userInfoEl = document.querySelector('.form__inputContainer');
            if (!userName.value || !userEmail.value || !userRole.value) {
                showAlert('loginFail', 'Polje ne sme ostati prazno!')
            } else {
                api__updateUser(userId.value, userName.value, userEmail.value, userRole.value, userInfoEl)
            }
        }
    });
}
