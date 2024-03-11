import axios from "axios";

const NCNews = axios.create({
    baseURL: "https://nc-news-app-ju8c.onrender.com/api/"
})

export const getArticleByArticleId = (articleId) => {
    return NCNews
    .get(`/articles/${articleId}`)
    .then((res) => {
        return res.data
    })
}