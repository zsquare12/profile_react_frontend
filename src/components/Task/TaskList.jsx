
import {
	useState,
	useContext,
	useEffect,
} from "react";
import useFetchData from "../useFetchData";
import TodoContext from "./TodoContext";

function TaskList(props) {

	const apiUrl = 'http://localhost:8000/api/task/';
	const { data, loading, error, isLoggedIn } = useFetchData(apiUrl);
	const {tododata, setTododata} = useContext(TodoContext)
	// console.log(tododata)
	let dataElements = null;


	useEffect(() => {
		// this effect will run whenever tododata change
	}, [tododata]);

	if (loading) {
		return <p>Getting your task ...</p>
	}

	if (error) {
		return <p>Error: {error.message}</p>
	}

	if (isLoggedIn) {
		dataElements = tododata.map((task, index) => (
			<li key={index}>
				<button>done/undone</button>
				<p>{task.id}</p>
				<button>delete</button>
			</li>
		));
	}



	return (
		<>
			<ul className="task_list">
				{dataElements}
			</ul>
		</>
	)
}

export default TaskList;