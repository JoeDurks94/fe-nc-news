import React, { useEffect, useState } from "react";
import { getAllUsers } from "../utils/getAllUsers";
import { useUser } from "../Contexts/UserContext";

const Users = () => {
	const [users, setUsers] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const { user, signIn } = useUser()

	useEffect(() => {
		setIsLoading(true)
		getAllUsers()
			.then((data) => {
				setUsers(data.users)
			}).then(() => {
				setIsLoading(false)
			})
	}, [])

	const handleSignIn = (user) => {
		signIn(user)
		console.log(user);
		
	}

	return isLoading ? <p>Loading...</p> : (
	<>
		<h2>Users</h2>
		<ul className="user-li">
			{users.map((user) => {
				return (
			<div className="user-container">
				<img className="img-user-list" src={user.avatar_url} alt="" />
				<h3>{user.name}</h3>
				<h4>{user.username}</h4>
				<button className='sign-in' onClick={() => {handleSignIn(user)}}>Sign In</button>
			</div>		
			)
			})}
		</ul>

	</>
	)
};

export default Users;
