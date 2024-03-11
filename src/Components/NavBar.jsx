import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <>
            <ul id='navbar'>
            <Link to="/" ><li>Home</li></Link>
            <Link to="/articles" ><li>Articles</li></Link>
            <Link to="/topics" ><li>Topics</li></Link>
            <Link to="/articles/post_new_article" ><li>New Article</li></Link>
            <Link to="/users" ><li>Users</li></Link>
            </ul>
        </>
    );
};

export default NavBar;