// @jsx h

import Element, { h } from '@skatejs/element-preact';
import { html } from "./_";

export class Item extends Element {
  static props = {
    index: Number,
    checked: Boolean
  }

  handleCheck(e) {
    this.dispatchEvent(new CustomEvent("check", { detail: { index: this.index, value: this.checked } }));
  }
  handleRemove() {
    this.dispatchEvent(new CustomEvent("remove", { detail: { index: this.index, value: this.checked } }));
  }

  render() {
    return html`
      <div>
        <style>
          :host {
            display: block;
          }

          li {
            font-size: 24px;
            display: block;
            position: relative;
            border-bottom: 1px solid #ededed;
          }

          li input {
            text-align: center;
            width: 40px;
            /* auto, since non-WebKit browsers doesn't support input styling */
            height: auto;
            position: absolute;
            top: 9px;
            bottom: 0;
            margin: auto 0;
            border: none;
          }

          
          li label {
            white-space: pre;
            word-break: break-word;
            padding: 15px 60px 15px 15px;
            margin-left: 45px;
            display: block;
            line-height: 1.2;
            transition: color 0.4s;
          }

          li.completed label {
            color: #d9d9d9;
            text-decoration: line-through;
          }

          li button,
          li input[type="checkbox"] {
            outline: none;
          }

          li button {
            margin: 0;
            padding: 0;
            border: 0;
            background: none;
            font-size: 100%;
            vertical-align: baseline;
            font-family: inherit;
            font-weight: inherit;
            color: inherit;
            -webkit-appearance: none;
            appearance: none;
            -webkit-font-smoothing: antialiased;
            -moz-font-smoothing: antialiased;
            font-smoothing: antialiased;
          }

          li button {
            position: absolute;
            top: 0;
            right: 10px;
            bottom: 0;
            width: 40px;
            height: 40px;
            margin: auto 0;
            font-size: 30px;
            color: #cc9a9a;
            margin-bottom: 11px;
            transition: color 0.2s ease-out;
          }

          li button:hover {
            color: #af5b5e;
          }
        </style>
        <li class="${this.checked ? "completed" : ""}">
          <input type="checkbox" checked="${this.checked}" onChange="${this.handleCheck.bind(this)}"/>
          <label><slot></slot></label>
          <button onClick="${this.handleRemove.bind(this)}">x</button>
        </li>
      </div>
    `;
  }
}
