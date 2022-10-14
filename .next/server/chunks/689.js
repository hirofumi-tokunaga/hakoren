"use strict";
exports.id = 689;
exports.ids = [689];
exports.modules = {

/***/ 3689:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ Meta)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(968);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
;// CONCATENATED MODULE: ./lib/constants.js
const siteMeta = {
    siteTitle: "車両管理システム",
    siteDesc: "車両管理システムです",
    siteUrl: "https://******",
    siteLang: "ja",
    siteLocale: "ja_JP",
    siteType: "website",
    siteIcon: "/favicon.png"
};

;// CONCATENATED MODULE: ./components/meta.js



// サイトに関する情報

const { siteTitle , siteDesc , siteUrl , siteLocale , siteType , siteIcon  } = siteMeta;
function Meta({ pageTitle , pageDesc , pageImg , pageImgW , pageImgH  }) {
    // ページのタイトル
    const title = pageTitle ? `${pageTitle} | ${siteTitle}` : siteTitle;
    // ページの説明
    const desc = pageDesc ?? siteDesc;
    // ページのURL
    const router = (0,router_.useRouter)();
    const url = `${siteUrl}${router.asPath}`;
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)((head_default()), {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("title", {
                children: title
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                property: "og:title",
                content: `${pageTitle} | ${siteTitle}`
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                name: "description",
                content: desc
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                property: "og:description",
                content: desc
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("link", {
                rel: "canonical",
                href: url
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                property: "og:url",
                content: url
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                property: "og:site_name",
                content: siteTitle
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                property: "og:type",
                content: siteType
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                property: "og:locale",
                content: siteLocale
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("link", {
                rel: "icon",
                href: siteIcon
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("link", {
                rel: "apple-touch-icon",
                href: siteIcon
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                name: "twitter:card",
                content: "summary_large_image"
            })
        ]
    });
}


/***/ })

};
;