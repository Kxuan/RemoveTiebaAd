(function () {
    "use strict";

    var sidebar = null,
        options = null;

    getOptions("sidebar", function (r) {
        options = r || {};
        applyOptions(sidebar, selectorMap, options);
    });
    document.addEventListener('DOMSubtreeModified', onGlobalDOMChanged);

    function onGlobalDOMChanged(e) {
        sidebar = findSidebar();
        if (sidebar) {
            document.removeEventListener('DOMSubtreeModified', onGlobalDOMChanged);
            sidebar.addEventListener('DOMSubtreeModified', function(){
                applyOptions(sidebar, selectorMap, options);
            });
            applyOptions(sidebar, selectorMap, options);
        }
    }

    function findSidebar() {
        var el = document.getElementsByClassName('right_section');
        if (el.length > 0) {
            el = el[0];
        } else {
            el = document.getElementById('aside');
            if (el) {
                while (el.children.length == 1) {
                    el = el.children[0];
                }
            }
        }
        return el;
    }

    var selectorMap = {
        recommend_app: 'css:.my_app',
        u9: 'css:.u9_aside',
        life_helper: 'css:.life_helper',
        friend_bar: [
            'css:.zyq_mod_friend',
            'css:.j_zyq_mod_friend'
        ],

        feeds: [
            //Call 1-1-0 to find the ad
            'xpath:./div[count(*)=1]/a[count(*)=1]/img[count(*)=0]/../..',
            'css:#pagelet_frs-aside\\/pagelet\\/ad'
        ],
        xiu8: 'css:.live_show_aside',
        __proto__: null
    };

})();