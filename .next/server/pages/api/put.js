"use strict";
(() => {
var exports = {};
exports.id = 780;
exports.ids = [780];
exports.modules = {

/***/ 661:
/***/ ((module) => {

module.exports = require("sqlite3");

/***/ }),

/***/ 3207:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((req, res)=>{
    const method = req.method;
    switch(method){
        case "POST":
            {
                const { number , name  } = req.body;
                const sqlite3 = __webpack_require__(661);
                const db = new sqlite3.Database("database/cars.db");
                const result = db.run("insert into cars(number,name) values(?,?)", number, name);
                res.status(200).json({
                    result
                });
                break;
            }
        default:
            {
                res.status(403).end();
            }
    }
});


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(3207));
module.exports = __webpack_exports__;

})();