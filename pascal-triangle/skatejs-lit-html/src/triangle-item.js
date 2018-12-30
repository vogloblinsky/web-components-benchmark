import { props, withComponent } from 'skatejs';
import withLitHtml from '@skatejs/renderer-lit-html';
import { html } from 'lit-html';

export class TriangleItem extends withComponent(withLitHtml()) {
    static get props() {
        return {
            text: props.string
        };
    }
    render({ text }) {
        return html`
            <span>${text}</span>
        `;
    }
}
