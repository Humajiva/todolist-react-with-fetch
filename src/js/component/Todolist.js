import React from "react";

export const Todolist = () => {
	const [inputTask, setInputTask] = React.useState("");
	const [taskList, setTaskList] = React.useState([]);
	const savingTask = (e) => {
		if (e.keyCode == 13) {
			setTaskList([...taskList, inputTask]);
			setInputTask("");
		}
	};
	const deleteTask = (index) => {
		setTaskList(taskList.filter((tasktToRemove, i) => i != index));
	};
	return (
		<div className="container">
			<div className="main-box">
				<h1>TodoList</h1>
				<div className="todo-box">
					<input
						type="text"
						onChange={(e) => setInputTask(e.target.value)}
						value={inputTask}
						onKeyUp={(e) => savingTask(e)}
					/>
					<ul>
						{taskList.map((task, index) => {
							return (
								<li key={index}>
									{task}
									<span
										className="Delete"
										onClick={() => deleteTask(index)}>
										<i className="fas fa-trash"></i>
									</span>
								</li>
							);
						})}
					</ul>
					<div>
						<em>
							{taskList.length == 0
								? "no tasks"
								: `${taskList.length} tasks`}
						</em>
					</div>
				</div>
			</div>
		</div>
	);
};
