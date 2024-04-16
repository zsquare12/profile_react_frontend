import {
	useState,
	useContext,
 } from 'react';

import axios from 'axios';
import TodoContext from './TodoContext';

function AddTask(props) {
	const [taskname, setTaskname] = useState('');
	const [msg, setMsg] = useState('');
	const {setTododata, tododata} = useContext(TodoContext)

	const addTaskHandler = () => {
		const apiUrl = "http://localhost:8000/api/task/";
		const token = localStorage.getItem('token');
		axios.post(apiUrl, {
			title: taskname,
		}, {
			headers: {
				'Authorization': `Token ${token}`,
			}
		}).then(
			Response => {
				setMsg('task added :)');
				setTaskname('');
				setTododata(tododata => [...tododata, {
					"id": 89,
					"user": 12,
					"title": taskname,
					"description": null,
					"is_completed": false
				}])

			}
		).catch(error => {
			setMsg("Failed due to some Error: Try Again!");
			console.log(error);
		})
	}


	return (

		<>
			<div className="add_task">
				<input
					type="text"
					value={taskname}
					onChange={(e) => setTaskname(e.target.value)}
				/>
				<button onClick={addTaskHandler}>Add</button>
				<p>{msg}</p>
			</div>
		</>
	)
}

export default AddTask;