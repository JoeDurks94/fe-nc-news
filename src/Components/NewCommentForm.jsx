import React, { useState, useEffect } from "react";
import { getAllUsers } from "../utils/getAllUsers";
import { postComment } from "../utils/postComment";
import { useParams } from "react-router-dom";

const NewCommentForm = ({ setComments, setSelectedUser, selectedUser }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [users, setUsers] = useState([]);
	const [newComment, setNewComment] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const [submitBtnText, setSubmitBtnText] = useState("Submit");
	const [isFormValid, setIsFormValid] = useState(false);
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

	useEffect(() => {
		const valid = newComment !== "" && selectedUser !== "";
		setIsFormValid(valid);
		setSubmitBtnText(valid ? "Submit Form" : "Please fill in all fields to submit a comment");
	}, [newComment, selectedUser]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setSubmitted(true);
		setSubmitBtnText("Submitting...");

		try {
			const posted = await postComment(article_id, selectedUser, newComment);
			setComments(currentComments => [posted.data, ...currentComments]);
			
			setSubmitBtnText("Comment Submitted");
			setTimeout(() => {
				setSubmitted(false);
				setSubmitBtnText("Submit");
				setSelectedUser({});	
				setNewComment("");
			}, 2500);
		} catch (error) {
			console.log("Failed to post comment", error);
			setSubmitBtnText("Error submitting comment");
			setTimeout(() => setSubmitBtnText("Submit"), 1500);
		}
	}

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
						<button disabled={!isFormValid} className="comment-submit-btn">
							{submitBtnText}
						</button>
					</label>
				</form>
			</div>
		</div>
	);
};

export default NewCommentForm;
