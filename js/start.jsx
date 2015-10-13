import TodoModel from './todoModel';
import TodoApp from './app.jsx';
import React from 'react';
import ReactDOM from 'react-dom';

var model = new TodoModel('todo-test');
model.subscribe(render);

function render() {
	ReactDOM.render(
		<TodoApp model={model}/>,
		document.getElementById('todoapp')
	);
}

render();
