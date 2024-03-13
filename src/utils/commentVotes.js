import axios from "axios";

const NCNews = axios.create({
    baseURL: "https://nc-news-app-ju8c.onrender.com/api/"
})

export const upvoteComment = (comment_id) => {
    return NCNews
    .patch(`/comments/${comment_id}`, {
		inc_votes: 1,
	});
}

export const downvoteComment = (comment_id) => {
    return NCNews
    .patch(`/comments/${comment_id}`, {
		inc_votes: -1,
	});
}