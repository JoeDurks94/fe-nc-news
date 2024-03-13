import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import Topics from "./Components/Topics";
import Article from "./Components/Article";
import Articles from "./Components/Articles";
import PostArticle from "./Components/PostArticle";
import Users from "./Components/Users";
import Comments from "./Components/Comments";

function App() {
	return (
		<>
			<Header />
			<NavBar />
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/topics" element={<Topics />}></Route>
				<Route path="/articles" element={<Articles />}></Route>
				<Route path="/articles/:article_id" element={<Article comments={Comments} />}></Route>
				<Route
					path="/articles/post_new_article"
					element={<PostArticle />}
				></Route>
				<Route path="/users" element={<Users />}></Route>
			</Routes>
		</>
	);
}

export default App;
