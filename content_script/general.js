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
        feeds: selectGeneralFeeds,
        __proto__: null
    };

    /* @this {HTMLElement} */
    function selectGeneralFeeds() {
        var allStyleElements = this.querySelectorAll('li+style,div+style'),
            el;
        var results = [];
        for (var i = 0; i < allStyleElements.length; i++) {
            //Style must be inline
            if (allStyleElements[i].href)
                continue;

            el = allStyleElements[i].previousElementSibling;
            if (el.style.display == 'none')
                continue;

            for (var ci = 0; ci < el.classList.length; ci++) {
                if (el.classList[ci].match(/^[a-z0-9]+\d+[a-z0-9]+$/)) {
                    results.push(el);
                    break;
                }
            }
        }
        return results;
    }
})();