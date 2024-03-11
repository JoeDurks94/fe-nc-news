import { React, useEffect, useState } from "react";
import { getAllArticles } from "../utils/getAllArticles";
import { Link } from "react-router-dom";

const Articles = () => {
	const [articles, setArticles] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true)
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
						<Link to ={`/articles/${article.article_id}`}>
                            <div className="article-item">
                                <img className="img-article-list" src={article.article_img_url} />
                                <h3>{article.title}</h3>
                                <p>Votes: {article.votes}</p>
                            </div>
                        </Link>
					);
				})}
			</ul>
		</>
	);
};

export default Articles;
