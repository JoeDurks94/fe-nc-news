import { React, useEffect, useState } from "react";
import { getAllArticles } from "../utils/getAllArticles";

const Articles = () => {
	const [articles, setArticles] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);
		getAllArticles()
			.then((data) => {
				setArticles(data.articles);
			})
			.then(() => {
				setIsLoading(false);
			});
	}, []);

	return isLoading ? (
		<p>Please wait, articles are loading...</p>
	) : (
		<>
			<ul className="article-list">
				{articles.map((article) => {
					return (
						<div className="article-item">
							<img src={article.article_img_url} />
							<h3>{article.title}</h3>
                            <p>Votes: {article.votes}</p>
						</div>
					);
				})}
			</ul>
		</>
	);
};

export default Articles;
