import axios from "axios";

const NCNews = axios.create({
    baseURL: "https://nc-news-app-ju8c.onrender.com/api/"
})

export const upvote = () => {
    return NCNews
    .get("/articles")
    .then((res) => {
        return res.data
    })
}