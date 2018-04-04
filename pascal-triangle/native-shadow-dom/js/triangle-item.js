const templateTriangleItem = document.createElement('template');
templateTriangleItem.innerHTML = `
    <span class="item"></span>
`;

class TriangleItem extends HTMLElement {
    constructor() {
        super();
        this._root = this.attachShadow({ mode: 'open' });
        this._text = '';
    }
    connectedCallback() {
        this._root.appendChild(templateTriangleItem.content.cloneNode(true));
        this.$text = this._root.querySelector('.item');
        this._render();
    }
    disconnectedCallback() {}
    static get observedAttributes() {
        return ['text'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        this._text = newValue;
    }
    _render() {
        this.$text.textContent = this._text;
    }
}

window.customElements.define('triangle-item', TriangleItem);
