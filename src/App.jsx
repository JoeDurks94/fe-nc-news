import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import Topics from "./Components/Topics";
import Topic from "./Components/Topic";
import Article from "./Components/Article";
import Articles from "./Components/Articles";
import PostArticle from "./Components/PostArticle";
import Users from "./Components/Users";
import IncorrectRoute from "./Components/IncorrectRoute";
import { getAllTopics } from "./utils/getAllTopics";
import { UserProvider } from "./Contexts/UserContext";

const App = () => {
	const [topics, setTopics] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);
		getAllTopics().then((data) => {
			setTopics(data.topics);
			setIsLoading(false);
		});
	}, []);

	return isLoading ? (
		<>
			<NavBar />
			<p>Please Wait...</p>
		</>
	) : (
		<>
		<UserProvider>
			<Header />
			<NavBar />
			<Routes>
				<Route path="/" element={<Home />}></Route>
				{topics.map((topic) => {
					return (
						<Route
							path={"/topics/:topic"}
							element={<Topic />}
							topic={topic}
							key={topic}
						></Route>
					);
				})}
				<Route path="/topics" element={<Topics topics={topics} />}></Route>
				<Route path="/articles" element={<Articles />}></Route>
				<Route path="/articles/:article_id" element={<Article />}></Route>
				<Route
					path="/articles/post_new_article"
					element={<PostArticle />}
				></Route>
				<Route path="/users" element={<Users />}></Route>
				<Route path="*" element={<IncorrectRoute />}> </Route>
			</Routes>
			</UserProvider>
		</>
	);
};

export default App;
