import { React, useEffect, useState } from "react";
import { getCommentsByArticleId } from "../utils/getCommentsByArticleId";
import { useParams } from "react-router-dom";
// import { upvote, downvote } from "../utils/commentVotes";

const Comments = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [comments, setComments] = useState({});
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

	// const handleUpvote = (comment_id) => {
	// 	upvote(comment_id)
	// };

	// const handleDownvote = (comment_id) => {
	// 	downvote(comment_id)
	// };

	return isLoading ? (
		<p>Please wait, page is loading...</p>
	) : (
		<>
			<div className="comment-container">
				<h3>Comments</h3>
				{comments.map((comment) => {
					return (
						<div key={comment.comment_id} className="comment">
							<div className="topline">
								<p>
									<em>{comment.author}</em>
								</p>
								<p>Votes: {comment.votes}</p>
							</div>
							<div className="second-line">
								<p>{comment.body}</p>
								<div className="votes-container">
									<button
										onClick={(() => {
                                            handleUpvote(comment.comment_id)
                                    })} className="votes-btn"
									>
										⬆
									</button>
									<button onClick={(() => {
                                        handleDownvote(comment.comment_id)
                                    })} className="votes-btn">
										⬇
									</button>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default Comments;
