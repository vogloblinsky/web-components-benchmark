import { html, define, property } from 'hybrids';

const TriangleItem = {
    text: property('text'),
    render: ({ text }) =>
        html`
            <span>${text}</span>
        `
};

define('triangle-item', TriangleItem);
