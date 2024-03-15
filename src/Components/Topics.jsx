import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Topics = ({ topics }) => {
	return (
		<>
			<h2>Topics</h2>
			<ul className="topic-btn-list">
				{topics.map((topic) => {
					return (
						<li>
							<Link to={`/topics/${topic.slug}`}>
								<button key={topic.slug} className="topic-select-btn">
									{topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)}
								</button>
							</Link>
						</li>
					);
				})}
			</ul>
		</>
	);
};

export default Topics;
