import React, {useEffect, useState} from 'react';
import { getAllUsers } from '../utils/getAllUsers';
import { getAllTopics } from '../utils/getAllTopics';
import { postArticle } from '../utils/postArticle';

const PostArticle = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");  
    const [topic, setTopic] = useState("");
    const [author, setAuthor] = useState("");
    const [image, setImage] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [submitBtnText, setSubmitBtnText] = useState("Submit");
    const [isFormValid, setIsFormValid] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        getAllUsers()
            .then((data) => {
                setUsers(data.users);
            })
            .then(() => {
                getAllTopics()
                    .then((data) => {
                        setTopics(data.topics); 
                    })  
            .then(() => {
                setIsLoading(false);
            })
        })
    }, [])

    useEffect(() => {
        const valid = title !== "" && body !== "" && topic !== "" && author !== "";
        setIsFormValid(valid);
    }, [title, body, topic, author]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitted(true);
        setSubmitBtnText("Submitting...");

        try {
            const posted = await postArticle(title, body, topic, author, image);
            setSubmitBtnText("Article Submitted");
            setTimeout(() => {
                setSubmitted(false);
                setSubmitBtnText("Submit");
                setTitle("");
                setBody("");
                setTopic("");
                setAuthor("");
                setImage("");
            }, 2500);
        } catch (error) {
            console.log("Failed to post article", error);
            setSubmitBtnText("Error submitting article");
            setTimeout(() => setSubmitBtnText("Submit"), 1500);
        }
    }

    return isLoading ? <h3>Please wait....</h3> : (
        <>
            <div className='form-container'>
                <h4>Post an article</h4>
                <div className='form-field-container'>
                    <form>
                        <label htmlFor='title'>Title</label>
                        <input type='text' id='title' value={title} onChange={(event) => setTitle(event.target.value)} />
                        <label htmlFor='topic'>Topic</label>
                        <select type='text' id='topic' value={topic} onChange={(event) => setTopic(event.target.value)}>
                            <option value=''>Select a topic</option>    
                            {topics.map((topic) => {
                                return <option key={topic.slug} value={topic.slug}>{topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)}</option>
                            })}
                        </select>
                        <label htmlFor='body'>Article</label>
                        <textarea id='body' value={body} onChange={(event) => setBody(event.target.value)} />
                        <label htmlFor='author'>Author</label>
                        <select id='author' value={author} onChange={(event) => setAuthor(event.target.value)}>
                            <option value=''>Select an author</option>
                            {users.map((user) => {
                                return <option key={user.username} value={user.username}>{user.username}</option>
                            })}
                        </select>
                        <label htmlFor='image'>Image URL - Please input a URL of an image</label>
                        <input type='text' id='image_url' value={image} onChange={(event) => setImage(event.target.value)} />
                        <button type='submit' onClick={handleSubmit} disabled={!isFormValid}>{submitBtnText}</button>
                        <button type='reset' onClick={() => {handleReset}}>Reset</button>    
                    </form>
                </div>
            </div>
        </>
    )
}

/*
    - We need to create a new component that will allow users to post a new article. It will need the following information
        - Title
        - Body
        - Topic
        - Author
    - The component should have a form with the following fields:
        - Title
        - Body
        - Topic
        - Author (this should be a dropdown list of all users)
        - Submit button
        - Reset button
        - Should have a field for a article image but this should be optional
    - The form should have the following functionality:
        - The form should have validation to ensure that all fields are filled in before the form can be submitted
        - The form should have a submit button that will post the new article to the database
        - The form should have a reset button that will clear all fields in the form
        - The form should have a cancel button that will take the user back to the homepage
*/

export default PostArticle