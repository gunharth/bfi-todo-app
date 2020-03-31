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
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controller */ "./src/controller.js");
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}


var controller = new _controller__WEBPACK_IMPORTED_MODULE_0__["Controller"]();

/***/ }),

/***/ "./src/app.scss":
/*!**********************!*\
  !*** ./src/app.scss ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./src/controller.js":
/*!***************************!*\
  !*** ./src/controller.js ***!
  \***************************/
/*! exports provided: Controller */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Controller", function() { return Controller; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* structure
<main>
    <article>
        <div>Brot</div>
        <button data-index="0" data-action="edit">Editieren</button>
        <button data-index="0" data-action="delete">Löschen</button>
    </article>
</main>
*/
var Controller = /*#__PURE__*/function () {
  function Controller() {
    var _this = this;

    _classCallCheck(this, Controller);

    this.model = this.getLocalStorage();
    this.edit = -1; // add Todos

    this.eingabe = document.getElementById("todo-input");
    this.einfuegen = document.querySelector("#todo-add");
    this.einfuegen.addEventListener("click", function () {
      return _this.addTodo();
    }); // edit Todos

    this.main = document.querySelector("main");
    this.main.addEventListener("click", function (e) {
      return _this.action(e);
    }); // load todos in local storage

    this.render(); // Execute a function when the user releases a key on the keyboard

    document.addEventListener("keyup", function (event) {
      // Number 13 is the "Enter" key on the keyboard
      if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault(); // Trigger the button element with a click

        _this.einfuegen.click();
      }
    });
  } // edit, save and delete Todos


  _createClass(Controller, [{
    key: "action",
    value: function action(e) {
      var source = e.target;

      if (source.dataset.action == "delete") {
        this.removeTodo(source.dataset.index);
      } else if (source.dataset.action == "edit") {
        this.edit = source.dataset.index;
        this.render();
      } else if (source.dataset.action == "save") {
        var input = document.querySelector("main input").value;
        this.model[this.edit] = input;
        this.setLocalStorage();
        this.edit = -1;
        this.render();
      }
    } // remove Todo

  }, {
    key: "removeTodo",
    value: function removeTodo(index) {
      this.model.splice(index, 1);
      this.setLocalStorage();
      this.render();
    } // add Todo

  }, {
    key: "addTodo",
    value: function addTodo() {
      var value = this.eingabe.value;

      if (value != "") {
        this.model.push(value);
        this.eingabe.value = "";
        this.setLocalStorage();
        this.render();
      }
    } // get todos from local Storage

  }, {
    key: "getLocalStorage",
    value: function getLocalStorage() {
      // aussage (ja/nein) ? ja tu was : nein tu was;
      return localStorage.getItem("modelStorage") ? JSON.parse(localStorage.getItem("modelStorage")) : []; // if (localStorage.getItem('modelStorage')) {
      //     return JSON.parse(localStorage.getItem('modelStorage'));
      // }
      // return [];
    } // save Todos to local Storage

  }, {
    key: "setLocalStorage",
    value: function setLocalStorage() {
      localStorage.setItem("modelStorage", JSON.stringify(this.model));
    } // loop through todos and display on page

  }, {
    key: "render",
    value: function render() {
      this.main.innerHTML = "";

      for (var i = 0; i < this.model.length; i++) {
        var article = document.createElement("article");
        var text = document.createElement("div");
        var button1 = document.createElement("button");
        button1.dataset.index = i;

        if (i == this.edit) {
          var edit = document.createElement("input");
          edit.value = this.model[i];
          text.appendChild(edit);
          button1.innerHTML = "Speichern";
          button1.dataset.action = "save";
        } else {
          text.innerHTML = this.model[i];
          button1.innerHTML = "Editieren";
          button1.dataset.action = "edit";
        }

        var button2 = document.createElement("button");
        button2.innerHTML = "Löschen";
        button2.dataset.index = i;
        button2.dataset.action = "delete";
        article.appendChild(text);
        article.appendChild(button1);
        article.appendChild(button2);
        this.main.appendChild(article);
      }
    }
  }]);

  return Controller;
}();

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