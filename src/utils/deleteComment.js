import axios from "axios";

const NCNews = axios.create({
	baseURL: "https://nc-news-app-ju8c.onrender.com/api/",
});

export const deleteComment = (comment_id) => {
	return NCNews.delete(`/comments/${comment_id}/`)
};