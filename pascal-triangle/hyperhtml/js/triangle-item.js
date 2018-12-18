import HyperHTMLElement from '../node_modules/hyperhtml-element/esm/index.js';

class TriangleItem extends HyperHTMLElement {
    created() {
        this.attachShadow({
            mode: 'open'
        });
        this.text = '';
        this.render();
    }

    static get observedAttributes() {
        return ['text'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this[name] = newValue;
        this.render();
    }

    render() {
        return this.html `<span>${this.text}</span>`;
    }
}

TriangleItem.define('triangle-item');