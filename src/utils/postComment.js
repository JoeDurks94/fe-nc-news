import axios from "axios";

const NCNews = axios.create({
	baseURL: "https://nc-news-app-ju8c.onrender.com/api/",
});

export const postComment = (article_id, user, comment) => {
	return NCNews.post(`/articles/${article_id}/comments`, {
		username: user,
        body: comment
	});
};