function getOptions(name, callback) {
    chrome.storage.sync.get(
        name,
        function (syncOptions) {
            callback(syncOptions[name]);
        });

}
function executeSelector(root, selector) {
    if (selector instanceof Array) {
        //If selector is an array, merge all results into one array
        return Array.prototype.concat.apply([], selector.map(executeSelector.bind(this, root), this));
    }

    var m = selector.match(/^(\w+?):(.*)$/);
    if (!m) return null;
    //var [type, query] = m;
    var type = m[1],
        query = m[2];
    switch (type) {
        case 'css':
            return Array.prototype.slice.call(root.querySelectorAll(query));
        case 'xpath':
            var resolver = document.evaluate(query, root, null, XPathResult.ANY_TYPE, null);
            var ret = [];
            var el;
            while (el = resolver.iterateNext()) {
                ret.push(el);
            }
            return ret;
    }
}

function removeElement(element) {
    var parentEl;
    do {
        parentEl = element.parentElement;
        if (!parentEl)
            return;
        element.style.display = 'none';
        element = parentEl;
    } while (element.children.length == 1);
}


function applyOptions(root, selectors, options) {
    if (!options || !root)
        return;

    for (var opt in selectors) {
        if (!(opt in options) || options[opt]) {
            var selector = selectors[opt];
            var el = executeSelector(root, selector);
            if (el && el.length > 0) {
                for (var i = 0; i < el.length; i++) {
                    removeElement(el[i]);
                }
            }
        }
    }
}