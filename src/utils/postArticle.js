import axios from "axios";

const NCNews = axios.create({
    baseURL: 'https://nc-news-app-ju8c.onrender.com/api/'
});

export const postArticle = (title, body, topic, author, image) => {
    return NCNews.post('/articles', {
        title: title,
        body: body,
        topic: topic,
        author: author,
        article_img_url: image
    })
    .then((res) => {
        return res.data
    })
}
