import { React, useEffect, useState } from "react";
import { getAllArticles } from "../utils/getAllArticles";
import { Link } from "react-router-dom";
import { votesSort } from "../utils/sortUtils/votesSort";


const Articles = () => {
	const [articles, setArticles] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [sortBy, setSortBy] = useState("Date Posted");
	const [sortOrder, setSortOrder] = useState("Descending");

	useEffect(() => {
		setIsLoading(true);
		getAllArticles(sortBy, sortOrder)
			.then((data) => {
				setArticles(data);
			})
			.then(() => {
				setIsLoading(false);
			});
	}, [sortBy, sortOrder]);

	return isLoading ? (
		<>
			<p>Please wait, page is loading...</p>
		</>
	) : (
		<>
			<h2>Articles</h2>
			<form className="sort-form">
				<select
					onChange={(event) => {
						setSortBy(event.target.value);
					}}
					value={sortBy}
					>
					<option>Date Posted</option>
					<option>Votes Recieved</option>
					<option>Comment Count</option>
				</select>
				<select onChange={((event) => {setSortOrder(event.target.value)})} value={sortOrder}>
					<option>Descending</option>
					<option>Ascending</option>
				</select>
			</form>
			<ul className="article-list">
				{articles.map((article) => {
					return (
						<Link
							key={article.article_id}
							to={`/articles/${article.article_id}`}
						>
							<li className="article-item">
								<p>
									Created At <br></br>{" "}
									{new Date(article.created_at).toLocaleDateString()}
								</p>
								<img
									className="img-article-list"
									src={article.article_img_url}
								/>
								<h3>{article.title}</h3>
								<p>Votes: {article.votes}</p>
							</li>
						</Link>
					);
				})}
			</ul>
		</>
	);
};

export default Articles;
