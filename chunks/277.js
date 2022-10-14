exports.id = 277;
exports.ids = [277];
exports.modules = {

/***/ 2930:
/***/ ((module) => {

// Exports
module.exports = {
	"text": "hero_text__su18k",
	"title": "hero_title__1JBI0",
	"subtitle": "hero_subtitle__EvCTN"
};


/***/ }),

/***/ 5277:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Hero)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styles_hero_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2930);
/* harmony import */ var styles_hero_module_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styles_hero_module_css__WEBPACK_IMPORTED_MODULE_1__);


function Hero({ title , subtitle , imageOn =false  }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (styles_hero_module_css__WEBPACK_IMPORTED_MODULE_1___default().text),
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                        className: (styles_hero_module_css__WEBPACK_IMPORTED_MODULE_1___default().title),
                        children: title
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: (styles_hero_module_css__WEBPACK_IMPORTED_MODULE_1___default().subtitle),
                        children: subtitle
                    })
                ]
            }),
            imageOn && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("figure", {
                children: "[画像]"
            })
        ]
    });
}


/***/ })

};
;