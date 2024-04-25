import {
	useState,
	useContext,
} from 'react';

import axios from 'axios';
import TodoContext from './TodoContext';
import useFetchData from '../useFetchData';

function AddTask(props) {
	const [taskname, setTaskname] = useState('');
	const [msg, setMsg] = useState('');
	const { setTododata, tododata } = useContext(TodoContext)

	const addTaskHandler = () => {
		const apiUrl = "https://sharktodo.smileplease.life/api/task/";
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
				axios.get(apiUrl, {
					headers: {
						'Authorization': `Token ${token}`,
					},
				}).then((response) => {
					setTododata(response.data)
				})

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
				<button className='addbtn' onClick={addTaskHandler}>add</button>
				{/* <p>{msg}</p> */}
			</div>
		</>
	)
}

export default AddTask;