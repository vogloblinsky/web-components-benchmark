import { Component } from 'solid-components';
import { r } from 'solid-js/dom';

Component('triangle-item', { text: '' }, ({ text }) =>
  <span textContent={ text } />
);