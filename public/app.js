/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
} // network status online / offline


var networkStatus = document.getElementById("networkStatus");
window.addEventListener("load", function () {
  function handleNetworkChange(event) {
    if (navigator.onLine) {
      networkStatus.classList.remove("offline");
    } else {
      networkStatus.classList.add("offline");
    }
  }

  window.addEventListener("online", handleNetworkChange);
  window.addEventListener("offline", handleNetworkChange);
}); // start the app ...

var model = getLocalStorage(); // todo list

var main = document.querySelector("main");
var eingabe = document.getElementById("todo-input");
var einfuegen = document.querySelector("#todo-add");
var edit = -1;
render();
document.addEventListener("keyup", function (e) {
  e.preventDefault();

  if (e.keyCode === 13) {
    addTodo();
  }
});
einfuegen.addEventListener("click", function (e) {
  e.preventDefault();
  addTodo();
});
main.addEventListener("click", function (e) {
  e.preventDefault();
  action(e);
});

function action(e) {
  var index = e.target.dataset.index;
  var action = e.target.dataset.action;

  if (!index) {
    return;
  }

  if (action === 'delete') {
    removeTodo(index);
  } else if (action === 'edit') {
    edit = index;
    render();
  } else {
    var input = document.querySelector("main input").value;
    model[edit] = input;
    setLocalStorage();
    edit = -1;
    render();
  }
}

function addTodo() {
  var value = eingabe.value;

  if (value != "") {
    model.push(value);
    eingabe.value = "";
    eingabe.focus();
    setLocalStorage();
    render();
  }
}

function removeTodo(index) {
  model.splice(index, 1);
  setLocalStorage();
  render();
} // <article>todo 4</article>


function render() {
  main.innerHTML = "";

  for (var i = 0; i < model.length; i++) {
    var article = document.createElement("article");
    var text = document.createElement('div');
    var button1 = document.createElement('button');
    button1.dataset.index = i;

    if (i == edit) {
      var _edit = document.createElement('input');

      _edit.value = model[i];
      text.appendChild(_edit);
      button1.innerHTML = 'Speichern';
      button1.dataset.action = 'save';
    } else {
      text.innerHTML = model[i];
      button1.innerHTML = 'Editieren';
      button1.dataset.action = 'edit';
    }

    var button2 = document.createElement('button');
    button2.innerHTML = 'Löschen';
    button2.dataset.index = i;
    button2.dataset.action = 'delete';
    article.appendChild(text);
    article.appendChild(button1);
    article.appendChild(button2);
    main.appendChild(article);
  }
}

function getLocalStorage() {
  return localStorage.getItem("model") ? JSON.parse(localStorage.getItem("model")) : [];
}

function setLocalStorage() {
  localStorage.setItem("model", JSON.stringify(model));
}

/***/ }),

/***/ "./src/app.scss":
/*!**********************!*\
  !*** ./src/app.scss ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!*****************************************!*\
  !*** multi ./src/app.js ./src/app.scss ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/Guni/Code/bfi/code/todo-app/src/app.js */"./src/app.js");
module.exports = __webpack_require__(/*! /Users/Guni/Code/bfi/code/todo-app/src/app.scss */"./src/app.scss");


/***/ })

/******/ });