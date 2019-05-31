import { h, Component, Prop } from '@stencil/core';

@Component({
  tag: 'triangle-item'
})
export class TriangleItem {
  @Prop() text: string;

  render() {
    return <span>{this.text}</span>;
  }
}
