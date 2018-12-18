const templateTriangleLine = document.createElement('template');
templateTriangleLine.innerHTML = `
    <style>
    .line {
        text-align: center;
    }
    </style>
    <div class="line"></div>
`;

class TriangleLine extends HTMLElement {
    constructor() {
        super();
        this._root = this.attachShadow({ mode: 'open' });
        this._items = '';
    }
    connectedCallback() {
        this._root.appendChild(templateTriangleLine.content.cloneNode(true));
        this.$lineContainer = this._root.querySelector('.line');
        this._render();
    }
    disconnectedCallback() {}
    static get observedAttributes() {
        return ['items'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        this._items = newValue.split(',');
    }
    _render() {
        this._items.forEach((item, index) => {
            let $item = document.createElement('triangle-item');
            $item.setAttribute('text', item);
            this.$lineContainer.appendChild($item);
        });
    }
}

window.customElements.define('triangle-line', TriangleLine);
