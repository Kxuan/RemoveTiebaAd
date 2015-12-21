(function () {
    "use strict";

    var options = null;

    getOptions("content", function (r) {
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
        feeds: 'xpath://*[@id="j_p_postlist"]//*[@class="d_post_content"]/../../..',
        thread_recommend: 'css:.thread_recommend',
        __proto__: null
    };

})();