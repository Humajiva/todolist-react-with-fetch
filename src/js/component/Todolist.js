import React from "react";
import { useState, useEffect } from "react";

export const Todolist = () => {
	const [inputTask, setInputTask] = useState("");
	const [taskList, setTaskList] = useState([]);
	const uri = "https://assets.breatheco.de/apis/fake/todos/user/hjiva";

	useEffect(() => {
		getFetch();
	}, []);
	const getFetch = () => {
		fetch(uri)
			.then(function (response) {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json();
			})
			.then(function (responseAsJson) {
				console.log("responseAsJson", responseAsJson);
				setTaskList(responseAsJson);
			})
			.catch(function (error) {
				console.log("error", error);
			});
	};

	const updatePut = (updatedTodos) => {
		fetch(uri, {
			method: "PUT",
			body: JSON.stringify(updatedTodos),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((response) => {
				console.log("success", response);
				getFetch();
			})
			.catch((error) => console.error("error", error));
	};
	const savingTask = (e) => {
		let newTodos = taskList.concat({
			label: inputTask,
			done: false,
		});

		if (e.keyCode == 13) {
			setTaskList(newTodos);
			updatePut(newTodos);
			setInputTask("");
		}
	};

	const deleteTask = (index) => {
		const newTodos = taskList.filter((tasktToRemove, i) => i != index);
		setTaskList(newTodos);
		updatePut(newTodos);
	};

	const markDone = (index) => {
		const newTodos = taskList.map((task, i) => {
			if (i == index) {
				task.done = !task.done;
				return task;
			} else {
				return task;
			}
		});
		setTaskList(newTodos);
		updatePut(newTodos);
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
								<li className="list" key={index}>
									{""}

									<span className={task.done ? "strike" : ""}>
										{task.label}
									</span>
									<span
										className="Delete"
										onClick={() => deleteTask(index)}>
										<i className="fas fa-trash"></i>
									</span>
									<span
										onClick={() => markDone(index)}
										className={task.done ? "green" : ""}>
										{" "}
										{/*all we care about is the index to remove task not the event itself. we are not trying to save any value by the onclick*/}
										<i className="fas fa-check-square"></i>
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
