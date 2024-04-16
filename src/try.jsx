import { useEffect, useState } from "react";
import useFetchData from "../useFetchData";

function TaskList(props) {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const apiUrl = 'http://localhost:8000/api/task/';

		const fetchData = async () => {
			try {
				const { data, loading, error, isLoggedIn } = await useFetchData(apiUrl);
				setData(data);
				setLoading(loading);
				setError(error);
				setIsLoggedIn(isLoggedIn);
			} catch (error) {
				setError(error);
			}
		};

		fetchData();
	}, [props.addtask]); // Re-run effect whenever props.addtask changes

	let dataElements = null;

	if (loading) {
		return <p>Getting your task ...</p>
	}

	if (error) {
		return <p>Error: {error.message}</p>
	}

	if (isLoggedIn) {
		dataElements = data.map((task, index) => (
			<li key={index}>
				<button>done/undone</button>
				<p>{task.title}</p>
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
