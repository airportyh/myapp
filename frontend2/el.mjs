import { curry } from './fp.mjs';

const el = (() => {
    const el = {};
    const elements = [
        'div', 'ul', 'li', 'ol', 'a', 'h1', 'h2', 'h3', 'h4', 'h5',
        'style', 'textarea', 'form', 'input', 'label', 'button'
    ];
    for (let e of elements) {
        el[e] = curry(element, e);
    }
    return el;
})();

export function element(tag, attrs, ...children) {
    const elm = document.createElement(tag);
    if (attrs instanceof HTMLElement || typeof attrs === 'string') {
        children.splice(0, 0, attrs);
    } else if (typeof attrs === 'object') {
        for (let attr in attrs) {
            if (attr === 'style') {
                applyStyles(elm, attrs[attr]);
                continue;
            }
            if (attr.startsWith('on')) {
                const event = attr.substring(2).toLowerCase();
                elm.addEventListener(event, attrs[attr]);
                continue;
            }
            elm.setAttribute(attr, attrs[attr]);
        }    
    }
    for (let child of children) {
        if (child instanceof HTMLElement) {
            elm.appendChild(child);
        } else if (typeof child === "string") {
            elm.appendChild(text(child));
        }
    }
    return elm;
}

export function applyStyles(elm, styles) {
    if (!styles) {
        return;
    }

    if (typeof styles === 'string') {
        elm.setAttribute('style', styles);
    }
    
    for (let key in styles) {
        elm.style[key] = styles[key];
    }
}

export function text(content) {
    const textNode = document.createTextNode(content);
    return textNode;
}

export default el;



