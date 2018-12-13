const onAddItem = (host, e) => {
    host.list = [...host.list, {
        id: host.list.length,
        text: e.detail,
        checked: false
    }];
}

const onItemChecked = (host, e) => {
    const item = host.list[e.detail];
    const list = host.list.slice(0);
    list[e.detail] = Object.assign({}, item, {
        checked: !item.checked
    });
    host.list = [...list];
}

const onItemRemoved = (host, e) => {
    host.list = [...host.list.slice(0, e.detail), ...host.list.slice(e.detail + 1)];
}

const MyTodo = {
    list: [{
        id: 0,
        text: 'my initial todo',
        checked: false
    }, {
        id: 1,
        text: 'Learn about Web Components',
        checked: true
    }],
    render: ({
        list
    }) => window.hybrids.html `
    <style>
    h1 {
        font-size: 100px;
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
    <h1>Todos WC</h1>
    <todo-input onsubmit=${onAddItem}></todo-input>
    <ul id="list-container">
        ${list.map((element, index) => window.hybrids.html`<todo-item text="${element.text}" checked="${element.checked}" index="${index}" onremoved="${onItemRemoved}" onchecked=${onItemChecked}></todo-item>`)}
    </ul>
    `,
};

window.hybrids.define('my-todo', MyTodo);