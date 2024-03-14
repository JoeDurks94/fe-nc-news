import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Topics = ({ topics }) => {


    return (
        <>
            <div className="topic-btn-container">
            <h3>Topics</h3>
                {topics.map((topic) => {
                    return (
                        <button className='topic-select-btn' ><Link to={`/${topic.slug}`} >{topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)}</Link></button>
                    ) 
                })}
            </div>
        </>
    );
};

export default Topics;