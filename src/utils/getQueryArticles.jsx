import axios from "axios";

const NCNews = axios.create({
	baseURL: "https://nc-news-app-ju8c.onrender.com/api/",
});

export const getQueryArticles = (query) => {
	return NCNews.get(`/articles${query}`).then((res) => {
		return res.data;
	});
};
