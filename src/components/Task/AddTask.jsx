import { useState } from 'react';

import axios from 'axios';

function AddTask() {
	const [taskname, setTaskname] = useState('');
	const [msg, setMsg] = useState('');

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
				window.location.reload();
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