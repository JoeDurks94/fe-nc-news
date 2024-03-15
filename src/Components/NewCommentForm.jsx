import React, { useState, useEffect } from "react";
import { getAllUsers } from "../utils/getAllUsers";
import { postComment } from "../utils/postComment";
import { useParams } from "react-router-dom";

const NewCommentForm = ({ setComments, setSelectedUser, selectedUser }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [users, setUsers] = useState([]);
	const [newComment, setNewComment] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const { article_id } = useParams();

	useEffect(() => {
		setIsLoading(true);
		getAllUsers()
			.then((data) => {
				setUsers(data.users);
			})
			.then(() => {
				setIsLoading(false);
			});
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		setSubmitted(true);
		setSubmitBtnText("Comment Submitted")
		const body = {
			username: selectedUser,
			post: newComment,
		};
		postComment(article_id, body.username, body.post)
			.then((posted) => {
				setComments((currentComments) => {
					return [posted.data, ...currentComments];
				})
				setSelectedUser({});
				setNewComment("");
			})
			.then(() => {
				setTimeout(() => {
					setSubmitted(false);
					setSubmitBtnText("Submit")
				}, 1500);
			});
	};

	return isLoading ? (
		<h3 className="load-error-msg">Please wait, to post a comment</h3>
	) : (
		<div className="form-container">
			<h4>Post a comment</h4>
			<div className="form-field-container">
				<form onSubmit={handleSubmit}>
					<label htmlFor="">
						Username:{" "}
						<select
							onChange={(event) => {setSelectedUser(event.target.value)}}
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
								onChange={(event) => {setNewComment(event.target.value)}}
								name="comment"
								id="comment"
								cols="30"
								rows="10"
								value={newComment}
							></textarea>
						</label>
						<button disabled={newComment === "" || selectedUser === "" ? true : false} className="comment-submit-btn">
							{newComment === "" || selectedUser === "" ? "Please fill in all field to submit a comment" : "Submit Form"}
						</button>
					</label>
				</form>
			</div>
		</div>
	);
};

export default NewCommentForm;
