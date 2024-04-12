import {
	useState, 
	useEffect
} from 'react'

import AddTask from "./AddTask";
import TaskList from "./TaskList";
import './index.css'
import useFetchData from '../useFetchData';

function Home() {
	useEffect(() => {
		//check if user is logged in 
		const token = localStorage.getItem('token');
		if (!(token)) {
			window.location.href = '/signin';
		}
	})


	return (
		<>
			<div className="home">
				<AddTask />
				<TaskList />
			</div>
		</>
	)
}

export default Home;