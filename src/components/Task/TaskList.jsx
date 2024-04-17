
import {
	useState,
	useContext,
	useEffect,
} from "react";
import useFetchData from "../useFetchData";
import TodoContext from "./TodoContext";
import axios from 'axios';

function TaskList(props) {

	const apiUrl = 'http://localhost:8000/api/task/';
	const { data, loading, error, isLoggedIn } = useFetchData(apiUrl);
	const {tododata, setTododata} = useContext(TodoContext)
	// console.log(tododata)
	let dataElements = null;


	useEffect(() => {
		// this effect will run whenever tododata change
	}, [tododata]);

	const hadleToggleCompletion = (index) => {
		const apiUrl = "http://localhost:8000/api/task/"
		const token = localStorage.getItem('token');
		const updateJson = {
			is_completed : !tododata[index].is_completed
		};

		//send the PATCH request using Axios
		axios.patch(`${apiUrl}${tododata[index].id}/`,updateJson, {
			headers: {
				'Authorization': `Token ${token}`,
			},
		}).then(response => {
			console.log('patch request successful : ', response.data);
			//handle successful response
			//show changes without page reload
			const updatedData = [...tododata];
			updatedData[index].is_completed = !updatedData[index].is_completed;
			setTododata(updatedData);
		}).catch(error => {
			console.error('path request failed:', error);
			// Handle error
		});

	};

	const handleDeleteTask = (index) => {
		const apiUrl = "http://localhost:8000/api/task/"
		const token = localStorage.getItem('token');

		//send delete request using axios
		axios.delete(`${apiUrl}${tododata[index].id}/`, {
			headers: {
				'Authorization': `Token ${token}`,
			},
		}).then(response => {
			console.log('Delete request successful:', response.data);
			const updatedData = [...tododata];
			updatedData.splice(index, 1);
			setTododata(updatedData);
		}).catch(error => {
			console.error('delete request failed:', error);
		})

	}

	if (loading) {
		return <p>Getting your task ...</p>
	}

	if (error) {
		return <p>Error: {error.message}</p>
	}

	if (isLoggedIn) {
		dataElements = tododata.map((task, index) => (
			<li key={index}>
				<button
					onClick={() => hadleToggleCompletion(index)}
				>done/undone</button>
				<p>{task.id} {task.title} {String(task.is_completed)}</p>
				<button
					onClick={()=> handleDeleteTask(index)}
				>delete</button>
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