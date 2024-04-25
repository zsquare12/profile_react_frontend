
import {
	useState,
	useContext,
	useEffect,
} from "react";
import useFetchData from "../useFetchData";
import TodoContext from "./TodoContext";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faCheckCircle, faCircle } from '@fortawesome/free-solid-svg-icons';



function TaskList(props) {

	const apiUrl = 'https://sharktodo.smileplease.life/api/task/';
	const { data, loading, error, isLoggedIn } = useFetchData(apiUrl);
	const { tododata, setTododata } = useContext(TodoContext)
	// console.log(tododata)
	let dataElements = null;


	useEffect(() => {
		// this effect will run whenever tododata change
	}, [tododata]);

	const hadleToggleCompletion = (index) => {
		const apiUrl = "https://sharktodo.smileplease.life/api/task/"
		const token = localStorage.getItem('token');
		const updateJson = {
			is_completed: !tododata[index].is_completed
		};

		//send the PATCH request using Axios
		axios.patch(`${apiUrl}${tododata[index].id}/`, updateJson, {
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
		const apiUrl = "https://sharktodo.smileplease.life/api/task/"
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
				<div
					onClick={() => hadleToggleCompletion(index)}
					className="btn"
				>{
						tododata[index].is_completed ?
							<FontAwesomeIcon icon={faCheckCircle} color='green' size="2x"/> :
							<FontAwesomeIcon icon={faCircle} color='grey' size="2x" />
					}
				</div>
				<div className="taskname"><p>{task.title}</p></div>
				<div
					onClick={() => handleDeleteTask(index)}
					className="btn"
				><FontAwesomeIcon icon={faTrashAlt} color='red' size="2x"/>
				</div>
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