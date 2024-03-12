import axios from "axios";

const NCNews = axios.create({
    baseURL: "https://nc-news-app-ju8c.onrender.com/api/"
})

export const getCommentsByArticleId = (article_id) => {
    return NCNews
    .get(`/articles/${article_id}/comments`)
    .then((res) => {
        return res.data
    })
}