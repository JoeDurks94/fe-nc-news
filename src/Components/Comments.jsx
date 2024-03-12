import { React, useEffect, useState } from "react";
import { getCommentsByArticleId } from "../utils/getCommentsByArticleId";
import { useParams } from "react-router-dom";

const Comments = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [comments, setComments] = useState({})
    const { article_id } = useParams();

    useEffect(() => {
        setIsLoading(true)
        getCommentsByArticleId(article_id)
            .then((data) => {
                setComments(data.comments)
            })
            .then(() => {
                
                setIsLoading(false)
            })
    }, [])

    return isLoading ? <p>Please wait, page is loading...</p> : (
        <div className="comment-container">
            <h3>Comments</h3>
            {comments.map((comment) => {
                return (
                <div className="comment">
                <div className="topline">
                <p><em>{comment.author}</em></p>
                <p>Votes: {comment.votes}</p>
                </div>
                <div className="second-line">
                <p>{comment.body}</p>
                <div className="votes">
                <button>⬆</button>
                <button>⬇</button>
                </div>
                </div>
                </div>
                )
            })}
        </div>
    );
};

export default Comments;