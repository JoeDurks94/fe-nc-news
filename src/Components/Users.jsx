import React, { useEffect, useState } from "react";
import { getAllUsers } from "../utils/getAllUsers";

const Users = () => {
	const [users, setUsers] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		setIsLoading(true)
		getAllUsers()
			.then((data) => {
				setUsers(data.users)
			}).then(() => {
				setIsLoading(false)
			})
	}, [])

	return (
	<>
		<h2>Users</h2>
	</>
	)
};

export default Users;
