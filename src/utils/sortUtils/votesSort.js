

export const votesSort = (articles, direction) => {
const sortedArticles = articles.sort((firstItem, secondItem) => firstItem.votes - secondItem.votes)
return sortedArticles
}