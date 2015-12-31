(function () {
    "use strict";

    var options = null;

    getOptions("list", function (r) {
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
        search_bar: 'xpath://*/div[count(*)=1]/a[count(*)=1]/img[count(*)=0 and @style!=""]',
        live: 'css:.game_live_list',
        forum_recommend: 'css:.forum_recommend',
        xiu8: 'css:.j_play_list_panel',
        __proto__: null
    };
})();