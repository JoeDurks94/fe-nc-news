import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleByArticleId } from "../utils/getArticleByArticleId";
import { upvoteArticle, downvoteArticle } from "../utils/articleVotes";
import Comments from "./Comments";

const Article = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [article, setArticle] = useState({});
	const { article_id } = useParams();

	useEffect(() => {
		setIsLoading(true);
		getArticleByArticleId(article_id)
			.then((data) => {
				setArticle(data.article);
			})
			.then(() => {
				setIsLoading(false);
			});
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

	return isLoading ? (
		<p>Please wait, page is loading...</p>
	) : (
		<>
			<div className="article-container">
				<h2>{article.title}</h2>
				<img className="img-article" src={article.article_img_url} />
				<p>
					<em>Posted By: {article.author}</em>
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
				{/* <p>{article}</p> */}
			</div>
			<Comments />
		</>
	);
};

export default Article;
