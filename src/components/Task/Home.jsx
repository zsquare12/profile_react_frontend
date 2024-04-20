import {
	useState,
	useEffect
} from 'react'

import AddTask from "./AddTask";
import TaskList from "./TaskList";
import useFetchData from '../useFetchData';
import TodoContext from './TodoContext';

function Home() {

	const apiUrl = 'http://localhost:8000/api/task/';
	const { data, loading, error, isLoggedIn } = useFetchData(apiUrl);

	const [tododata, setTododata] = useState([])
	// console.log(data)
	// console.log(tododata)

	const [addtask, setAddtask] = useState(true)

	useEffect(() => {
		if (data) {
			setTododata(data);
		}
	}, [data]);

	useEffect(() => {
		//re-render on tododata change
	}, [tododata]);


	useEffect(() => {
		//check if user is logged in 
		const token = localStorage.getItem('token');
		if (!(token)) {
			window.location.href = '/signin';
		}
	})


	return (
		<TodoContext.Provider value={{tododata:tododata, setTododata:setTododata}}>
			<div className="home">
				<AddTask setaddtask={setAddtask} />
				<TaskList addtask={addtask} />
			</div>
		</TodoContext.Provider>
	)
}

export default Home;