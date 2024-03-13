import axios from "axios";

const NCNews = axios.create({
	baseURL: "https://nc-news-app-ju8c.onrender.com/api/",
});

export const getAllUsers = () => {
	return NCNews.get("/users")
    .then((res) => {
        return res.data
    })
}