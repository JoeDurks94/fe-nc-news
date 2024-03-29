import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQueryArticles } from "../utils/getQueryArticles";
import { Link } from "react-router-dom";

const Topic = () => {
	const { topic } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [articles, setArticles] = useState({});
	const [error, setError] = useState(false)
	const [errorResponse, setErrorResponse] = useState({})

	useEffect(() => {
		setIsLoading(true);
		getQueryArticles("?topic=" + topic)
			.then((data) => {
				setArticles(data.articles);
			})
			.then(() => {
				setIsLoading(false);
			}).catch((error) => {
				setError(true)
				console.log(error)
				setErrorResponse(error)
			})
	}, []);

	return error ? <h3 className="load-error-msg">Unfortunatley, an error has occured. Please refresh the page and try again  <br></br>{topic.charAt(0).toUpperCase() + topic.slice(1)}{" "}{errorResponse.response.data.msg}</h3> : isLoading ? (
		<h3 className="load-error-msg" >Please wait, page is loading...</h3>
	) : (
		<div>
			<h2>{topic.charAt(0).toUpperCase() + topic.slice(1)}</h2>
			<div className="article-list">
				{articles.map((article) => {
					return (
						<Link
							key={article.article_id}
							to={`/articles/${article.article_id}`}
						>
							<div className="article-item">
								<img
									className="img-article-list"
									src={article.article_img_url}
								/>
								<h3>{article.title}</h3>
								<p>Votes: {article.votes}</p>
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default Topic;
