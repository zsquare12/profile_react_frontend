import { useEffect, useState } from 'react';

import {
	Link
} from 'react-router-dom';

import useFetchData from '../useFetchData';

import sharToDoLogo from '../../static/sharktodo_logo.svg'

function Header() {
	//this is going to be our header of all the pages mainly contain nav-bar
	const apiUrl = 'https://sharktodo.smileplease.life/api/profiles'
	const { data, loading, error, isLoggedIn } = useFetchData(apiUrl);

	const logoutHandle = () => {
		localStorage.removeItem('token');
		window.location.reload();
	}

	var link_to_show = null;

	if (isLoggedIn) {
		link_to_show = (
			<>
				<li>Welcome {data[0].username} !</li>
				<li><button onClick={logoutHandle} className='btn btn-primary'>Logout</button></li>
			</>
		)
	} else {
		link_to_show = <>
			<li><Link to='/signin'>SignIn</Link></li>
			<li><Link to='/signup'>SignUp</Link></li>
		</>
	}



	return (
		<>
			<nav>
				<div className="nav_left">
					<ul>
						<li>
							<img className='sharklogo' src={sharToDoLogo} alt="" />
							<Link to='/'>SharkToDo</Link>
						</li>
					</ul>
				</div>
				<div className="nav_right">
					<ul>
						{link_to_show}
					</ul>
				</div>
			</nav>
		</>
	)
}

export default Header;