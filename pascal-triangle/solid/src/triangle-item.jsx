import { customElement } from 'solid-element';

customElement('triangle-item', { text: '' }, ({ text }) =>
  <span textContent={ text } />
);