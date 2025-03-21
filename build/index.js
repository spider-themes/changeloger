/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@wordpress/icons/build-module/library/more.js":
/*!********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/more.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);


/**
 * WordPress dependencies
 */

const more = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M4 9v1.5h16V9H4zm12 5.5h4V13h-4v1.5zm-6 0h4V13h-4v1.5zm-6 0h4V13H4v1.5z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (more);
//# sourceMappingURL=more.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/plus.js":
/*!********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/plus.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);


/**
 * WordPress dependencies
 */

const plus = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M18 11.2h-5.2V6h-1.6v5.2H6v1.6h5.2V18h1.6v-5.2H18z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (plus);
//# sourceMappingURL=plus.js.map

/***/ }),

/***/ "./src/block-control.js":
/*!******************************!*\
  !*** ./src/block-control.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);




function BlockControl(props) {
  const {
    attributes,
    setAttributes
  } = props;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.BlockControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToolbarGroup, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToolbarButton, {
    onClick: () => setAttributes({
      showTextArea: true
    })
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Edit", ""))));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BlockControl);

/***/ }),

/***/ "./src/components/custom-color-control.js":
/*!************************************************!*\
  !*** ./src/components/custom-color-control.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);



const CustomColorControl = ({
  label,
  colorValue,
  onColorChange,
  colors = [],
  className
}) => {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Dropdown, {
    popoverProps: {
      placement: 'left-start',
      offset: 36,
      shift: true
    },
    className: `changeloger-color-dropdown-control ${className}`,
    contentClassName: "changeloger-color-dropdown-control-content",
    renderToggle: ({
      isOpen,
      onToggle
    }) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
      className: `changeloger-color-dropdown-control-button ${isOpen && 'is-open'} ${className}`,
      onClick: onToggle,
      "aria-expanded": isOpen
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ColorIndicator, {
      colorValue: colorValue
    }), label),
    renderContent: () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.__experimentalColorGradientControl, {
      colors: colors,
      colorValue: colorValue,
      onColorChange: onColorChange
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CustomColorControl);

/***/ }),

/***/ "./src/components/custom-links.js":
/*!****************************************!*\
  !*** ./src/components/custom-links.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);






function CustomLink(props) {
  const [isOpen, setOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const {
    action,
    currentLinks,
    customLinks,
    setAttributes,
    version
  } = props;
  const openModal = event => {
    event.preventDefault();
    setOpen(true);
  };
  const handleUploadIcon = event => {
    const fr = new FileReader();
    fr.onload = event => {
      const fileContent = event.target.result;
      var encodedData = window.btoa(fileContent);
      let base64ext = `data:image/svg+xml;base64,` + encodedData;
      setAttributes({
        customLinks: {
          ...customLinks,
          [version]: currentLinks.map((currentLink, currentIndex) => {
            if (currentIndex !== props.index) {
              return currentLink;
            }
            return {
              ...currentLink,
              icon: base64ext
            };
          })
        }
      });
      setOpen(false);
    };
    fr.readAsText(event.target.files[0]);
  };
  return !(0,lodash__WEBPACK_IMPORTED_MODULE_2__.isEmpty)(action) && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "changeloger-link-item"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    className: "changeloger-custom-link",
    href: "#",
    onClick: event => openModal(event)
  }, !(0,lodash__WEBPACK_IMPORTED_MODULE_2__.isEmpty)(action.icon) && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "changeloger-custom-link-icon",
    style: {
      WebkitMaskImage: `url(${action.icon})`
    }
  }), action.name), isOpen && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Modal, {
    title: "Customise Link",
    onRequestClose: () => setOpen(false),
    shouldCloseOnClickOutside: false
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Text', 'changeloger'),
    value: action?.name,
    onChange: newValue => setAttributes({
      customLinks: {
        ...customLinks,
        [version]: currentLinks.map((currentLink, currentIndex) => {
          if (currentIndex !== props.index) {
            return currentLink;
          }
          return {
            ...currentLink,
            name: newValue
          };
        })
      }
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Link', 'changeloger'),
    value: action?.link,
    onChange: newValue => setAttributes({
      customLinks: {
        ...customLinks,
        [version]: currentLinks.map((currentLink, currentIndex) => {
          if (currentIndex !== props.index) {
            return currentLink;
          }
          return {
            ...currentLink,
            link: newValue
          };
        })
      }
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.FormFileUpload, {
    variant: "secondary",
    accept: "image/*",
    onChange: event => handleUploadIcon(event)
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Upload Icon', 'changeloger')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: '20px'
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
    style: {
      marginRight: '10px'
    },
    isDestructive: true,
    onClick: () => {
      setAttributes({
        customLinks: {
          ...customLinks,
          [version]: currentLinks.filter((currentLink, currentIndex) => {
            return currentIndex === props.index ? false : true;
          })
        }
      });
      setOpen(false);
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Delete', 'changeloger')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
    variant: "primary",
    onClick: () => setOpen(false)
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Save', 'changeloger')))));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CustomLink);

/***/ }),

/***/ "./src/components/filter.js":
/*!**********************************!*\
  !*** ./src/components/filter.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);

/**
 * WordPress Dependencies
 */



function FilterButton(props) {
  const [selectedCategory, setSelectedCategory] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [isVisible, setIsVisible] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const toggleVisible = () => {
    setIsVisible(!isVisible);
  };
  const toggleCategory = category => {
    const newSelected = selectedCategory.includes(category) ? selectedCategory.filter(c => c !== category) : [...selectedCategory, category];
    setSelectedCategory(newSelected);
    if (props.isEditor) return null;
    const updatedChangelog = newSelected.length > 0 ? filterByCategories(props.parsedChangelog, newSelected) : props.parsedChangelog;
    props.setAttributes({
      filteredChangelog: updatedChangelog
    });
  };
  function filterByCategories(data, categories) {
    return (0,lodash__WEBPACK_IMPORTED_MODULE_1__.filter)(data, versionData => (0,lodash__WEBPACK_IMPORTED_MODULE_1__.some)(versionData.changes, change => categories.includes((0,lodash__WEBPACK_IMPORTED_MODULE_1__.lowerCase)(change.category))));
  }
  const getUniqueCategory = () => {
    const finalCategory = [];
    props.parsedChangelog.forEach(item => {
      item.changes.forEach(change => {
        const categoryLower = (0,lodash__WEBPACK_IMPORTED_MODULE_1__.lowerCase)(change.category);
        if (!finalCategory.includes(categoryLower)) {
          finalCategory.push(categoryLower);
        }
      });
    });
    return finalCategory;
  };
  const categories = getUniqueCategory();
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `changeloger-filter-wrapper align-${props.attributes.filterPosition}`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    className: "changeloger-filter-popover-button",
    onClick: toggleVisible
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "1",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    className: "lucide lucide-filter buttonIcon"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("polygon", {
    points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"
  })), "Filter", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "1",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    className: "lucide lucide-chevron-down buttonIcon"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "m6 9 6 6 6-6"
  }))), isVisible && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Popover, {
    className: "changeloger-filter-popover",
    placement: "bottom"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "drop-title"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "title"
  }, "Filters"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    onClick: toggleVisible,
    className: "close-btn",
    icon: "no-alt"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "drop-body"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "title"
  }, "Type"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "filter-button-group"
  }, categories.map(category => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    key: category,
    onClick: () => toggleCategory(category),
    className: `${selectedCategory.includes(category) && "active"}`
  }, category)))))));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FilterButton);

/***/ }),

/***/ "./src/components/log-type-colors.js":
/*!*******************************************!*\
  !*** ./src/components/log-type-colors.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _custom_color_control__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./custom-color-control */ "./src/components/custom-color-control.js");

/**
 * WordPress Dependencies
 */



function LogTypeColors(props) {
  const getUniqueCategory = () => {
    const finalCategory = [];
    props.changelog.forEach(item => {
      const categories = [];
      item.changes.forEach(change => {
        if (!finalCategory.includes(change.category)) {
          if (!categories.includes(change.category)) {
            categories.push(change.category);
          }
        }
      });
      finalCategory.push(...categories);
    });
    return finalCategory;
  };
  const categories = getUniqueCategory();
  return categories.map((category, index) => {
    const clrValue = (0,lodash__WEBPACK_IMPORTED_MODULE_1__.get)(props.value, category.toLowerCase(), '');
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_custom_color_control__WEBPACK_IMPORTED_MODULE_2__["default"], {
      className: categories.length > 0 && index === 0 ? 'is-list is-first' : 'is-list',
      colors: props.colors,
      label: category.concat(' Color'),
      colorValue: clrValue,
      onColorChange: newColor => props.onChange({
        ...props.value,
        [category.toLowerCase()]: newColor
      })
    }));
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LogTypeColors);

/***/ }),

/***/ "./src/components/versions-tree.js":
/*!*****************************************!*\
  !*** ./src/components/versions-tree.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


function VersionsTree(props) {
  var _props$isChild;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    className: ((_props$isChild = !props?.isChild) !== null && _props$isChild !== void 0 ? _props$isChild : false) ? 'changeloger-version-list-wrapper' : ''
  }, props.versions.map(version => {
    const hasChildren = version?.children?.length > 0;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, "Version ", version.version, hasChildren ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(VersionsTree, {
      isChild: true,
      versions: version?.children
    }) : null);
  }));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (VersionsTree);

/***/ }),

/***/ "./src/deprecated.js":
/*!***************************!*\
  !*** ./src/deprecated.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parser */ "./src/parser.js");


function saveDep(props) {
  const {
    improvementTagColor,
    newTagColor,
    updateTagColor,
    fixedTagColor,
    tweakedTagColor,
    paginationTextColor,
    paginationBgColor,
    paginationActiveTextColor,
    paginationActiveBgColor,
    paginationHoverTextColor,
    paginationHoverBgColor
  } = props.attributes;
  const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.useBlockProps.save({
    className: 'changeloger-container',
    style: {
      '--changeloger-pagination-text-color': paginationTextColor,
      '--changeloger-pagination-bg-color': paginationBgColor,
      '--changeloger-pagination-active-text-color': paginationActiveTextColor,
      '--changeloger-pagination-active-bg-color': paginationActiveBgColor,
      '--changeloger-improvement-tag-bg-color': improvementTagColor,
      '--changeloger-new-tag-bg-color': newTagColor,
      '--changeloger-update-tag-bg-color': updateTagColor,
      '--changeloger-fixed-tag-bg-color': fixedTagColor,
      '--changeloger-tweaked-tag-bg-color': tweakedTagColor
    }
  });
  const parser = new _parser__WEBPACK_IMPORTED_MODULE_1__["default"](props.attributes.changelog);
  const parsedChangelog = parser.parse();
  return JSON.stringify({
    changelog: parsedChangelog,
    props: blockProps,
    version: parser.getVersions(),
    paginationStyles: {
      color: paginationTextColor,
      'background-color': paginationBgColor
    }
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (saveDep);

/***/ }),

/***/ "./src/edit.js":
/*!*********************!*\
  !*** ./src/edit.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/plus.js");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./editor.scss */ "./src/editor.scss");
/* harmony import */ var _inspector__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./inspector */ "./src/inspector.js");
/* harmony import */ var _placeholder__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./placeholder */ "./src/placeholder.js");
/* harmony import */ var _parser__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./parser */ "./src/parser.js");
/* harmony import */ var _block_control__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./block-control */ "./src/block-control.js");
/* harmony import */ var _components_custom_links__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/custom-links */ "./src/components/custom-links.js");
/* harmony import */ var _components_versions_tree__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/versions-tree */ "./src/components/versions-tree.js");
/* harmony import */ var _components_custom_color_control__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/custom-color-control */ "./src/components/custom-color-control.js");
/* harmony import */ var _components_filter__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/filter */ "./src/components/filter.js");

















function Edit(props) {
  const {
    attributes,
    setAttributes
  } = props;
  const {
    changelog,
    customLinks,
    newTagColor,
    versionName,
    showTextArea,
    fixedTagColor,
    paginationType,
    enableVersions,
    updateTagColor,
    tweakedTagColor,
    showPlaceholder,
    enablePagination,
    versionsPosition,
    paginationBgColor,
    improvementTagColor,
    paginationTextColor,
    customLogTypeColors,
    paginationLoadMoreText,
    paginationActiveBgColor,
    paginationActiveTextColor,
    paginationHoverBgColor,
    paginationHoverTextColor,
    filteredChangelog
  } = attributes;
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.useBlockProps)({
    className: 'changeloger-container',
    style: {
      '--changeloger-pagination-text-color': paginationTextColor,
      '--changeloger-pagination-bg-color': paginationBgColor,
      '--changeloger-pagination-active-text-color': paginationActiveTextColor,
      '--changeloger-pagination-active-bg-color': paginationActiveBgColor,
      '--changeloger-pagination-hover-text-color': paginationHoverTextColor,
      '--changeloger-pagination-hover-bg-color': paginationHoverBgColor,
      '--changeloger-improvement-tag-bg-color': improvementTagColor,
      '--changeloger-new-tag-bg-color': newTagColor,
      '--changeloger-update-tag-bg-color': updateTagColor,
      '--changeloger-fixed-tag-bg-color': fixedTagColor,
      '--changeloger-tweaked-tag-bg-color': tweakedTagColor
    }
  });
  const parser = new _parser__WEBPACK_IMPORTED_MODULE_8__["default"](changelog);
  const parsedChangelog = parser.parse();
  const versions = parser.getVersions();
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setAttributes({
      filteredChangelog: parsedChangelog
    });
  }, []); // Runs only once on mount

  const isLeft = enableVersions && versionsPosition === 'left';
  const isRight = enableVersions && versionsPosition === 'right';
  function htmlEntityDecode(encodedString) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(encodedString, 'text/html');
    return doc.documentElement.textContent;
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...blockProps
  }, !showPlaceholder && !showTextArea && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_filter__WEBPACK_IMPORTED_MODULE_13__["default"], {
    ...props,
    parsedChangelog: parsedChangelog,
    isEditor: true
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "changelog-wrapper"
  }, isLeft && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "changeloger-version-list-container changeloger-version-list-position-left"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h6", {
    className: "version-title"
  }, "Versions"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_versions_tree__WEBPACK_IMPORTED_MODULE_11__["default"], {
    versions: versions
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "changeloger-info-inner-wrapper"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "changeloger-items"
  }, filteredChangelog.map((item, index) => {
    const {
      date,
      version,
      changes
    } = item;
    const currentLinks = (0,lodash__WEBPACK_IMPORTED_MODULE_2__.get)(customLinks, version, []);
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "changelog-info-item"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "date"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, date), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.RichText, {
      tagName: "span",
      className: "changeloger-version-name",
      placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Version Name', 'changeloger'),
      value: versionName[version],
      onChange: newContent => setAttributes({
        versionName: {
          ...versionName,
          [version]: newContent
        }
      })
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "version"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "version-tag"
    }, version), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "line"
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "content"
    }, changes.map(item => {
      const currentCategory = item.category.toLowerCase();
      const hasCustomColor = (0,lodash__WEBPACK_IMPORTED_MODULE_2__.has)(customLogTypeColors, currentCategory);
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
        style: hasCustomColor ? {
          backgroundColor: (0,lodash__WEBPACK_IMPORTED_MODULE_2__.get)(customLogTypeColors, currentCategory)
        } : {},
        className: `tag ${currentCategory.replace(' ', '-')}`
      }, item.category), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
        className: "change"
      }, htmlEntityDecode(item.change)));
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "changeloger-link-wrapper"
    }, currentLinks.map((action, index) => {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_custom_links__WEBPACK_IMPORTED_MODULE_10__["default"], {
        action: action,
        index: index,
        customLinks: customLinks,
        currentLinks: currentLinks,
        setAttributes: setAttributes,
        version: version
      });
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
      isSmall: true,
      isPressed: true,
      icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_14__["default"],
      label: "Add Link",
      onClick: () => setAttributes({
        customLinks: {
          ...customLinks,
          [version]: [...currentLinks, {
            name: 'Link',
            link: '#',
            icon: ''
          }]
        }
      })
    }))));
  }))), isRight && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "changeloger-version-list-container changeloger-version-list-position-right"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h6", {
    className: "version-title"
  }, "Versions"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_versions_tree__WEBPACK_IMPORTED_MODULE_11__["default"], {
    versions: versions
  }))), enablePagination && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "changeloger-pagination-wrapper"
  }, 'load-more' === paginationType && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "wp-block-button"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.RichText, {
    tagName: "a",
    style: {
      color: paginationTextColor,
      backgroundColor: paginationBgColor
    },
    className: "changeloger-pagination-button wp-block-button__link wp-element-button",
    value: paginationLoadMoreText,
    onChange: newContent => setAttributes({
      paginationLoadMoreText: newContent
    })
  })), 'numbered' === paginationType && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "changeloger-pagination-inner-wrapper"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "changeloger-prev-button page-numbers"
  }, "\xAB Previous"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "page-numbers current"
  }, "1"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "page-numbers"
  }, "2"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "page-numbers"
  }, "3"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "changeloger-next-button page-numbers"
  }, "Next \xBB")))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_inspector__WEBPACK_IMPORTED_MODULE_6__["default"], {
    ...props
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_placeholder__WEBPACK_IMPORTED_MODULE_7__["default"], {
    ...props
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_block_control__WEBPACK_IMPORTED_MODULE_9__["default"], {
    ...props
  }));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Edit);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./edit */ "./src/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./save */ "./src/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./block.json */ "./src/block.json");
/* harmony import */ var _deprecated__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./deprecated */ "./src/deprecated.js");




/**
 * Internal dependencies
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
  /**
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_3__["default"],
  /**
   * @see ./save.js
   */
  save: _save__WEBPACK_IMPORTED_MODULE_4__["default"],
  deprecated: [{
    "attributes": {
      "changelog": {
        "type": "string",
        "default": ""
      },
      "enablePagination": {
        "type": "boolean",
        "default": false
      },
      "paginationLoadMoreText": {
        "type": "string",
        "default": "Load More"
      },
      "perPage": {
        "type": "number",
        "default": 10
      },
      "paginationType": {
        "type": "string",
        "default": "load-more"
      },
      "showPlaceholder": {
        "type": "boolean",
        "default": true
      },
      "showTextArea": {
        "type": "boolean",
        "default": false
      },
      "paginationTextColor": {
        "type": "string",
        "default": "#ffffff"
      },
      "paginationBgColor": {
        "type": "string",
        "default": "#000000"
      },
      "paginationActiveTextColor": {
        "type": "string",
        "default": "#000000"
      },
      "paginationActiveBgColor": {
        "type": "string",
        "default": "#f5f5f5"
      },
      "customLogTypeColors": {
        "type": "object",
        "default": {}
      },
      "customLinks": {
        "type": "object",
        "default": {}
      },
      "versionName": {
        "type": "object",
        "default": {}
      },
      "enableVersions": {
        "type": "boolean",
        "default": "true"
      },
      "versionsPosition": {
        "type": "string",
        "default": "right"
      }
    },
    save: _deprecated__WEBPACK_IMPORTED_MODULE_6__["default"]
  }]
});

/***/ }),

/***/ "./src/inspector.js":
/*!**************************!*\
  !*** ./src/inspector.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _parser__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./parser */ "./src/parser.js");
/* harmony import */ var _components_log_type_colors__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/log-type-colors */ "./src/components/log-type-colors.js");
/* harmony import */ var _components_custom_color_control__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/custom-color-control */ "./src/components/custom-color-control.js");











function Inspector(props) {
  const {
    attributes,
    setAttributes
  } = props;
  const {
    perPage,
    changelog,
    enableVersions,
    paginationType,
    enablePagination,
    versionsPosition,
    paginationBgColor,
    customLogTypeColors,
    paginationTextColor,
    paginationActiveBgColor,
    paginationActiveTextColor,
    paginationHoverBgColor,
    paginationHoverTextColor,
    enableFilter,
    filterPosition
  } = attributes;
  const versionPositions = [{
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Left', 'changeloger'),
    value: 'left'
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Right', 'changeloger'),
    value: 'right'
  }];
  const filterPositions = [{
    icon: 'editor-alignleft',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Left', 'changeloger'),
    value: 'left'
  }, {
    icon: 'editor-aligncenter',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Left', 'changeloger'),
    value: 'center'
  }, {
    icon: 'editor-alignright',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Right', 'changeloger'),
    value: 'right'
  }];
  const {
    defaultColors
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => {
    return {
      defaultColors: select('core/block-editor')?.getSettings()?.__experimentalFeatures?.color?.palette?.default
    };
  });
  const parser = new _parser__WEBPACK_IMPORTED_MODULE_7__["default"](changelog);
  const parsedChangelog = parser.parse();
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('General', 'changeloger')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Sidebar Versions', 'changeloger'),
    checked: enableVersions,
    onChange: () => setAttributes({
      enableVersions: !enableVersions
    })
  }), enableVersions && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalToggleGroupControl, {
    isBlock: true,
    value: versionsPosition,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Versions Position', 'changeloger')
  }, versionPositions.map(position => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalToggleGroupControlOption, {
      value: position.value,
      label: position.label,
      onClick: () => setAttributes({
        versionsPosition: position.value
      })
    });
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Pagination', 'changeloger'),
    checked: enablePagination,
    onChange: () => setAttributes({
      enablePagination: !enablePagination
    })
  }), enablePagination && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Pagination Type', 'changeloger'),
    value: paginationType,
    options: [{
      label: 'Load More',
      value: 'load-more'
    }, {
      label: 'Numbered',
      value: 'numbered'
    }],
    onChange: newValue => setAttributes({
      paginationType: newValue
    }),
    __nextHasNoMarginBottom: true
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Per Page', 'changeloger'),
    value: perPage.toString(),
    type: "number",
    onChange: newValue => setAttributes({
      perPage: Number(newValue)
    })
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Filter', 'changeloger'),
    checked: enableFilter,
    onChange: () => setAttributes({
      enableFilter: !enableFilter
    })
  }), enableFilter && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalToggleGroupControl, {
    isBlock: true,
    value: filterPosition,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Filter Position', 'changeloger')
  }, filterPositions.map(position => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalToggleGroupControlOptionIcon, {
      icon: position.icon,
      value: position.value,
      label: position.label,
      onClick: () => setAttributes({
        filterPosition: position.value
      })
    });
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__.InspectorControls, {
    group: "styles"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Log Tags', 'changeloger'),
    initialOpen: false
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_log_type_colors__WEBPACK_IMPORTED_MODULE_8__["default"], {
    changelog: parsedChangelog,
    colors: defaultColors,
    value: customLogTypeColors,
    onChange: newCustomLogTypeColors => {
      setAttributes({
        customLogTypeColors: newCustomLogTypeColors
      });
    }
  })), enablePagination && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Pagination', 'changeloger'),
    initialOpen: false
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_custom_color_control__WEBPACK_IMPORTED_MODULE_9__["default"], {
    className: "is-list is-first",
    colors: defaultColors,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Text Color', 'changeloger'),
    colorValue: paginationTextColor,
    onColorChange: newValue => setAttributes({
      paginationTextColor: newValue
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_custom_color_control__WEBPACK_IMPORTED_MODULE_9__["default"], {
    className: "is-list",
    colors: defaultColors,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Bg Color', 'changeloger'),
    colorValue: paginationBgColor,
    onColorChange: newValue => setAttributes({
      paginationBgColor: newValue
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_custom_color_control__WEBPACK_IMPORTED_MODULE_9__["default"], {
    className: "is-list",
    colors: defaultColors,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Text Hover Color', 'changeloger'),
    colorValue: paginationHoverTextColor,
    onColorChange: newValue => setAttributes({
      paginationHoverTextColor: newValue
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_custom_color_control__WEBPACK_IMPORTED_MODULE_9__["default"], {
    className: "is-list",
    colors: defaultColors,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Bg Hover Color', 'changeloger'),
    colorValue: paginationHoverBgColor,
    onColorChange: newValue => setAttributes({
      paginationHoverBgColor: newValue
    })
  }), 'numbered' === paginationType && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_custom_color_control__WEBPACK_IMPORTED_MODULE_9__["default"], {
    className: "is-list",
    colors: defaultColors,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Active Text Color', 'changeloger'),
    colorValue: paginationActiveTextColor,
    onColorChange: newValue => setAttributes({
      paginationActiveTextColor: newValue
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_custom_color_control__WEBPACK_IMPORTED_MODULE_9__["default"], {
    className: "is-list",
    colors: defaultColors,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Active Bg Color', 'changeloger'),
    colorValue: paginationActiveBgColor,
    onColorChange: newValue => setAttributes({
      paginationActiveBgColor: newValue
    })
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__.ContrastChecker, {
    backgroundColor: paginationBgColor,
    textColor: paginationTextColor
  }))));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Inspector);

/***/ }),

/***/ "./src/parser.js":
/*!***********************!*\
  !*** ./src/parser.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ChangelogParser)
/* harmony export */ });
class ChangelogParser {
  constructor(changelog) {
    this.changelog = changelog;
    this.datePattern = /\b(\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4}|\d{4}-\d{2}-\d{2}|\d{1,2} \w+ \d{4})\b/;
    this.versionPattern = /(?:[vV]?\s*)?(\d+(\.\d+){0,3})(?:\s*\(.*\))?/;
  }
  parseSection(section) {
    const rows = section.split('\n').filter(row => row.trim() !== '');
    const hasEnoughRows = rows.length > 1;
    if (!hasEnoughRows) {
      return false;
    }
    const headerRow = rows[0].trim();
    const dateMatch = this.datePattern.exec(headerRow);
    const versionMatch = this.versionPattern.exec(headerRow);
    if (!versionMatch) {
      return false;
    }
    const version = versionMatch[1].trim();
    const contentRows = rows.slice(1);
    const parsedSection = {
      version: version,
      date: dateMatch ? dateMatch[0] : null,
      changes: this.parseChanges(contentRows)
    };
    return parsedSection;
  }
  parseChanges(rows) {
    const changes = [];
    rows.forEach(row => {
      if (row.trim() === '') {
        return; // Ignore empty rows
      }

      const splitIndexColon = row.indexOf(':');
      const splitIndexDash = row.indexOf(' - ');
      const splitIndex = splitIndexColon !== -1 && (splitIndexDash === -1 || splitIndexColon < splitIndexDash) ? splitIndexColon : splitIndexDash;
      if (splitIndex !== -1) {
        let category = row.substring(0, splitIndex).trim();

        // Remove any unwanted symbols at the beginning of the category
        category = category.replace(/^[*->=]+/, '').trim();
        const change = row.substring(splitIndex + (splitIndex === splitIndexDash ? 3 : 1)).trim();
        changes.push({
          category,
          change: this.processLinks(change)
        });
      } else if (row.trim().startsWith('*')) {
        // Handle changes with categories, e.g.,
        let change = row.trim().replace(/^[*\s-]+/, '');
        let categorySplitIndex = change.indexOf(' - ');
        if (categorySplitIndex !== -1) {
          let category = change.substring(0, categorySplitIndex).trim();
          let changeDetail = change.substring(categorySplitIndex + 3).trim();
          changes.push({
            category,
            change: this.processLinks(changeDetail)
          });
        } else {
          changes.push({
            category: 'General',
            change: this.processLinks(change)
          });
        }
      } else if (row.trim().startsWith('*')) {
        // Handle changes that may contain links or additional props
        let change = row.trim().replace(/^[*\s-]+/, '');
        changes.push({
          category: 'General',
          change: this.processLinks(change)
        });
      }
    });
    return changes;
  }
  processLinks(text) {
    // Regex to find Markdown-style links and convert them to HTML anchor tags
    return text.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
  }
  parse() {
    const cleanedChangelog = this.changelog.replace(/\n\s*(?=\n.*:)/g, '');
    const sections = cleanedChangelog.split(/\n(?=\s*\d{2} \w+ \d{4}|\s*=+\s*[\d.]+|v[\d.]+|#*\s*[\d.]+|-{1,12}\s*[\d.]+\s*\(.*\)\s*-{1,12})/);
    const changes = [];
    sections.forEach(section => {
      const parsedSection = this.parseSection(section);
      if (parsedSection) {
        changes.push(parsedSection);
      }
    });
    return changes;
  }
  getVersion(version) {
    const parsedChanges = this.parse();
    for (const change of parsedChanges) {
      if (change.version === version) {
        return change;
      }
    }
    return null;
  }
  normalizeVersion(version) {
    const segments = version.split('.');
    while (segments[segments.length - 1] === '0') {
      segments.pop();
    }
    return segments.join('.');
  }
  getParentVersion(version) {
    const segments = version.split('.');
    if (segments.length <= 1) {
      return null; // Base version, no parent (e.g., "1")
    }

    segments.pop(); // Remove the last segment
    return segments.join('.');
  }
  getVersions() {
    const parsedChanges = this.parse();
    const hierarchicalChanges = [];
    const versionMap = {};
    const processedVersions = new Set();

    // 1st pass: Populate the versionMap and hierarchicalChanges
    parsedChanges.forEach(change => {
      const normalizedVersion = this.normalizeVersion(change.version);
      versionMap[normalizedVersion] = {
        ...change,
        children: []
      };
      hierarchicalChanges.push(versionMap[normalizedVersion]);
    });

    // 2nd pass: Check for hierarchical relationships
    parsedChanges.forEach(change => {
      const parentVersion = this.getParentVersion(this.normalizeVersion(change.version));
      if (parentVersion && versionMap[parentVersion]) {
        versionMap[parentVersion].children.push(change);
        processedVersions.add(change.version);
      }
    });

    // Filter out versions that have been nested
    return hierarchicalChanges.filter(change => !processedVersions.has(change.version));
  }
}

/***/ }),

/***/ "./src/placeholder.js":
/*!****************************!*\
  !*** ./src/placeholder.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/more.js");




function CustomPlaceholder(props) {
  const {
    attributes,
    setAttributes
  } = props;
  const {
    changelog,
    showPlaceholder,
    showTextArea
  } = attributes;
  const readFileContent = event => {
    const fr = new FileReader();
    fr.onload = event => {
      const fileContent = event.target.result;
      setAttributes({
        changelog: fileContent,
        showPlaceholder: false
      });
    };
    fr.readAsText(event.target.files[0]);
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, showPlaceholder && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Placeholder, {
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_3__["default"],
    className: "changelogger-placeholder",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Changeloger', 'changeloger'),
    instructions: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Paste your changelog here, or upload changelog from a text file.', 'changeloger')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.FormFileUpload, {
    variant: "secondary",
    accept: "text/plain",
    onChange: event => readFileContent(event)
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Upload Changelog (.txt file)', 'changeloger')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "primary",
    onClick: () => setAttributes({
      showPlaceholder: false,
      showTextArea: true
    })
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Plain Text', 'changeloger')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    className: "placeholder-sample-button",
    variant: "tertiary",
    onClick: () => setAttributes({
      showPlaceholder: false,
      showTextArea: true,
      changelog: `${changelog}\n` + '= 1.0.0 (01 March 2025) =\n' + 'New: Added a bulk edit feature for faster modifications.\n' + 'Tweaked: Adjusted UI spacing for better readability.\n' + 'Updated: Refreshed third-party dependencies for stability.\n' + 'Fixed: Resolved a bug causing layout shifts on mobile.\n' + 'improvement: Enhanced performance for faster load times.\n' + '\n' + '= 2.0.0 (01 April 2025) =\n' + 'New: Added a bulk edit feature for faster modifications.\n' + 'Tweaked: Adjusted UI spacing for better readability.\n' + 'Updated: Refreshed third-party dependencies for stability.\n' + 'Fixed: Resolved a bug causing layout shifts on mobile.\n' + 'improvement: Enhanced performance for faster load times.\n'
    })
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Load Sample Data', 'changeloger'))), !showPlaceholder && showTextArea && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextareaControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Paste your changelog Here', 'changeloger'),
    rows: 20,
    value: changelog,
    onChange: newValue => setAttributes({
      changelog: newValue
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    className: "placeholder-cancel-button",
    variant: "secondary",
    onClick: () => setAttributes({
      showPlaceholder: true
    })
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Cancel', 'changeloger')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "primary",
    onClick: () => setAttributes({
      showTextArea: false
    })
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('View Visual Changelogs', 'changeloger'))));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CustomPlaceholder);

/***/ }),

/***/ "./src/save.js":
/*!*********************!*\
  !*** ./src/save.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parser */ "./src/parser.js");


function save(props) {
  const {
    improvementTagColor,
    newTagColor,
    updateTagColor,
    fixedTagColor,
    tweakedTagColor,
    paginationTextColor,
    paginationBgColor,
    paginationActiveTextColor,
    paginationActiveBgColor,
    paginationHoverTextColor,
    paginationHoverBgColor
  } = props.attributes;
  const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.useBlockProps.save({
    className: 'changeloger-container',
    style: {
      '--changeloger-pagination-text-color': paginationTextColor,
      '--changeloger-pagination-bg-color': paginationBgColor,
      '--changeloger-pagination-active-text-color': paginationActiveTextColor,
      '--changeloger-pagination-active-bg-color': paginationActiveBgColor,
      '--changeloger-pagination-hover-text-color': paginationHoverTextColor,
      '--changeloger-pagination-hover-bg-color': paginationHoverBgColor,
      '--changeloger-improvement-tag-bg-color': improvementTagColor,
      '--changeloger-new-tag-bg-color': newTagColor,
      '--changeloger-update-tag-bg-color': updateTagColor,
      '--changeloger-fixed-tag-bg-color': fixedTagColor,
      '--changeloger-tweaked-tag-bg-color': tweakedTagColor
    }
  });
  const parser = new _parser__WEBPACK_IMPORTED_MODULE_1__["default"](props.attributes.changelog);
  const parsedChangelog = parser.parse();
  // console.log('changelog', parsedChangelog);
  // console.log('props', blockProps);
  // console.log('version', parser.getVersions());
  // console.log('paginationStyles', {
  //     color: paginationTextColor,
  //     'background-color': paginationBgColor,
  // });

  return JSON.stringify({
    changelog: parsedChangelog,
    props: blockProps,
    version: parser.getVersions(),
    paginationStyles: {
      color: paginationTextColor,
      'background-color': paginationBgColor
    }
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (save);

/***/ }),

/***/ "./src/editor.scss":
/*!*************************!*\
  !*** ./src/editor.scss ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/***/ ((module) => {

module.exports = window["lodash"];

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

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "@wordpress/primitives":
/*!************************************!*\
  !*** external ["wp","primitives"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["primitives"];

/***/ }),

/***/ "./src/block.json":
/*!************************!*\
  !*** ./src/block.json ***!
  \************************/
/***/ ((module) => {

module.exports = JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"block/changeloger","version":"0.1.0","title":"Changeloger","category":"widgets","description":"Transform plain text changelogs into visually stunning representations.","attributes":{"changelog":{"type":"string","default":""},"enablePagination":{"type":"boolean","default":false},"paginationLoadMoreText":{"type":"string","default":"Load More"},"perPage":{"type":"number","default":10},"paginationType":{"type":"string","default":"load-more"},"showPlaceholder":{"type":"boolean","default":true},"showTextArea":{"type":"boolean","default":false},"paginationTextColor":{"type":"string","default":"#ffffff"},"paginationBgColor":{"type":"string","default":"#000000"},"paginationActiveTextColor":{"type":"string","default":"#000000"},"paginationActiveBgColor":{"type":"string","default":"#f5f5f5"},"paginationHoverTextColor":{"type":"string","default":"#ffffff"},"paginationHoverBgColor":{"type":"string","default":"#333333"},"customLogTypeColors":{"type":"object","default":{}},"customLinks":{"type":"object","default":{}},"versionName":{"type":"object","default":{}},"enableVersions":{"type":"boolean","default":"true"},"versionsPosition":{"type":"string","default":"right"},"filteredChangelog":{"type":"array","default":[]},"enableFilter":{"type":"boolean","default":"false"},"filterPosition":{"type":"string","default":"right"}},"supports":{"html":false,"align":["wide","full"]},"textdomain":"changeloger","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":["changeloger"],"viewScript":"changeloger-frontend"}');

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
/******/ 			"index": 0,
/******/ 			"./style-index": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], () => (__webpack_require__("./src/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map