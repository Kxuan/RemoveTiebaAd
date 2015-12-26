(function () {
    "use strict";

    var options = null;

    getOptions("general", function (r) {
        options = r || {};
        applyOptions(document.body, selectorMap, options);
    });
    document.addEventListener('DOMSubtreeModified', onGlobalDOMChanged);

    function onGlobalDOMChanged(e) {
        document.removeEventListener('DOMSubtreeModified', onGlobalDOMChanged);
        applyOptions(document.body, selectorMap, options);
        document.addEventListener('DOMSubtreeModified', onGlobalDOMChanged);
    }

    var selectorMap = {
        //Call 1-1-0 to find the ad
        feeds: 'css:*[data-daid]',
        __proto__: null
    };

    /* @this {HTMLElement} */
    function selectGeneralFeeds() {
        var all_div = this.querySelectorAll('*[data-daid]'),
            el;
        var results = [];
        for (var i = 0; i < all_div.length; i++) {
            el = all_div[i];
            for (var ci = 0; ci < el.classList.length; ci++) {
                if (el.style.display != 'none' && el.classList[ci].match(/^[a-z0-9]+\d+[a-z0-9]+$/)) {
                    var styleEl = el.nextElementSibling;
                    if (styleEl &&
                        styleEl.tagName == "STYLE" && !styleEl.href) {
                        results.push(el);
                    }
                    break;
                }
            }
        }
        return results;
    }
})();