import React, { useState, useEffect } from "react";
import { getAllUsers } from "../utils/getAllUsers";
import { postComment } from "../utils/postComment";
import { useParams } from "react-router-dom";

const NewCommentForm = ({ setComments }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [users, setUsers] = useState({});
	const [newComment, setNewComment] = useState("");
	const [selectedUser, setSelectedUser] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const { article_id } = useParams();

	useEffect(() => {
		setIsLoading(true);
		getAllUsers()
			.then((data) => {
				setUsers(data.users);
			})
			.then(() => {
				setTimeout(() => {
					setIsLoading(false);
				}, 2000);
			});
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		setSubmitted(true);
		const body = {
			username: selectedUser,
			post: newComment,
		};
		postComment(article_id, body.username, body.post)
			.then((posted) => {
				setComments((currentComments) => {
					return [posted.data, ...currentComments];
				});
				setSelectedUser({});
				setNewComment("");
			})
			.then(() => {
				setSubmitted(false);
			});
	};

	return isLoading ? (
		<p>Please wait, to post a comment</p>
	) : (
		<div className="form-container">
			<h4>Post a comment</h4>
			<div className="form-field-container">
				<form onSubmit={handleSubmit}>
					<label htmlFor="">
						Username:{" "}
						<select
							onChange={(event) => setSelectedUser(event.target.value)}
							name="user"
							id=""
							value={selectedUser}
						>
							{" "}
							<option value="">Select username</option>
							{users.map((user) => {
								return <option key={user.username}>{user.username}</option>;
							})}
						</select>
						<label htmlFor="">
							{" "}
							Comment:
							<textarea
								onChange={(event) => setNewComment(event.target.value)}
								name="comment"
								id="comment"
								cols="30"
								rows="10"
								value={newComment}
							></textarea>
						</label>
						<button disabled={submitted} className="comment-submit-btn">
							{submitted ? "Comment Successfully Posted" : "Submit"}
						</button>
					</label>
				</form>
			</div>
		</div>
	);
};

export default NewCommentForm;
