import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'director';

import TodoModel from './todoModel';
import TodoFooter from './footer.jsx';
import TodoItem from './todoItem.jsx';

const ALL_TODOS = 'all';
const ACTIVE_TODOS = 'active';
const COMPLETED_TODOS = 'completed';

const ENTER_KEY = 13;

export default class TodoApp extends React.Component {
	getInitialState () {
		return {
			nowShowing: app.ALL_TODOS,
			editing: null
		};
	}

	componentDidMount () {
		var router = Router({
			'/': this.setState.bind(this, {nowShowing: ALL_TODOS}),
			'/active': this.setState.bind(this, {nowShowing: ACTIVE_TODOS}),
			'/completed': this.setState.bind(this, {nowShowing: COMPLETED_TODOS})
		});
		router.init('/');
	}

	handleNewTodoKeyDown (event) {
		if (event.keyCode !== ENTER_KEY) {
			return;
		}

		event.preventDefault();

		var val = ReactDOM.findDOMNode(this.refs.newField).value.trim();

		if (val) {
			this.props.model.addTodo(val);
			ReactDOM.findDOMNode(this.refs.newField).value = '';
		}
	}

	toggleAll (event) {
		var checked = event.target.checked;
		this.props.model.toggleAll(checked);
	}

	toggle (todoToToggle) {
		this.props.model.toggle(todoToToggle);
	}

	destroy (todo) {
		this.props.model.destroy(todo);
	}

	edit (todo) {
		this.setState({editing: todo.id});
	}

	save (todoToSave, text) {
		this.props.model.save(todoToSave, text);
		this.setState({editing: null});
	}

	cancel () {
		this.setState({editing: null});
	}

	clearCompleted () {
		this.props.model.clearCompleted();
	}

	render () {
		var footer;
		var main;
		var todos = this.props.model.todos;

		var shownTodos = todos.filter(function (todo) {
			switch (this.state.nowShowing) {
			case app.ACTIVE_TODOS:
				return !todo.completed;
			case app.COMPLETED_TODOS:
				return todo.completed;
			default:
				return true;
			}
		}, this);

		var todoItems = shownTodos.map(function (todo) {
			return (
				<TodoItem
					key={todo.id}
					todo={todo}
					onToggle={this.toggle.bind(this, todo)}
					onDestroy={this.destroy.bind(this, todo)}
					onEdit={this.edit.bind(this, todo)}
					editing={this.state.editing === todo.id}
					onSave={this.save.bind(this, todo)}
					onCancel={this.cancel}
				/>
			);
		}, this);

		var activeTodoCount = todos.reduce((accum, todo) => todo.completed ? accum : accum + 1, 0);
		var completedCount = todos.length - activeTodoCount;

		if (activeTodoCount || completedCount) {
			footer =
				<TodoFooter
					count={activeTodoCount}
					completedCount={completedCount}
					nowShowing={this.state.nowShowing}
					onClearCompleted={this.clearCompleted}
				/>;
		}

		if (todos.length) {
			main = (
				<section className="main">
					<input
						className="toggle-all"
						type="checkbox"
						onChange={this.toggleAll}
						checked={activeTodoCount === 0}
					/>
					<ul className="todo-list">
						{todoItems}
					</ul>
				</section>
			);
		}

		return (
			<div>
				<header className="header">
					<h1>todos</h1>
					<input
						ref="newField"
						className="new-todo"
						placeholder="What needs to be done?"
						onKeyDown={this.handleNewTodoKeyDown}
						autoFocus={true}
					/>
				</header>
				{main}
				{footer}
			</div>
		);
	}
};

