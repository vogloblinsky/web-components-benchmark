// @jsx h

import Element, { h } from '@skatejs/element-preact';

export default class extends Element {
    static props = {
        text: String
    };
    render() {
        return <span>{this.text}</span>;
    }
}
