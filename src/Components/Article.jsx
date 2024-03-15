import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleByArticleId } from "../utils/getArticleByArticleId";
import { upvoteArticle, downvoteArticle } from "../utils/articleVotes";
import Comments from "./Comments";

const Article = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [article, setArticle] = useState({});
	const [error, setError] = useState(false)
	const [errorResponse, setErrorResponse] = useState({})
	const { article_id } = useParams();

	useEffect(() => {
		setIsLoading(true);
		getArticleByArticleId(article_id)
			.then((data) => {
				setArticle(data.article);
			})
			.then(() => {
				setIsLoading(false);
			}).catch((error) => {
				setError(true)
				setErrorResponse(error)
				console.log(error);
			})
	}, []);

	const handleUpvote = (article_id) => {
		setArticle((currentArticle) => {
			return { ...currentArticle, votes: currentArticle.votes + 1 };
		});
		upvoteArticle(article_id).catch(() => {
			setArticle((currentArticle) => {
				return { ...currentArticle, votes: currentArticle.votes - 1 };
			});
		});
	};

	const handleDownvote = (article_id) => {
		setArticle((currentArticle) => {
			return { ...currentArticle, votes: currentArticle.votes - 1 };
		});
		downvoteArticle(article_id).catch(() => {
			setArticle((currentArticle) => {
				return { ...currentArticle, votes: currentArticle.votes + 1 };
			});
		});
	};

	return error ? <h3 className="load-error-msg">Unfortunatley, an error has occured. Please refresh the page and try again <br></br> <br></br> {errorResponse.response.data.msg}</h3> : isLoading ? (
		<h3 className="load-error-msg" >Please wait, page is loading...</h3>
	) : (
		<>
			 <div className="article-container">
				<h2>{article.title}</h2>
				<img className="img-article" src={article.article_img_url} />
				<p>
					<em>Posted By: {article.author}</em>
				</p>
				<p>
					<em>
						Date Created: {new Date(article.created_at).toLocaleDateString()}
					</em>
				</p>
				<div className="article-votes-container">
					<p>Votes: {article.votes}</p>
					<div className="vote-btn-container">
						<button
							onClick={() => {
								handleUpvote(article_id);
							}}
							className="votes-btn"
						>
							▲
						</button>
						<button
							onClick={() => {
								handleDownvote(article_id);
							}}
							className="votes-btn"
						>
							▼
						</button>
					</div>
				</div>
				<p>{article.body}</p>
			</div>
			<div className="comment-container">
				<Comments />
			</div>
		</>
	);
};

export default Article;
