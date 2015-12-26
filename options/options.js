(function () {
    "use strict";
    var activePage = null;
    var allPages = {__proto__: null};

    var allOptions = {__proto__: null};
    var defaultsOptions;

    (function () {
        var i;
        var navEl = document.querySelector('ul.tab');
        for (i = 0; i < navEl.children.length; i++) {
            bindNavigation(navEl.children[i]);
        }

        var allOptionEl, optionPage;
        for (var pageName in allPages) {
            optionPage = allPages[pageName].page;
            allOptionEl = optionPage.getElementsByTagName('input');

            allOptions[pageName] = {__proto__: null};

            for (i = 0; i < allOptionEl.length; i++) {
                var optEl = allOptionEl[i];
                if (typeof optEl.dataset.opt != 'string')
                    continue;

                allOptions[pageName][optEl.dataset.opt] = optEl;
            }
        }

        defaultsOptions = getOptionsFromPage();
    })();

    function bindNavigation(navEl) {
        if (navEl.tagName.toUpperCase() != 'LI')
            return;
        var name = navEl.dataset.page,
            pageEl = document.querySelector("#pg_" + name);

        if (!pageEl)
            return;

        navEl.addEventListener('click', setCurrentPage.bind(this, name));
        allPages[name] = {
            name: name,
            nav: navEl,
            page: pageEl
        };
    }


    function setCurrentPage(name) {
        if (!(name in allPages) || (activePage && activePage.name == name))
            return;

        //remove .active from previous page
        if (activePage) {
            activePage.nav.classList.remove('active');
            activePage.page.classList.remove('active');
        }

        //add .active to current page
        activePage = allPages[name];
        activePage.nav.classList.add('active');
        activePage.page.classList.add('active');
    }

    function getOptionsFromPage() {
        return Object.keys(allOptions).reduce(function (opts, pageName) {
            opts[pageName] = Object.keys(allOptions[pageName]).reduce(function (optsInPage, optName) {
                optsInPage[optName] = allOptions[pageName][optName].checked
                return optsInPage;
            }, {});
            return opts;
        }, {});
    }

    function setOptionsToPage(options) {
        Object.keys(allOptions).forEach(function (pageName) {
            if (!(pageName in options))
                return;
            var optionPage = allOptions[pageName];
            Object.keys(optionPage).forEach(function (optName) {
                if (optName in options[pageName])
                    optionPage[optName].checked = options[pageName][optName];
            });
        });
    }

    function restoreOptions() {
        chrome.storage.sync.get(
            getOptionsFromPage(),
            setOptionsToPage);
    }

    function saveOptions() {
        document.querySelector("#save").disabled = true;

        chrome.storage.sync.set(
            getOptionsFromPage()
            , function () {
                document.querySelector("#save").disabled = false;
            });
    }

    document.addEventListener('DOMContentLoaded', restoreOptions);
    document.querySelector('#reset').addEventListener('click', function () {
        setOptionsToPage(defaultsOptions);
    });
    document.querySelector('#save').addEventListener('click', saveOptions);


    //Set default page
    setCurrentPage('general');
})();