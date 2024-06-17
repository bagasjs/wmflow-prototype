function tag(name, ...children) {
    const result = document.createElement(name);
    for (const child of children) {
        if (typeof(child) === 'string') {
            result.appendChild(document.createTextNode(child));
        } else {
            result.appendChild(child);
        }
    }

    result.att$ = function(name, value) {
        this.setAttribute(name, value);
        return this;
    };

    result.child$ = function(...children) {
        for (const child of children) {
            if (typeof(child) === 'string') {
                this.appendChild(document.createTextNode(child));
            } else {
                this.appendChild(child);
            }
        }
        return this;
    }

    result.class$ = function(value) {
        if (value instanceof Array){
            this.classList.add(...value);
        } else {
            this.className = value;
        }
        return this;
    }

    result.onclick$ = function(callback) {
        this.onclick = callback;
        return this;
    };

    return result;
}

function RouterLink(to, ...children) {
    const result = tag("a", ...children).att$("href", `#${to}`)
    return result;
}

function Router(routes) {
    let result = tag("div");

    result.routes$ = routes;
    result.refresh$ = function() {
        console.log(this);
        let hashLocation = document.location.hash.split('#')[1];
        if (!hashLocation) {
            hashLocation = '/';
        }

        if (!(hashLocation in this.routes$)) {
            // TODO(#2): make the route404 customizable in the router component
            const route404 = '/';

            console.assert(route404 in this.routes$);
            hashLocation = route404;
        }

        this.replaceChildren(this.routes$[hashLocation]());

        return this;
    }

    result.apply$ = function() {
        const refresh = this.refresh$.bind(this);
        window.addEventListener("hashchange", refresh);
        this.refresh$();
        return this;
    }

    return result.apply$();
}
