import axios from "axios";

const NCNews = axios.create({
	baseURL: "https://nc-news-app-ju8c.onrender.com/api/",
});

export const getAllArticles = (sortBy, sortOrder) => {
	return NCNews.get(`/articles`).then((res) => {
		if (sortBy && sortOrder) {
			if (sortBy === "Date Posted") {
				const data = res.data.articles;
				if (sortOrder === "Ascending") {
					const sortedData = data.sort(
						(firstItem, secondItem) =>
							new Date(firstItem.created_at) - new Date(secondItem.created_at)
					);
					return sortedData;
				}
				if (sortOrder === "Descending") {
					const sortedData = data.sort(
						(firstItem, secondItem) =>
							new Date(secondItem.created_at) - new Date(firstItem.created_at)
					);
					return sortedData;
				}
			} else if (sortBy === "Votes Recieved") {
				const data = res.data.articles;
				if (sortOrder === "Ascending") {
					const sortedData = data.sort(
						(firstItem, secondItem) => firstItem.votes - secondItem.votes
					);
					return sortedData;
				}
				if (sortOrder === "Descending") {
					const sortedData = data.sort(
						(firstItem, secondItem) => secondItem.votes - firstItem.votes
					);
					return sortedData;
				}
			} else if (sortBy === "Comment Count") {
				console.log(
					"im return the formatted data inside the articles util func",
					sortBy,
					sortOrder
				);
				const data = res.data.articles;
				if (sortOrder === "Ascending") {
					console.log("asc");
					const sortedData = data.sort(
						(firstItem, secondItem) =>
							Number(firstItem.comment_count) - Number(secondItem.comment_count)
					);
					return sortedData;
				}
				if (sortOrder === "Descending") {
					console.log("desc");
					const sortedData = data.sort(
						(firstItem, secondItem) =>
							secondItem.comment_count - firstItem.comment_count
					);
					return sortedData;
				}
			}
		} else return res.data;
	});
};
