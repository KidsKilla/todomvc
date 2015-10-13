import React from 'react';
import * as Utils from './utils';
import cx from 'classnames';

export default class TodoFooter extends React.Component {
	render () {
		var activeTodoWord = Utils.pluralize(this.props.count, 'item');
		var clearButton = null;

		if (this.props.completedCount > 0) {
			clearButton = (
				<button
					className="clear-completed"
					onClick={this.props.onClearCompleted}>
					Clear completed
				</button>
			);
		}

		// React idiom for shortcutting to `classSet` since it'll be used often
		var nowShowing = this.props.nowShowing;
		return (
			<footer className="footer">
					<span className="todo-count">
						<strong>{this.props.count}</strong> {activeTodoWord} left
					</span>
				<ul className="filters">
					<li>
						<a
							href="#/"
							className={cx({selected: nowShowing === app.ALL_TODOS})}>
							All
						</a>
					</li>
					{' '}
					<li>
						<a
							href="#/active"
							className={cx({selected: nowShowing === app.ACTIVE_TODOS})}>
							Active
						</a>
					</li>
					{' '}
					<li>
						<a
							href="#/completed"
							className={cx({selected: nowShowing === app.COMPLETED_TODOS})}>
							Completed
						</a>
					</li>
				</ul>
				{clearButton}
			</footer>
		);
	}
}
