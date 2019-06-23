// @jsx h

import Element, { h } from '@skatejs/element-preact';
import { html } from "./_";

export class Input extends Element {
    static props = {
        value: String
    }

    handleInput = e => {
        this.value = e.target.value;
    };
    handleSubmit = e => {
        e.preventDefault();
        if (!this.value) return;
        this.dispatchEvent(new CustomEvent("submit", { detail: { value: this.value } }));
        this.shadowRoot.querySelector('input').value = '';
    };

    render() {
        return html`
            <div>
                <style>
                    :host {
                        display: block;
                    }

                    form {
                        position: relative;
                        font-size: 24px;
                        border-bottom: 1px solid #ededed;
                    }

                    input {
                        padding: 16px 16px 16px 60px;
                        border: none;
                        background: rgba(0, 0, 0, 0.003);
                        position: relative;
                        margin: 0;
                        width: 100%;
                        font-size: 24px;
                        font-family: inherit;
                        font-weight: inherit;
                        line-height: 1.4em;
                        border: 0;
                        outline: none;
                        color: inherit;
                        padding: 6px;
                        border: 1px solid #ccc;
                        box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
                        box-sizing: border-box;
                    }
                </style>
                <form onSubmit="${this.handleSubmit.bind(this)}">
                    <input
                        value="${this.value}"
                        type="text"
                        placeholder="What needs to be done?"
                        onInput="${this.handleInput.bind(this)}"
                    />
                </form>
            </div>
        `;
    }
}
