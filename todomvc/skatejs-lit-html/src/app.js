import Element, {
    h
} from '@skatejs/element-lit-html';

export class App extends Element {
    static get props() {
        return {
            list: Array
        };
    }

    constructor() {
        super();
        this.list = [{
                text: 'my initial todo',
                checked: false
            },
            {
                text: 'Learn about Web Components',
                checked: true
            }
        ];
    }

    handleCheck = e => {
        this.list[e.detail.index].checked = e.detail.value;
    };
    handleRemove = e => {
        this.list = this.list.filter(
                (item, index) => index !== e.detail.index
            );
    };
    handleSubmit = e => {
        this.list = [...this.list, {
                text: e.detail.value,
                checked: false
            }];
    };

    render() {
        return h`
            <style>
                :host {
                    display: block;
                }

                h1 {
                    font-size: 60px;
                    font-weight: 100;
                    text-align: center;
                    color: rgba(175, 47, 47, 0.15);
                }

                section {
                    background: #fff;
                    margin: 130px 0 40px 0;
                    position: relative;
                    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
                        0 25px 50px 0 rgba(0, 0, 0, 0.1);
                }

                #list-container {
                    margin: 0;
                    padding: 0;
                    list-style: none;
                    border-top: 1px solid #e6e6e6;
                }
            </style>
            <h1>SkateJS & lit-html</h1>
            <section>
                <todo-input @submit="${(e) => this.handleSubmit(e)}"></todo-input>
                <ul id="list-container">
                    ${this.list.map(({ checked, text }, index) => h`<todo-item ?checked="${checked}" index="${index}" @check="${(e) => this.handleCheck(e)}" @remove="${(e) => this.handleRemove(e)}">${text}</todo-item>`)}
                </ul>
            </section>
        `;
    }
}