import axios from "axios";

const NCNews = axios.create({
    baseURL: "https://nc-news-app-ju8c.onrender.com/api/"
})

export const getAllTopics = () => {
    return NCNews
    .get("/topics")
    .then((res) => {
        return res.data
    })
}