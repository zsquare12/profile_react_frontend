
import useFetchData from "../useFetchData";

function TaskList() {
	const apiUrl = 'http://localhost:8000/api/task/';
	const { data, loading, error, isLoggedIn } = useFetchData(apiUrl);
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