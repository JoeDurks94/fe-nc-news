import React, { useState, useEffect } from "react";
import { postComment } from "../utils/postComment";
import { useParams } from "react-router-dom";
import { useUser } from "../Contexts/UserContext";

const NewCommentForm = ({ setComments }) => {
	const [newComment, setNewComment] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const [submitBtnText, setSubmitBtnText] = useState("Submit");
	const [isFormValid, setIsFormValid] = useState(false);
	const { user } = useUser();
	const { article_id } = useParams();

	useEffect(() => {
	}, []);

	useEffect(() => {
		const valid = newComment !== "";
		setIsFormValid(valid);
		setSubmitBtnText(valid ? "Submit Form" : "Please fill in all fields to submit a comment");
	}, [newComment]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setSubmitted(true);
		setSubmitBtnText("Submitting...");

		try {
			const posted = await postComment(article_id, user.username, newComment);
			setComments(currentComments => [posted.data, ...currentComments]);
			
			setSubmitBtnText("Comment Submitted");
			setTimeout(() => {
				setSubmitted(false);
				setSubmitBtnText("Submit");	
				setNewComment("");
			}, 2500);
		} catch (error) {
			setSubmitBtnText("Error submitting comment");
			setTimeout(() => setSubmitBtnText("Submit"), 1500);
		}
	}

	return user ? (
		<div className="form-container">
			<h4>Post a comment</h4>
			<div className="form-field-container">
				<form onSubmit={handleSubmit}>
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
				</form>
			</div>
		</div>
	) : <p className="delete-msg">You need to be signed in to post or delete a comment</p>;
};

export default NewCommentForm;
