/******/ (function (modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if (installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
      /******/
    }
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
      /******/
    };
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
    /******/
  }
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function (exports, name, getter) {
/******/ 		if (!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
      /******/
    }
    /******/
  };
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function (exports) {
/******/ 		if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      /******/
    }
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
    /******/
  };
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function (value, mode) {
/******/ 		if (mode & 1) value = __webpack_require__(value);
/******/ 		if (mode & 8) return value;
/******/ 		if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if (mode & 2 && typeof value != 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
    /******/
  };
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function (module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
    /******/
  };
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
  /******/
})
/************************************************************************/
/******/({

/***/ 2:
/***/ (function (module, exports) {

      ////////////////////////////////// Animations for the main menu //////////////////////////////////////////
      // Html elements for the main menu
      // right side
      var mainMenuButton = document.querySelectorAll('.openMenu');
      var mainMenuContainer = document.querySelector('.mainMenu__container');
      var mainMenuContent = document.querySelector('.mainMenu__container-content');
      var mainMenuButtonGoBack = document.querySelector('.goBack');
      var mainMenuButtonGoHome = document.querySelector('.goHome'); // left side

      var mainMenuLeftSide = document.querySelector('.mainMenu__container-content--left');
      var mainMenuFooter = document.querySelector('.mainMenu__container-footer'); // Showing the main menu

      if (mainMenuButton[0]) {
        mainMenuButton[0].addEventListener('click', showMenu);
      }
      if (mainMenuButton[1]) {
        mainMenuButton[1].addEventListener('click', showMenu);
      }


      function showMenu() {
        TweenMax.to(mainMenuContainer, .5, {
          display: 'grid',
          opacity: 1,
          width: '100vw',
          height: '100%'
        });
        TweenMax.to(mainMenuContainer, .5, {
          borderRadius: 0,
          delay: .3
        });
        TweenMax.to(mainMenuContent, .2, {
          display: 'grid',
          delay: .5
        });
        TweenMax.to(mainMenuButtonGoBack, .5, {
          x: 0,
          opacity: 1,
          delay: .6
        });
        TweenMax.to(mainMenuButtonGoHome, .5, {
          x: 0,
          opacity: 1,
          delay: .8
        });
        TweenMax.to(mainMenuLeftSide, .5, {
          opacity: 1,
          delay: .9
        });
        TweenMax.to(mainMenuFooter, .5, {
          y: 0,
          opacity: 1,
          delay: .9
        });
      } // Hiding the main menu

      if (mainMenuButtonGoBack) {
        mainMenuButtonGoBack.addEventListener('click', function () {
          TweenMax.to(mainMenuContainer, .5, {
            display: 'none',
            width: 0,
            height: 0,
            opacity: 0,
            borderRadius: '0px 0px 0px 100px'
          });
          TweenMax.to(mainMenuContent, 0, {
            display: 'none'
          });
          TweenMax.to(mainMenuButtonGoBack, .3, {
            x: '40px',
            opacity: 0
          });
          TweenMax.to(mainMenuButtonGoHome, .3, {
            x: '40px',
            opacity: 0
          });
          TweenMax.to(mainMenuLeftSide, .5, {
            opacity: 0
          });
          TweenMax.to(mainMenuFooter, .5, {
            y: '20px',
            opacity: 0
          });
        });
      }
      ////////////////////////////////// Animations for contact us button //////////////////////////////////////////
      // Html elements on the contact us button
      // const contactButton = document.querySelector('.contact__content-button');
      // const contactContent = document.querySelector('.contact__content');
      // const contactContentClose = document.querySelector('.contact__content-close');
      // const contactForm = document.querySelector('.contact__content-form');
      // const contactFormTitle = document.querySelector('.contact__content-form--title');
      // const inputImePrezime = document.getElementById('imePrezime');
      // const inputEmail = document.getElementById('email');
      // const inputPoruka = document.getElementById('poruka');
      // const inputPosalji = document.getElementById('posalji');
      // // Showing contact form on contact button click
      // contactButton.addEventListener('click', function () {
      //     TweenMax.to(contactButton, 0, { display: 'none', opacity: 0 });
      //     TweenMax.to(contactContent, .5, { height: '500px', paddingTop: '6rem' });
      //     TweenMax.to(contactContentClose, .5, { display: 'block', y: '2rem', delay: .3 });
      //     TweenMax.to(contactForm, .2, { display: 'block', delay: .3 });
      //     TweenMax.to(contactFormTitle, .5, { x: 0, opacity: 1, delay: .5 });
      //     TweenMax.to(inputImePrezime, .5, { x: 0, opacity: 1, delay: .6 });
      //     TweenMax.to(inputEmail, .5, { x: 0, opacity: 1, delay: .7 });
      //     TweenMax.to(inputPoruka, .5, { x: 0, opacity: 1, delay: .8 });
      //     TweenMax.to(inputPosalji, .5, { x: 0, opacity: 1, delay: .9 });
      // });
      // // Hide contact form on close button click
      // contactContentClose.addEventListener('click', function () {
      //     TweenMax.to(contactContentClose, .0, { display: 'none', y: '-2rem' });
      //     TweenMax.to(inputImePrezime, 0, { x: '-30px', opacity: 0 });
      //     TweenMax.to(inputPosalji, .5, { x: '-30px', opacity: 0 });
      //     TweenMax.to(inputPoruka, .5, { x: '-30', opacity: 0 });
      //     TweenMax.to(inputEmail, 0, { x: '-30px', opacity: 0 });
      //     TweenMax.to(contactForm, .0, { display: 'none' });
      //     TweenMax.to(contactFormTitle, .0, { x: '-30px', opacity: 0 });
      //     if (screen.width <= 1024) {
      //         TweenMax.to(contactContent, .5, { height: '5rem', paddingTop: '0rem' });
      //     } else {
      //         TweenMax.to(contactContent, .5, { height: '3.5rem', paddingTop: '0rem' });
      //     }
      //     TweenMax.to(contactButton, .4, { display: 'block', opacity: 1, delay: .5 });
      // });

      /***/
    })

  /******/
});