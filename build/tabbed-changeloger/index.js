/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/tabbed-changeloger/edit.js":
/*!****************************************!*\
  !*** ./src/tabbed-changeloger/edit.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__);





function Edit({
  attributes,
  setAttributes,
  clientId
}) {
  const {
    activeTab
  } = attributes;
  const [selectedTab, setSelectedTab] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(activeTab || 0);
  const [tabItems, setTabItems] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]);

  // Ensure at least one tab exists when the component mounts
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const blocks = wp.data.select('core/block-editor').getBlocksByClientId(clientId)[0]?.innerBlocks || [];

    // Insert a default tab if no tabs exist
    if (blocks.length === 0) {
      const defaultTab = (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__.createBlock)('cha/changeloger', {
        title: 'Tab 1'
      });
      wp.data.dispatch('core/block-editor').insertBlock(defaultTab, 0, clientId);
    } else {
      setTabItems(blocks);
    }
  }, [clientId]); // This effect only runs once on mount

  // Add a new tab when the button is clicked
  const addTab = () => {
    const newTab = (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__.createBlock)('cha/changeloger', {
      title: `Tab ${tabItems.length + 1}`
    });
    wp.data.dispatch('core/block-editor').insertBlock(newTab, tabItems.length, clientId);
  };

  // Update tabItems after a new tab is added
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const blocks = wp.data.select('core/block-editor').getBlocksByClientId(clientId)[0]?.innerBlocks || [];
    setTabItems(blocks);
  }, [clientId, tabItems.length]); // This will update tabItems every time the number of inner blocks changes

  // Track the selected tab and update activeTab
  const handleTabClick = index => {
    setSelectedTab(index);
    setAttributes({
      activeTab: index
    }); // Track active tab in attributes
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...(0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)()
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tabs-header"
  }, tabItems.map((tab, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    key: index,
    className: selectedTab === index ? 'active' : '',
    onClick: () => handleTabClick(index)
  }, tab.attributes?.title || `Tab ${index + 1}`)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    className: "add-tab",
    onClick: addTab
  }, "+ Add Tab")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tabs-content"
  }, tabItems.map((tab, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: index,
    className: `tab-panel ${selectedTab === index ? 'active' : 'hidden'}`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks, {
    allowedBlocks: ['cha/changeloger'],
    template: [['cha/changeloger', {}]]
  })))));
}

/***/ }),

/***/ "./src/tabbed-changeloger/index.js":
/*!*****************************************!*\
  !*** ./src/tabbed-changeloger/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.scss */ "./src/tabbed-changeloger/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./edit */ "./src/tabbed-changeloger/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./save */ "./src/tabbed-changeloger/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./block.json */ "./src/tabbed-changeloger/block.json");

/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * Internal dependencies
 */




/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_5__.name, {
  icon: {
    src: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
      width: "20",
      height: "20",
      viewBox: "0 0 77 77",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
      d: "M70.9 76.2455H5.34545C2.3939 76.2455 0 73.8516 0 70.9V5.34545C0 2.3939 2.3939 0 5.34545 0H70.9C73.8516 0 76.2455 2.3939 76.2455 5.34545V70.9C76.2455 73.8516 73.8516 76.2455 70.9 76.2455Z",
      fill: "#29235C"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
      d: "M44.0745 14.8029H28.1813C27.8623 14.8029 27.6011 14.5442 27.6011 14.2227V12.3437C27.6011 12.0247 27.8598 11.7635 28.1813 11.7635H44.0745C44.3935 11.7635 44.6548 12.0222 44.6548 12.3437V14.2227C44.6523 14.5442 44.3935 14.8029 44.0745 14.8029Z",
      fill: "url(#paint0_linear_1355_1437)"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
      d: "M66.8228 21.1105H28.1813C27.8623 21.1105 27.6011 20.8518 27.6011 20.5303V18.6513C27.6011 18.3323 27.8598 18.071 28.1813 18.071H66.8228C67.1418 18.071 67.4031 18.3298 67.4031 18.6513V20.5303C67.4005 20.8493 67.1418 21.1105 66.8228 21.1105Z",
      fill: "url(#paint1_linear_1355_1437)"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
      d: "M61.1659 27.4155H28.1813C27.8623 27.4155 27.6011 27.1567 27.6011 26.8352V24.9563C27.6011 24.6373 27.8598 24.376 28.1813 24.376H61.1659C61.4849 24.376 61.7461 24.6347 61.7461 24.9563V26.8352C61.7461 27.1567 61.4874 27.4155 61.1659 27.4155Z",
      fill: "url(#paint2_linear_1355_1437)"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
      d: "M55.5542 33.7206H28.1813C27.8623 33.7206 27.6011 33.4618 27.6011 33.1403V31.2614C27.6011 30.9423 27.8598 30.6811 28.1813 30.6811H55.5542C55.8732 30.6811 56.1344 30.9398 56.1344 31.2614V33.1403C56.1344 33.4618 55.8757 33.7206 55.5542 33.7206Z",
      fill: "url(#paint3_linear_1355_1437)"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
      d: "M44.0745 45.562H28.1813C27.8623 45.562 27.6011 45.3032 27.6011 44.9817V43.1028C27.6011 42.7837 27.8598 42.5225 28.1813 42.5225H44.0745C44.3935 42.5225 44.6548 42.7812 44.6548 43.1028V44.9817C44.6523 45.3007 44.3935 45.562 44.0745 45.562Z",
      fill: "url(#paint4_linear_1355_1437)"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
      d: "M66.8228 51.867H28.1813C27.8623 51.867 27.6011 51.6083 27.6011 51.2868V49.4078C27.6011 49.0888 27.8598 48.8275 28.1813 48.8275H66.8228C67.1418 48.8275 67.4031 49.0863 67.4031 49.4078V51.2868C67.4005 51.6083 67.1418 51.867 66.8228 51.867Z",
      fill: "url(#paint5_linear_1355_1437)"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
      d: "M61.1659 58.1721H28.1813C27.8623 58.1721 27.6011 57.9134 27.6011 57.5918V55.7129C27.6011 55.3939 27.8598 55.1326 28.1813 55.1326H61.1659C61.4849 55.1326 61.7461 55.3914 61.7461 55.7129V57.5918C61.7461 57.9134 61.4874 58.1721 61.1659 58.1721Z",
      fill: "url(#paint6_linear_1355_1437)"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
      d: "M55.5542 64.4771H28.1813C27.8623 64.4771 27.6011 64.2183 27.6011 63.8968V62.0179C27.6011 61.6988 27.8598 61.4376 28.1813 61.4376H55.5542C55.8732 61.4376 56.1344 61.6963 56.1344 62.0179V63.8968C56.1344 64.2183 55.8757 64.4771 55.5542 64.4771Z",
      fill: "url(#paint7_linear_1355_1437)"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
      d: "M9.6586 11.766H23.6778C24.1275 11.766 24.4917 12.1302 24.4917 12.5798V14.5166C24.4917 14.9662 24.1275 15.3304 23.6778 15.3304H9.6586C9.20896 15.3304 8.84473 14.9662 8.84473 14.5166V12.5798C8.84473 12.1327 9.20896 11.766 9.6586 11.766Z",
      fill: "#DADADA"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
      d: "M13.2108 16.9808H24.0273C24.2835 16.9808 24.492 17.1893 24.492 17.4455V18.6965C24.492 18.9527 24.2835 19.1612 24.0273 19.1612H13.2108C12.9546 19.1612 12.7461 18.9527 12.7461 18.6965V17.4455C12.7461 17.1893 12.9546 16.9808 13.2108 16.9808Z",
      fill: "#DADADA"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
      d: "M9.6586 42.525H23.6778C24.1275 42.525 24.4917 42.8892 24.4917 43.3388V45.2756C24.4917 45.7252 24.1275 46.0894 23.6778 46.0894H9.6586C9.20896 46.0894 8.84473 45.7252 8.84473 45.2756V43.3388C8.84473 42.8892 9.20896 42.525 9.6586 42.525Z",
      fill: "#DADADA"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
      d: "M13.2108 47.7399H24.0273C24.2835 47.7399 24.492 47.9484 24.492 48.2046V49.4556C24.492 49.7118 24.2835 49.9203 24.0273 49.9203H13.2108C12.9546 49.9203 12.7461 49.7118 12.7461 49.4556V48.2046C12.7461 47.9484 12.9546 47.7399 13.2108 47.7399Z",
      fill: "#DADADA"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("defs", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("linearGradient", {
      id: "paint0_linear_1355_1437",
      x1: "27.6018",
      y1: "13.2854",
      x2: "44.6527",
      y2: "13.2854",
      gradientUnits: "userSpaceOnUse"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      "stop-color": "#DADADA"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "0.3421",
      "stop-color": "#DCDCDC"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "0.5082",
      "stop-color": "#E4E4E4"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "0.636",
      "stop-color": "#F1F1F1"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "0.7235",
      "stop-color": "white"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "0.7538",
      "stop-color": "#F5F5F5"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "0.8164",
      "stop-color": "#E6E6E6"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "0.8899",
      "stop-color": "#DDDDDD"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "1",
      "stop-color": "#DADADA"
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("linearGradient", {
      id: "paint1_linear_1355_1437",
      x1: "27.6018",
      y1: "19.5913",
      x2: "67.4014",
      y2: "19.5913",
      gradientUnits: "userSpaceOnUse"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      "stop-color": "#DADADA"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "0.3421",
      "stop-color": "#DCDCDC"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "0.5082",
      "stop-color": "#E4E4E4"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "0.636",
      "stop-color": "#F1F1F1"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "0.7235",
      "stop-color": "white"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "0.7538",
      "stop-color": "#F5F5F5"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "0.8164",
      "stop-color": "#E6E6E6"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "0.8899",
      "stop-color": "#DDDDDD"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "1",
      "stop-color": "#DADADA"
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("linearGradient", {
      id: "paint2_linear_1355_1437",
      x1: "27.6018",
      y1: "25.8971",
      x2: "61.7464",
      y2: "25.8971",
      gradientUnits: "userSpaceOnUse"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      "stop-color": "#DADADA"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "0.3421",
      "stop-color": "#DCDCDC"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "0.5082",
      "stop-color": "#E4E4E4"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "0.636",
      "stop-color": "#F1F1F1"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "0.7235",
      "stop-color": "white"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "0.7538",
      "stop-color": "#F5F5F5"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "0.8164",
      "stop-color": "#E6E6E6"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "0.8899",
      "stop-color": "#DDDDDD"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "1",
      "stop-color": "#DADADA"
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("linearGradient", {
      id: "paint3_linear_1355_1437",
      x1: "27.6018",
      y1: "32.203",
      x2: "56.1342",
      y2: "32.203",
      gradientUnits: "userSpaceOnUse"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      "stop-color": "#DADADA"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "0.3421",
      "stop-color": "#DCDCDC"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "0.5082",
      "stop-color": "#E4E4E4"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "0.636",
      "stop-color": "#F1F1F1"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "0.7235",
      "stop-color": "white"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "0.7538",
      "stop-color": "#F5F5F5"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "0.8164",
      "stop-color": "#E6E6E6"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "0.8899",
      "stop-color": "#DDDDDD"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "1",
      "stop-color": "#DADADA"
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("linearGradient", {
      id: "paint4_linear_1355_1437",
      x1: "27.6018",
      y1: "44.0424",
      x2: "44.6527",
      y2: "44.0424",
      gradientUnits: "userSpaceOnUse"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      "stop-color": "#DADADA"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "0.3421",
      "stop-color": "#DCDCDC"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "0.5082",
      "stop-color": "#E4E4E4"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "0.636",
      "stop-color": "#F1F1F1"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "0.7235",
      "stop-color": "white"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "0.7538",
      "stop-color": "#F5F5F5"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "0.8164",
      "stop-color": "#E6E6E6"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "0.8899",
      "stop-color": "#DDDDDD"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "1",
      "stop-color": "#DADADA"
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("linearGradient", {
      id: "paint5_linear_1355_1437",
      x1: "27.6018",
      y1: "50.3483",
      x2: "67.4014",
      y2: "50.3483",
      gradientUnits: "userSpaceOnUse"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      "stop-color": "#DADADA"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "0.3421",
      "stop-color": "#DCDCDC"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "0.5082",
      "stop-color": "#E4E4E4"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "0.636",
      "stop-color": "#F1F1F1"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "0.7235",
      "stop-color": "white"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "0.7538",
      "stop-color": "#F5F5F5"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "0.8164",
      "stop-color": "#E6E6E6"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "0.8899",
      "stop-color": "#DDDDDD"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "1",
      "stop-color": "#DADADA"
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("linearGradient", {
      id: "paint6_linear_1355_1437",
      x1: "27.6018",
      y1: "56.6542",
      x2: "61.7464",
      y2: "56.6542",
      gradientUnits: "userSpaceOnUse"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      "stop-color": "#DADADA"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "0.3421",
      "stop-color": "#DCDCDC"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "0.5082",
      "stop-color": "#E4E4E4"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "0.636",
      "stop-color": "#F1F1F1"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "0.7235",
      "stop-color": "white"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "0.7538",
      "stop-color": "#F5F5F5"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "0.8164",
      "stop-color": "#E6E6E6"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "0.8899",
      "stop-color": "#DDDDDD"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "1",
      "stop-color": "#DADADA"
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("linearGradient", {
      id: "paint7_linear_1355_1437",
      x1: "27.6018",
      y1: "62.96",
      x2: "56.1342",
      y2: "62.96",
      gradientUnits: "userSpaceOnUse"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      "stop-color": "#DADADA"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "0.3421",
      "stop-color": "#DCDCDC"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "0.5082",
      "stop-color": "#E4E4E4"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "0.636",
      "stop-color": "#F1F1F1"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "0.7235",
      "stop-color": "white"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "0.7538",
      "stop-color": "#F5F5F5"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "0.8164",
      "stop-color": "#E6E6E6"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "0.8899",
      "stop-color": "#DDDDDD"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "1",
      "stop-color": "#DADADA"
    }))))
  },
  edit: _edit__WEBPACK_IMPORTED_MODULE_3__["default"],
  /**
   * @see ./save.js
   */
  save: _save__WEBPACK_IMPORTED_MODULE_4__["default"]
});

/***/ }),

/***/ "./src/tabbed-changeloger/save.js":
/*!****************************************!*\
  !*** ./src/tabbed-changeloger/save.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ save)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */


/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
function save() {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    ..._wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save()
  }, 'Tabbed Changeloger – hello from the saved content!');
}

/***/ }),

/***/ "./src/tabbed-changeloger/style.scss":
/*!*******************************************!*\
  !*** ./src/tabbed-changeloger/style.scss ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "./src/tabbed-changeloger/block.json":
/*!*******************************************!*\
  !*** ./src/tabbed-changeloger/block.json ***!
  \*******************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"cha/tabbed-changeloger","version":"0.1.0","title":"Tabbed Changeloger","category":"widgets","icon":"smiley","description":"Example block scaffolded with Create Block tool.","example":{},"supports":{"html":false},"textdomain":"tabbed-changeloger","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"tabbed-changeloger","viewScript":"tabbed-changeloger-frontend"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"tabbed-changeloger/index": 0,
/******/ 			"tabbed-changeloger/style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkchangeloger"] = self["webpackChunkchangeloger"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["tabbed-changeloger/style-index"], () => (__webpack_require__("./src/tabbed-changeloger/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map