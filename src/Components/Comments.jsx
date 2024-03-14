import { React, useEffect, useState } from "react";
import { getCommentsByArticleId } from "../utils/getCommentsByArticleId";
import { useParams } from "react-router-dom";
import NewCommentForm from "./NewCommentForm";
import { upvoteComment, downvoteComment } from "../utils/commentVotes";
import { deleteComment } from "../utils/deleteComment"

const Comments = () => {
	const [selectedUser, setSelectedUser] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [comments, setComments] = useState({});
	const [deleted, setDeleted] = (useState(false))
	const { article_id } = useParams();

	useEffect(() => {
		setIsLoading(true);
		getCommentsByArticleId(article_id)
			.then((data) => {
				setComments(data.comments);
			})
			.then(() => {
				setIsLoading(false);
			});
	}, []);


	const handleUpvote = (comment_id) => {
		setComments((currentComments) => {return currentComments.map((comment) => {
			if (comment.comment_id === comment_id){
				return { ...comment, votes: comment.votes + 1}
			}
			return { ...comment }
		})})
		upvoteComment(comment_id).catch(() => {
			setComments((currentComments) => {return currentComments.map((comment) => {
				if (comment.comment_id === comment_id){
					return { ...comment, votes: comment.votes - 1}
				}
				return { ...comment }
			})})
		})
	};

	const handleDownvote = (comment_id) => {
		setComments((currentComments) => {return currentComments.map((comment) => {
			if (comment.comment_id === comment_id){
				return { ...comment, votes: comment.votes - 1}
			}
			return { ...comment }
		})})
		upvoteComment(comment_id).catch(() => {
			setComments((currentComments) => {return currentComments.map((comment) => {
				if (comment.comment_id === comment_id){
					return { ...comment, votes: comment.votes + 1}
				}
				return { ...comment }
			})})
		})
	};

	const handleDelete = (comment_id) => {
		setDeleted(true)
		deleteComment(comment_id).then(()=>{
			getCommentsByArticleId(article_id)
				.then((data) => {
					setDeleted(false)
					setComments(data.comments)
				})
		})
	}

	return isLoading ? (
		<>
		<h3>Comments</h3>
		<p>Please wait, page is loading...</p>
		</>
	) : (
		<>
		<h3>Comments</h3>
			<NewCommentForm setSelectedUser={setSelectedUser} selectedUser={selectedUser} setComments={setComments} />
			<p className="delete-msg">In order to delete comments please select your username from the dropdown below</p>
				{comments.map((comment) => {
					return (
						<div key={comment.comment_id} className="comment">
							<div className="topline">
								<p>
									<em>{comment.author}</em>
								</p>
								<p>
									Votes: {comment.votes}
								</p>
							</div>
							<div className="second-line">
							<button hidden={selectedUser !== comment.author} disabled={deleted}className="delete-btn" onClick={() => {handleDelete(comment.comment_id)}}>x</button>
								<p className="comment-body">{comment.body}</p>
								<div className="votes-container">
									<button
										onClick={() => {
											handleUpvote(comment.comment_id);
										}}
										className="votes-btn"
									>
										▲
									</button>
									<button
										onClick={() => {
											handleDownvote(comment.comment_id);
										}}
										className="votes-btn"
									>
										▼
									</button>
								</div>
							</div>
						</div>
						
					);
				})}
		</>
	);
};

export default Comments;
