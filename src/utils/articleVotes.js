import axios from "axios";

const NCNews = axios.create({
	baseURL: "https://nc-news-app-ju8c.onrender.com/api/",
});

export const upvoteArticle = (article_id) => {
	return NCNews.patch(`/articles/${article_id}`, {
		inc_votes: 1,
	});
};

export const downvoteArticle = (article_id) => {
	return NCNews.patch(`/articles/${article_id}`, {
		inc_votes: -1,
	});
};
