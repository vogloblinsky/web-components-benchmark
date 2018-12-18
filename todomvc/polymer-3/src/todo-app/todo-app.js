import {
  html,
  PolymerElement
} from '@polymer/polymer/polymer-element.js';

/**
 * @customElement
 * @polymer
 */
class TodoApp extends PolymerElement {
  static get template() {
    return html `
      <style>
      :host {
        display: block;
      }

      h1 {
        font-size: 70px;
        font-weight: 100;
        text-align: center;
        color: rgba(175, 47, 47, 0.15);
      }

      section {
        background: #fff;
        margin: 130px 0 40px 0;
        position: relative;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
      }

      #list-container {
        margin: 0;
        padding: 0;
        list-style: none;
        border-top: 1px solid #e6e6e6;
      }
      </style>
      <h1>Todos Polymer 3</h1>
      <section>
        <todo-input></todo-input>
        <ul id="list-container">
          <template is="dom-repeat" items="{{list}}">
            <todo-item text="{{item.text}}" checked="{{item.checked}}" index="{{index}}" on-remove="removeItem" on-toggle="toggleItem"></todo-item>
          </template>
        </ul>
      </section>
    `;
  }
  static get properties() {
    return {
      list: {
        type: Array,
        value: [{
            text: 'my initial todo',
            checked: false
          },
          {
            text: 'Learn about Web Components',
            checked: true
          }
        ]
      }
    }
  }
  ready() {
    super.ready();
    this.$input = this.shadowRoot.querySelector('todo-input');
    this.$input.addEventListener('onSubmit', this.addItem.bind(this));
  }

  addItem(e) {
    this.set('list', [...this.list, {
      text: e.detail,
      checked: false,
    }]);
  }

  removeItem(e) {
    this.set('list', [...this.list.slice(0, e.detail), ...this.list.slice(e.detail + 1)]);
  }

  toggleItem(e) {
    const list = [...this.list];
    const item = list[e.detail];
    list[e.detail] = Object.assign({}, item, {
      checked: !item.checked
    });
    this.set('list', list);
  }
}

window.customElements.define('my-todo', TodoApp);