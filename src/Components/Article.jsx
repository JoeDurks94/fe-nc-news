import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleByArticleId } from "../utils/getArticleByArticleId";

const Article = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [article, setArticle] = useState({});
	const { article_id } = useParams();

	useEffect(() => {
		setIsLoading(true)
        getArticleByArticleId(article_id)
            .then((data) => {
                setArticle(data.article);
            })
            .then(() => {
                setIsLoading(false);
            })
	}, []);

	return isLoading ? <p>Page is loading... {console.log(article_id)}</p> : (
		<div className="article-container">
			<h2>{article.title}</h2>
			<img className="img-article" src={article.article_img_url} />
			<p><em>Posted By: {article.author}</em></p>
			<p>{article.body}</p>
			{/* <p>{article}</p> */}
		</div>
	)
};

export default Article;
